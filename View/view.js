// view.js
const View = {
  render(estacionamento) {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
    estacionamento.vagas.forEach(vaga => {
      let div = document.createElement("div");
      div.className = `vaga ${vaga.tamanho}`;
      div.classList.add(vaga.ocupada ? "ocupada" : "liberada");

      if (vaga.ocupada) {
        let img = document.createElement("img");
        if (vaga.veiculo.tipo === "Moto") img.src = "../img/moto.jpeg";
        else if (vaga.veiculo.tipo === "Hatch") img.src = "../img/hatch.jpeg";
        else if (vaga.veiculo.tipo === "Suv") img.src = "../img/suv.jpeg";
        else if (vaga.veiculo.tipo === "Caminhonete") img.src = "../img/caminhonete.jpeg";
        else img.src = "../img/carro_tamanho_p.png";
        div.appendChild(img);
        let label = document.createElement("div");
        label.className = "vaga-label";
        label.textContent = vaga.veiculo.tipo;
        div.appendChild(label);
      }
      grid.appendChild(div);
    });
  },

  showMessage(msg) {
    alert(msg);
  }
};
