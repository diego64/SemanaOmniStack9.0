const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes.js');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-77ls0.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const connectedUsers = {};

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})


// GET, POST, PUT, DELETE

//req.query = Acessar query params (Para Filtros)
//req.params = Acessar route params (Para edição, delete)
//req.body = Acessar corpo da requisicao (Para edição, edicao)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads' )));
app.use(routes);

server.listen(3333); 