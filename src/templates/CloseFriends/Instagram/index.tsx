import Link from 'next/link'
import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { useState } from 'react'

export default function InstagramTemplate() {
  const [show, setShow] = useState(false)
  const handleShowPassword = () => setShow(!show)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      background="instagram.background"
      border="2px"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      direction="column"
    >
      <Stack
        spacing={5}
        align="center"
        justify="center"
        direction={isWideVersion ? 'column' : 'column-reverse'}
      >
        <Link href="/close-friends">
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<RiArrowLeftLine />}
              colorScheme="pink"
              variant="outline"
              as="a"
              position={isWideVersion ? 'absolute' : 'initial'}
              top="10"
              left="10"
              _hover={{ background: 'pink.500', color: 'gray.50' }}
              cursor="pointer"
            >
              Voltar ao Dashboard
            </Button>
          </Stack>
        </Link>
        <Box
          w="350px"
          background="instagram.white"
          color="gray.500"
          border="1px"
          borderColor="gray.100"
          p="6"
          as="form"
        >
          <Image src="/instagram-logo.jpg" w="180px" mx="auto" pb="6" />
          <Input
            placeholder="Telefone, nome de usuário ou e-mail"
            background="instagram.background"
            mb="4"
            borderRadius="1"
            fontSize="sm"
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Senha"
              background="instagram.background"
              mb="4"
              borderRadius="1"
              fontSize="sm"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                background=""
                _hover={{}}
                onClick={handleShowPassword}
                color="gray.700"
              >
                {show ? 'Esconder' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            background="instagram.blue"
            w="100%"
            color="instagram.white"
            _hover={{}}
            mb="6"
            type="submit"
          >
            Entrar
          </Button>
        </Box>
        <Text
          color="pink.500"
          mt="12"
          maxW="300px"
          textAlign="center"
          fontSize="sm"
        >
          Fique tranquilo. O wizz não grava credenciais de acesso ao instagram
          em nenhum momento.
        </Text>
      </Stack>
    </Flex>
  )
}
