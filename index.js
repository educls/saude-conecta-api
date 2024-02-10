const express = require('express');
const app = express();

const cors = require('cors');
const jwt = require('jsonwebtoken');

const constants = require('./src/utils/constants');
const chatService = require('./src/services/chat_services');
const ChatModel = require('./src/models/ChatModel');

app.use(cors());





app.use(express.json());

const greenConsoleLog = (message) => {
    console.log(`\x1b[32m${message}\x1b[0m`);
};

app.use((req, res, next) => {
    res.on('finish', () => {
        greenConsoleLog(`Rota: ${req.method} ${req.originalUrl} ${req.params} - Status Code: ${res.statusCode}`);
    });
    next();
});


app.get('/', (req, res) => {
    res.send('Endpoint (). Teste bem-sucedido!');
});


app.use('/usuarios', require('./src/routes/usuario_routes'))

app.use('/login', require('./src/routes/login_routes'))

app.use('/login-medico', require('./src/routes/login_medico_routes'))

app.use('/medicos', require('./src/routes/medico_routes'))

app.use('/consulta-agendar', require('./src/routes/consulta_routes'))

app.use('/get_horarios_disponiveis', require('./src/routes/horario_routes'))

app.use('/atestado-gerar', require('./src/routes/atestado_routes'))

app.use('/receita-gerar', require('./src/routes/receita_routes'))

app.use('/enviar-email-verificacao', require('./src/routes/verify_routes'))

app.use('/reset_pass_with_code', require('./src/routes/reset_password_from_code'))

app.use('/medicamentos', require('./src/routes/medicanento_routes'))

app.use('/mensagens', require('./src/routes/chat_routes'))

app.use('/send_notification', require('./src/routes/send_notification_routes'))

app.use((req, res, next) => {
    console.log('Solicitação não tratada:', req.method, req.url);
    res.status(404).send('404 Not Found');
});

const server = app.listen(3000, () => {
    console.log('Server running!')
});









const io = require('socket.io')(server);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return (new Error('Token não fornecido'));
    }

    jwt.verify(token, constants.SECRET_KEY, (err, decoded) => {
        if (err) {
            return (new Error('Token inválido'));
        }

        socket.id = `${decoded.id}_${decoded.nome}`;
        socket.userName = decoded.nome;
        socket.userRole = decoded.role;
    });
    next();
});

io.on('connection', async (socket) => {

    console.log(`Usuário conectado: ${socket.id} (UserName: ${socket.userName})`);

    socket.on('getMessageEvent', (data) => {
        console.log(`Nova mensagem de ${socket.id} (UserID: ${socket.userId}): ${data.text}`);

        io.to(data.receiver).emit('getMessageEvent', {
            text: data.text,
            sender: socket.id,
            receiver: data.receiver,
            timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
        });
    });


    socket.on('sendMessageEvent', (data) => {
        console.log(`Enviando mensagem para ${data.receiver} de ${socket.id} (user: ${socket.id}): ${data.text}`);

        const agoraEmSaoPaulo = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
        const dataAgr = new Date(agoraEmSaoPaulo);

        const horas = dataAgr.getHours();
        const minutos = dataAgr.getMinutes();
        console.log(`${horas}:${minutos}`)

        let novaMessage = new ChatModel(data.idChat, data.text, socket.id, data.receiver, `${horas}:${minutos}`)
        chatService.cadastraMensagem(novaMessage)
        console.log('mensagem salva no banco')

        io.to(data.receiver).emit('getMessageEvent', {
            text: data.text,
            sender: socket.userName,
            receiver: data.receiver,
            timestamp: `${horas}:${minutos}`,
        });
        io.to(socket.id).emit('getMessageEvent', {
            text: data.text,
            sender: socket.userName,
            receiver: data.receiver,
            timestamp: `${horas}:${minutos}`,
        });
    });
});


