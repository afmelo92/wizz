import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import {
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  HStack,
  PinInput,
  PinInputField,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from '@chakra-ui/react'

export default function AccountTemplate() {
  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <Flex direction="column">
            <HStack mb="10" mx="auto" spacing={10}>
              <VStack
                maxW="450px"
                w="100%"
                mx="auto"
                spacing={4}
                background="gray.800"
                p="6"
              >
                <FormControl id="name">
                  <FormLabel>Nome</FormLabel>
                  <Input focusBorderColor="pink.500" type="text" />
                </FormControl>
                <FormControl id="last_name">
                  <FormLabel>Sobrenome</FormLabel>
                  <Input focusBorderColor="pink.500" type="text" />
                </FormControl>
                <FormControl id="cpf">
                  <FormLabel>CPF</FormLabel>
                  <HStack>
                    <PinInput focusBorderColor="pink.500" size="md">
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  <FormHelperText>XX 9 9999-9999</FormHelperText>
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Melhor e-mail</FormLabel>
                  <Input focusBorderColor="pink.500" type="email" />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Telefone / WhatsApp</FormLabel>
                  <HStack>
                    <PinInput focusBorderColor="pink.500" size="md">
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>
                <FormControl id="birth">
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input focusBorderColor="pink.500" type="date" />
                </FormControl>
              </VStack>
              <VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  mx="auto"
                  spacing={4}
                  background="gray.800"
                  p="6"
                >
                  <FormControl id="cep">
                    <FormLabel>CEP</FormLabel>
                    <HStack>
                      <PinInput focusBorderColor="pink.500" size="md">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                  </FormControl>
                  <FormControl id="number">
                    <FormLabel>Número da casa</FormLabel>
                    <NumberInput focusBorderColor="pink.500" min={0}>
                      <NumberInputField />
                      <NumberInputStepper background="pink.500">
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  mx="auto"
                  spacing={4}
                  background="gray.800"
                  p="6"
                >
                  <FormControl id="name">
                    <FormLabel>Documento pessoal</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  mx="auto"
                  spacing={4}
                  background="gray.800"
                  p="6"
                >
                  <FormControl id="name">
                    <FormLabel>Comprovante de endereço</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  mx="auto"
                  spacing={4}
                  background="gray.800"
                  p="6"
                >
                  <FormControl id="name">
                    <FormLabel>Print do seu instagram</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
              </VStack>
            </HStack>
            <HStack mx="auto">
              <Button
                w="300px"
                background="pink.500"
                _hover={{ backgroundColor: 'pink.700' }}
              >
                Salvar
              </Button>
              <Button
                w="300px"
                background=""
                border="2px"
                borderColor="pink.500"
                variant="outline"
                color="pink.500"
                _hover={{ backgroundColor: 'pink.500', color: 'gray.50' }}
              >
                Enviar para análise
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
