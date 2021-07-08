import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      subscriber_instagram,
      subscriber_email,
      subscriber_phone,
      subscribed_at,
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
              subscriber_instagram,
              subscriber_phone,
              subscriber_email,
              status: 'active',
              subscriptions: [{ influencer: slug, subscribed_at }]
            }
          }),
          // Existe subscriber
          q.If(
            // Checa se ja está inscrito nesse cf
            q.IsEmpty(
              q.Filter(
                q.Map(
                  q.Select(
                    ['data', 'subscriptions'],
                    q.Get(
                      q.Match(
                        q.Index('subscriber_by_instagram'),
                        q.Casefold(subscriber_instagram)
                      )
                    )
                  ),
                  q.Lambda(
                    'item',
                    q.If(
                      q.ContainsValue(slug, q.Var('item')),
                      q.Get(
                        q.Match(
                          q.Index('subscriber_by_instagram'),
                          q.Casefold(subscriber_instagram)
                        )
                      ),
                      true
                    )
                  )
                ),
                q.Lambda('x', q.Not(q.IsBoolean(q.Var('x'))))
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
                  subscriptions: q.Append(
                    { influencer: slug, subscribed_at },
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
