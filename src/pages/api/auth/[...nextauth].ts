import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { GenericObject } from 'next-auth/_utils'

import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

export default NextAuth({
  pages: {
    signIn: '/signin'
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    })
  ],
  callbacks: {
    async session(session: GenericObject, token: GenericObject) {
      console.log('session (session) :::', session)
      console.log('token (session) :::', token)

      try {
        const userFaunaData =
          (await fauna.query(
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(token.email)))
          )) || null

        return { ...session, userData: userFaunaData }
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
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
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
