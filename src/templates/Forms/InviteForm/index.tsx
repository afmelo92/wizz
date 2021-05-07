import { VStack, Container } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubscribeButton } from 'components/SubscribeButton'
import { api } from 'services/api'
import { inviteFormSchema } from 'utils/validations'
import { getStripeJS } from 'services/stripe-js'
import { Input } from 'components/Form/Input'

type InviteFormProps = {
  subscription_price: string
  slug: string
}

type InviteFormData = {
  subscriber_instagram: string
  subscriber_email: string
  subscriber_phone: string
}

export default function InviteForm({
  slug,
  subscription_price
}: InviteFormProps) {
  const { register, handleSubmit, formState } = useForm<InviteFormData>({
    resolver: yupResolver(inviteFormSchema)
  })

  const handleInviteForm: SubmitHandler<InviteFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      const response = await api.post('/subscribe', {
        ...values,
        subscriber_phone: values.subscriber_phone.replace(/\D/g, ''),
        slug
      })

      const { sessionId } = response.data

      const stripe = await getStripeJS()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      console.log('error:::', err)
    }
  }
  return (
    <Container as="form" onSubmit={handleSubmit(handleInviteForm)}>
      <VStack spacing="4">
        <Input
          name="subscriber_instagram"
          type="text"
          label="Seu Instagram"
          help="Apenas o nome sem @"
          placeholder="Seu nome no instagram"
          focusBorderColor="pink.500"
          {...register('subscriber_instagram')}
          error={formState.errors.subscriber_instagram}
        />
        <Input
          name="subscriber_email"
          type="email"
          label="Seu melhor e-mail"
          placeholder="exemplo@email.com"
          focusBorderColor="pink.500"
          {...register('subscriber_email')}
          error={formState.errors.subscriber_email}
        />
        <Input
          name="subscriber_phone"
          type="text"
          label="Seu telegram"
          placeholder="(XX) 9 9999-9999"
          focusBorderColor="pink.500"
          {...register('subscriber_phone')}
          error={formState.errors.subscriber_phone}
        />

        <SubscribeButton
          background="pink.500"
          _hover={{ backgroundColor: 'pink.700' }}
          w="100%"
          size="lg"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Assinar - {subscription_price}
        </SubscribeButton>
      </VStack>
    </Container>
  )
}
