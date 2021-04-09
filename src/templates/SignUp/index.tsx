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
  Heading
} from '@chakra-ui/react'

export default function SignUpTemplate() {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW="450px">
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="pink.500">
            Cadastre-se
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg="gray.700" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input
                border="2px"
                type="text"
                background="gray.400"
                focusBorderColor="pink.500"
              />
            </FormControl>
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
            <FormControl id="password_confirmation">
              <FormLabel>Confirmação de senha</FormLabel>
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
              <Button
                bg={'pink.500'}
                color={'white'}
                _hover={{
                  bg: 'pink.700'
                }}
              >
                Cadastrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
