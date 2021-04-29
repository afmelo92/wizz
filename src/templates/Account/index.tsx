import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { Flex, Stack, VStack, Button } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useS3Upload } from 'hooks/use-s3-upload'
import FileUpload from 'components/FileUpload'
import { validateFiles } from 'utils/validations/index'
import { Session } from 'next-auth/client'
import { api } from 'services/api'

export type LeadTemplateProps = {
  session: Session
}

export default function AccountTemplate({ session }: LeadTemplateProps) {
  const { userData } = session
  const { register, handleSubmit, formState, watch } = useForm()
  const { uploadToS3 } = useS3Upload()

  const instagramPrintInputWatch = watch('instagram_print', '')
  const personalDocInputWatch = watch('personal_doc', '')
  const addressDocInputWatch = watch('address_doc', '')

  const onSubmit = async data => {
    console.log('ONSUBMIT:::', data)

    try {
      if (Object.keys(data).length > 0) {
        Object.entries(data).forEach(async keyValue => {
          const { url } = await uploadToS3(
            keyValue[1][0],
            keyValue[0],
            userData.data.email
          )

          await api.post('/account', {
            email: userData.data.email,
            url,
            field: keyValue[0]
          })
        })
      }
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
          {/** BOXES + BUTTONS */}
          <Flex
            width="100%"
            direction="column"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/** BOXES */}
            <Stack
              width="100%"
              direction={{ base: 'column', lg: 'row' }}
              alignItems="center"
              justifyContent="space-around"
              spacing={{ base: 6, lg: 0 }}
            >
              {/** BOX 2 */}
              <VStack
                direction="column"
                spacing={4}
                maxWidth="450px"
                w="100%"
                mx="auto"
              >
                <FileUpload
                  name="instagram_print"
                  label="Print do seu Instagram"
                  buttonLabel={
                    instagramPrintInputWatch[0]?.name ||
                    'Upload print do seu Instagram'
                  }
                  accept={'image/*,.pdf'}
                  multiple={false}
                  register={register('instagram_print', {
                    validate: validateFiles
                  })}
                  error={formState.errors.instagram_print}
                  help={`Tire print do perfil de instagram: @${userData.data.instagram}`}
                />
                <FileUpload
                  name="personal_doc"
                  label="Documento com foto"
                  buttonLabel={
                    personalDocInputWatch[0]?.name || 'Upload RG, CPF ou CNH'
                  }
                  accept={'image/*,.pdf'}
                  multiple={false}
                  register={register('personal_doc', {
                    validate: validateFiles
                  })}
                  error={formState.errors.personal_doc}
                  help="Documento com foto seu ou do responsável"
                />

                <FileUpload
                  name="address_doc"
                  label="Comprovante de residência"
                  buttonLabel={
                    addressDocInputWatch[0]?.name ||
                    'Upload comprovante de residência'
                  }
                  accept={'image/*,.pdf'}
                  multiple={false}
                  register={register('address_doc', {
                    validate: validateFiles
                  })}
                  error={formState.errors.address_doc}
                  help="Conta de água ou luz em seu nome ou do resposável."
                />
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
                type="submit"
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
                disabled
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
