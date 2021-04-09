import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { Flex } from '@chakra-ui/react'

export default function LeadsTemplate() {
  return (
    <>
      <Header />
      <Flex border="2px" direction="column" h="100%">
        <Flex border="2px" w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
        </Flex>
      </Flex>
    </>
  )
}
