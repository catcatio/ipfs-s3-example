const awsAccessKeyId = process.env.AWS_ACCESSKEY
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESSKEY
const s3BucketName  = process.env.S3_BUCKET_NAME
const ipfsRepoLockName  = process.env.IPFS_REPO_LOCK_NAME || `${Date.now()}`
const ipfsRepoPath = process.env.IPFS_REPO_PATH || '/'

const port = parseInt(process.env.PORT || 3000)
const fileKey = process.env.FILE_KEY

const ipfsConfig = {
  "Addresses": {
    "Swarm": [
      "/ip4/0.0.0.0/tcp/4002",
      "/ip4/0.0.0.0/tcp/4003/ws"
    ],
    "API": "/ip4/0.0.0.0/tcp/5002",
    "Gateway": "/ip4/0.0.0.0/tcp/9090"
  }
}

export default {
  awsAccessKeyId,
  awsSecretAccessKey,
  s3BucketName,
  ipfsRepoLockName,
  ipfsRepoPath,
  ipfsConfig,
  port,
  fileKey
}