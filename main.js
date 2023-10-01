let listaDeItens = [];

const formulario = document.getElementById("form-itens");
const formularioImput = document.getElementById("receber-item");
const listaDeCompras = document.getElementById("lista-de-itens");
const listaItensComprados = document.getElementById("itens-comprados");

formulario.addEventListener("submit", evento => {

    evento.preventDefault();
    salvarItem();
    mostrarItem();
    formularioImput.focus();
})

function salvarItem() {

    const item = formularioImput.value;
    const checarDuplicado = listaDeItens.some(elemento => elemento.valor.toUpperCase() === item.toUpperCase())

    if(checarDuplicado) {

        alert("Item já existe");
    } else {

        listaDeItens.push({
            valor: item,
            checar: false
        })
    }

    formularioImput.value = "";
}

function mostrarItem() {

    listaDeCompras.innerHTML = "";
    listaItensComprados.innerHTML = "";
    listaDeItens.forEach((elemento, index) => {

        if(elemento.checar) {

            listaItensComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" data-checkbox/>
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                    </div>
                </li>
            `

        } else {

            listaDeCompras.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" data-checkbox/>
                        <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                    </div>
                    <div>
                        <button><i class="fa-regular fa-floppy-disk is-clickable"></i></button>
                        <i class="fa-regular is-clickable fa-pen-to-square editar" data-editar></i>
                        <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                    </div>
                </li>
            `;
        }
    });

    listarItemComprado();
    deletarItem();
}

function listarItemComprado () {

    const itemCheckbox = document.querySelectorAll("[data-checkbox]");
    
    itemCheckbox.forEach(i => {
        
        i.addEventListener("click", evento => {
            
            const itemIndex = evento.target.parentElement.parentElement.getAttribute("data-value");
            
            listaDeItens[itemIndex].checar = evento.target.checked;
            
            mostrarItem();
        });
    });
}

function deletarItem () {

    const deletarItem = document.querySelectorAll("[data-deletar]");

    deletarItem.forEach(i => {

        i.addEventListener("click", evento => {

            const itemIndex = evento.target.parentElement.parentElement.getAttribute("data-value");

            listaDeItens.splice(itemIndex, 1);
            mostrarItem();
        })
    })
}