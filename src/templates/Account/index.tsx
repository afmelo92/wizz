import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import InfoBox from 'components/InfoBox'
import AccountForm from 'templates/Forms/AccountForm'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useS3Upload } from 'hooks/use-s3-upload'
import { accountFormSchema } from 'utils/validations'
import { Session } from 'next-auth/client'
import { api } from 'services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

export type LeadTemplateProps = {
  session: Session
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

type FileFormData = {
  instagram_print: FileList | string
  personal_doc: FileList | string
  address_doc: FileList | string
}

export default function AccountTemplate({ session }: LeadTemplateProps) {
  const { userData } = session

  const { uploadToS3 } = useS3Upload()

  const handleFileForm: SubmitHandler<FileFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log('ONSUBMIT FILE:::', values)
    try {
      Object.entries(values).forEach(
        async (keyValue: [string, string | FileList]) => {
          if (
            keyValue[0] === 'instagram_print' ||
            keyValue[0] === 'personal_doc' ||
            keyValue[0] === 'address_doc'
          ) {
            console.log('KEYVALUE:::', keyValue)
            if (keyValue[1][0]) {
              await uploadToS3(
                keyValue[1][0] as File,
                keyValue[0],
                userData.data.email
              )
            }
          }
        }
      )
    } catch (err) {
      console.log('ERROR:::', err)
    }
  }

  const handleAccountForm: SubmitHandler<AccountFormData> = async (
    values,
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log('ONSUBMIT event:::', event)
    console.log('ONSUBMIT ACCOUNT:::', values)

    try {
      await api.post('/account', {
        user_email: userData.data.email,
        ...values
      })
    } catch (err) {
      console.log('ERROR:::', err)
    }
  }

  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" maxWidth={1480} mx="auto" px={{ base: '4', lg: '6' }}>
          <Sidebar />
          <Flex width="100%" direction="column">
            <InfoBox
              text="Todos os campos são obrigatórios. Para que nossa equipe avalie
        e verifique sua conta, favor enviar todas as informações de
        uma única vez."
            />

            <AccountForm />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
