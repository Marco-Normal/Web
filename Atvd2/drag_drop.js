function initDragAndDrop() {
    const moedas = document.querySelectorAll('.moeda');
    const dropZone = document.getElementById('coin-slot');
    moedas.forEach(moeda => {
        moeda.setAttribute('draggable', 'true');

        moeda.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', moeda.dataset.value);
            e.dataTransfer.setData('coin-id', moeda.id);
            setTimeout(() => {
                moeda.classList.add('dragging');
            }, 0);
        });

        moeda.addEventListener('dragend', function(e) {
            moeda.classList.remove('dragging');
        });
    });
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', function(e) {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const valor = parseFloat(e.dataTransfer.getData('text/plain'));
        
        if (!isNaN(valor)) {
            adicionarMoeda(valor);
            dropZone.textContent = `Moeda de R$ ${valor.toFixed(2)} inserida!`;
            setTimeout(() => {
                dropZone.textContent = 'Arraste moedas aqui';
            }, 1500);
        }
    });
}
document.addEventListener('DOMContentLoaded', initDragAndDrop);
