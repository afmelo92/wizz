import { Container, VStack, Button } from '@chakra-ui/react'
import { Input } from 'components/Form/Input'
import Profile from 'templates/Invite/Profile'

type UserInvitePreviewProps = {
  userData: {
    data: {
      instagram: string
    }
  }
  previewName: string
  previewText: string
  previewPrice: string
}

export default function UserInvitePreview({
  userData,
  previewName,
  previewText,
  previewPrice
}: UserInvitePreviewProps) {
  return (
    <Container>
      <VStack
        background="gray.800"
        borderRadius="10"
        spacing={4}
        direction="column"
        mx="auto"
        w="500px"
        p="8"
      >
        <Profile
          exhibition_name={previewName}
          slug={userData.data.instagram}
          custom_text={previewText}
          preview
        />

        <Input
          name="subscriber_instagram_preview"
          type="text"
          label="Seu Instagram"
          help="Apenas o nome sem @"
          placeholder="Nome do seguidor"
          focusBorderColor="pink.500"
          isDisabled
        />

        <Input
          name="subscriber_email_preview"
          type="email"
          label="Seu melhor e-mail"
          placeholder="E-mail do seguidor"
          focusBorderColor="pink.500"
          isDisabled
        />
        <Input
          name="subscriber_telegram_preview"
          type="tel"
          max="11"
          label="Seu telegram"
          placeholder="Telefone do seguidor"
          focusBorderColor="pink.500"
          isDisabled
        />

        <Button
          background="pink.500"
          _hover={{ backgroundColor: 'pink.700' }}
          w="100%"
          size="lg"
          p="8"
          type="button"
          isDisabled
        >
          Assinar -
          {' ' +
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(previewPrice.replace(/\D/g, '')) / 100)}
        </Button>
      </VStack>
    </Container>
  )
}
