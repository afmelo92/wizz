import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import InfoBox from 'components/InfoBox'
import AccountForm from 'templates/Forms/AccountForm'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { accountUnderAnalysisMessage } from 'utils/defaultMessages'

export type AccountemplateProps = {
  underAnalysis: boolean
}

export default function AccountTemplate({
  underAnalysis = false
}: AccountemplateProps) {
  const [sendForm, setSendForm] = useState(underAnalysis)

  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" maxWidth={1480} mx="auto" px={{ base: '4', lg: '6' }}>
          <Sidebar />
          <Flex
            width="100%"
            direction="column"
            m={underAnalysis || sendForm ? 'auto' : '0'}
            maxW={underAnalysis || sendForm ? '600px' : '100%'}
          >
            {underAnalysis || sendForm ? (
              <InfoBox text={accountUnderAnalysisMessage} />
            ) : (
              <>
                <InfoBox
                  text="Todos os campos são obrigatórios. Para que nossa
                  equipe avalie e verifique sua conta, favor enviar todas
                  as informações de uma única vez."
                />
                <AccountForm setSendForm={setSendForm} />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
