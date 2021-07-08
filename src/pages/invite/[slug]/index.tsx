import { QueryClient } from 'react-query'

import { User } from 'graphql/generated/graphql'
import getUserByInstagram from 'graphql/queries/getUserByInstagram'
import getUsersSlugs from 'graphql/queries/getUsersSlugs'
import { GetStaticPaths, GetStaticProps } from 'next'
import InviteTemplate, {
  InviteTemplatePageProps
} from 'templates/Invite/Subscribe'
import { formatPrice } from 'utils/formatPrice'

export default function InviteDynamicPage(props: InviteTemplatePageProps) {
  return <InviteTemplate {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient()

  const result = await queryClient.fetchQuery<User[]>(
    'invite-paths',
    getUsersSlugs,
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
  const queryClient = new QueryClient()

  const { slug } = params

  const user = await queryClient.fetchQuery<User>(
    'invite-users',
    () => getUserByInstagram(slug as string),
    {
      staleTime: Infinity
    }
  )

  return {
    props: {
      slug: user.instagram,
      exhibition_name: user.invite?.exhibition_name || 'default',
      custom_text: user.invite?.custom_text || 'default custom text',
      subscription_price:
        formatPrice(user.invite?.subscription_price / 100) || 0
    }
  }
}
