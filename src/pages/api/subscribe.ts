import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'
import { stripe } from 'services/stripe'
import { Subscriber, User } from 'utils/types/faunaTypes'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      subscriber_instagram,
      subscriber_email,
      subscriber_phone,
      slug
    } = req.body

    try {
      const subscriber = await fauna.query<Subscriber>(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('subscriber_by_instagram'),
                q.Casefold(subscriber_instagram)
              )
            )
          ),
          q.Create(q.Collection('subscribers'), {
            data: {
              subscriber_instagram: q.Casefold(subscriber_instagram),
              subscriber_phone,
              subscriber_email: q.Casefold(subscriber_email),
              stripe_customer_id: ''
            }
          }),
          q.Get(
            q.Match(
              q.Index('subscriber_by_instagram'),
              q.Casefold(subscriber_instagram)
            )
          )
        )
      )

      const influencer = await fauna.query<User>(
        q.Get(q.Match(q.Index('user_by_instagram'), q.Casefold(slug)))
      )

      let customerId = subscriber.data.stripe_customer_id

      // Impede que o subscriber assine duas vezes o mesmo close friends
      if (customerId) {
        const subscriptions = await stripe.subscriptions.list({
          customer: subscriber.data.stripe_customer_id
        })

        const checkUserExists = subscriptions.data.map(
          item =>
            item.customer === subscriber.data.stripe_customer_id &&
            item.metadata.influencerId === influencer.ref.id
        )

        if (checkUserExists[0]) {
          return res.status(400).json({
            error: 'Oops... You are already subscribed in this Close friends.'
          })
        }
      }

      // Cria um customerId para novos subscribers caso não tenha
      if (!customerId) {
        const stripeCustomer = await stripe.customers.create({
          email: subscriber_email
        })

        await fauna.query(
          q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          })
        )

        customerId = stripeCustomer.id
      }

      const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          {
            price: influencer.data.invite.price_id,
            quantity: 1
          }
        ],
        metadata: {
          influencerId: influencer.ref.id
        },
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `https://instagram.com/${slug}`,
        cancel_url: process.env.STRIPE_CANCEL_URL
      })

      return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } catch (err) {
      console.log(err)
      return res
        .status(400)
        .json({ error: 'Oops... Something went wrong. Try again later.' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
