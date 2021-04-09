import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

type ProfileProps = {
  showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Andre Melo</Text>
          <Text color="gray.300" fontSize="small">
            andre@afmelo.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Andre Melo"
        src="https://github.com/afmelo92.png"
      />
    </Flex>
  )
}
