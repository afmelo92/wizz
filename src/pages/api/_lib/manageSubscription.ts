import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { stripe } from '../../../services/stripe'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  influencerId: string,
  createAction = false
) {
  const subscriberRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('subscriber_by_stripe_customer_id'), customerId))
    )
  )

  const influencerRef = await fauna.query(
    q.Select('ref', q.Get(q.Ref(q.Collection('users'), influencerId)))
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    subscriberId: subscriberRef,
    influencerId: influencerRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  console.log('WEBHOOK SUBSCRIPTION DATA :::', subscriptionData)

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), {
        data: subscriptionData
      })
    )

    await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        influencerId
      }
    })
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))
        ),
        {
          data: subscriptionData
        }
      )
    )
  }
}
