const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes.js')
const cors = require('cors')
const http = require('http')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)
setupWebsocket(server)

// week10 nome do banco de dados, usuario e senha omnistack
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ldu2p.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)