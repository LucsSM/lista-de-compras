let listaDeItens = [];
let itemAEditar;

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
                        <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? "disabled" : ""}></input>
                    </div>
                    <div>
                        ${index == Number(itemAEditar) ? '<button><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar" data-editar></i>'} <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                    </div>
                </li>
            `;
        }
    });

    listarItemComprado();
    deletarItem();
    editarItem();

    console.log(listaDeItens);
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

function editarItem () {

    const iconeEditar = document.querySelectorAll("[data-editar]");

    iconeEditar.forEach(i => {

        i.addEventListener("click", evento => {

            itemAEditar = evento.target.parentElement.parentElement.getAttribute("data-value");
            mostrarItem();
        })
    })

        const itemInput = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
        
        if (itemInput) {
            
            itemInput.focus();
            itemInput.addEventListener('keydown', event => {
                    
                if (event.key === 'Enter') {
                    salvarEdicao();
                }
            })
        }
}

function salvarEdicao() {

    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaDeItens[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1;
    itemEditado.setAttribute('disabled', true);
    mostrarItem();
}