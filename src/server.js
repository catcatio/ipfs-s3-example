
const Server = (config) => {
  const start = async () => {

    const s3 = await require('./initS3').default(config)
    const ipfs = await require('./initIpfs').default(s3, config)

    const app = require('./initExpress').default(config)
    const routers = require('./routers').default(ipfs, config)

    app.use(routers)
  }

  const stop = async () => {

  }

  return {
    start,
    stop
  }
}

export default Server