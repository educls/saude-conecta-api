const Ftp = require("ftp");
const fs = require('fs');

function getAtestadoFromFTP(nome_arquivo, res){
    const ftp = new Ftp();

    ftp.connect({
        host: '192.168.1.23',
        user: 'api',
        password: '1234'
    });

    ftp.on('ready', () => {
        // Baixa o arquivo PDF do servidor FTP
        ftp.get(nome_arquivo, (err, stream) => {
          if (err) {
            console.error('Erro ao baixar o arquivo PDF:', err);
          } else {
            console.log(stream.pipe(res))
            stream.pipe(res);
            return stream
          }
          ftp.end();
        });
    });
}

module.exports = getAtestadoFromFTP;