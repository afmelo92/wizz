import {
  Flex,
  IconButton,
  useBreakpointValue,
  Icon,
  Button,
  HStack,
  Box
} from '@chakra-ui/react'
import Link from 'next/link'
import { Profile } from './Profile'
import { NotificationsNav } from './NotificationsNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from 'contexts/SidebarDrawerContext'
import { RiMenuLine } from 'react-icons/ri'
import { useSession } from 'next-auth/client'

export function Header() {
  const { onOpen } = useSidebarDrawer()
  const [session] = useSession()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justifyContent="space-between"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="30"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      {isWideVersion && <Logo />}

      {!session && isWideVersion && (
        <HStack spacing="24px" ml="-180px">
          <Box
            as="a"
            cursor="pointer"
            fontSize="lg"
            _hover={{ color: 'pink.500' }}
          >
            Home
          </Box>
          <Box
            as="a"
            cursor="pointer"
            fontSize="lg"
            _hover={{ color: 'pink.500' }}
          >
            Ferramentas
          </Box>
          <Box
            as="a"
            cursor="pointer"
            fontSize="lg"
            _hover={{ color: 'pink.500' }}
          >
            Planos
          </Box>
          <Box
            as="a"
            cursor="pointer"
            fontSize="lg"
            _hover={{ color: 'pink.500' }}
          >
            Contato
          </Box>
        </HStack>
      )}

      {isWideVersion && session && <SearchBox />}

      {session ? (
        <Flex align="center" ml="auto">
          <NotificationsNav />
          <Profile showProfileData={isWideVersion} />
        </Flex>
      ) : (
        <Link href="/signin">
          <Button
            as="a"
            background="pink.500"
            _hover={{ background: 'pink.700' }}
            cursor="pointer"
            size="lg"
          >
            Login
          </Button>
        </Link>
      )}
    </Flex>
  )
}
