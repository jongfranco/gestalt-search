const
  express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  port = process.env.PORT || 3001,
  path = require('path'),
  morgan = require('morgan')

app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'client')))

require('./routes')(app)

server.listen(port, () => {
  console.log(`Listening to requests on port:`, port)
})

module.exports = app