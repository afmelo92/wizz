import { Flex } from '@chakra-ui/react'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import CloseFriendsTable from 'components/CloseFriendsTable'
import Pagination from 'components/Pagination'
import InfoBox from 'components/InfoBox'
import SearchBox from 'components/SearchBox'

export type CloseFriendsTemplatePageProps = {
  subscribers: {
    status: string
    created_at: string
    subscriber: {
      subscriber_instagram: string
      subscriber_phone: string
      subscriber_email: string
      stripe_customer_id: string
    }
  }[]
}

const CloseFriendsTemplate = ({
  subscribers
}: CloseFriendsTemplatePageProps) => {
  const instagramSessionId = false

  return (
    <>
      <Header />
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <Flex direction="column" maxWidth={1480} w="100%" pb="4">
            {!instagramSessionId && (
              <InfoBox
                text="Parece que você ainda não fez o login. Faça agora mesmo e
                comece a gerenciar seus contatos."
                hasButton
                buttonText="Fazer login no Instagram"
                link="/close-friends/instagram"
              />
            )}

            <SearchBox />

            <CloseFriendsTable subscribers={subscribers} />

            <Pagination
              totalCountOfRegisters={subscribers.length}
              currentPage={1}
              onPageChange={() => {
                console.log('hello')
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CloseFriendsTemplate
