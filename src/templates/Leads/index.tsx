import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { Flex, VStack, Button } from '@chakra-ui/react'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { Textarea } from 'components/Textarea'

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
            as="form"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input
              name="exhibition_name"
              type="text"
              label="Nome"
              help="Esse nome estará em seus convites de close friends."
              placeholder="Nome"
              focusBorderColor="pink.500"
              {...register('exhibition_name')}
              error={formState.errors.exhibition_name}
            />

            <Textarea
              name="custom_text"
              label="Mensagem personalizada"
              help="Envie uma mensagem curta personalizada em seu convite de até 180
              caracteres."
              focusBorderColor="pink.500"
              placeholder="Mensagem"
              {...register('custom_text')}
              error={formState.errors.custom_text}
            />

            <Button
              w="100%"
              background="pink.500"
              _hover={{ backgroundColor: 'pink.700' }}
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
