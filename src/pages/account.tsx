import { GetServerSidePropsContext } from 'next'
import AccountTemplate from 'templates/Account'
import protectedRoutes from 'utils/protected-routes'

export default function AccountPage() {
  return <AccountTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
