import { Container, Button, Heading, VStack, Divider } from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { FaGoogle } from 'react-icons/fa'
import SignInForm from 'templates/Forms/SignInForm'

export default function SignInTemplate() {
  const routes = useRouter()
  const { query } = routes

  const handleGoogleLogin = async () => {
    await signIn('google', {
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    })
  }

  return (
    <Container h="100vh">
      <VStack h="100%" spacing="4" justifyContent="center">
        <Heading fontSize={'4xl'} color="pink.500">
          Login
        </Heading>

        <VStack
          spacing={4}
          background="gray.800"
          p="12"
          borderRadius="10"
          w="100%"
          maxW="400px"
        >
          <SignInForm />

          <Divider />
          <Button
            width="100%"
            background="#4285F4"
            leftIcon={<FaGoogle />}
            _hover={{ background: '#1a3562' }}
            onClick={handleGoogleLogin}
          >
            Login com Google
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}
