class MedicamentoModel {
    constructor(Nome_Medicamento, Forma_Farmaceutica, Fabricante, Data_Fabricacao, Data_Validade, Prescricao_Medica, Estoque){
        this.Nome_Medicamento = Nome_Medicamento;
        this.Forma_Farmaceutica = Forma_Farmaceutica;
        this.Fabricante = Fabricante;
        this.Data_Fabricacao = Data_Fabricacao;
        this.Data_Validade = Data_Validade;
        this.Prescricao_Medica = Prescricao_Medica;
        this.Estoque = Estoque;
    }
}

module.exports = MedicamentoModel;