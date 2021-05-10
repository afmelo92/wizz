import { GetServerSidePropsContext } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

import CloseFriendsTemplate, {
  CloseFriendsTemplatePageProps
} from 'templates/CloseFriends'
import protectedRoutes from 'utils/protected-routes'
import { User, FormattedSubscriptions } from 'utils/types/faunaTypes'

export default function CloseFriendsPage(props: CloseFriendsTemplatePageProps) {
  return <CloseFriendsTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const influencer = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  )

  const subscriptions = await fauna.query<FormattedSubscriptions>(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('subscriptions_by_influencer_id'),
          q.Ref(q.Collection('users'), influencer.ref.id)
        ),
        { size: 100 }
      ),
      q.Lambda(
        'sub',
        q.Merge(
          {
            status: q.Select(['data', 'status'], q.Get(q.Var('sub'))),
            created_at: q.ToString(
              q.Epoch(q.Select(['ts'], q.Get(q.Var('sub'))), 'microsecond')
            )
          },
          {
            subscriber: q.Select(
              ['data'],
              q.Get(q.Select(['data', 'subscriberId'], q.Get(q.Var('sub'))))
            )
          }
        )
      )
    )
  )

  const formattedSubscribers = subscriptions.data.map(sub => ({
    ...sub,
    status: sub.status.charAt(0).toUpperCase() + sub.status.slice(1),
    created_at: new Date(sub.created_at).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  }))

  return {
    props: {
      session,
      subscribers: formattedSubscribers
    }
  }
}
