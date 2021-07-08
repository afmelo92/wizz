import { Container, Flex, Heading } from '@chakra-ui/react'
import { Header } from 'components/Header'

export default function StoreTemplate() {
  return (
    <>
      <Header />

      <Container h="100vh">
        <Flex
          direction="column"
          maxWidth={1480}
          w="100%"
          pb="4"
          alignItems="center"
        >
          <Heading>HELLO STORE!</Heading>
        </Flex>
      </Container>
    </>
  )
}
