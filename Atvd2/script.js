let refriSelecionado = null;
let valorTotal = 0;

function mostrarStatus(message, type = 'error') {
    const statusEl = document.getElementById('status-message');
    statusEl.textContent = message;
    statusEl.style.color = type === 'error' ? '#ff6b6b' : '#00ff00';
}
function updateValorTotal() {
    document.getElementById('total-inserted').textContent = valorTotal.toFixed(2);
}


function updateBotaoCompra() {
    const buyBtn = document.getElementById('buy-btn');
    if (refriSelecionado && valorTotal >= refriSelecionado.preco) {
        buyBtn.disabled = false;
    } else {
        buyBtn.disabled = true;
    }
}

function selecionarRefri(soda, element) {
    refriSelecionado = soda;

    const refriElemento = document.getElementById('selected-soda');
    
    // Build the display with image if available
    let html = `<span>Selecionado: ${soda.sabor} - R$ ${soda.preco.toFixed(2)}</span>`;
    if (soda.imagem) {
        html += `<br><img src="${soda.imagem}" alt="${soda.sabor}" class="selected-soda-img" onerror="this.style.display='none'">`;
    }
    refriElemento.innerHTML = html;
    
    const allItems = document.querySelectorAll('#selecao_refri li');
    allItems.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    mostrarStatus(`${soda.sabor} selecionado!`, 'success');
    updateBotaoCompra();
}

function handlePurchase() {
    if (!refriSelecionado) {
        mostrarStatus('Selecione um refrigerante primeiro!');
        return;
    }

    if (valorTotal < refriSelecionado.preco) {
        const missing = refriSelecionado.preco - valorTotal;
        mostrarStatus(`Faltam R$ ${missing.toFixed(2)} para comprar!`);
        return;
    }
    const troco = valorTotal - refriSelecionado.preco;
    
    // Show dispense animation with image
    const display = document.getElementById('machine-display');
    let dispenseHtml = `<p style="color: greenyellow; font-size: 1.3em;">${refriSelecionado.sabor} dispensado!</p>`;
    if (refriSelecionado.imagem) {
        dispenseHtml += `<img src="${refriSelecionado.imagem}" alt="${refriSelecionado.sabor}" class="dispensed-img" onerror="this.style.display='none'">`;
    }
    display.innerHTML = dispenseHtml;
    
    if (troco > 0) {
        const areaTroco = document.getElementById('area-troco');
        const valorTroco = document.getElementById('valor-troco');
        areaTroco.classList.remove('hidden');
        valorTroco.textContent = `Troco: R$ ${troco.toFixed(2)}`;
    }
    
    valorTotal = 0;
    updateValorTotal();
    refriSelecionado = null;
    document.getElementById('selected-soda').innerHTML = '<span>Nenhum refrigerante selecionado</span>';
    document.querySelectorAll('#selecao_refri li').forEach(item => item.classList.remove('selected'));

    // Reset display after 4 seconds
    setTimeout(() => {
        display.innerHTML = `
            <div id="money-display">
                <span>Total inserido: R$ </span>
                <span id="total-inserted">0.00</span>
            </div>
            <div id="status-message"></div>
        `;
        document.getElementById('area-troco').classList.add('hidden');
        updateBotaoCompra();
    }, 4000);

    updateBotaoCompra();
}
function adicionarMoeda(moeda) {
    valorTotal += moeda;
    updateValorTotal();
    updateBotaoCompra();
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buy-btn').addEventListener('click', handlePurchase);
});
