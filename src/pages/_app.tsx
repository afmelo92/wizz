import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { Provider as NextAuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <NextAuthProvider session={pageProps.session}>
        <SidebarDrawerProvider>
          <Head>
            <title>Wizz. | O seu gestor de audiencia</title>
          </Head>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </NextAuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
