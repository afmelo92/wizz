import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'
// import messagebird from 'services/messagebird'
import { Subscriber, User } from 'utils/types/faunaTypes'

import deleteSubscription from './_lib/manageUnsubscription'
import sendValidationCode from './_lib/sendValidationCode'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      email,
      phone,
      unsub_code,
      userIdentifier,
      influencerIdentifier
    } = req.body

    if (email) {
      try {
        const subscriber = await fauna.query<Subscriber>(
          q.Get(q.Match(q.Index('subscriber_by_email'), q.Casefold(email)))
        )

        if (subscriber) {
          await sendValidationCode(subscriber)

          return res
            .status(200)
            .json({ message: 'Código de verificação enviado!' })
        }
      } catch (err) {
        console.log('ERROR:::', err)
        return res.status(400).json({
          message:
            'Tivemos um problema com esse e-mail, verifique e tente novamente!'
        })
      }
    }

    if (phone) {
      try {
        const subscriber = await fauna.query<Subscriber>(
          q.Get(q.Match(q.Index('subscriber_by_phone'), q.Casefold(phone)))
        )

        if (subscriber) {
          await sendValidationCode(subscriber)

          return res
            .status(200)
            .json({ message: 'Código de verificação enviado!' })
        }
      } catch (err) {
        console.log('ERROR:::', err)
        return res.status(400).json({
          message:
            'Tivemos um problema com esse telefone, verifique e tente novamente.'
        })
      }
    }

    if (unsub_code) {
      try {
        const identifier = Object.entries(userIdentifier)[0]

        const influencer = await fauna.query<User>(
          q.Get(
            q.Match(
              q.Index('user_by_instagram'),
              q.Casefold(influencerIdentifier)
            )
          )
        )

        if (identifier[0] === 'email') {
          const subscriber = await fauna.query<Subscriber>(
            q.Get(
              q.Match(q.Index('subscriber_by_email'), q.Casefold(identifier[1]))
            )
          )

          if (
            subscriber.data.unsub_code === unsub_code &&
            subscriber.data.stripe_customer_id !== ''
          ) {
            await deleteSubscription({ subscriber, influencer })

            return res
              .status(200)
              .json({ message: 'Assinatura cancelada com o sucesso!' })
          }

          return res.status(400).json({ message: 'Usuário não é inscrito' })
        }

        if (identifier[0] === 'phone') {
          const subscriber = await fauna.query<Subscriber>(
            q.Get(
              q.Match(q.Index('subscriber_by_phone'), q.Casefold(identifier[1]))
            )
          )

          if (
            subscriber.data.unsub_code === unsub_code &&
            subscriber.data.stripe_customer_id !== ''
          ) {
            await deleteSubscription({ subscriber, influencer })

            return res
              .status(200)
              .json({ message: 'Assinatura cancelada com o sucesso!' })
          }

          return res.status(400).json({ message: 'Usuário não é inscrito' })
        }

        return res.status(400).json({
          message: 'Tivemos um problema com essa requisição. Tente novamente.'
        })
      } catch (err) {
        console.log('ERROR:::', err)
        return res.status(400).json({
          message: 'Tivemos um problema com essa requisição. Tente novamente.'
        })
      }
    }

    return res.status(400).json({
      message: 'Tivemos um problema com essa requisição. Tente novamente.'
    })
  } else {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }
}
