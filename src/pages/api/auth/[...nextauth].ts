import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
    async session(session) {
      return session
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
  }
})
