
const get_refrigerantes = async () => {
    try {
        const res = await fetch('https://api.jsonbin.io/v3/b/68b9f743d0ea881f4071dd7f')
        if (!res.ok) {
            throw new Error(`Não foi possível recuperar os refigerantes. ${res.status}:${res.statusText}`)
        }
        const list = document.getElementById('selecao_refri')
        const data = await res.json()
        console.log(data)
        data.record.bebidas.forEach((item, _) => {
            const new_refri = document.createElement('li')
            new_refri.textContent = `${item.sabor}: R$ ${item.preco}`
            list.append(new_refri)
        })
    } catch(err) {
        console.log(err)
    }
}

get_refrigerantes()

