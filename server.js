const express = require('express');
const app = express();
const server = app.listen(8000);
const io = require('socket.io')(server);

let chatHistory = [];
let word = "javascript";

app.use('/static', express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', (socket) => {
    let username = '';

    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' });

    socket.on('submitUsername', (data) => {
        username = data.username;
        socket.emit('chatHistory', { chatHistory });
        io.emit('userJoined', { name: username });
    });

    socket.on('chatMessage', (messages) => {

        if (messages === word) {
            const winningMessage = { name: 'Server', message: `${username} won! The correct word is ${word}.` };
            chatHistory.push(winningMessage);
            io.emit('gameOver', winningMessage);
        } 
        else {
            const data = { name: username, message: messages };
            chatHistory.push(data);
            io.emit('chatMessage', data);
        }
    });

    socket.on('disconnect', (data) => {
        socket.emit('chatHistory', { chatHistory });
        if (username) {
            socket.broadcast.emit('userLeft', { name: username });
        }
    });
});
