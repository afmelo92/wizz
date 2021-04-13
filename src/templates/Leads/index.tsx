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
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type LeadFormData = {
  exhibition_name: string
  custom_text: string
}

const leadFormSchema = yup.object().shape({
  exhibition_name: yup.string().required('Nome de exibição obrigatório'),
  custom_text: yup.string().max(180, 'No máximo 180 caracteres')
})

export default function LeadsTemplate() {
  const { register, handleSubmit, formState } = useForm<LeadFormData>({
    resolver: yupResolver(leadFormSchema)
  })

  console.log(formState.errors)

  const handleSignIn: SubmitHandler<LeadFormData> = values => {
    console.log(values)
  }

  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <VStack
            background="gray.800"
            borderRadius="10"
            spacing={8}
            direction="column"
            mx="auto"
            w="500px"
            p="8"
          >
            <FormControl id="exhibition_name">
              <FormLabel>Nome de exibição</FormLabel>
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
              <FormLabel>Mensagem personalizada</FormLabel>
              <Textarea focusBorderColor="pink.500" placeholder="Mensagem" />
              <FormHelperText color="gray.200">
                Envie uma mensagem curta personalizada em seu convite de até 180
                caracteres.
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
