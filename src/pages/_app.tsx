import NextNprogress from 'nextjs-progressbar'
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
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Wizz. | O seu gestor de audiencia</title>
          </Head>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </NextAuthProvider>
      <NextNprogress
        color="#D53F8C"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
    </ChakraProvider>
  )
}

export default MyApp
