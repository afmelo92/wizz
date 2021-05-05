import {
  InputProps as ChakraInputProps,
  Container,
  Text,
  Flex,
  useBreakpointValue,
  Button
} from '@chakra-ui/react'

type InfoBoxProps = {
  hasButton?: boolean
  buttonText?: string
  text?: string
  title?: string
} & ChakraInputProps

export default function InfoBox({
  text,
  title = '',
  hasButton = false,
  buttonText,
  ...rest
}: InfoBoxProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Container h="100%" w="100%" maxW="1200px" p="0">
      <Flex
        direction={isWideVersion ? 'row' : 'column'}
        py={{ base: '6', lg: '4' }}
        px={{ base: '4', lg: '6' }}
        w="100%"
        bg="gray.700"
        borderRadius={4}
        mb="4"
        justifyContent={isWideVersion ? 'space-between' : 'center'}
        align="center"
        textAlign="center"
        {...rest}
      >
        <Text fontSize={title ? '2xl' : 'md'} mx={title ? '0' : 'auto'} px="2">
          {title || text}
        </Text>
        {hasButton && (
          <Button
            as="a"
            background="pink.500"
            _hover={{ background: 'pink.700' }}
            cursor="pointer"
            width={['100%', '300px']}
            mt={{ base: '6', lg: '0' }}
            size="md"
          >
            {buttonText}
          </Button>
        )}
      </Flex>
    </Container>
  )
}
