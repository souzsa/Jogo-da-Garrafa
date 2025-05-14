const cores = ["🔴 Vermelho", "🔵 Azul", "🟢 Verde", "🟡 Amarelo", "🟣 Roxo"];
let pontuacao = 0;
let tentativasRestantes = 10;
let coresDasGarrafas = [];
let coresEncontradas = 0;

// Inicia o jogo
document.addEventListener('DOMContentLoaded', iniciarJogo);
document.getElementById('voltar').addEventListener('click', () => {
    window.location.href = 'index.html';
});

function iniciarJogo() {
    const nivel = localStorage.getItem('nivelJogo') || 1;
    tentativasRestantes = nivel === '1' ? 10 : nivel === '2' ? 7 : 5;
    
    // Escolhe 5 cores aleatórias (podem repetir)
    coresDasGarrafas = Array(5).fill().map(() => 
        cores[Math.floor(Math.random() * cores.length)]
    );
    
    // Escolhe uma cor para ser encontrada
    const corAlvo = coresDasGarrafas[Math.floor(Math.random() * 5)];
    document.getElementById('cor-alvo').textContent = corAlvo.split(' ')[1];
    
    criarGarrafas();
    atualizarUI();
}

function criarGarrafas() {
    const container = document.getElementById('garrafas-container');
    container.innerHTML = '';
    
    coresDasGarrafas.forEach((cor, index) => {
        const garrafa = document.createElement('div');
        garrafa.className = 'garrafa';
        garrafa.dataset.cor = cor;
        garrafa.dataset.index = index;
        
        garrafa.addEventListener('click', () => revelarGarrafa(garrafa));
        container.appendChild(garrafa);
    });
}

function revelarGarrafa(garrafa) {
    if (garrafa.classList.contains('revelada') || tentativasRestantes <= 0) return;
    
    const cor = garrafa.dataset.cor;
    garrafa.style.color = cor.split(' ')[1].toLowerCase();
    garrafa.classList.add('revelada');
    
    tentativasRestantes--;
    
    // Verifica se acertou a cor alvo
    const corAlvo = document.getElementById('cor-alvo').textContent.toLowerCase();
    if (cor.toLowerCase().includes(corAlvo)) {
        pontuacao += 20;
        coresEncontradas++;
    }
    
    atualizarUI();
    
    if (coresEncontradas === 5) {
        setTimeout(() => alert(`🎉 Parabéns! Você encontrou todas as cores! Pontuação: ${pontuacao}`), 300);
    } else if (tentativasRestantes === 0) {
        setTimeout(() => alert(`❌ Fim de jogo! Pontuação: ${pontuacao}`), 300);
    }
}

function atualizarUI() {
    document.getElementById('tentativas-num').textContent = tentativasRestantes;
    document.getElementById('pontuacao-num').textContent = pontuacao;
}