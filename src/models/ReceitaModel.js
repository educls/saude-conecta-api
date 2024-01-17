
class ReceitaModel{
    constructor(ID_Medico, ID_Paciente, DataEmissao, Especialidade){
        this.ID_Medico = ID_Medico;
        this.ID_Paciente = ID_Paciente;
        this.DataEmissao = DataEmissao;
        this.Especialidade = Especialidade;
    }
}

module.exports = ReceitaModel;