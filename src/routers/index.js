import { Router } from 'express'

const upload = (ipfs) => async (req, res) => {
  res.send('upload')
}

const download = (ipfs) => async (req, res) => {
  res.send('download')
}

export default (ipfs) => {
  const router = Router()
  router.use('/upload', upload(ipfs))
  router.use('/download', download(ipfs))
  router.use('/', (req, res) => res.send('ok'))
  return router
}