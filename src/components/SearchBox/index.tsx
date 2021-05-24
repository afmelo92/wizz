import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Stack,
  Select
} from '@chakra-ui/react'
import { Input } from 'components/Form/Input'
const selectOptions = [
  'Ativos',
  'Cancelados',
  'Vencidos',
  'Importados',
  'Pendentes'
]

export default function SearchBox() {
  return (
    <Container w="100%" maxW="1200px" p="0">
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
          <Input
            name="search"
            type="search"
            focusBorderColor="pink.500"
            placeholder="Pesquisar..."
          />
        </Box>
        <Box p={{ base: '6', lg: '8' }}>
          <Text fontSize="lg" mb="4" color="pink.400">
            Data de cadastro
          </Text>
          <Input
            name="date"
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
    </Container>
  )
}
