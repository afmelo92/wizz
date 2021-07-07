import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'

import DashboardTemplate from '../templates/Dashboard'

export default function DashboardPage() {
  return <DashboardTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
