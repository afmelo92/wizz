import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import {
  Flex,
  Stack,
  VStack,
  Button,
  Box,
  Avatar,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { Textarea } from 'components/Textarea'
import { api } from 'services/api'
import React, { useState } from 'react'
import { leadFormSchema } from 'utils/validations'
import { Session } from 'next-auth/client'

export type LeadTemplateProps = {
  session: Session
}

type LeadFormData = {
  exhibition_name: string
  custom_text: string
}

export default function LeadsTemplate({ session }: LeadTemplateProps) {
  const { userData } = session
  const [previewName, setpreviewName] = useState(userData.data.instagram)
  const [previewText, setpreviewText] = useState(
    'Texto exemplo de apresentação inicial'
  )
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

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
        <Flex
          w="100%"
          my="6"
          maxWidth={1480}
          mx="auto"
          px={{ base: '0', lg: '6' }}
        >
          <Sidebar />
          <Stack direction={isWideVersion ? 'row' : 'column'}>
            <VStack
              background="gray.800"
              borderRadius="10"
              spacing={8}
              direction="column"
              mx="auto"
              w="500px"
              p="8"
              h="100%"
              maxH="550px"
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
                onChange={e => setpreviewName(e.currentTarget.value)}
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
                onChange={e => setpreviewText(e.currentTarget.value)}
                maxH="160px"
              />

              <Button
                w="100%"
                background="pink.500"
                _hover={{ backgroundColor: 'pink.700' }}
                type="submit"
                isLoading={formState.isSubmitting}
                size="lg"
                p="8"
              >
                Salvar
              </Button>
            </VStack>
            <VStack
              background="gray.800"
              borderRadius="10"
              spacing={4}
              direction="column"
              mx="auto"
              w="500px"
              p="8"
            >
              <Box
                maxW={{ base: '100px', lg: '150px' }}
                border="4px"
                borderRadius="50%"
                borderColor={{ base: 'pink.500', lg: 'pink.500' }}
              >
                <Avatar
                  size="full"
                  name="Andre Melo"
                  src="https://github.com/afmelo92.png"
                />
              </Box>

              <Box>
                <Text
                  color="pink.500"
                  fontWeight="bold"
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  textAlign="center"
                >
                  Close Friends do {previewName}
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 'sm', lg: 'md' }}>
                  @{userData.data.instagram}
                </Text>
              </Box>
              <Box>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} textAlign="center">
                  {previewText}
                </Text>
              </Box>

              <Input
                name="preview_name"
                type="text"
                label="Nome"
                help="Esse nome estará em seus convites de close friends."
                placeholder="Nome"
                focusBorderColor="pink.500"
                isDisabled
              />

              <Textarea
                name="custom_text"
                label="Mensagem personalizada"
                help="Envie uma mensagem curta personalizada em seu convite de até 180
              caracteres."
                focusBorderColor="pink.500"
                placeholder="Mensagem"
                isDisabled
              />

              <Button
                background="pink.500"
                _hover={{ backgroundColor: 'pink.700' }}
                w="100%"
                size="lg"
                p="8"
                type="button"
                isDisabled
              >
                Assinar
              </Button>
            </VStack>
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}
