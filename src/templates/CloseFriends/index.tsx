import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  Input,
  Stack,
  Select
} from '@chakra-ui/react'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import CloseFriendsTable from 'components/CloseFriendsTable'
import Pagination from 'components/Pagination'
import InfoBox from 'components/InfoBox'

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

const selectOptions = [
  'Ativos',
  'Cancelados',
  'Vencidos',
  'Importados',
  'Pendentes'
]

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

            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              mb="4"
              bg="gray.800"
              borderRadius={8}
            >
              <Box p={{ base: '6', lg: '8' }}>
                <Text fontSize="lg" mb="4" color="pink.400">
                  Instagram ou Email
                </Text>
                <Input focusBorderColor="pink.500" placeholder="Pesquisar..." />
              </Box>
              <Box p={{ base: '6', lg: '8' }}>
                <Text fontSize="lg" mb="4" color="pink.400">
                  Data de cadastro
                </Text>
                <Input
                  type="date"
                  focusBorderColor="pink.500"
                  placeholder="Pesquisar..."
                />
              </Box>
              <Box p={{ base: '6', lg: '8' }}>
                <Text fontSize="lg" mb="4" color="pink.400">
                  Status
                </Text>
                <Stack spacing={3}>
                  <Select
                    focusBorderColor="pink.500"
                    size="md"
                    backgroundColor="gray.800"
                  >
                    {selectOptions.map(option => (
                      <option
                        key={option}
                        value={option}
                        style={{ backgroundColor: '#1F2029' }}
                      >
                        {option}
                      </option>
                    ))}
                  </Select>
                </Stack>
              </Box>
            </SimpleGrid>

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
