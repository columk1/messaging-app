const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = http.createServer()

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // front-end URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id)
  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`)
  })

  // Handle chat messages
  socket.on('send_msg', (data) => {
    console.log(data, 'DATA')
    socket.to(data.roomId).emit('receive_msg', data)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id)
  })
})

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})
