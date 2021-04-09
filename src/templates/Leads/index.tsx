import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  VStack,
  Button,
  Textarea
} from '@chakra-ui/react'

export default function LeadsTemplate() {
  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <VStack
            background="gray.700"
            borderRadius="10"
            spacing={8}
            direction="column"
            mx="auto"
            w="500px"
            p="8"
          >
            <FormControl id="exhibition_name">
              <FormLabel color="pink.400">Nome de exibição</FormLabel>
              <Input
                type="text"
                placeholder="Nome"
                focusBorderColor="pink.500"
              />
              <FormHelperText color="gray.200">
                Esse nome estará em seus convites de close friends.
              </FormHelperText>
            </FormControl>
            <FormControl id="custom_text">
              <FormLabel color="pink.400">Mensagem personalizada</FormLabel>
              <Textarea focusBorderColor="pink.500" placeholder="Mensagem" />
              <FormHelperText color="gray.200">
                Envie uma mensagem curta personalizada em seu convite.
              </FormHelperText>
            </FormControl>
            <Button
              w="100%"
              background="pink.500"
              _hover={{ backgroundColor: 'pink.700' }}
            >
              Salvar
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
