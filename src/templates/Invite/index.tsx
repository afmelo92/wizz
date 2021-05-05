import Link from 'next/link'
import { Container, VStack, Text } from '@chakra-ui/react'
import InviteForm from 'templates/Forms/InviteForm'
import Profile from 'templates/Invite/Profile'

export type InviteTemplatePageProps = {
  slug: string
  exhibition_name: string
  custom_text?: string
  subscription_price: string
}

export default function InviteTemplate({
  slug,
  custom_text = '',
  exhibition_name,
  subscription_price
}: InviteTemplatePageProps) {
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
        spacing="4"
      >
        <Profile
          exhibition_name={exhibition_name}
          custom_text={custom_text}
          slug={slug}
        />

        <InviteForm slug={slug} subscription_price={subscription_price} />

        <Link href={`/invite/${slug}/unsubscribe`}>
          <Text
            as="a"
            fontWeight="bold"
            _hover={{ color: 'red.500' }}
            transition="ease 0.2s"
          >
            Quer se desinscrever? Clique aqui!
          </Text>
        </Link>
      </VStack>
    </Container>
  )
}
