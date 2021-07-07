import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { UserSubscription } from 'graphql/generated/graphql'
// import { getSubscriptions } from 'graphql/queries/subscriptions'
import getUserSubscriptions from 'graphql/queries/subscriptions'
import { GetServerSidePropsContext } from 'next'
import CloseFriendsTemplate from 'templates/CloseFriends'
import protectedRoutes from 'utils/protected-routes'

export default function CloseFriendsPage() {
  return <CloseFriendsTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const queryClient = new QueryClient()

  const { email } = session.user

  await queryClient.prefetchQuery<UserSubscription[]>(
    'subscriptions',
    () => getUserSubscriptions(email),
    {
      staleTime: Infinity
    }
  )

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
