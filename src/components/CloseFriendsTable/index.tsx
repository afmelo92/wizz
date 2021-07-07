import { RiPencilLine } from 'react-icons/ri'
import { useQueryClient } from 'react-query'

import {
  Container,
  Box,
  Text,
  Button,
  Icon,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  Checkbox,
  useBreakpointValue
} from '@chakra-ui/react'
import { UserSubscription } from 'graphql/generated/graphql'

type CloseFriendsTableProps = {
  subscriptions: UserSubscription[]
}

export default function CloseFriendsTable({
  subscriptions
}: CloseFriendsTableProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  // console.log('DATE:::', new Date(1625509262860000 / 1000))

  return (
    <Container w="100%" maxW="1200px" p="0">
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
          {subscriptions.map(sub => (
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
              {isWideVersion && <Td>{String(new Date(sub._ts / 1000))}</Td>}
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
    </Container>
  )
}
