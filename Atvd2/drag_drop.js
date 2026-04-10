const drag_and_drop = () => {
    const moedas = document.getElementByClassName('moeda')
    const maquina = document.getElementsByClassName('maquina')
    for (let moeda in moedas) {
        moeda.draggable = true
        moeda.addEventListener('dragstart', function(e){
            e.dataTransfer.setData('moeda.id', e.target.id)
        })
    }
    maquina.addEventListener('dragover', function(e) {
        e.preventDefault()
    })
}

export default drag_and_drop