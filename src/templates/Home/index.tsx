import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'
import { Header } from 'components/Header'

const HomeTemplate = () => {
  return (
    <Container maxW={1480}>
      <Header />
      <Container maxW={720}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Faça dinheiro com <br />
            <Text as={'span'} color={'pink.500'}>
              sua adiência
            </Text>
          </Heading>
          <Text color={'gray.50'} fontSize="2xl">
            Monetize seu conteúdo fidelizando seus clientes com nossas
            ferramentas: Gestor de close friends, grupo de Telegram, e-mail
            marketing, sms e muito mais!
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'green'}
              bg={'pink.500'}
              rounded={'full'}
              px={10}
              py={8}
              mb={2}
              _hover={{
                bg: 'pink.700'
              }}
              fontSize="xl"
            >
              Comece agora!
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'lg'}>
              Saiba mais
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Container>
  )
}

export default HomeTemplate
