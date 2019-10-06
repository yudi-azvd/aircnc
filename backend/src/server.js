const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()

const server = http.Server(app)
const io = socketio(server)


mongoose
.connect('mongodb+srv://omnistack:omnistack@omnistack-krme4.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log(error)
  })
  
const connectedUsers = {}

// conxeão é de mão dupla
io.on('connection', socket => {
  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})


/**
 * adição meio crua de um middleware para deixar transparente pra 
 * todo o backend a conexão com socket e seus dados. Deve ser adicionada 
 * antes dos outros middlewares. 
 */
app.use((request, response, next) => {
  request.io = io
  request.connectedUsers = connectedUsers
  return next()
})

const PORT = 3333

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

// servidor escuta por reqs com protocolo web socket
server.listen(PORT, () => {
  console.log(`to ouvindo ${PORT}`)
})