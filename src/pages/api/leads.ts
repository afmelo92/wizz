import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { fauna } from 'services/fauna'
import { User } from 'utils/types/faunaTypes'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { exhibition_name, custom_text, subscription_price } = req.body

    const session = await getSession({ req })

    try {
      const user = await fauna.query<User>(
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
      )

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            invite: {
              exhibition_name,
              custom_text,
              subscription_price: q.ToNumber(subscription_price)
            }
          }
        })
      )

      return res.status(200).json({ ok: true })
    } catch (err) {
      console.log(err)
      return res
        .status(400)
        .json({ error: 'Oops... Something went wrong. Try again later.' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
