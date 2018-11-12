const { S3 } = require('aws-sdk')

export default ({awsAccessKeyId, awsSecretAccessKey, s3BucketName}) => {
  return new S3({
    params: {
      Bucket: s3BucketName
    },
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  })
}