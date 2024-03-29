module.exports = {

LOGIN_SUCESSFULL: "Login Relizado com Sucesso",
LOGIN_UNSUCCESSFUL: "Login Não Realizado com Sucesso",
SERVER_ERROR: "Opaa Erro no servidor",
REGISTER_ERROR: "Erro ao Registrar",
USER_NOT_FOUND: "Usuario não Encontrado",
USER_REGISTERED: "Usuario Cadastrado com sucesso",
PHYSICIAN_REGISTERED: "Medico Cadastrado com sucesso",
ATESTADO_REGISTERED: "Atestado Cadastrado com sucesso",
RECEITA_REGISTERED: "Receita Cadastrada com sucesso",
PHYSICIAN_NOT_FOUND: "Medico não Encontrado",
ATESTADO_NOT_FOUND: "Atestado não Encontrado",
QUERY_NOT_FOUND: "Nenhuma consulta Encontrada", 
EMAIL_ALREADY_EXISTS: "Email já Cadastrado",
USER_DELETED_SUCESSFULL: "Usuario Deletado com Sucesso",
PHYSICIAN_DELETED_SUCESSFULL: "Medico Deletado com Sucesso",
QUERY_DELETED_SUCESSFULL: "Consulta Deletada com Sucesso",
ATESTADO_DELETED_SUCESSFUL: "Atestado Deletado com Sucesso",
PASS_UPDATE_SUCESSFUL: "Senha atualizada com Sucesso",
PASS_UPDATE_UNSUCCESSFUL: "Senha não atualizada",
ATESTADO_NOT_FOUND: "Atestado não Encontrado",
RECEITA_NOT_FOUND: "Receita não Encontrada",
SOME_FIELDS_NULL: "Um ou mais campos obrigatorios estao nulos",
TOKEN_EMPTY: "ID medico nulo",
TOKEN_FIREBASE_NOT_SET: "O token não foi setado",
TOKEN_FIREBASE_SET: "O token foi setado com sucesso",

HOST_DB: "localhost",
DB_USER: "root",
DB_PASSWORD: '',
DB_DATABASE: "aplication1.3",
DB_DATABASE_CHAT: "chat",
SECRET_KEY: "xyz12",

SQL_SELECT_MEDICAMENTOS: "select * from medicamentos",
SQL_SELECT_EMAIL: "select * from usuarios where Email = ?",
SQL_SELECT_HOURS_AVAILABLE: "select HoraConsulta from consultas where DataConsulta = ? and ID_Medico = ? and Estado = ?",
SQL_SELECT_COD_USER: "select * from usuarios where Cod_Verificacao = ?",
SQL_SELECT_ID_PACIENTE: "select * from usuarios where ID_Paciente = ? and Status = ?",
SQL_SELECT_ID_MEDICO: "select * from medicos where ID_Medico = ?",
SQL_SELECT_ESPECIALIDADE_MEDICO: "select * from medicos where Especialidade = ?",
SQL_SELECT_LOGIN: "select * from usuarios where Email = ? and Senha = ? and Status = ?",
SQL_SELECT_CRM_PHYSICIAN: "select * from medicos where CRM = ?",
SQL_SELECT_ATESTADO: "select * from atestados where ID_Paciente = ?",
SQL_SELECT_RECEITA: "select * from receitas where ID_Paciente = ?",
SQL_SELECT_MEDICOS: "SELECT ID_Medico, Nome, Especialidade, TokenFireBase FROM medicos",
SQL_SELECT_QUERY: `SELECT c.ID_Consulta, c.ID_Paciente, u.Nome AS NomePaciente, c.ID_Medico, m.Nome AS NomeMedico, c.Especialidade, c.DataConsulta, c.HoraConsulta, c.Estado, m.TokenFireBase
                    FROM consultas c
                    JOIN usuarios u ON c.ID_Paciente = u.ID_Paciente
                    JOIN medicos m ON c.ID_Medico = m.ID_Medico
                    WHERE c.ID_Paciente = ?`,
SQL_SELECT_QUERYS_FOR_PHYSICIAN: `SELECT c.ID_Consulta, c.ID_Paciente, u.Nome AS NomePaciente, c.ID_Medico, m.Nome AS NomeMedico, c.Especialidade, c.DataConsulta, c.HoraConsulta, c.Estado, u.TokenFireBase
                                    FROM consultas c
                                    JOIN usuarios u ON c.ID_Paciente = u.ID_Paciente
                                    JOIN medicos m ON c.ID_Medico = m.ID_Medico
                                    WHERE c.ID_Medico = ? AND c.Estado = 'Em Espera'`,
SQL_SELECT_LIKE_MEDICAMENTOS: "select Nome_Medicamento from medicamentos where Nome_Medicamento like ? limit 4;",
SQL_SELECT_MEDICAMENTO: "select * from medicamentos where Nome_Medicamento = ?",
SQL_SELECT_ENDERECO: "select * from enderecos where ID_Paciente = ?",


SQL_UPDATE_COD_USER: "update usuarios set Cod_Verificacao = ? where Email = ?",
SQL_UPDATE_COD_NULL: "update usuarios set Cod_Verificacao = ? where Cod_Verificacao = ?",
SQL_UPDATE_PASSWORD_FROM_CODE: "update usuarios set Senha = ? where Cod_Verificacao = ?",
SQL_UPDATE_STATE_SCHEDULE: "update consultas set Estado = ? where ID_Consulta = ?",
SQL_UPDATE_USER: "update usuarios set Senha = ?, Telefone = ? where ID_Paciente = ?",
SQL_UPDATE_ADRESS: "update enderecos set Estado = ?, Cidade = ?, Bairro = ?, Rua = ?, Numero = ? where ID_Paciente = ?",
SQL_UPDATE_MEDICAMENTO: "update medicamentos set Estoque = ? where ID_Medicamento = ?",
SQL_UPDATE_USER_SET_TOKEN_FIREBASE: "update usuarios set TokenFireBase = ? where ID_Paciente = ?",
SQL_UPDATE_PHYSICIAN_SET_TOKEN_FIREBASE: "update medicos set TokenFireBase = ? where ID_Medico = ?",

SQL_INSERT_USERS: "insert into usuarios (nome, email, senha, cpf, telefone, status) values (?, ?, ?, ?, ?, ?)",
SQL_INSERT_ADDRESS: "insert into enderecos (Estado, Cidade, Bairro, Rua, Numero, ID_Paciente) values (?, ?, ?, ?, ?, ?)",
SQL_INSERT_MEDICO: "insert into medicos (Nome, CPF, Senha, CRM, Especialidade) values (?, ?, ?, ?, ?)",
SQL_INSERT_CONSULTA: "insert into consultas (ID_Paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, Estado) values (?, ?, ?, ?, ?, ?)",
SQL_INSERT_ATESTADO: "insert into atestados (ID_Medico, ID_Paciente, DataEmissao, Especialidade) values (?, ?, ?, ?)",
SQL_INSERT_RECEITA: "insert into receitas (ID_Medico, ID_Paciente, DataEmissao, Especialidade) values (?, ?, ?, ?)",
SQL_INSERT_MEDICAMENTO: "insert into medicamentos (Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque) values (?, ?, ?, ?, ?, ?, ?)",

SQL_DELETE_USERS: "update usuarios set Status = ? where ID_Paciente = ?",
SQL_DELETE_PHYSICIAN: "delete from medicos where ID_Medico = ?",
SQL_DELETE_QUERY: "delete from consultas where ID_consulta = ?",
SQL_DELETE_ATESTADO: "delete from atestados where ID_Atestado = ?",
SQL_DELETE_MEDICAMENTO: "delete from medicamentos where ID_Medicamento = ?",

NODEMAILER_SMTP_HOST: "smtp.gmail.com",
NODEMAILER_SERVICE: "gmail",
NODEMAILER_AUTH_USER: "saudeconectasuporte@gmail.com",
NODEMAILER_AUTH_PASS: "lzun aynt uvlg anxt",

MAIL_OPTIONS_FROM: "saudeconectasuporte@gmail.com",
MAIL_OPTIONS_SUBJECT: "Verificação de E-mail",

MAIL_OPTIONS_TEXT_PART1: `Recebemos uma solicitação de recuperação de senha para a sua conta. Para garantir a segurança da sua conta, por favor, siga as instruções abaixo:

Código de Verificação: `,

MAIL_OPTIONS_TEXT_PART2: `Se você não solicitou a recuperação de senha, por favor, ignore este e-mail. Caso contrário, recomendamos que você altere sua senha imediatamente após o acesso à sua conta.

Este código de verificação é válido por 24 horas.

Atenciosamente, SaudeConecta`,

NODEMAILER_ERROR_SEND_MAIL: "Erro ao enviar e-mail de verificação.",
NODEMAILER_MAIL_SEND: "E-mail de verificação enviado: ",
NODEMAILER_SEND_SUCESSFULL: "E-mail de verificação enviado com sucesso.",

CODE_INCORRECT: "Codigo Invalido",

PATH_FOR_KEY_FIREBASE: "../utils/chave_firebase/saudeconecta-58247-firebase-adminsdk-iv9ji-d0a579a3d3.json",
NOTIFICATION_SEND: "Notificação enviada com sucesso: ",
NOTIFICATION_NOT_SEND: "Notificação enviada com sucesso",



}