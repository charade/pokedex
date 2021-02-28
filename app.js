//quelques répétitions car il était inutil de déclarer des fonctions d'une ou deux lignes pour les éviter...

let listPokemon = Array.from(document.querySelectorAll('.list-item'));

/*****component to fill with pokemons information*** */
let leftMainScreen = document.querySelector('.main-screen');
let pokeName = document.querySelector('.poke-name');
let pokeId = document.querySelector('.poke-id');
let pokeFrontImage = document.querySelector('.poke-front-image');
let pokeBackImage = document.querySelector('.poke-back-image');
let pokeTypeOne = document.querySelector('.poke-type-one');
let pokeTypeTwo =document.querySelector('.poke-type-two');
let poke_weight = document.querySelector('.poke-weight');
let poke_height = document.querySelector('.poke-height');
let nextButton = document.querySelector('.right-button');
let previousButton = document.querySelector('.left-button');

// /**********************pad direction controllers***************/
// let padTop = document.querySelector('.d-pad__cell.top');
// let padDown = document.querySelector('.d-pad__cell.bottom');
// let padLeft = document.querySelector('.d-pad__cell.left');
// let padRight = document.querySelector('.d-pad__cell.right');
// let padMiddle = document.querySelector('.d-pad__cell.middle');

let initRequest = {
    method:'GET',
    headears:{
        "content-type": 'application/json'
    }
}
let url = 'https://pokeapi.co/api/v2/pokemon';

/***********compteur qui augmente l'indice en changeant de page************/
let compteur = 0;
/****compteur qui remet les indices correspondants à la dernière page */
let indexClick  = 0;

async function pokemon(){
    /*****affichege du départ****/
    let reponse = await fetch(url,initRequest);
    let data    = await reponse.json();
    listPokemon.forEach((item,i) => item.textContent = `${++compteur}. ` + data.results[i].name) 
    
    nextButton.addEventListener('click', async ()=>{
        reponse = await fetch(data.next,initRequest)
        data = await reponse.json()
        console.log(data.next)
        listPokemon.forEach((item,i) => item.textContent = `${++compteur}. ` + data.results[i].name)
        console.log
    })
    /***********next 20 pokemon page*************/
    previousButton.addEventListener('click', async ()=>{
        /******on remet le compteur au premier indice de la dernière page à O******/
        indexClick = compteur - 40 ;
        reponse = await fetch(data.previous,initRequest)
        data = await reponse.json()
        console.log(data)
        listPokemon.forEach((item,i) => item.textContent = `${++indexClick}. ` + data.results[i].name)
        /*****lorsqu'on fait un retour arrière on update le compteur à la valeur de l'indice de la dernière page */
        compteur = indexClick;
    })
    displayCaracteristics();
}

pokemon();

async function displayCaracteristics(){
    listPokemon.forEach((pokemon,i) => pokemon.addEventListener('click',async (e)=>{
       
        let id = e.target.textContent.split(".")[0];

        /********récupère les données dans le chemis avec l'id  ****/
        let reponse = await fetch(url+"/"+id,initRequest);
        let data = await reponse.json();

        poke_weight.textContent = data.weight;
        poke_height.textContent = data.height;
        pokeName.textContent = data.name;

        /*****formate l'id ****/
        pokeId.textContent = '#' + (id.length === 2 ? '0' : (id.length > 2 ? '' : '00')) +id;

        /*******injecte les images */
        pokeFrontImage.src = data.sprites.front_default;
        pokeBackImage.src = data.sprites.back_default;

        /******afficher les spéciales */
        pokeTypeOne.textContent = data.types[0].type.name

        if(data.types.length > 1)
        {
            pokeTypeTwo.textContent = data.types[1].type.name
            pokeTypeTwo.classList.remove('hide');
        }
        else
        {
            pokeTypeTwo.classList.add('hide');
        }
        leftMainScreen.className = `${pokeTypeOne.textContent}`
    }))
}





