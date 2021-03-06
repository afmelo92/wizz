import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'

import {
  Container,
  Flex,
  Stack,
  VStack,
  Button,
  useBreakpointValue
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { ConnectForm } from 'components/Form/ConnectForm'
import { FileInput } from 'components/Form/FileInput'
import { Input } from 'components/Form/Input'
import { useS3Upload } from 'hooks/use-s3-upload'
import { useSession } from 'next-auth/client'
import { api } from 'services/api'
import { accountFormSchema } from 'utils/validations'

export type AccountFormProps = {
  setSendForm: (value: boolean) => void
}

export type AccountFormData = {
  instagram_print: FileList | string
  personal_doc: FileList | string
  address_doc: FileList | string
  firstname: string
  lastname: string
  cpf: string
  email: string
  phone: string
  birthdate: string
  cep: string
  address_number: string
}

export default function AccountForm({ setSendForm }: AccountFormProps) {
  const { uploadToS3 } = useS3Upload()
  const [session] = useSession()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const methods = useForm<AccountFormData>({
    resolver: yupResolver(accountFormSchema)
  })

  const handleForm: SubmitHandler<AccountFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()

    try {
      Object.entries(values).forEach(
        async (keyValue: [string, string | FileList]) => {
          if (
            keyValue[0] === 'instagram_print' ||
            keyValue[0] === 'personal_doc' ||
            keyValue[0] === 'address_doc'
          ) {
            if (keyValue[1][0]) {
              await uploadToS3(
                keyValue[1][0] as File,
                keyValue[0],
                session.user.email
              )
            }
          }
        }
      )

      await api.post('/account', {
        user_email: session.user.email,
        ...values
      })

      setSendForm(true)
    } catch (err) {
      console.log('ERROR:::', err)
    }
  }

  return (
    <Container h="100%" w="100%" maxW="1200px" p="0" pb="4">
      <FormProvider {...methods}>
        <Flex
          direction="column"
          as="form"
          onSubmit={methods.handleSubmit(handleForm)}
        >
          <ConnectForm>
            {({ register, formState }) => (
              <Stack direction={isWideVersion ? 'row' : 'column'}>
                <VStack mx="auto" w="100%" px="2">
                  <Input
                    name="firstname"
                    type="text"
                    label="Nome"
                    help="Seu primeiro nome"
                    placeholder="Seu nome"
                    focusBorderColor="pink.500"
                    {...register('firstname')}
                    error={formState.errors.firstname}
                  />
                  <Input
                    name="lastname"
                    type="text"
                    label="Sobrenome"
                    help="Seu sobrenome"
                    placeholder="Seu sobrenome"
                    focusBorderColor="pink.500"
                    {...register('lastname')}
                    error={formState.errors.lastname}
                  />
                  <Input
                    name="cpf"
                    type="tel"
                    label="CPF"
                    help="Apenas n??meros"
                    placeholder="555.555.555-44"
                    focusBorderColor="pink.500"
                    {...register('cpf')}
                    error={formState.errors.cpf}
                  />
                  <Input
                    name="email"
                    type="email"
                    label="E-mail"
                    help="Seu melhor e-mail"
                    placeholder="melhor-email@email.com"
                    focusBorderColor="pink.500"
                    {...register('email')}
                    error={formState.errors.email}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Telefone/Whatsapp/Telegram"
                    help="Apenas n??meros com DDD"
                    placeholder="(11) 9 9999-9999"
                    focusBorderColor="pink.500"
                    {...register('phone')}
                    error={formState.errors.phone}
                  />
                  <Input
                    name="birthdate"
                    type="date"
                    label="Data de nascimento"
                    placeholder="12/12/1900"
                    focusBorderColor="pink.500"
                    {...register('birthdate')}
                    error={formState.errors.birthdate}
                  />
                </VStack>

                <VStack mx="auto" w="100%" px="2">
                  <Input
                    name="cep"
                    type="tel"
                    label="CEP"
                    help="Apenas n??meros"
                    placeholder="12345-678"
                    focusBorderColor="pink.500"
                    {...register('cep')}
                    error={formState.errors.cep}
                  />
                  <Input
                    name="address_number"
                    type="tel"
                    label="N??mero do endere??o"
                    help="Apenas n??meros"
                    placeholder="999"
                    focusBorderColor="pink.500"
                    {...register('address_number')}
                    error={formState.errors.address_number}
                  />
                  <FileInput
                    name="instagram_print"
                    label="Print Instagram"
                    buttonLabel="Upload print instagram"
                    help="Tire um print da tela do instagram @afmelo.sh"
                    focusBorderColor="purple.500"
                    error={formState.errors.instagram_print}
                  />
                  <FileInput
                    name="personal_doc"
                    label="Documento pessoal"
                    buttonLabel="Upload CPF ou RG"
                    help="Imagem do documento pessoal do responsavel"
                    focusBorderColor="purple.500"
                    error={formState.errors.personal_doc}
                  />
                  <FileInput
                    name="address_doc"
                    label="Comprovante de resid??ncia"
                    buttonLabel="Upload conta de ??gua ou luz"
                    help="Imagem de uma conta do ultimo m??s"
                    focusBorderColor="purple.500"
                    error={formState.errors.address_doc}
                  />
                </VStack>
              </Stack>
            )}
          </ConnectForm>
          <Button
            w="100%"
            maxW="600px"
            mx="auto"
            mt="4"
            p="8"
            size="lg"
            type="submit"
            background="pink.500"
            _hover={{ backgroundColor: 'pink.700' }}
            isLoading={methods.formState.isSubmitting}
          >
            Enviar para an??lise
          </Button>
        </Flex>
      </FormProvider>
    </Container>
  )
}
