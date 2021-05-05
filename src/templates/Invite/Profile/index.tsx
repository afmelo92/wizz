import { Container, Avatar, Box, Text, VStack } from '@chakra-ui/react'

type InviteProfileProps = {
  exhibition_name: string
  slug: string
  custom_text: string
}

export default function InviteProfile({
  exhibition_name,
  slug,
  custom_text
}: InviteProfileProps) {
  return (
    <Container h="100%">
      <VStack spacing="4">
        <Box
          maxW={{ base: '200px', lg: '250px' }}
          border={{ base: '4px', lg: '8px' }}
          borderRadius="50%"
          borderColor={{ base: 'pink.500', lg: 'pink.500' }}
        >
          <Avatar
            size="full"
            name="Andre Melo"
            src="https://github.com/afmelo92.png"
          />
        </Box>
        <Box>
          <Text
            color="pink.500"
            fontWeight="bold"
            fontSize={{ base: '2xl', lg: '4xl' }}
            textAlign="center"
          >
            Close Friends do {exhibition_name}
          </Text>
        </Box>
        <Box>
          <Text fontSize={{ base: 'md', lg: 'xl' }}>@{slug}</Text>
        </Box>
        <Box>
          <Text fontSize={{ base: 'md', lg: 'md' }} textAlign="center">
            {custom_text}
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
