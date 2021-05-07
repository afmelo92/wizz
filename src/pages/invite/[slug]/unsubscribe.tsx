import { GetStaticPaths, GetStaticProps } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

import UnsubscribeTemplate, {
  InviteTemplatePageProps
} from 'templates/Invite/Unsubscribe'
import { Users, User } from 'utils/types/faunaTypes'

export default function InviteDynamicPage(props: InviteTemplatePageProps) {
  return <UnsubscribeTemplate {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fauna.query<Users>(
    q.Map(
      q.Paginate(q.Match(q.Index('all_users'))),
      q.Lambda('X', q.Get(q.Var('X')))
    )
  )

  const paths = users.data.map(({ data: { instagram } }) => ({
    params: { slug: instagram }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_instagram'), q.Casefold(slug)))
  )

  return {
    props: {
      slug: user.data.instagram,
      exhibition_name: user.data.invite?.exhibition_name || 'default',
      custom_text: user.data.invite?.custom_text || 'default custom text',
      subscription_price:
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(user.data.invite?.subscription_price / 100) || 0
    }
  }
}
