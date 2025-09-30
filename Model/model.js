// model.js
class Veiculo {
  constructor(placa, tipo) {
    this.placa = placa;
    this.tipo = tipo;
    this.entrada = new Date();
    this.saida = null;
  }
}

class Vaga {
  constructor(id, tamanho) {
    this.id = id;
    this.tamanho = tamanho; 
    this.ocupada = false;
    this.veiculo = null;
  }
  ocupar(veiculo) {
    this.ocupada = true;
    this.veiculo = veiculo;
  }
  liberar() {
    this.ocupada = false;
    this.veiculo = null;
  }
}

class Estacionamento {
  constructor(vagas) {
    this.vagas = vagas;
  }
  podeEstacionar(veiculo, vaga) {
    if (vaga.ocupada) return false;
    if (veiculo.tipo === "Moto" && vaga.tamanho === "pequena") return true;
    if (veiculo.tipo === "Hatch" && vaga.tamanho === "media") return true;
    if (["Suv", "Caminhonete"].includes(veiculo.tipo) && vaga.tamanho === "grande") return true;
    if (veiculo.tipo === "carro" && vaga.tamanho === "grande") return true;
    return false;
  }
  estacionar(veiculo) {
    for (let vaga of this.vagas) {
      if (this.podeEstacionar(veiculo, vaga)) {
        vaga.ocupar(veiculo);
        return vaga;
      }
    }
    return null;
  }
  liberar(placa) {
    for (let vaga of this.vagas) {
      if (vaga.ocupada && vaga.veiculo.placa === placa) {
        vaga.veiculo.saida = new Date();
        let tempo = Math.floor((vaga.veiculo.saida - vaga.veiculo.entrada) / 60000);
        vaga.liberar();
        return tempo;
      }
    }
    return null;
  }
}
