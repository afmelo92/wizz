/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import { useState } from 'react'
import S3 from 'aws-sdk/clients/s3'

import { api } from 'services/api'

const getFileContents = (file: File): Promise<any> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = readEvent => {
      resolve(readEvent.target?.result)
    }

    reader.readAsArrayBuffer(file)
  })
}

type TrackedFile = {
  file: File
  progress: number
  uploaded: number
  size: number
}

export const useS3Upload = () => {
  const [files, setFiles] = useState<TrackedFile[]>([])

  const uploadToS3 = async (
    file: File,
    fieldIdentifier: string,
    userEmail: string
  ) => {
    try {
      const filename = encodeURIComponent(file.name)

      const res = await api.post(
        `/upload`,
        {
          email: userEmail
        },
        {
          params: {
            filename,
            fieldIdentifier
          }
        }
      )

      const data = await res.data

      if (data.error) {
        throw data.error
      } else {
        const s3 = new S3({
          credentials: {
            accessKeyId: data.token.Credentials.AccessKeyId,
            secretAccessKey: data.token.Credentials.SecretAccessKey,
            sessionToken: data.token.Credentials.SessionToken
          }
        })

        const blob = await getFileContents(file)

        const params = {
          ACL: 'public-read',
          Bucket: data.bucket,
          Key: data.key,
          Body: blob,
          CacheControl: 'max-age=630720000, public',
          ContentType: file.type
        }

        if (data.deleteKey) {
          await s3
            .deleteObject({
              Bucket: data.bucket,
              Key: data.deleteKey
            })
            .promise()
        }

        const s3Upload = s3.upload(params)

        setFiles(files => [
          ...files,
          { file, progress: 0, uploaded: 0, size: file.size }
        ])

        s3Upload.on('httpUploadProgress', event => {
          if (event.total) {
            setFiles(files =>
              files.map(trackedFile =>
                trackedFile.file === file
                  ? {
                      file,
                      uploaded: event.loaded,
                      size: event.total,
                      progress: (event.loaded / event.total) * 100
                    }
                  : trackedFile
              )
            )
          }
        })

        const uploadResult = await s3Upload.promise()

        const accountData = {}

        Object.defineProperty(accountData, fieldIdentifier, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: { url: uploadResult.Location, key: uploadResult.Key }
        })

        await api.post('/account', {
          ...accountData,
          user_email: userEmail
        })

        return {
          url: uploadResult.Location,
          bucket: uploadResult.Bucket,
          key: uploadResult.Key
        }
      }
    } catch (err) {
      console.log('ERR:::', err)
    }
  }

  return {
    uploadToS3,
    files
  }
}
