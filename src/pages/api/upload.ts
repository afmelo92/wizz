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
  if (missing.length > 0) {
    res
      .status(500)
      .json({ error: `Next S3 Upload: Missing ENVs ${missing.join(', ')}` })
  } else {
    const config = {
      accessKeyId: process.env.S3_UPLOAD_KEY,
      secretAccessKey: process.env.S3_UPLOAD_SECRET,
      region: process.env.S3_UPLOAD_REGION
    }

    const bucket = process.env.S3_UPLOAD_BUCKET

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email))
    )

    const filename = req.query.filename as string
    const key = `next-s3-uploads/${
      user.data.email
    }/${uuidv4()}-${filename.replace(/\s/g, '-')}`

    const policy = {
      Statement: [
        {
          Sid: 'Stmt1S3UploadAssets',
          Effect: 'Allow',
          Action: ['s3:PutObject', 's3:PutObjectAcl'],
          Resource: [`arn:aws:s3:::${bucket}/${key}`]
        }
      ]
    }

    const sts = new aws.STS(config)

    const token = await sts
      .getFederationToken({
        Name: 'S3UploadWebToken',
        Policy: JSON.stringify(policy),
        DurationSeconds: 60 * 60 // 1 hour
      })
      .promise()

    res.statusCode = 200

    return res.status(200).json({ token, key, bucket })
  }
}
