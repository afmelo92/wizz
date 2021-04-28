import { Flex, Stack } from '@chakra-ui/react'
import {
  RiGroupLine,
  RiDashboardLine,
  RiStore2Line,
  RiReplyAllLine,
  RiToolsFill
} from 'react-icons/ri'
import NavLink from './NavLink'
import NavSection from './NavSection'

export default function SidebarNav() {
  return (
    <Flex>
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink href="/dashboard" icon={RiDashboardLine}>
            Dashboard
          </NavLink>
          <NavLink href="/close-friends" icon={RiGroupLine}>
            Close friends
          </NavLink>
          <NavLink href="/invite" icon={RiReplyAllLine}>
            Convite
          </NavLink>
          <NavLink href="/loja" icon={RiStore2Line}>
            Minha Loja
          </NavLink>
        </NavSection>

        <NavSection title="CONFIGURAÇÕES">
          <NavLink href="/account" icon={RiToolsFill}>
            Conta
          </NavLink>
        </NavSection>
      </Stack>
    </Flex>
  )
}
