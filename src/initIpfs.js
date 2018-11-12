export default (s3, {
  ipfsConfig,
  ipfsRepoLockName,
  ipfsRepoPath
}) => new Promise((resolve, reject) => {
  const Gateway = require('ipfs/src/http')
  const Repo = require('ipfs-repo')
  const S3Store = require('datastore-s3')
  const S3Lock = require('./s3-lock')

  const bucketpath = ipfsRepoPath

  // Create our custom lock
  const s3Store = new S3Store(bucketpath, { s3 })
  const s3Lock = new S3Lock(s3Store, ipfsRepoLockName)

  // Create the IPFS Repo, full backed by S3
  const repo = new Repo(bucketpath, {
    storageBackends: {
      root: S3Store,
      blocks: S3Store,
      keys: S3Store,
      datastore: S3Store
    },
    storageBackendOptions: {
      root: { s3 },
      blocks: { s3 },
      keys: { s3 },
      datastore: { s3 }
    },
    lock: s3Lock
  })

  const gateway = new Gateway(
    repo,
    ipfsConfig
  )

  console.log('Starting the gateway...')

  gateway.start(true, (x) => {

    if (x instanceof Error) {
      return reject(x)
    }

    console.log('Gateway now running')

    const node = gateway.node

    resolve(node)

    node.version()
      .then((version) => {
        console.log('Version:', version.version)
      })
      // Once we have the version, let's add a file to IPFS
      .then(() => {
        return node.files.add({
          path: 'data.txt',
          content: Buffer.from(`js_ipfs ${Date.now()}`)
        })
      })
      // Log out the added files metadata and cat the file from IPFS
      .then((filesAdded) => {
        console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
        return node.files.cat(filesAdded[0].hash)
      })
      // Print out the files contents to console
      .then((data) => {
        console.log(`\nFetched file content '${data.toString()}', containing ${data.byteLength} bytes`)
      })
      // Log out the error, if there is one
      .catch((err) => {
        console.log('File Processing Error:', err)
      })
  })

})