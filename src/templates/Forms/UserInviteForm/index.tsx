import { SubmitHandler, useForm } from 'react-hook-form'

import { Container, VStack, Button, useBreakpointValue } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Form/Input'
import { Textarea } from 'components/Textarea'
import { User } from 'graphql/generated/graphql'
import { Session } from 'next-auth'
import { api } from 'services/api'
import { userInviteFormSchema } from 'utils/validations'

export type UserInviteFormTemplateProps = {
  session: Session
  setpreviewName: (name: string) => void
  setpreviewText: (text: string) => void
  setpreviewPrice: (price: string) => void
}

type UserInviteFormData = {
  exhibition_name: string
  custom_text: string
  price: string
}

export default function UserInviteForm({
  session,
  setpreviewName,
  setpreviewText,
  setpreviewPrice
}: UserInviteFormTemplateProps) {
  const user = session.userData as User

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<UserInviteFormData>({
    resolver: yupResolver(userInviteFormSchema),
    defaultValues: {
      custom_text: user.invite?.custom_text || '',
      exhibition_name: user.invite?.exhibition_name || '',
      price: String(user.invite?.subscription_price || '0,00')
    }
  })

  const handleUserInviteForm: SubmitHandler<UserInviteFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()

    try {
      if (!user.verified) {
        await api.post('/subscriptions', {
          custom_text: values.custom_text,
          exhibition_name: values.exhibition_name,
          influencer: user.instagram,
          subscription_price: Number(values.price.replace(/\D/g, ''))
        })

        reset({
          custom_text: '',
          exhibition_name: '',
          price: ''
        })
        return
      }

      throw new Error(
        'You are not a verified user. Please check config section at the sidebar.'
      )
    } catch (err) {
      console.log('error:::', err)
    }
  }
  return (
    <Container>
      <VStack
        background="gray.800"
        justifyContent="space-between"
        borderRadius="10"
        mx="auto"
        w="500px"
        p="8"
        h="100%"
        as="form"
        onSubmit={handleSubmit(handleUserInviteForm)}
      >
        <VStack
          spacing={isWideVersion ? '8' : '6'}
          mb={isWideVersion ? '8' : '4'}
        >
          <Input
            name="exhibition_name"
            type="text"
            label="Nome"
            help="Esse nome estará em seus convites de close friends."
            placeholder="Nome"
            focusBorderColor="pink.500"
            {...register('exhibition_name')}
            error={formState.errors.exhibition_name}
            onChange={e => setpreviewName(e.currentTarget.value)}
          />

          <Textarea
            name="custom_text"
            label="Mensagem personalizada"
            help="Envie uma mensagem curta personalizada em seu convite de até 180
              caracteres."
            focusBorderColor="pink.500"
            placeholder="Mensagem"
            {...register('custom_text')}
            error={formState.errors.custom_text}
            onChange={e => setpreviewText(e.currentTarget.value)}
            maxH="208px"
          />

          <Input
            name="subscription_price"
            type="text"
            label="Mensalidade"
            help="Esse valor será cobrado mensalmente em reais de cara seguidor. Apenas números."
            placeholder="50,00"
            focusBorderColor="pink.500"
            {...register('price')}
            error={formState.errors.price}
            onChange={e => setpreviewPrice(e.currentTarget.value)}
          />
        </VStack>
        <Button
          w="100%"
          background="pink.500"
          _hover={{ backgroundColor: 'pink.700' }}
          type="submit"
          isLoading={formState.isSubmitting}
          size="lg"
          p="8"
        >
          Salvar
        </Button>
      </VStack>
    </Container>
  )
}
