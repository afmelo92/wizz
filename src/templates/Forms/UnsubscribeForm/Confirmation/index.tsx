import { Container, VStack, Button } from '@chakra-ui/react'
import { Input } from 'components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'

type ConfirmationFormData = {
  unsub_code?: string
  subscriber_phone?: string
}

export default function ConfirmationUnsubscribeForm() {
  const { register, handleSubmit, formState } = useForm<ConfirmationFormData>({
    // resolver: yupResolver(unsubsFormSchema)
  })

  const handleConfirmationForm: SubmitHandler<ConfirmationFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      // const response = await api.post('/unsub', {
      //   ...values,
      //   subscriber_phone: values.subscriber_phone.replace(/\D/g, ''),
      //   slug
      // })
      // const { sessionId } = response.data
      // const stripe = await getStripeJS()
      // await stripe.redirectToCheckout({ sessionId })
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
          Desinscrever agora {'  '} 😔
        </Button>
      </VStack>
    </Container>
  )
}
