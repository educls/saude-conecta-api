
class UpdateUserModel {
    constructor(IdUsuario, Senha, Telefone, Endereco){
        this.IdUsuario = IdUsuario;
        this.Senha = Senha;
        this.Telefone = Telefone;
        this.Endereco = Endereco;
    }
}

module.exports = UpdateUserModel;