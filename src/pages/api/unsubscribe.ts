import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, phone } = req.body

    console.log('REQ BODY:::', req.body)

    if (email) {
      console.log('ENTROU EMAIL')
      return res.status(200).json({ message: 'unsubscribed com email!' })
    }

    // if (email) {
    //   try {
    //     console.log('ENVIOU EMAIL:::', email)
    //     res.status(200).json({ message: 'unsubscribed com email!' })
    //   } catch (err) {
    //     console.log('ERROR:::', err)
    //     res.status(400).json({ message: 'deu ruim com email!' })
    //   }
    // }

    // try {
    //   console.log('ENVIOU PHONE:::', phone)
    //   res.status(200).json({ message: 'unsubscribed com phone!' })
    // } catch (err) {
    //   console.log('ERROR:::', err)
    //   res.status(400).json({ message: 'deu ruim com phone!' })
    // }

    return res.status(200).json({ message: 'unsubscribed!' })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
