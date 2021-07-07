import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'

import { ChakraProvider } from '@chakra-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
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
        </Hydrate>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>

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
