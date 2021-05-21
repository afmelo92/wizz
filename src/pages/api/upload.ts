import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { fauna } from 'services/fauna'
import { query as q } from 'faunadb'
import { User } from 'utils/types/faunaTypes'

const missingEnvs = (): string[] => {
  const keys = [
    'S3_UPLOAD_KEY',
    'S3_UPLOAD_SECRET',
    'S3_UPLOAD_REGION',
    'S3_UPLOAD_BUCKET'
  ]
  return keys.filter(key => !process.env[key])
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const missing = missingEnvs()
  const { email } = req.body

  if (missing.length > 0) {
    res
      .status(500)
      .json({ error: `Next S3 Upload: Missing ENVs ${missing.join(', ')}` })
  } else {
    // ID relacionada ao IAM USER
    const filename = req.query.filename as string
    const field = req.query.fieldIdentifier as string

    const config = {
      accessKeyId: process.env.S3_UPLOAD_KEY,
      secretAccessKey: process.env.S3_UPLOAD_SECRET,
      region: process.env.S3_UPLOAD_REGION
    }

    const bucket = process.env.S3_UPLOAD_BUCKET

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), email))
    )

    let deleteKey = ''

    switch (field) {
      case 'instagram_print':
        deleteKey = user.data.account?.instagram_print?.key
        break
      case 'personal_doc':
        deleteKey = user.data.account?.personal_doc?.key
        break
      case 'address_doc':
        deleteKey = user.data.account?.address_doc?.key
        break
      default:
        deleteKey = ''
        break
    }

    const key = `uploads/${
      user.data.email
    }/${field}/${uuidv4()}-${filename.replace(/\s/g, '-')}`

    // Criando session policy (?) para o role logo abaixo
    const policy = {
      Statement: [
        {
          Sid: 'S3UploadAssets',
          Effect: 'Allow',
          Action: ['s3:DeleteObject', 's3:PutObject', 's3:PutObjectAcl'],
          Resource: [`arn:aws:s3:::${bucket}/uploads/${email}/*`]
        }
      ]
    }
    const sts = new aws.STS(config)

    const token = await sts
      .getFederationToken({
        Name: 'S3UploadWebToken',
        Policy: JSON.stringify(policy),
        DurationSeconds: (60 * 60) / 4 // 15 minutes
      })
      .promise()

    res.statusCode = 200

    return res.status(200).json({ token, key, deleteKey, bucket })
  }
}
