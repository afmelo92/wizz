import {
  Container,
  Flex,
  Stack,
  VStack,
  Button,
  useBreakpointValue
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { api } from 'services/api'
import { accountFormSchema } from 'utils/validations'
import { Input } from 'components/Form/Input'
import { FileInput } from 'components/Form/FileInput'
import { ConnectForm } from 'components/Form/ConnectForm'

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

export default function AccountForm() {
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
    console.log('ONSUBMIT ACCOUNT:::', values)

    // try {
    //   await api.post('/account', {
    //     user_email: 'andre.fabian.melo@gmail.com',
    //     ...values
    //   })

    // } catch (err) {
    //   console.log('ERROR:::', err)
    // }
  }

  return (
    <Container h="100%" w="100%" maxW="1200px" p={{ base: '2', lg: '8' }}>
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
                    type="text"
                    label="CPF"
                    help="Apenas números"
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
                    type="text"
                    label="Telefone/Whatsapp/Telegram"
                    help="Apenas números com DDD"
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
                    type="text"
                    label="CEP"
                    help="Apenas números"
                    placeholder="12345-678"
                    focusBorderColor="pink.500"
                    {...register('cep')}
                    error={formState.errors.cep}
                  />
                  <Input
                    name="address_number"
                    type="text"
                    label="Número do endereço"
                    help="Apenas números"
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
                    label="Comprovante de residência"
                    buttonLabel="Upload conta de água ou luz"
                    help="Imagem de uma conta do ultimo mês"
                    focusBorderColor="purple.500"
                    error={formState.errors.address_doc}
                  />
                </VStack>
              </Stack>
            )}
          </ConnectForm>
          <Button
            mx="2"
            mt="4"
            size="lg"
            type="submit"
            background="pink.500"
            _hover={{ backgroundColor: 'pink.700' }}
            isLoading={methods.formState.isSubmitting}
          >
            Enviar para análise
          </Button>
        </Flex>
      </FormProvider>
    </Container>
  )
}
