import { GetServerSidePropsContext } from 'next'
import CloseFriendsTemplate from 'templates/CloseFriends'
import protectedRoutes from 'utils/protected-routes'

export default function CloseFriendsPage() {
  return <CloseFriendsTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
