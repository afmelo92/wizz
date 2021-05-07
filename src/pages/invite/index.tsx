import { GetServerSidePropsContext } from 'next'
import UserInviteTemplate, { UserInviteTemplateProps } from 'templates/Invite'
import protectedRoutes from 'utils/protected-routes'

export default function InvitePage(props: UserInviteTemplateProps) {
  return <UserInviteTemplate {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
