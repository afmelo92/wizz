import { NextApiRequest, NextApiResponse } from 'next'

import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'
import { User } from 'utils/types/faunaTypes'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_email } = req.body

  console.log('REQ.BODY:::', req.body)

  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), user_email))
  )

  // const defaultObject = {}

  // const account = Object.defineProperty(defaultObject, field, {
  //   enumerable: true,
  //   configurable: true,
  //   writable: true,
  //   value: url
  // })

  await fauna.query(
    q.Update(q.Ref(q.Collection('users'), user.ref.id), {
      data: {
        account: {
          ...req.body
        }
      }
    })
  )

  return res.status(200).json({ ok: true })
}