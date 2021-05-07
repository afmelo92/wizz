import { Container, VStack } from '@chakra-ui/react'
import Profile from 'templates/Invite/Profile'
import SendDataUnsubscribeForm from 'templates/Forms/UnsubscribeForm/SendData'
import ConfirmationUnsubscribeForm from 'templates/Forms/UnsubscribeForm/Confirmation'

export type InviteTemplatePageProps = {
  slug: string
  exhibition_name: string
  custom_text: string
  subscription_price: string
}

export default function UnsubscribeTemplate({
  slug,
  exhibition_name
}: InviteTemplatePageProps) {
  const sendCode = false

  return (
    <Container maxW="1480px" p={{ base: '4' }} h="100vh">
      <VStack
        w="100%"
        maxW="550px"
        h="100%"
        m="auto"
        background="gray.800"
        borderRadius={10}
        p={{ base: '4', lg: '6' }}
        spacing={sendCode ? '16' : '4'}
      >
        <Profile
          exhibition_name={exhibition_name}
          custom_text="Lamento que queira se desinscrever. Caso não exista outra alternativa para que continue
                        em meu close friends envie seu email ou telefone de inscrito e farei isso o mais rápido possível"
          slug={slug}
        />

        {!sendCode && <SendDataUnsubscribeForm />}

        {sendCode && <ConfirmationUnsubscribeForm />}
      </VStack>
    </Container>
  )
}
