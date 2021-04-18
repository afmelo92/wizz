import { GetServerSidePropsContext } from 'next'
import LeadsTemplate, { LeadTemplateProps } from 'templates/Leads'
import protectedRoutes from 'utils/protected-routes'

export default function LeadsPage(props: LeadTemplateProps) {
  return <LeadsTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
