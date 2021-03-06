/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient } from 'react-query'

import { query as q } from 'faunadb'
import { User } from 'graphql/generated/graphql'
import getUser from 'graphql/queries/getUser'
import NextAuth from 'next-auth'
import { GenericObject } from 'next-auth/_utils'
import Providers from 'next-auth/providers'
import { fauna } from 'services/fauna'

export default NextAuth({
  pages: {
    signIn: '/signin'
  },
  providers: [
    Providers.Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorizationUrl: `${process.env.GOOGLE_AUTH_URL}`,
      scope: `${process.env.GOOGLE_SCOPE}`
    })
  ],
  callbacks: {
    async session(session: GenericObject, token: GenericObject) {
      try {
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: Infinity
            }
          }
        })

        const userData = await queryClient.fetchQuery<Promise<User>>(
          'user-auth',
          () => getUser(token.email.toLowerCase())
        )

        return { ...session, userData }
      } catch (err) {
        return session
      }
    },
    async signIn(user) {
      const { email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('userByEmail'), q.Casefold(user.email)))
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('userByEmail'), q.Casefold(user.email)))
          )
        )

        return true
      } catch {
        return false
      }
    }
    // callback jwt é necessario aqpenas para quando se possui um database
    // async jwt(token: GenericObject, account: GenericObject, user) {
    //   if (account) {
    //     token.provider = account.provider
    //     token.id = account.id
    //   }

    //   console.log('account (jwt):::', account)

    //   if (user) {
    //     token.id = user.id
    //     token.jwt = user.idToken
    //     token.accessToken = user.accessToken
    //   }

    //   console.log('user (jwt):::', user)

    //   return token
    // }
  }
})
