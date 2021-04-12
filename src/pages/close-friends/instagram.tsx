import { GetServerSidePropsContext } from 'next'
import InstagramTemplate from 'templates/CloseFriends/Instagram'
import protectedRoutes from 'utils/protected-routes'

export default function CloseFriendsInstagramPage() {
  return <InstagramTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
