const cores = ["🔴 Vermelho", "🔵 Azul", "🟢 Verde", "🟡 Amarelo", "🟣 Roxo"];
let pontuacao = 0;
let tentativasRestantes = 0;
let corCerta = "";
let nivel = 1;
let tempoInicio = 0;
let recordeTempo = Infinity;

document.getElementById('iniciar').addEventListener('click', iniciarJogo);

function iniciarJogo() {
    nivel = parseInt(document.getElementById('nivel').value);
    tentativasRestantes = { 1: 5, 2: 3, 3: 1 }[nivel];
    corCerta = cores[Math.floor(Math.random() * cores.length)];
    
    document.getElementById('dica').textContent = "Adivinhe a cor da garrafa!";
    document.getElementById('tentativas').textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
    
    // Limpa e recria as garrafas
    const container = document.getElementById('garrafas-container');
    container.innerHTML = '';
    cores.forEach((cor, index) => {
        const garrafa = document.createElement('div');
        garrafa.className = 'garrafa';
        garrafa.textContent = cor.split(' ')[1]; // Mostra apenas o nome da cor
        garrafa.style.backgroundColor = cor.split(' ')[1].toLowerCase();
        garrafa.addEventListener('click', () => verificarPalpite(cor));
        container.appendChild(garrafa);
    });
    
    tempoInicio = performance.now();
}

function verificarPalpite(corEscolhida) {
    if (corEscolhida === corCerta) {
        pontuacao += 10 * nivel;
        document.getElementById('dica').textContent = "✅ Acertou! Clique em 'Iniciar' para jogar novamente.";
        document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
        
        const tempoAtual = (performance.now() - tempoInicio) / 1000;
        if (tempoAtual < recordeTempo) {
            recordeTempo = tempoAtual;
            document.getElementById('tempo').textContent = `Tempo: ${tempoAtual.toFixed(2)}s | Recorde: ${tempoAtual.toFixed(2)}s`;
        } else {
            document.getElementById('tempo').textContent = `Tempo: ${tempoAtual.toFixed(2)}s | Recorde: ${recordeTempo.toFixed(2)}s`;
        }
        
        document.getElementById('garrafas-container').innerHTML = '';
    } else {
        tentativasRestantes--;
        document.getElementById('tentativas').textContent = `Tentativas restantes: ${tentativasRestantes}`;
        
        if (tentativasRestantes === 0) {
            document.getElementById('dica').textContent = `❌ Game Over! A cor certa era ${corCerta.split(' ')[1]}. Clique em 'Iniciar' para tentar novamente.`;
            document.getElementById('garrafas-container').innerHTML = '';
        }
    }
}