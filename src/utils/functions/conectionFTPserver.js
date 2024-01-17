const fs = require('fs');
const Ftp = require("ftp");
const PDFDocument = require('pdfkit');
const https = require('https');

function uploadArquivoFTPComImagem(nome_arquivo, texto) {
  const nomeArquivoTxt = 'meu_arquivo.txt';
  const nomeArquivoPdf = 'meu_arquivo.pdf';
  const nomeArquivoImagem = 'imagem.png';
  const linkImagem = 'https://raw.githubusercontent.com/educls/arquivos/main/logo_saude_conecta.png';

  // Cria o arquivo de texto local
  fs.writeFile(nomeArquivoTxt, texto, (err) => {
    if (err) {
      console.error('Erro ao criar o arquivo de texto local:', err);
    } else {
      console.log('Arquivo de texto local criado com sucesso!');

      // Baixa a imagem localmente
      const file = fs.createWriteStream(nomeArquivoImagem);
      const request = https.get(linkImagem, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(() => {
            console.log('Imagem baixada com sucesso!');

            // Cria o PDF e adiciona o texto e a imagem
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(nomeArquivoPdf);
            doc.pipe(stream);
            doc.image(nomeArquivoImagem, { width: 200 });
            doc.text(texto);
            doc.end();

            console.log('Arquivo PDF criado com sucesso!');

            const ftp = new Ftp();
            ftp.connect({
              host: '192.168.1.23',
              user: 'api',
              password: '1234'
            });

            ftp.on('ready', () => {
              ftp.put(nomeArquivoPdf, `${nome_arquivo}.pdf`, (err) => {
                if (err) {
                  console.error('Erro ao enviar o arquivo PDF para o FTP:', err);
                } else {
                  console.log('Arquivo PDF enviado com sucesso para o FTP!');
                }
                ftp.end();

                // Remove os arquivos locais após o envio, se necessário
                fs.unlink(nomeArquivoTxt, (err) => {
                  if (err) {
                    console.error('Erro ao excluir o arquivo de texto local:', err);
                  } else {
                    console.log('Arquivo de texto local excluído.');
                  }
                });

                fs.unlink(nomeArquivoPdf, (err) => {
                  if (err) {
                    console.error('Erro ao excluir o arquivo PDF local:', err);
                  } else {
                    console.log('Arquivo PDF local excluído.');
                  }
                });

                fs.unlink(nomeArquivoImagem, (err) => {
                  if (err) {
                    console.error('Erro ao excluir a imagem local:', err);
                  } else {
                    console.log('Imagem local excluída.');
                  }
                });
              });
            });

            ftp.on('error', (err) => {
              console.error('Erro na conexão FTP:', err);
            });
          });
        });
      }).on('error', function(err) {
        fs.unlink(nomeArquivoImagem);
        console.error('Erro ao baixar a imagem:', err);
      });
    }
  });
}

module.exports = uploadArquivoFTPComImagem;
