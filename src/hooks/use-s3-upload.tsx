/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import React, { ChangeEvent } from 'react'
import { useRef, useState } from 'react'
import { forwardRef } from 'react'
import S3 from 'aws-sdk/clients/s3'

import { api } from 'services/api'

type FileInputProps = {
  onChange: (
    file: File | undefined,
    event: ChangeEvent<HTMLInputElement>
  ) => void
  [index: string]: any // Indexer to spread props
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange = () => {}, ...restOfProps }, forwardedRef) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target?.files?.[0]
      onChange(file, event)
    }

    return (
      <input
        onChange={handleChange}
        {...restOfProps}
        ref={forwardedRef}
        type="file"
      />
    )
  }
)

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
  const ref = useRef<HTMLInputElement>()
  const [files, setFiles] = useState<TrackedFile[]>([])

  const openFileDialog = () => {
    if (ref.current) {
      ref.current.value = ''
      ref.current?.click()
    }
  }

  const uploadToS3 = async (
    file: File,
    fieldIdentifier: string,
    userEmail: string
  ) => {
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
        accessKeyId: data.token.Credentials.AccessKeyId,
        secretAccessKey: data.token.Credentials.SecretAccessKey,
        sessionToken: data.token.Credentials.SessionToken
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

      // at some point make this configurable
      // let uploadOptions = {
      //   partSize: 100 * 1024 * 1024,
      //   queueSize: 1,
      // };

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

      return {
        url: uploadResult.Location,
        bucket: uploadResult.Bucket,
        key: uploadResult.Key
      }
    }
  }

  return {
    FileInput: (props: any) => (
      <FileInput {...props} ref={ref} style={{ display: 'none' }} />
    ),
    openFileDialog,
    uploadToS3,
    files
  }
}
