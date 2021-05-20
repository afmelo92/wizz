import { Container, VStack, Button, useBreakpointValue } from '@chakra-ui/react'
import { Textarea } from 'components/Textarea'
import { Input } from 'components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userInviteFormSchema } from 'utils/validations'
import { api } from 'services/api'
import { Session } from 'next-auth/client'

export type UserInviteFormTemplateProps = {
  session: Session
  setpreviewName: (name: string) => void
  setpreviewText: (text: string) => void
  setpreviewPrice: (price: string) => void
}

type UserInviteFormData = {
  exhibition_name: string
  custom_text: string
  subscription_price: string
}

export default function UserInviteForm({
  session,
  setpreviewName,
  setpreviewText,
  setpreviewPrice
}: UserInviteFormTemplateProps) {
  const { userData } = session

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
      custom_text: userData.data.invite?.custom_text || '',
      exhibition_name: userData.data.invite?.exhibition_name || '',
      subscription_price: userData.data.invite?.subscription_price || 0
    }
  })

  const handleUserInviteForm: SubmitHandler<UserInviteFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()

    try {
      if (userData.data.verified) {
        await api.post('/subscriptions', {
          ...values,
          influencer: userData.data.instagram,
          subscription_price: Number(
            values.subscription_price.replace(/\D/g, '')
          )
        })

        reset({
          custom_text: '',
          exhibition_name: '',
          subscription_price: ''
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
            {...register('subscription_price')}
            error={formState.errors.subscription_price}
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
