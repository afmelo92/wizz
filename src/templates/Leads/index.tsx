import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { Flex, VStack, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { Textarea } from 'components/Textarea'
import { api } from 'services/api'
import React from 'react'
import { leadFormSchema } from 'utils/validations'

type LeadFormData = {
  exhibition_name: string
  custom_text: string
}

export default function LeadsTemplate() {
  const { register, handleSubmit, formState, reset } = useForm<LeadFormData>({
    resolver: yupResolver(leadFormSchema)
  })

  console.log(formState.errors)

  const handleLeadForm: SubmitHandler<LeadFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()

    try {
      await api.post('/leads', values)

      reset({ custom_text: '', exhibition_name: '' })
    } catch (err) {
      console.log('error:::', err)
    }
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
            onSubmit={handleSubmit(handleLeadForm)}
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
