const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PERSONAGENS = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
  },
  {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
  },
  {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
  },
  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
  },
];

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
    } else if (personagem2.pontos > personagem1.pontos) {
      console.log(`\n${personagem2.nome} venceu a corrida! Parabéns! 🏆`);
    } else {
      console.log("A corrida terminou em empate");
    }
}

async function principal() {
  console.log(" BEM-VINDO AO SIMULADOR DE CORRIDA DE MARIO KART! ");
  console.log("==================================================");

  console.log("Estes são os personagens disponíveis:");
  PERSONAGENS.forEach((p, index) => {
    console.log(`${index + 1} - ${p.nome} (Vel: ${p.velocidade} | Man: ${p.manobrabilidade} | Pod: ${p.poder})`);
  });
  console.log("==================================================");

  const escolherPersonagem = (nomeJogador) => {
    return new Promise((resolve) => {
      rl.question(`Escolha o personagem para o ${nomeJogador} (digite o número): `, (resposta) => {
        const indiceEscolhido = parseInt(resposta) - 1;
        const personagemEscolhido = PERSONAGENS[indiceEscolhido];

        if (personagemEscolhido) {
          console.log(`${nomeJogador} escolheu ${personagemEscolhido.nome}!`);
          resolve({ ...personagemEscolhido, pontos: 0 });
        } else {
          console.log("Opção inválida! Tente novamente.");
          resolve(escolherPersonagem(nomeJogador));
        }
      });
    });
  };

  const jogador1 = await escolherPersonagem("Jogador 1");
  const jogador2 = await escolherPersonagem("Jogador 2");

  rl.close();
  
  console.log(
    `\n🏁🚨 Corrida entre ${jogador1.nome} e ${jogador2.nome} começando...\n`
  );

  jogarCorrida(jogador1, jogador2);
  declararVencedor(jogador1, jogador2);
}

principal();