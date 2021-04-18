import { GetServerSidePropsContext } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

import CloseFriendsTemplate, {
  CloseFriendsTemplatePageProps
} from 'templates/CloseFriends'
import protectedRoutes from 'utils/protected-routes'
import { User, Subscribers } from 'utils/types/faunaTypes'

export default function CloseFriendsPage(props: CloseFriendsTemplatePageProps) {
  return <CloseFriendsTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const influencer = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  )

  // console.log('INFLUENCER ::: ', influencer)

  const rawSubs = await fauna.query<Subscribers>(
    q.Map(
      q.Paginate(
        q.Match(q.Index('subscribers_by_influencer'), influencer.data.instagram)
      ),
      q.Lambda('x', q.Get(q.Var('x')))
    )
  )

  console.log('RAWSUBS :::', rawSubs.data)

  const subscribers = rawSubs.data.map(sub => ({
    subscriptions: sub.data.subscriptions.filter(item =>
      item.influencer === influencer.data.instagram ? item : ''
    ),
    subscriber_instagram: sub.data.subscriber_instagram,
    subscriber_telegram: sub.data.subscriber_telegram,
    subscriber_email: sub.data.subscriber_email,
    status: sub.data.status.charAt(0).toUpperCase() + sub.data.status.slice(1)
  }))

  return {
    props: {
      session,
      subscribers: subscribers.map(sub => ({
        ...sub,
        subscriptions: [
          {
            influencer: sub.subscriptions[0].influencer,
            subscribed_at: new Date(
              sub.subscriptions[0].subscribed_at
            ).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            })
          }
        ]
      }))
    }
  }
}
