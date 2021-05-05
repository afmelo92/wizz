import { Container, VStack, Text, Button } from '@chakra-ui/react'
import { Input } from 'components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'

type SendDataFormData = {
  subscriber_email?: string
  subscriber_telegram?: string
}

export default function SendDataUnsubscribeForm() {
  const { register, handleSubmit, formState } = useForm<SendDataFormData>({
    // resolver: yupResolver(unsubsFormSchema)
  })

  const handleSendDataForm: SubmitHandler<SendDataFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      // const response = await api.post('/unsub', {
      //   ...values,
      //   subscriber_telegram: values.subscriber_telegram.replace(/\D/g, ''),
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
    <Container as="form" onSubmit={handleSubmit(handleSendDataForm)}>
      <VStack spacing="4">
        <Input
          name="subscriber_email"
          type="email"
          label="Seu melhor e-mail"
          placeholder="exemplo@email.com"
          focusBorderColor="pink.500"
          {...register('subscriber_email')}
          error={formState.errors.subscriber_email}
        />
        <Text fontWeight="bold">ou então</Text>
        <Input
          name="subscriber_telegram"
          type="tel"
          label="Seu celular"
          placeholder="(XX) 9 9999-9999"
          focusBorderColor="pink.500"
          {...register('subscriber_telegram')}
          error={formState.errors.subscriber_telegram}
        />
        <Button
          background="purple.500"
          _hover={{ backgroundColor: 'purple.700' }}
          w="100%"
          size="lg"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Enviar código
        </Button>
      </VStack>
    </Container>
  )
}
