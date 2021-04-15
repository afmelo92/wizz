import {
  Container,
  Flex,
  VStack,
  Avatar,
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { api } from 'services/api'
import { useRouter } from 'next/router'

export type InviteTemplatePageProps = {
  slug: string
  exhibition_name: string
  custom_text: string
}

type InviteFormData = {
  subscriber_instagram: string
  subscriber_email: string
  subscriber_telegram: string
}

const inviteFormSchema = yup.object().shape({
  subscriber_instagram: yup.string().required('Nome de exibição obrigatório'),
  subscriber_email: yup
    .string()
    .email('Email inválido')
    .required('Email obrigatório'),
  subscriber_telegram: yup
    .string()
    .min(11, 'O formato deve ser 11 9 9999 9999')
    .max(11, 'O formato deve ser 11 9 9999 9999')
    .required('Telegram obrigatório')
})

export default function InviteTemplate({
  slug,
  custom_text,
  exhibition_name
}: InviteTemplatePageProps) {
  const router = useRouter()
  const { register, handleSubmit, formState, reset } = useForm<InviteFormData>({
    resolver: yupResolver(inviteFormSchema)
  })

  console.log(formState.errors)

  const handleInviteForm: SubmitHandler<InviteFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log(values)

    try {
      await api.post('/subscribers', { ...values, slug })

      reset({
        subscriber_instagram: '',
        subscriber_email: '',
        subscriber_telegram: ''
      })

      router.push(`https://www.instagram.com/${slug}/`)
    } catch (err) {
      console.log('error:::', err)
    }
  }
  return (
    <Container maxW="1480px">
      <Flex
        w="100%"
        maxWidth={1480}
        h="100vh"
        p={{ base: '2', lg: '6' }}
        align="center"
        justifyContent="center"
      >
        <VStack
          w="550px"
          h="100%"
          d="flex"
          background="gray.800"
          borderRadius={10}
          alignItems="center"
          justifyContent="space-between"
          p={{ base: '4', lg: '12' }}
          as="form"
          onSubmit={handleSubmit(handleInviteForm)}
        >
          <Box
            maxW={{ base: '150px', lg: '250px' }}
            border={{ base: '4px', lg: '8px' }}
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
              fontSize={{ base: '2xl', lg: '4xl' }}
              textAlign="center"
            >
              Close Friends do {exhibition_name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xl">@{slug}</Text>
          </Box>
          <Box>
            <Text fontSize={{ base: 'xs', lg: 'md' }} textAlign="center">
              {custom_text}
            </Text>
          </Box>

          <Input
            name="subscriber_instagram"
            type="text"
            label="Seu Instagram"
            help="Apenas o nome sem @"
            placeholder="Seu nome no instagram"
            focusBorderColor="pink.500"
            {...register('subscriber_instagram')}
            error={formState.errors.subscriber_instagram}
          />
          <Input
            name="subscriber_email"
            type="email"
            label="Seu melhor e-mail"
            placeholder="exemplo@email.com"
            focusBorderColor="pink.500"
            {...register('subscriber_email')}
            error={formState.errors.subscriber_email}
          />
          <Input
            name="subscriber_telegram"
            type="tel"
            max="11"
            label="Seu telegram"
            placeholder="(XX) 9 9999-9999"
            focusBorderColor="pink.500"
            {...register('subscriber_telegram')}
            error={formState.errors.subscriber_telegram}
          />

          <Button
            background="pink.500"
            _hover={{ backgroundColor: 'pink.700' }}
            w="100%"
            size="lg"
            p="8"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Assinar
          </Button>
        </VStack>
      </Flex>
    </Container>
  )
}
