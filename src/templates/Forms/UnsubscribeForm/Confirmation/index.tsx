import { Container, VStack, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Form/Input'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from 'services/api'
import { unsubConfirmFormSchema } from 'utils/validations'

type ConfirmationUnsubscribeFormProps = {
  userIdentifier: {
    phone?: string
    email?: string
  }
}

type ConfirmationFormData = {
  unsub_code?: string
}

export default function ConfirmationUnsubscribeForm({
  userIdentifier
}: ConfirmationUnsubscribeFormProps) {
  const {
    query: { slug },
    push
  } = useRouter()
  const { register, handleSubmit, formState } = useForm<ConfirmationFormData>({
    resolver: yupResolver(unsubConfirmFormSchema)
  })

  const handleConfirmationForm: SubmitHandler<ConfirmationFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      const response = await api.post('unsubscribe', {
        ...values,
        userIdentifier,
        influencerIdentifier: slug
      })

      console.log('RESPONSE:::', response.data)

      push('/')
    } catch (err) {
      console.log('error:::', err)
    }
  }
  return (
    <Container
      h="100%"
      as="form"
      onSubmit={handleSubmit(handleConfirmationForm)}
    >
      <VStack spacing="4">
        <Input
          name="unsub_code"
          type="text"
          label="Código de cancelamento"
          placeholder="XXXXXXXXXXXXXX"
          help="Código único enviado por email e SMS"
          focusBorderColor="pink.500"
          {...register('unsub_code')}
          error={formState.errors.unsub_code}
        />
        <Button
          background="red.500"
          _hover={{ backgroundColor: 'red.700' }}
          w="100%"
          size="lg"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Desinscrever-me agora {'  '} 😔
        </Button>
      </VStack>
    </Container>
  )
}
