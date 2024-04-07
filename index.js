const socketIo= require('socket.io')
const {createServer} = require('node:http')
const express = require('express')

const app = express();
const server = createServer(app)
const io = socketIo(server,{
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  })


io.on('connection', (socket) =>{
    console.log('Un cliente se a conectado')

    socket.on('signal', (userid) => {
        console.log('se esta trasmitiendo....')
        socket.broadcast.emit('signal', userid)
    })

    socket.on('message',(data) =>{
        console.log('mensaje recibido', data)
        io.emit('message', data)
    })

    socket.on('disconnect', () =>{
        console.log('el cliente se ha desconectado')
    })
})

const Port = 3000 || process.env.PORT

server.listen(Port, () => {
    console.log(`Server running at ${Port}`)
})