import { Container, VStack, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Form/Input'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from 'services/api'
import { emailSchema, phoneSchema } from 'utils/validations'

type SendDataFormData = {
  email?: string
  phone?: string
}

type SendDataUnsubscribeFormProps = {
  setSendCode: (value: boolean) => void
}

export default function SendDataUnsubscribeForm({
  setSendCode
}: SendDataUnsubscribeFormProps) {
  const [sendMode, setSendMode] = useState(true)

  const { register, handleSubmit, formState } = useForm<SendDataFormData>({
    resolver: sendMode ? yupResolver(emailSchema) : yupResolver(phoneSchema)
  })

  const handleSendDataForm: SubmitHandler<SendDataFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      const response = await api.post('unsubscribe', {
        ...values
      })

      console.log('RESPONSE:::', response.data)

      setSendCode(true)
    } catch (err) {
      console.log('error:::', err)
    }
  }
  return (
    <Container as="form" onSubmit={handleSubmit(handleSendDataForm)}>
      <VStack spacing="4">
        {sendMode && (
          <VStack w="100%">
            <Input
              name="email"
              type="text"
              label="Seu e-mail de cadastro"
              placeholder="exemplo@email.com"
              focusBorderColor="pink.500"
              {...register('email')}
              error={formState.errors.email}
            />
            <Button
              background="green.500"
              _hover={{ backgroundColor: 'green.700' }}
              w="100%"
              size="md"
              onClick={() => setSendMode(false)}
            >
              Quero validar com meu celular
            </Button>
          </VStack>
        )}
        {!sendMode && (
          <VStack w="100%">
            <Input
              name="phone"
              type="tel"
              label="Seu celular"
              placeholder="(XX) 9 9999-9999"
              focusBorderColor="pink.500"
              {...register('phone')}
              error={formState.errors.phone}
            />
            <Button
              background="green.500"
              _hover={{ backgroundColor: 'green.700' }}
              w="100%"
              size="md"
              onClick={() => setSendMode(true)}
            >
              Quero validar com meu e-mail
            </Button>
          </VStack>
        )}
        <Button
          background="purple.500"
          _hover={{ backgroundColor: 'purple.700' }}
          w="100%"
          p="10"
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
