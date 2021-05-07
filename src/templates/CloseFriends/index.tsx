import dynamic from 'next/dynamic'
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  Button,
  Input,
  useBreakpointValue,
  Stack,
  Select,
  Icon,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  Checkbox
} from '@chakra-ui/react'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import { RiPencilLine } from 'react-icons/ri'
import Pagination from 'components/Pagination'
import InfoBox from 'components/InfoBox'
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const selectOptions = [
  'Ativos',
  'Cancelados',
  'Vencidos',
  'Importados',
  'Pendentes'
]

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  colors: ['#D53F8C'],
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: theme.colors.gray[600],
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const series1 = [{ name: 'series1', data: [31, 120, 12, 28, 61, 18, 109] }]
const series2 = [
  { name: 'series2', data: [3233, 3562, 3888, 4215, 4999, 5889, 8978] }
]
const series3 = [{ name: 'series3', data: [11, 3, 12, 18, 1, 2, 6] }]
const series4 = [{ name: 'series4', data: [1, 2, 1, 4, 5, 2, 2] }]
const series5 = [{ name: 'series5', data: [56, 45, 12, 28, 61, 18, 109] }]
const series6 = [
  { name: 'series6', data: [3215, 3215, 3215, 3215, 3215, 3215, 3215] }
]

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

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

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
            >
              <Box
                p={{ base: '6', lg: '8' }}
                bg="gray.800"
                borderRadius={8}
                pb="4"
              >
                <Text fontSize="lg" mb="4">
                  Inscritos da semana
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series1}
                  options={options}
                />
              </Box>

              <Box p={{ base: '6', lg: '8' }} bg="gray.800" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Ativos
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series2}
                  options={options}
                />
              </Box>

              <Box p={{ base: '6', lg: '8' }} bg="gray.800" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Cancelados
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series3}
                  options={options}
                />
              </Box>
              <Box p={{ base: '6', lg: '8' }} bg="gray.800" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Vencidos
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series4}
                  options={options}
                />
              </Box>
              <Box p={{ base: '6', lg: '8' }} bg="gray.800" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Pendentes
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series5}
                  options={options}
                />
              </Box>
              <Box p={{ base: '6', lg: '8' }} bg="gray.800" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Importados
                </Text>
                <Chart
                  type="area"
                  height={160}
                  series={series6}
                  options={options}
                />
              </Box>
            </SimpleGrid>

            <InfoBox title="Assinantes" />

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
                  Nome, Instagram ou Email
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
                  <Select size="md" backgroundColor="gray.800">
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

            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px="4" color="gray.300" width="6"></Th>
                  <Th>Usuário</Th>

                  {isWideVersion && <Th>Data de cadastro</Th>}
                  {isWideVersion && <Th>Status</Th>}

                  <Th width="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscribers.map(sub => (
                  <Tr key={sub.subscriber.stripe_customer_id}>
                    <Td px={['4', '4', '6']}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">
                          {sub.subscriber.subscriber_instagram}
                        </Text>
                        <Text fontSize="sm" color="gray.300">
                          {sub.subscriber.subscriber_email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{sub.created_at}</Td>}
                    {isWideVersion && <Td>{sub.status}</Td>}
                    <Td>
                      <Button
                        as="a"
                        pl={isWideVersion ? '' : '5'}
                        size="sm"
                        fontSize="sm"
                        colorScheme="pink"
                        cursor="pointer"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        {isWideVersion && 'Editar'}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
