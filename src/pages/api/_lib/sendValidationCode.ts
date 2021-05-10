import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'
import { sms } from 'services/smsdev'
import { Subscriber } from './types/faunaTypes'

export default async function sendValidationCode(subscriber: Subscriber) {
  const verificationCode = Math.floor(Math.random() * 90000) + 10000

  await fauna.query(
    q.Update(q.Ref(q.Collection('subscribers'), subscriber.ref.id), {
      data: {
        unsub_code: String(verificationCode)
      }
    })
  )

  await sms.post('/send', {
    key: process.env.SMSDEV_KEY,
    type: 9,
    refer: '666',
    number: subscriber.data.subscriber_phone,
    msg: `Equipe wizz. :: Utilize o código a seguir para cancelar sua assinatura: ${verificationCode}`
  })
}
