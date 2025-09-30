// controller.js
const API_KEY = "108b10d073339c6e4c056aba773db898"; 
const API_URL = "https://placas.fipeapi.com.br/placas/";

const Controller = {
  estacionamento: null,

  init() {
    let vagas = [
      new Vaga(1, "pequena"), new Vaga(2, "pequena"), new Vaga(3, "media"),
      new Vaga(4, "media"), new Vaga(5, "media"), new Vaga(6, "media"),
      new Vaga(7, "media"), new Vaga(8, "grande"), new Vaga(9, "grande"),
      new Vaga(10, "grande"), new Vaga(11, "grande"), new Vaga(12, "grande"),
    ];
    this.estacionamento = new Estacionamento(vagas);
    View.render(this.estacionamento);
  },

  async estacionar() {
    let placa = document.getElementById("placa").value.trim();
    if (!placa) { View.showMessage("Informe a placa!"); return; }

    try {
      let response = await fetch(`${API_URL}${placa}?key=${API_KEY}`);
      if (!response.ok) throw new Error("Erro ao consultar API");
      let result = await response.json();

      let veiculoData = result.data?.veiculo;
      let tipo = "carro"; 
      if (veiculoData?.tipo_carroceria) {
        if (/hatch/i.test(veiculoData.tipo_carroceria)) tipo = "Hatch";
        else if (/suv/i.test(veiculoData.tipo_carroceria)) tipo = "Suv";
        else if (/caminhonete/i.test(veiculoData.tipo_de_veiculo)) tipo = "Caminhonete";
        else if (/moto/i.test(veiculoData.tipo_carroceria)) tipo = "Moto";
      }

      let veiculo = new Veiculo(placa, tipo);
      let vaga = this.estacionamento.estacionar(veiculo);
      if (vaga) {
        View.showMessage(`Veículo ${placa} (${tipo}) estacionado na vaga ${vaga.id}`);
      } else {
        View.showMessage("Nenhuma vaga disponível para este veículo.");
      }
      View.render(this.estacionamento);

    } catch (err) {
      console.error(err);
      View.showMessage("Erro ao buscar dados do veículo.");
    }
  },

  liberar() {
    let placa = document.getElementById("placa").value.trim();
    if (!placa) { View.showMessage("Informe a placa!"); return; }

    let tempo = this.estacionamento.liberar(placa);
    if (tempo !== null) {
      View.showMessage(`Veículo ${placa} saiu. Tempo: ${tempo} min`);
    } else {
      View.showMessage("Veículo não encontrado.");
    }
    View.render(this.estacionamento);
  }
};
