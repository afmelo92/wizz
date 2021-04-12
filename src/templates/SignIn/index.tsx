import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  VStack,
  Divider
} from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { FaGoogle } from 'react-icons/fa'

export default function SignInTemplate() {
  const routes = useRouter()
  const { push, query } = routes
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW="450px">
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="pink.500">
            Login
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg="gray.700" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                border="2px"
                type="email"
                background="gray.400"
                focusBorderColor="pink.500"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                border="2px"
                type="password"
                background="gray.400"
                focusBorderColor="pink.500"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox colorScheme="pink">Lembrar</Checkbox>
                <Link color={'gray.50'}>Esqueceu a senha?</Link>
              </Stack>
              <VStack spacing={10}>
                <Button
                  bg={'pink.500'}
                  color={'white'}
                  _hover={{
                    bg: 'pink.700'
                  }}
                  width="100%"
                >
                  Entrar
                </Button>
                <Divider />
                <Button
                  width="100%"
                  background="#4285F4"
                  leftIcon={<FaGoogle />}
                  _hover={{ background: '#1a3562' }}
                  onClick={() =>
                    signIn('google', {
                      redirect: false,
                      callbackUrl: `${window.location.origin}${
                        query?.callbackUrl || ''
                      }`
                    })
                  }
                >
                  Login com Google
                </Button>
              </VStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
