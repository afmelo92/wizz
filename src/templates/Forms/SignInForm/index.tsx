import { Container, VStack, Button } from '@chakra-ui/react'
import { Input } from 'components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInFormSchema } from 'utils/validations'
// import { api } from 'services/api'

type SignInFormData = {
  email: string
  password: string
}

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignInForm: SubmitHandler<SignInFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()

    try {
      console.log(values)
      // const response = await api.post('/signin', {
      //   ...values
      // })
    } catch (err) {
      console.log('error:::', err)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(handleSignInForm)} p="0">
      <VStack spacing="4">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="seu-email@exemplo.com"
          focusBorderColor="pink.500"
          {...register('email')}
          error={formState.errors.email}
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="Sua senha secreta"
          focusBorderColor="pink.500"
          {...register('password')}
          error={formState.errors.password}
        />

        <Button
          background="pink.500"
          _hover={{ backgroundColor: 'pink.700' }}
          w="100%"
          size="lg"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </VStack>
    </Container>
  )
}
