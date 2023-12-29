const express = require('express');
const server = express();

server.use(express.json());

const greenConsoleLog = (message) => {
    console.log(`\x1b[32m${message}\x1b[0m`);
};

server.use((req, res, next) => {
    res.on('finish', () => {
        greenConsoleLog(`Rota: ${req.method} ${req.originalUrl} - Status Code: ${res.statusCode}`);
    });
    next();
});

server.use('/usuarios', require('./src/routes/usuario_routes'))

server.use('/login', require('./src/routes/login_routes'))

server.use('/login-medico', require('./src/routes/login_medico_routes'))

server.use('/medicos', require('./src/routes/medico_routes'))

server.use('/consulta-agendar', require('./src/routes/consulta_routes'))

server.use('/atestado-gerar', require('./src/routes/atestado_routes'))

server.use('/enviar-email-verificacao', require('./src/routes/verify_routes'))

server.use('/reset_pass_with_code', require('./src/routes/reset_password_from_code'))

server.listen(3000, () =>{
    console.log('Servidor está funcionando...')
})

