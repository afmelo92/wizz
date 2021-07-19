import { QueryClient } from 'react-query'

import { query as q } from 'faunadb'
import { User } from 'graphql/generated/graphql'
import getUserByInstagram from 'graphql/queries/getUserByInstagram'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'
import { stripe } from 'services/stripe'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      influencer,
      exhibition_name,
      custom_text,
      subscription_price
    } = req.body

    try {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity
          }
        }
      })

      const user = await queryClient.fetchQuery<Promise<User>>(
        'user-subs',
        () => getUserByInstagram(influencer.toLowerCase())
      )

      const productId = user.invite?.product_id || ''

      // Verifica se não possui um produto ainda para cria-lo em seguida
      if (!productId) {
        const product = await stripe.products.create({
          name: `Close Friends :: @${influencer} :: ${exhibition_name}`,
          metadata: {
            userId: user._id
          }
        })

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: subscription_price,
          currency: 'brl',
          recurring: {
            interval: 'month'
          }
        })

        // ALTERAR PARA MUTATION
        await fauna.query(
          q.Update(q.Ref(q.Collection('User'), user._id), {
            data: {
              invite: {
                exhibition_name,
                custom_text,
                subscription_price: q.ToNumber(subscription_price),
                price_id: price.id,
                product_id: product.id
              }
            }
          })
        )
        return res.status(200).json({ productId: product, priceId: price })
      }

      // verificar se o preço anterior é diferente ao atual
      // para evitar novos preços no stripe
      if (user.invite.subscription_price !== subscription_price) {
        // invalida o ultimo preço disponivel
        await stripe.prices.update(user.invite.price_id, {
          active: false
        })

        await stripe.products.update(user.invite.product_id, {
          name: `Close Friends :: @${influencer} :: ${exhibition_name}`
        })

        // cria um novo preço e associo ao produto do cliente
        const newPrice = await stripe.prices.create({
          product: user.invite.product_id,
          unit_amount: subscription_price,
          currency: 'brl',
          recurring: {
            interval: 'month'
          }
        })

        // ALTERAR PARA MUTATION
        await fauna.query(
          q.Update(q.Ref(q.Collection('User'), user._id), {
            data: {
              invite: {
                exhibition_name,
                custom_text,
                subscription_price: q.ToNumber(subscription_price),
                price_id: newPrice.id
              }
            }
          })
        )

        return res
          .status(200)
          .json({ productId: user.invite.product_id, priceId: newPrice })
      }

      // já existe um produto de assinatura e o influencer alterou apenas
      // o nome de exibição e a mensagem
      await stripe.products.update(user.invite.product_id, {
        name: `Close Friends :: @${influencer} :: ${exhibition_name}`
      })

      // ALTERAR PARA MUTATION
      await fauna.query(
        q.Update(q.Ref(q.Collection('User'), user._id), {
          data: {
            invite: {
              exhibition_name,
              custom_text
            }
          }
        })
      )

      return res.status(200).json({ message: 'Success! Main data updated.' })
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
