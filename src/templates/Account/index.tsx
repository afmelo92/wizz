import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import {
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
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
        <Flex w="100%" maxWidth={1480} mx="auto" px={{ base: '2', lg: '6' }}>
          <Sidebar />
          {/** BOXES + BUTTONS */}
          <Flex width="100%" direction="column">
            {/** BOXES */}
            <Stack
              width="100%"
              direction={{ base: 'column', lg: 'row' }}
              alignItems="center"
              justifyContent="space-around"
              spacing={{ base: 6, lg: 0 }}
            >
              {/** BOX 1 */}
              <Stack
                direction="column"
                p="6"
                background="gray.800"
                borderRadius="10"
                spacing="6"
                maxWidth="450px"
                w="100%"
                h="100%"
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
              </Stack>
              {/** BOX 2 */}
              <VStack
                direction="column"
                spacing={4}
                maxWidth="450px"
                w="100%"
                mx="auto"
              >
                <VStack
                  maxW="450px"
                  w="100%"
                  spacing={4}
                  background="gray.800"
                  p="6"
                  direction="column"
                  borderRadius="10"
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
                  spacing={4}
                  background="gray.800"
                  p="6"
                  borderRadius="10"
                >
                  <FormControl id="name">
                    <FormLabel>Documento pessoal</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  spacing={4}
                  background="gray.800"
                  p="6"
                  borderRadius="10"
                >
                  <FormControl id="name">
                    <FormLabel>Comprovante de endereço</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
                <VStack
                  maxW="450px"
                  w="100%"
                  spacing={4}
                  background="gray.800"
                  p="6"
                  borderRadius="10"
                >
                  <FormControl id="name">
                    <FormLabel>Print do seu instagram</FormLabel>
                    <Input focusBorderColor="pink.500" type="file" />
                  </FormControl>
                </VStack>
              </VStack>
            </Stack>
            {/**BUTTONS */}
            <Stack
              width="100%"
              maxW="700px"
              mx="auto"
              alignItems="center"
              direction={{ base: 'column', lg: 'row' }}
              my="4"
            >
              <Button
                maxW="450px"
                width="100%"
                size="lg"
                background="pink.500"
                _hover={{ backgroundColor: 'pink.700' }}
              >
                Salvar
              </Button>
              <Button
                maxW="450px"
                width="100%"
                size="lg"
                background=""
                border="2px"
                borderColor="pink.500"
                variant="outline"
                color="pink.500"
                _hover={{ backgroundColor: 'pink.500', color: 'gray.50' }}
              >
                Enviar para análise
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
