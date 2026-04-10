const get_refrigerantes = async () => {
    try {
        const res = await fetch('https://api.jsonbin.io/v3/b/69d64173aaba882197d7779a');
        if (!res.ok) {
            throw new Error(`Não foi possível recuperar os refrigerantes. ${res.status}:${res.statusText}`);
        }

        const list = document.getElementById('selecao_refri');
        const data = await res.json();
        list.innerHTML = '';
        data.record.bebidas.forEach((item) => {
            const refri = document.createElement('li');
            
            // Create image and text for each soda
            const img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.sabor;
            img.className = 'soda-img';
            img.onerror = function() {
                this.style.display = 'none';
            };
            
            const text = document.createElement('span');
            text.textContent = `${item.sabor}: R$ ${item.preco.toFixed(2)}`;
            
            refri.appendChild(img);
            refri.appendChild(text);
            refri.dataset.soda = JSON.stringify(item);
            refri.addEventListener('click', () => {
                selecionarRefri(item, refri);
            });

            list.append(refri);
        });
    } catch(err) {
        console.log(err);
        const list = document.getElementById('selecao_refri');
        list.innerHTML = '<li style="color: red;">Erro ao carregar refrigerantes. Tente novamente.</li>';
    }
};

get_refrigerantes();
