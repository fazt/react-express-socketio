const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const server = http.createServer(app)
const io = socketIo(server);

app.set('port', process.env.POR || 3000)

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => {
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8)
    })
  })
})

server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
