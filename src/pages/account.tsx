import { GetServerSidePropsContext } from 'next'
import AccountTemplate, { LeadTemplateProps } from 'templates/Account'
import protectedRoutes from 'utils/protected-routes'

export default function AccountPage(props: LeadTemplateProps) {
  return <AccountTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
