import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'
import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

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

const DashboadTemplate = () => {
  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

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
        </Flex>
      </Flex>
    </>
  )
}

export default DashboadTemplate
