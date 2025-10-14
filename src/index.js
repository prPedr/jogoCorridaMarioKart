const jogador1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const jogador2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function sortearBloco() {
  const aleatorio = Math.random();
  if (aleatorio < 0.33) return "RETA";
  if (aleatorio < 0.66) return "CURVA";
  return "CONFRONTO";
}

function registrarResultado(nomeJogador, tipoBloco, resultadoDado, valorAtributo) {
  console.log(
    `${nomeJogador} 🎲 rolou um dado de ${tipoBloco} ${resultadoDado} + ${valorAtributo} = ${
      resultadoDado + valorAtributo
    }`
  );
}

function jogarCorrida(personagem1, personagem2) {
  for (let rodada = 1; rodada <= 5; rodada++) {
    console.log(`\n🏁 Rodada ${rodada}`);

    const bloco = sortearBloco();
    console.log(`Bloco: ${bloco}`);

    const resultadoDado1 = rolarDado();
    const resultadoDado2 = rolarDado();

    const atributosDosBlocos = {
        "RETA": "velocidade",
        "CURVA": "manobrabilidade",
        "CONFRONTO": "poder"
    };

    const atributo = atributosDosBlocos[bloco];

    let habilidadeTotal1 = resultadoDado1 + personagem1[atributo];
    let habilidadeTotal2 = resultadoDado2 + personagem2[atributo];

    registrarResultado(personagem1.nome, atributo, resultadoDado1, personagem1[atributo]);
    registrarResultado(personagem2.nome, atributo, resultadoDado2, personagem2[atributo]);

    if (bloco === "CONFRONTO") {
      console.log(`${personagem1.nome} confrontou com ${personagem2.nome}! 🥊`);
      
      if (habilidadeTotal1 > habilidadeTotal2 && personagem2.pontos > 0) {
        console.log(
          `${personagem1.nome} venceu o confronto! ${personagem2.nome} perdeu 1 ponto 🐢`
        );
        personagem2.pontos--;
      } else if (habilidadeTotal2 > habilidadeTotal1 && personagem1.pontos > 0) {
        console.log(
          `${personagem2.nome} venceu o confronto! ${personagem1.nome} perdeu 1 ponto 🐢`
        );
        personagem1.pontos--;
      } else {
        console.log("Confronto empatado! Nenhum ponto foi perdido.");
      }
    } else {
      if (habilidadeTotal1 > habilidadeTotal2) {
        console.log(`${personagem1.nome} marcou um ponto!`);
        personagem1.pontos++;
      } else if (habilidadeTotal2 > habilidadeTotal1) {
        console.log(`${personagem2.nome} marcou um ponto!`);
        personagem2.pontos++;
      }
    }
    
    console.log("-----------------------------");
  }
}

function declararVencedor(personagem1, personagem2) {
  console.log("\nResultado final:");
  console.log(`${personagem1.nome}: ${personagem1.pontos} ponto(s)`);
  console.log(`${personagem2.nome}: ${personagem2.pontos} ponto(s)`);

  if (personagem1.pontos > personagem2.pontos) {
    console.log(`\n${personagem1.nome} venceu a corrida! Parabéns! 🏆`);
  } else if (personagem2.pontos > personagem2.pontos) {
    console.log(`\n${personagem2.nome} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate");
  }
}

(function principal() {
  console.log(
    `🏁🚨 Corrida entre ${jogador1.nome} e ${jogador2.nome} começando...\n`
  );

  jogarCorrida(jogador1, jogador2);
  declararVencedor(jogador1, jogador2);
})();