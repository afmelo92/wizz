import { Container, VStack } from '@chakra-ui/react'
import Profile from 'templates/Invite/Profile'
import SendDataUnsubscribeForm from 'templates/Forms/UnsubscribeForm/SendData'
import ConfirmationUnsubscribeForm from 'templates/Forms/UnsubscribeForm/Confirmation'
import { useState } from 'react'
import {
  unsubConfirmationMessage,
  unsubFirstMessage
} from 'utils/defaultMessages'

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
  const [sendCode, setSendCode] = useState(false)

  return (
    <Container maxW="1480px" p={{ base: '4', lg: '24' }} h="100vh">
      <VStack
        w="100%"
        maxW="550px"
        h="100%"
        m="auto"
        background="gray.800"
        borderRadius={10}
        px={{ base: '4', lg: '6' }}
        py={{ base: '14', lg: '30' }}
        spacing={sendCode ? '16' : '4'}
      >
        <Profile
          exhibition_name={exhibition_name}
          custom_text={!sendCode ? unsubFirstMessage : unsubConfirmationMessage}
          slug={slug}
        />

        {!sendCode && <SendDataUnsubscribeForm setSendCode={setSendCode} />}

        {sendCode && <ConfirmationUnsubscribeForm />}
      </VStack>
    </Container>
  )
}
