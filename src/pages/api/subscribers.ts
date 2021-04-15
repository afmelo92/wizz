import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      subscriber_instagram,
      subscriber_email,
      subscriber_telegram,
      slug
    } = req.body

    try {
      const subscriber = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('subscriber_by_instagram'),
                q.Casefold(subscriber_instagram)
              )
            )
          ),
          q.Create(q.Collection('subscribers'), {
            data: {
              subscriptions: [slug],
              subscriber_instagram,
              subscriber_telegram,
              subscriber_email
            }
          }),
          // Existe subscriber
          q.If(
            // Checa se ja está inscrito nesse cf
            q.Not(
              q.ContainsValue(
                slug,
                q.Select(
                  ['data', 'subscriptions'],
                  q.Get(
                    q.Match(
                      q.Index('subscriber_by_instagram'),
                      q.Casefold(subscriber_instagram)
                    )
                  )
                )
              )
            ),
            // Update no subscriber caso não seja inscrito
            q.Update(
              q.Ref(
                q.Collection('subscribers'),
                q.Select(
                  ['ref', 'id'],
                  q.Get(
                    q.Match(
                      q.Index('subscriber_by_instagram'),
                      q.Casefold(subscriber_instagram)
                    )
                  )
                )
              ),
              {
                data: {
                  subscriber_info: {
                    subscriptions: q.Append(
                      slug,
                      q.Select(
                        ['data', 'subscriptions'],
                        q.Get(
                          q.Match(
                            q.Index('subscriber_by_instagram'),
                            q.Casefold(subscriber_instagram)
                          )
                        )
                      )
                    )
                  }
                }
              }
            ),
            // Subscriber já inscrito no cf
            null
          )
        )
      )

      if (subscriber === null) {
        return res
          .status(400)
          .json({ error: 'Oops... Você já está inscrito nesse Close friends.' })
      }

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
