import { Container, Avatar, Box, Text, VStack } from '@chakra-ui/react'

type InviteProfileProps = {
  exhibition_name: string
  slug: string
  custom_text: string
  preview?: boolean
}

export default function InviteProfile({
  exhibition_name,
  slug,
  custom_text,
  preview = false
}: InviteProfileProps) {
  return (
    <Container h="100%">
      <VStack spacing="2">
        <Box
          maxW={
            preview
              ? { base: '120px', lg: '170px' }
              : { base: '180px', lg: '230px' }
          }
          border={
            preview ? { base: '2px', lg: '4px' } : { base: '4px', lg: '8px' }
          }
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
            fontSize={
              preview ? { base: 'xl', lg: '2xl' } : { base: '2xl', lg: '4xl' }
            }
            textAlign="center"
            maxW="400px"
          >
            Close Friends do {exhibition_name}
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={
              preview ? { base: 'sm', lg: 'md' } : { base: 'md', lg: 'xl' }
            }
          >
            @{slug}
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={{ base: 'md', lg: 'md' }}
            textAlign="justify"
            maxW="400px"
          >
            {custom_text}
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
