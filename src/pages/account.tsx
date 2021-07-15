import { QueryClient } from 'react-query'

import { User } from 'graphql/generated/graphql'
import getUserUnderAnalysis from 'graphql/queries/getUserUnderAnalysis'
import { GetServerSidePropsContext } from 'next'
import AccountTemplate, { AccountemplateProps } from 'templates/Account'
import protectedRoutes from 'utils/protected-routes'

export default function AccountPage(props: AccountemplateProps) {
  return <AccountTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const queryClient = new QueryClient()

  const user = await queryClient.fetchQuery<User>('under-analysis', () =>
    getUserUnderAnalysis(session.user.email)
  )

  return {
    props: {
      session,
      underAnalysis: user.account.under_analysis || false
    }
  }
}
