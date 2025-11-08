const http = require('http')
const https = require('https')
const net = require('net')
const url = require('url')

// Config
const PROXY_PORT = process.env.PORT ? Number(process.env.PORT) : 5173
const FRONTEND_HOST = process.env.FRONTEND_HOST || '127.0.0.1'
const FRONTEND_PORT = process.env.FRONTEND_PORT ? Number(process.env.FRONTEND_PORT) : 5174
const BACKEND_HOST = process.env.BACKEND_HOST || '127.0.0.1'
const BACKEND_PORT = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 5001

// Very small, dependency-free proxy implementation supporting HTTP and WebSocket upgrades.
function proxyHttp(req, res, targetHost, targetPort) {
  const isHttps = false // we only use http targets locally
  const options = {
    hostname: targetHost,
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  }

  const proxyReq = (isHttps ? https : http).request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  proxyReq.on('error', (err) => {
    console.error('Proxy HTTP request error', err)
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain' })
    res.end('Bad gateway')
  })

  req.pipe(proxyReq, { end: true })
}

function proxyUpgrade(req, socket, head, targetHost, targetPort) {
  // Create TCP connection to target and pipe data both ways
  const srvSocket = net.connect(targetPort, targetHost, () => {
    // write the initial request head
    srvSocket.write(head)
    // forward the raw HTTP upgrade request
    srvSocket.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`)
    for (const h in req.headers) {
      srvSocket.write(`${h}: ${req.headers[h]}\r\n`)
    }
    srvSocket.write('\r\n')

    socket.pipe(srvSocket).pipe(socket)
  })

  srvSocket.on('error', (err) => {
    console.error('Upgrade socket error', err)
    try { socket.end() } catch (e) {}
  })
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url)
  if (parsed.pathname && parsed.pathname.startsWith('/api')) {
    proxyHttp(req, res, BACKEND_HOST, BACKEND_PORT)
  } else {
    proxyHttp(req, res, FRONTEND_HOST, FRONTEND_PORT)
  }
})

server.on('upgrade', (req, socket, head) => {
  const parsed = url.parse(req.url)
  if (parsed.pathname && parsed.pathname.startsWith('/api')) {
    proxyUpgrade(req, socket, head, BACKEND_HOST, BACKEND_PORT)
  } else {
    proxyUpgrade(req, socket, head, FRONTEND_HOST, FRONTEND_PORT)
  }
})

server.listen(PROXY_PORT, () => {
  console.log(`Dev proxy listening on http://0.0.0.0:${PROXY_PORT}`)
  console.log(`Proxying /api -> http://${BACKEND_HOST}:${BACKEND_PORT}`)
  console.log(`Proxying /* -> http://${FRONTEND_HOST}:${FRONTEND_PORT}`)
})
