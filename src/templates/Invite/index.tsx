import React, { useState } from 'react'

import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { User } from 'graphql/generated/graphql'
import { Session } from 'next-auth'
import UserInviteForm from 'templates/Forms/UserInviteForm'

import UserInvitePreview from './Preview'

export type UserInviteTemplateProps = {
  session: Session
}

export default function UserInviteTemplate({
  session
}: UserInviteTemplateProps) {
  const user = session.userData as User

  const [previewName, setpreviewName] = useState(
    user.invite?.exhibition_name || ''
  )
  const [previewPrice, setpreviewPrice] = useState(
    String(user.invite?.subscription_price || 0)
  )

  const [previewText, setpreviewText] = useState(user.invite?.custom_text || '')

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <>
      <Header />
      <Flex direction="column" h="100%">
        <Flex
          w="100%"
          my="6"
          maxWidth={1480}
          mx="auto"
          px={{ base: '0', lg: '6' }}
        >
          <Sidebar />
          <Stack direction={isWideVersion ? 'row' : 'column'} mx="auto">
            <UserInviteForm
              session={session}
              setpreviewName={setpreviewName}
              setpreviewText={setpreviewText}
              setpreviewPrice={setpreviewPrice}
            />

            <UserInvitePreview
              slug={user.instagram}
              previewName={previewName}
              previewText={previewText}
              previewPrice={previewPrice}
            />
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}
