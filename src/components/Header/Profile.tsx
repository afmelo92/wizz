import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/client'

type ProfileProps = {
  showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  const [session] = useSession()
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{session.user.name}</Text>
          <Text color="gray.300" fontSize="small">
            {session.user.email}
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Andre Melo"
        src="https://github.com/afmelo92.png"
        onClick={() => signOut()}
        cursor="pointer"
      />
    </Flex>
  )
}
