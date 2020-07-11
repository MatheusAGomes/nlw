function UF() {
    /*Transformando o input do formulario em uma variavel*/
    const SelectState = document.querySelector("select[name=uf]")
    
    //puxando os valores da api 
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //transformando os valores da api em json
    .then(res=>res.json())
    //transformando os valores da api que estao em json em valores no input
    .then(states=>{
        for(let state of states)
        {   
            SelectState.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

UF()
function getCities(event)
{   //variavel com o input no qual ira ser colocado o valor do estado
    const inputState = document.querySelector("input[name=statehidden]")
    //variavel que o select representara
    const SelectCity = document.querySelector("select[name=city]")
    //valor do id pego da api que sera usado para poder pegar os municipios
    const idofState = event.target.value
    //variavel com o id que foi selecionado pelo select
    const indexofSelectedState = event.target.selectedIndex

    console.log(indexofSelectedState)
    inputState.value = event.target.options[indexofSelectedState].text
    


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idofState}/municipios`
    SelectCity.innerHTML = '<option value>Selecione a Cidade</option>'
    SelectCity.disabled = true
    console.log(url)
    fetch(url)
    //transformando os valores da api em json
    .then(res=>res.json())
    //transformando os valores da api que estao em json em valores no input
    .then(cities=>{
        for(let city of cities)
        {   
            SelectCity.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }
        SelectCity.disabled = false
    })

}
document.querySelector('select[name=uf]').addEventListener("change",getCities)
// itens de coleta
//pegando todos os itens de coleta
const itenstoCollect = document.querySelectorAll('.items-grid li') 

for(let item of itenstoCollect)
{   
    //adiciona uma 'ward' para todo o click que tiver na variavel que no caso se referencia a todos (.items-grid li) e quando acionado ele ativa uma funcao no caso (clickSelectedItems)
    item.addEventListener("click",clickSelectedItems)
}
const collectedItems = document.querySelector("input[name=itenshidden]")
//Array para guardar os itens selecionados
let selectedItems = []

function clickSelectedItems(event) {
    //pegando a tag li clicada
    const itemLi = event.target;
    //pega a tag li selecionada e caso ela nao estaja usando a classe selected comeca a usar e se usava retira a classe da tag
    itemLi.classList.toggle("selected")


    //adicionando a variavel itemid o id do li que foi clicado
    const itemId = event.target.dataset.id
    console.log(itemId)

    //-------------------Logica para Salvar os Itens Selecionados-----------------------
        
    const alreadySelected = selectedItems.findIndex(item => 
        item == itemId)
        /*este resultado ser verdadeiro ou falso, por exemplo se o id guardado no selectedItem for igual
        ao id a algum id do itemID( refere-se ao id do li clicado) ele retornara verdadeiro caso contrario
        será retornado falso */
    if(alreadySelected < 0 )
    {
        //caso o AlreadySelected retorne -1 quer dizer que o o id do item nao esta no array ou seja deve ser colocado, no caso em todas as primeiras vezes que ele entrar no site,ao clicar no item o id sera adicionado ao selectedItems
        
        selectedItems.push(itemId)
    }
    else
    {
        // caso o valor do array de mais de 0, quer dizer que ele deve ser retirado do array
        const itemsFilter = selectedItems.filter(valordoarray => {
            const itensIsDifferent = valordoarray != itemId
            return itensIsDifferent
        })
        selectedItems = itemsFilter
    }
    console.log('selectedItems: ',selectedItems)
    //att os valores do input escondido para passagem dos ids dos produtos
    collectedItems.value = selectedItems
    
}

