import { useQuery } from 'react-query'

import { Flex } from '@chakra-ui/react'
import CloseFriendsTable from 'components/CloseFriendsTable'
import { Header } from 'components/Header'
import InfoBox from 'components/InfoBox'
import Pagination from 'components/Pagination'
import SearchBox from 'components/SearchBox'
import { Sidebar } from 'components/Sidebar'
import { UserSubscription } from 'graphql/generated/graphql'
import getUserSubscriptions from 'graphql/queries/subscriptions'
import { useSession } from 'next-auth/client'
import { ModifiersProps } from 'utils/types'

const CloseFriendsTemplate = () => {
  const instagramSessionId = false
  const [session] = useSession()

  const { data } = useQuery(
    'subscriptions',
    () =>
      getUserSubscriptions(session.user.email) as Promise<
        [UserSubscription & ModifiersProps]
      >,
    {
      staleTime: Infinity
    }
  )

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

            <CloseFriendsTable subscriptions={data} />

            <Pagination
              totalCountOfRegisters={data.length || 4}
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
