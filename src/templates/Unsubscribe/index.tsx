import { Container, Flex, VStack, Avatar, Box, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { SubscribeButton } from 'components/SubscribeButton'
import { api } from 'services/api'
import { inviteFormSchema } from 'utils/validations'
import { getStripeJS } from 'services/stripe-js'
import { useEffect, useState } from 'react'

export type InviteTemplatePageProps = {
  slug: string
  exhibition_name: string
  custom_text: string
  subscription_price: string
}

type InviteFormData = {
  subscriber_email: string
  subscriber_telegram: string
  unsub_code: string
}

export default function UnsubscribeTemplate({
  slug,
  custom_text,
  exhibition_name
}: InviteTemplatePageProps) {
  const { register, handleSubmit, formState } = useForm<InviteFormData>({
    // resolver: yupResolver(unsubsFormSchema)
  })

  const [sendCode, setSendCode] = useState(false)

  console.log(formState.errors)

  const handleInviteForm: SubmitHandler<InviteFormData> = async (
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

  useEffect(() => {
    setSendCode(!sendCode)
  }, [sendCode])
  return (
    <Container maxW="1480px" position="relative">
      <Flex
        w="100%"
        maxWidth={1480}
        h="100vh"
        p={{ base: '2', lg: '6' }}
        align="center"
        justifyContent="center"
      >
        <VStack
          w="550px"
          h="100%"
          d="flex"
          background="gray.800"
          borderRadius={10}
          alignItems="center"
          justifyContent="space-between"
          p={{ base: '4', lg: '12' }}
          as="form"
          onSubmit={handleSubmit(handleInviteForm)}
        >
          <Box
            maxW={{ base: '150px', lg: '250px' }}
            border={{ base: '4px', lg: '8px' }}
            borderRadius="50%"
            borderColor={{ base: 'pink.500', lg: 'pink.500' }}
          >
            <Avatar
              size="full"
              name="Andre Melo"
              src="https://github.com/afmelo92.png"
            />
          </Box>
          <Box>
            <Text
              color="pink.500"
              fontWeight="bold"
              fontSize={{ base: '2xl', lg: '4xl' }}
              textAlign="center"
            >
              Close Friends do {exhibition_name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xl">@{slug}</Text>
          </Box>
          <Box>
            <Text fontSize={{ base: 'xs', lg: 'md' }} textAlign="center">
              {custom_text}
            </Text>
          </Box>

          {!sendCode && (
            <>
              <Input
                name="subscriber_email"
                type="email"
                label="Seu melhor e-mail"
                placeholder="exemplo@email.com"
                focusBorderColor="pink.500"
                {...register('subscriber_email')}
                error={formState.errors.subscriber_email}
              />
              <Text fontWeight="bold">Ou</Text>
              <Input
                name="subscriber_telegram"
                type="tel"
                max="11"
                label="Seu celular"
                placeholder="(XX) 9 9999-9999"
                focusBorderColor="pink.500"
                {...register('subscriber_telegram')}
                error={formState.errors.subscriber_telegram}
              />
              <SubscribeButton
                background="purple.500"
                _hover={{ backgroundColor: 'purple.700' }}
                w="100%"
                size="lg"
                p="8"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Enviar código
              </SubscribeButton>
            </>
          )}
          {sendCode && (
            <>
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
              <SubscribeButton
                background="red.500"
                _hover={{ backgroundColor: 'red.700' }}
                w="100%"
                size="lg"
                p="8"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Desinscrever agora {'  '} 😔
              </SubscribeButton>
            </>
          )}
        </VStack>
      </Flex>
    </Container>
  )
}
