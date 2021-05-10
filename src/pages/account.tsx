import { GetServerSidePropsContext } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'
import AccountTemplate, { AccountemplateProps } from 'templates/Account'
import protectedRoutes from 'utils/protected-routes'
import { User } from 'utils/types/faunaTypes'

export default function AccountPage(props: AccountemplateProps) {
  return <AccountTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const {
    data: {
      account: { underAnalysis }
    }
  } = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
  )
  return {
    props: {
      session,
      underAnalysis: underAnalysis || false
    }
  }
}
