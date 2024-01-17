# SaudeConecta API

<br>
<br>
<div align="center">
  <img src="https://raw.githubusercontent.com/educls/arquivos/main/logo_saude_conecta.png" alt="SaudeConecta Logo">
</div>
<br>
<br>

Script SQL

```mysql

-- Tabela de Usuarios
CREATE TABLE Usuarios (
    ID_Paciente INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    Email VARCHAR(255),
    Senha VARCHAR(255),
    CPF VARCHAR(15),
    Telefone VARCHAR(20),
    Status VARCHAR(20),
    Cod_Verificacao VARCHAR(30)
);

-- Tabela Enderecos
CREATE TABLE Enderecos (
    ID_Endereco INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    Estado VARCHAR(255),
    Cidade VARCHAR(255),
    Bairro VARCHAR(255),
    Rua VARCHAR(255),
    Numero VARCHAR(20),
    FOREIGN KEY (ID_Paciente) REFERENCES Usuarios(ID_Paciente)
);

-- Tabela de Medicos
CREATE TABLE Medicos (
    ID_Medico INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    CPF VARCHAR(15),
    Senha VARCHAR(255),
    CRM VARCHAR(20),
    Especialidade VARCHAR(255)
    -- AssinaturaDigital BLOB
);

-- Tabela de Consultas
CREATE TABLE Consultas (
    ID_Consulta INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    ID_Medico INT,
    Especialidade VARCHAR(255),
    DataConsulta DATE,
    HoraConsulta TIME,
    Estado VARCHAR(255),
    FOREIGN KEY (ID_Paciente) REFERENCES Usuarios(ID_Paciente),
    FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID_Medico)
);

-- Tabela de Atestados
CREATE TABLE Atestados (
    ID_Atestado INT AUTO_INCREMENT PRIMARY KEY,
    ID_Medico INT,
    ID_Paciente INT,
    DataEmissao DATE,
    Especialidade VARCHAR(255),
    FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID_Medico),
    FOREIGN KEY (ID_Paciente) REFERENCES Usuarios(ID_Paciente)
);

-- Tabela Receitas Medicas
CREATE TABLE Receitas (
    ID_Receita INT AUTO_INCREMENT PRIMARY KEY,
    ID_Medico INT,
    ID_Paciente INT,
    DataEmissao DATE,
    Especialidade VARCHAR(255),
    FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID_Medico),
    FOREIGN KEY (ID_Paciente) REFERENCES Usuarios(ID_Paciente)
);
```

# Requisito - Node.js <br>
<a href="https://nodejs.org/en/download">Node Download</a>
<br>
### Necessario um servidor FTP para que alguns ENDPOINTS funcione de maneira adequada

# Dependencias do Projeto

## basic-ftp:
```bash
$ npm install basic-ftp@^5.0.3
```

## bcrypt:
```bash
$ npm install bcrypt@^5.1.1
```

## dotenv:
```bash
$ npm install dotenv@^16.3.1
```

## express:
```bash
$ npm install express@^4.18.2
```

## fs-js:
```bash
$ npm install fs-js@^1.0.6
```

## ftp:
```bash
$ npm install ftp@^0.3.10
```

## jsonwebtoken:
```bash
$ npm install jsonwebtoken@^9.0.2
```

## mongoose:
```bash
$ npm install mongoose@^7.5.4
```

## mysql2:
```bash
$ npm install mysql2@^3.6.1
```

## nodemailer:
```bash
$ npm install nodemailer@^6.9.7
```

## pdfkit:
```bash
$ npm install pdfkit@^0.14.0
```








