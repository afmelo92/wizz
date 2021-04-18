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
  subscription_price: string
}

export default function LeadsTemplate({ session }: LeadTemplateProps) {
  const { userData } = session
  const [previewName, setpreviewName] = useState(userData.data.instagram)
  const [previewPrice, setpreviewPrice] = useState(
    userData.data.invite.subscription_price
  )
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
      if (userData.data.verified) {
        await api.post('/leads', {
          ...values,
          subscription_price: values.subscription_price.replace(/\D/g, '')
        })

        reset({
          custom_text: '',
          exhibition_name: '',
          subscription_price: ''
        })
        return
      }

      throw new Error(
        'You are not a verified user. Please check config section at the sidebar.'
      )
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
                maxH="208px"
              />

              <Input
                name="subscription_price"
                type="text"
                label="Mensalidade"
                help="Esse valor será cobrado mensalmente em reais de cara seguidor. Apenas números."
                placeholder="50,00"
                focusBorderColor="pink.500"
                {...register('subscription_price')}
                error={formState.errors.subscription_price}
                onChange={e => setpreviewPrice(e.currentTarget.value)}
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
              <Box maxW="420px">
                <Text fontSize={{ base: 'xs', lg: 'sm' }} textAlign="center">
                  {previewText}
                </Text>
              </Box>

              <Input
                name="subscriber_instagram_preview"
                type="text"
                label="Seu Instagram"
                help="Apenas o nome sem @"
                placeholder="Nome do seguidor"
                focusBorderColor="pink.500"
                isDisabled
              />

              <Input
                name="subscriber_email_preview"
                type="email"
                label="Seu melhor e-mail"
                placeholder="E-mail do seguidor"
                focusBorderColor="pink.500"
                isDisabled
              />
              <Input
                name="subscriber_telegram_preview"
                type="tel"
                max="11"
                label="Seu telegram"
                placeholder="Telefone do seguidor"
                focusBorderColor="pink.500"
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
                Assinar -
                {' ' +
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(previewPrice.replace(/\D/g, '') / 100)}
              </Button>
            </VStack>
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}
