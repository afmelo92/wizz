import { Container, VStack, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'components/Form/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpFormSchema } from 'utils/validations'

type SignUpFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function SignUpForm() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleSignUpForm: SubmitHandler<SignUpFormData> = async (
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
    <Container as="form" onSubmit={handleSubmit(handleSignUpForm)} p="0">
      <VStack spacing="4">
        <Input
          name="name"
          type="text"
          label="Nome"
          placeholder="Seu nome"
          focusBorderColor="pink.500"
          {...register('name')}
          error={formState.errors.name}
        />
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
        <Input
          name="password_confirmation"
          type="password"
          label="Confirmação de senha"
          placeholder="Sua senha secreta"
          focusBorderColor="pink.500"
          {...register('password_confirmation')}
          error={formState.errors.password_confirmation}
        />

        <Button
          background="pink.500"
          _hover={{ backgroundColor: 'pink.700' }}
          w="100%"
          size="lg"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Cadastrar
        </Button>
      </VStack>
    </Container>
  )
}
