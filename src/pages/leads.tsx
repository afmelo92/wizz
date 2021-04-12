import { GetServerSidePropsContext } from 'next'
import LeadsTemplate from 'templates/Leads'
import protectedRoutes from 'utils/protected-routes'

export default function LeadsPage() {
  return <LeadsTemplate />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
