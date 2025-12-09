import process from 'node:process'
import s3Driver from 'unstorage/drivers/s3'

export default defineNitroPlugin(() => {
  if (
    !process.env.S3_BUCKET
    || !process.env.S3_REGION
    || !process.env.S3_ENDPOINT
    || !process.env.S3_ACCESS_KEY_ID
    || !process.env.S3_SECRET_ACCESS_KEY
  ) {
    throw new Error('Some S3 variables is not defined in .env')
  }

  const driver = s3Driver({
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  })

  useStorage().mount('s3', driver)
})
