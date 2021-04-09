import {
  Container,
  Flex,
  VStack,
  Avatar,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Stack,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function InviteTemplate() {
  const {
    query: { slug }
  } = useRouter()

  return (
    <Container maxW="1480px">
      <Flex
        w="100%"
        maxWidth={1480}
        h={['100%', '100vh']}
        p={['2', '6']}
        align="center"
        justifyContent="center"
      >
        <VStack
          w="550px"
          h="100%"
          d="flex"
          background="gray.800"
          borderRadius={10}
          alignItems="center"
          justifyContent="space-between"
          p={['4', '12']}
        >
          <Box
            maxW={['150px', '250px']}
            border={['4px', '8px']}
            borderRadius="50%"
            borderColor={['pink.500', 'pink.500']}
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
              fontSize={['2xl', '4xl']}
              textAlign="center"
            >
              Close Friends do Andre
            </Text>
          </Box>
          <Box>
            <Text fontSize={['md', 'xl']}>@{slug}</Text>
          </Box>
          <Box>
            <Text fontSize={['xs', 'md']} textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis vulputate sapien, a finibus ex mollis nec. Vestibulum
              feugiat nunc et arcu varius, mollis nec. Vestibulum feugi mollis
              nec. Vestibu.
            </Text>
          </Box>

          <FormControl id="instagram">
            <FormLabel>Seu instagram</FormLabel>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon background="pink.500" border="pink.500">
                  @
                </InputLeftAddon>
                <Input
                  type="text"
                  placeholder={`seu nome no instagram`}
                  focusBorderColor="pink.500"
                />
              </InputGroup>
            </Stack>
            <FormHelperText>Apenas o nome sem @</FormHelperText>
          </FormControl>

          <FormControl id="email">
            <FormLabel>Seu email</FormLabel>
            <Input
              placeholder="exemplo@email.com"
              type="email"
              focusBorderColor="pink.500"
            />
          </FormControl>

          <FormControl id="telegram">
            <FormLabel>Seu Telegram</FormLabel>
            <Input
              placeholder="(XX) 9 9999-9999"
              type="tel"
              focusBorderColor="pink.500"
            />
          </FormControl>

          <Button
            background="pink.500"
            _hover={{ backgroundColor: 'pink.700' }}
            w="100%"
            size="lg"
            p="8"
          >
            Assinar
          </Button>
        </VStack>
      </Flex>
    </Container>
  )
}
