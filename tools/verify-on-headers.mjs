import express from 'express'
import http from 'node:http'
import { createRequire } from 'node:module'
import onHeaders from 'on-headers'

const require = createRequire(import.meta.url)
const { version: onHeadersVersion } = require('on-headers/package.json')

function createApp () {
  const app = express()

  app.use((req, res, next) => {
    onHeaders(res, () => {
      res.setHeader('X-Patched-On-Headers', onHeadersVersion)
    })

    next()
  })

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  return app
}

function runCheck () {
  const app = createApp()
  const server = app.listen(0, () => {
    const { port } = server.address()

    const request = http.get({ port, path: '/health' }, (res) => {
      const headerValue = res.headers['x-patched-on-headers']

      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk
      })

      res.on('end', () => {
        server.close(() => {
          const isHeaderValid = headerValue === onHeadersVersion
          const isBodyValid = body.includes('"status":"ok"')

          if (!isHeaderValid || !isBodyValid) {
            console.error('Header verification failed', { headerValue, body })
            process.exitCode = 1
            return
          }

          console.log('Header verification succeeded', { headerValue })
        })
      })
    })

    request.on('error', (error) => {
      server.close(() => {
        console.error('HTTP request failed', error)
        process.exitCode = 1
      })
    })
  })

  server.on('error', (error) => {
    console.error('Server failed to start', error)
    process.exitCode = 1
  })
}

runCheck()
