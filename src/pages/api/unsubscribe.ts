import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'
// import messagebird from 'services/messagebird'
import { Subscriber, Subscription, User } from 'utils/types/faunaTypes'
import { sms } from 'services/smsdev'
import { stripe } from 'services/stripe'

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
          const verificationCode = Math.floor(Math.random() * 90000) + 10000

          await fauna.query(
            q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
              data: {
                unsub_code: verificationCode
              }
            })
          )

          const smsResponse = await sms.post('/send', {
            key: process.env.SMSDEV_KEY,
            type: 9,
            refer: '666',
            number: subscriber.data.subscriber_phone,
            msg: `Equipe wizz. :: Utilize o código a seguir para cancelar sua assinatura: ${verificationCode}`
          })

          console.log('SMS RESPONSE:::', smsResponse.data)

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
          const verificationCode = Math.floor(Math.random() * 90000) + 10000

          await fauna.query(
            q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
              data: {
                unsub_code: verificationCode
              }
            })
          )

          const smsResponse = await sms.post('/send', {
            key: process.env.SMSDEV_KEY,
            type: 9,
            refer: '666',
            number: subscriber.data.subscriber_phone,
            msg: `Equipe wizz. :: Utilize o código a seguir para cancelar sua assinatura: ${verificationCode}`
          })

          console.log('SMS RESPONSE:::', smsResponse.data)

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
            subscriber.data.unsub_code === Number(unsub_code) &&
            subscriber.data.stripe_customer_id !== ''
          ) {
            // ENCERRAR ASSINATURA VIA STRIPE

            // NECESSARIO ENVIAR DADOS DO INFLUENCER (SLUG) PARA CÁ, IDENTIFICAR A SUBSCRIPTION DO USUARIO E CANCELAR
            // await fauna.query(
            //   q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
            //     data: {
            //       unsub_code: '',
            //       stripe_customer_id: ''
            //     }
            //   })
            // )
            const subscription = await fauna.query<Subscription>(
              q.Get(
                q.Match(q.Index('subscription_by_influencer_and_subscriber'), [
                  subscriber.ref,
                  influencer.ref
                ])
              )
            )

            // await fauna.query(
            //   q.Update(
            //     q.Ref(q.Collection('subscriptions'), subscription.ref.id),
            //     {
            //       data: {
            //         status: 'canceled'
            //       }
            //     }
            //   )
            // )

            const deleted = await stripe.subscriptions.del(subscription.data.id)

            console.log('DELETED:::', deleted)

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
            !!subscriber.data.stripe_customer_id
          ) {
            // ENCERRAR ASSINATURA VIA STRIPE

            await fauna.query(
              q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
                data: {
                  unsub_code: '',
                  stripe_customer_id: ''
                }
              })
            )
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
