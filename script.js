document.addEventListener('DOMContentLoaded', () => {
    const PERSONAGENS = [
        { nome: "Mario", velocidade: 4, manobrabilidade: 3, poder: 3, img: "./docs/mario.gif" },
        { nome: "Peach", velocidade: 3, manobrabilidade: 4, poder: 2, img: "./docs/peach.gif" },
        { nome: "Yoshi", velocidade: 2, manobrabilidade: 4, poder: 3, img: "./docs/yoshi.gif" },
        { nome: "Bowser", velocidade: 5, manobrabilidade: 2, poder: 5, img: "./docs/bowser.gif" },
        { nome: "Luigi", velocidade: 3, manobrabilidade: 4, poder: 4, img: "./docs/luigi.gif" },
        { nome: "Donkey Kong", velocidade: 2, manobrabilidade: 2, poder: 5, img: "./docs/dk.gif" },
    ];

    let player1 = null;
    let player2 = null;
    let currentPlayerSelection = 1;

    const selectionScreen = document.getElementById('selection-screen');
    const raceScreen = document.getElementById('race-screen');
    const winnerScreen = document.getElementById('winner-screen');
    const characterGrid = document.getElementById('character-grid');
    const p1SelectionText = document.getElementById('p1-selection');
    const p2SelectionText = document.getElementById('p2-selection');
    const selectionTitle = document.getElementById('selection-title');

    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function createCharacterCards() {
        PERSONAGENS.forEach(char => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `<img src="${char.img}" alt="${char.nome}"><p>${char.nome}</p>`;
            card.addEventListener('click', () => selectCharacter(char, card));
            characterGrid.appendChild(card);
        });
    }

    function selectCharacter(character, card) {
        if (currentPlayerSelection === 1) {
            player1 = { ...character, pontos: 0 };
            p1SelectionText.textContent = player1.nome;
            card.classList.add('selected-p1');
            currentPlayerSelection = 2;
            selectionTitle.textContent = "PLAYER 2: CHOOSE YOUR CHARACTER";
        } else if (currentPlayerSelection === 2 && character.nome !== player1.nome) {
            player2 = { ...character, pontos: 0 };
            p2SelectionText.textContent = player2.nome;
            card.classList.add('selected-p2');
            currentPlayerSelection = 3;

            setTimeout(startRace, 1000);
        }
    }

    async function startRace() {
        selectionScreen.classList.add('hidden');
        raceScreen.classList.remove('hidden');
        updatePlayerDisplays();
        await runRaceSimulation();
    }

    function updatePlayerDisplays() {
        const p1Display = document.getElementById('player1-display');
        const p2Display = document.getElementById('player2-display');
        p1Display.innerHTML = `<h3>${player1.nome}</h3><img src="${player1.img}" alt="${player1.nome}"><p>PONTOS: ${player1.pontos}</p>`;
        p2Display.innerHTML = `<h3>${player2.nome}</h3><img src="${player2.img}" alt="${player2.nome}"><p>PONTOS: ${player2.pontos}</p>`;
    }

    async function runRaceSimulation() {
        const raceLog = document.getElementById('race-log');
        const roundTitle = document.getElementById('round-title');

        const tiposDePista = ["RETA", "CURVA", "CONFRONTO"];
        const atributos = {
            "RETA": "velocidade",
            "CURVA": "manobrabilidade",
            "CONFRONTO": "poder"
        };

        for (let rodada = 1; rodada <= 5; rodada++) {
            roundTitle.textContent = `--- RODADA ${rodada} ---`;

            const pista = tiposDePista[Math.floor(Math.random() * tiposDePista.length)];
            const atributoDaVez = atributos[pista];

            raceLog.innerHTML = `Pista da rodada: ${pista}!\nTestando ${atributoDaVez}...`;
            await esperar(2500);

            const p1Roll = Math.floor(Math.random() * 6) + 1;
            const p2Roll = Math.floor(Math.random() * 6) + 1;

            const p1Skill = player1[atributoDaVez] + p1Roll;
            const p2Skill = player2[atributoDaVez] + p2Roll;

            let logMessage = `PISTA: ${pista}\n`;
            logMessage += `🎲 ${player1.nome} (${atributoDaVez}: ${player1[atributoDaVez]} + ${p1Roll}) = ${p1Skill}\n`;
            logMessage += `🎲 ${player2.nome} (${atributoDaVez}: ${player2[atributoDaVez]} + ${p2Roll}) = ${p2Skill}\n\n`;

            if (pista === "CONFRONTO") {
                if (p1Skill > p2Skill && player2.pontos > 0) {
                    logMessage += `🥊 ${player1.nome} venceu o confronto! ${player2.nome} perdeu 1 ponto.`;
                    player2.pontos--;
                } else if (p2Skill > p1Skill && player1.pontos > 0) {
                    logMessage += `🥊 ${player2.nome} venceu o confronto! ${player1.nome} perdeu 1 ponto.`;
                    player1.pontos--;
                } else {
                    logMessage += `💥 Confronto empatado!`;
                }
            } else { // Reta ou Curva
                if (p1Skill > p2Skill) {
                    logMessage += `🏆 ${player1.nome} venceu e marcou 1 ponto!`;
                    player1.pontos++;
                } else if (p2Skill > p1Skill) {
                    logMessage += `🏆 ${player2.nome} venceu e marcou 1 ponto!`;
                    player2.pontos++;
                } else {
                    logMessage += `💥 Empate! Ninguém marcou pontos.`;
                }
            }

            raceLog.innerHTML = logMessage;
            updatePlayerDisplays();
            await esperar(4000);
        }

        declareWinner();
    }

    function declareWinner() {
        raceScreen.classList.add('hidden');
        winnerScreen.classList.remove('hidden');

        const announcement = document.getElementById('winner-announcement');
        if (player1.pontos > player2.pontos) {
            announcement.textContent = `${player1.nome} VENCEU A CORRIDA!`;
        } else if (player2.pontos > player1.pontos) {
            announcement.textContent = `${player2.nome} VENCEU A CORRIDA!`;
        } else {
            announcement.textContent = "A CORRIDA TERMINOU EM EMPATE!";
        }
    }

    document.getElementById('play-again-btn').addEventListener('click', () => {
        location.reload();
    });

    createCharacterCards();
});