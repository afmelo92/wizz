import { query as q } from 'faunadb'
import { fauna } from 'services/fauna'
import { stripe } from 'services/stripe'
import { Subscriber, Subscription, User } from 'utils/types/faunaTypes'

type DeleteSubscriptionProps = {
  subscriber: Subscriber
  influencer: User
}

export default async function deleteSubscription({
  subscriber,
  influencer
}: DeleteSubscriptionProps) {
  const subscription = await fauna.query<Subscription>(
    q.Get(
      q.Match(q.Index('subscription_by_influencer_and_subscriber'), [
        subscriber.ref,
        influencer.ref
      ])
    )
  )

  await stripe.subscriptions.del(subscription.data.id)

  await fauna.query(
    q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
      data: {
        unsub_code: ''
      }
    })
  )
}
