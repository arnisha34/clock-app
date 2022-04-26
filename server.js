const http = require('http')

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.end('Hello World')
})

server.listen(3000, '10.0.0.134')

console.log('listening to port 3000')