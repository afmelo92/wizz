import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

type User = {
  ref: {
    id: string
  }
  data: {
    email: string
    instagram?: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { exhibition_name, custom_text } = req.body

    console.log('exhibition_name ::: ', exhibition_name)
    console.log('custom_text ::: ', custom_text)
    const session = await getSession({ req })

    try {
      const user = await fauna.query<User>(
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
      )

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: { invite: { exhibition_name, custom_text } }
        })
      )

      console.log('FAUNA USER ::::', user)
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
