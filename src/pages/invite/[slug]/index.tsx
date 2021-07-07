import { QueryClient, useQuery } from 'react-query'

import { query as q } from 'faunadb'
import { User } from 'graphql/generated/graphql'
import getUsersInvitePage from 'graphql/queries/getUsersInvitePage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fauna } from 'services/fauna'
import InviteTemplate, {
  InviteTemplatePageProps
} from 'templates/Invite/Subscribe'

export default function InviteDynamicPage(props: InviteTemplatePageProps) {
  return <InviteTemplate {...props} />
}

export async function getStaticPaths() {
  const queryClient = new QueryClient()

  // const { email } = session.user

  // const subscribers = await getSubscriptions(email)

  const result = await queryClient.fetchQuery<User[]>(
    ['users', 'invite'],
    getUsersInvitePage,
    {
      staleTime: Infinity
    }
  )

  const paths = result.map(({ instagram }) => ({
    params: { slug: instagram }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index('userByInstagram'), q.Casefold(slug)))
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
