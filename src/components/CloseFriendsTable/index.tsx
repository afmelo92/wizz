import {
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

type CloseFriendsTableProps = {
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

import { RiPencilLine } from 'react-icons/ri'

export default function CloseFriendsTable({
  subscribers
}: CloseFriendsTableProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
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
  )
}
