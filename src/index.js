// console.log('%c HI', 'color: firebrick')

// function loadedDOM() {
//     const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
//     const imageDiv = document.getElementById('dog-image-container');
//     const breedUrl = 'https://dog.ceo/api/breeds/list/all'
//     const ulContainer = document.getElementById('dog-breeds')
//     const dropDown = document.getElementById("breed-dropdown")
//     let breedsArray = []

//     ulContainer.addEventListener('click', handleClick)
//     dropDown.addEventListener('change', handleDropDown)

//     function getImages() {
//         fetch(imgUrl)
//             .then(resp => resp.json())
//             .then(images => {
//                 const imgs = images.message;
//                 let imgsArray = createImgElement(imgs)
//                 renderImage(imgsArray)
//             });
//     }
//     function createImgElement(imgs) {
//         return imgs.map(function (img) {
//             let i = `<img src=${img}>`
//             return i
//         })
//     };

//     function renderImage(imgsArray) {
//         imgsArray.forEach(element => {
//             renderImg(element)
//         })
//     };
//     function renderImg(element) {
//         imageDiv.innerHTML += element
//     }

//     function renderBreeds(element) {
//         ulContainer.innerHTML += element
//     }

//     function getBreeds() {
//         fetch(breedUrl)
//             .then(resp => resp.json())
//             .then(breeds => {
//                 breedsArray = Object.keys(breeds.message)
//                 const breedsLis = createLiElement(breedsArray)
//                 renderLis(breedsLis)
//             });
//     }
//     function createLiElement(breedsArray) {
//         return breedsArray.map(function (breed) {
//             let li = `<li>${breed}</li>`
//             return li
//         })
//     };
//     function renderLis(breedsLis) {
//         breedsLis.forEach(element => {
//             renderBreeds(element)
//         })
//     };

//     function handleClick(event) {
//         event.target.style.color = 'red'
//     }

//     function handleDropDown(event) {
//         const letter = event.target.value
//         const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
//         const filteredBreedsLis = createLiElement(filteredBreeds)
//         ulContainer.innerHTML = ''
//         renderLis(filteredBreedsLis)
//     }

//     getBreeds()
//     // getImages()

// }

// document.addEventListener('DOMContentLoaded', loadedDOM)
// Variables:
// URLS
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// Initial Event listener
document.addEventListener('DOMContentLoaded', loadPage);

// Functions
function loadPage (){
    handleRandomFetch();
    handleAllFetch();
    const dropDown = document.getElementById('breed-dropdown')
    dropDown.addEventListener('change', filterBreeds)
};

function handleRandomFetch(){
    fetch(imgUrl)
    .then(r=> r.json())
    .then(data => data.message.forEach(data => imageRender(data)))
};

function imageRender(images){
     // Div
     const imageContainer = document.getElementById('dog-image-container')
    let i = document.createElement('img')
    i.src = images
    imageContainer.appendChild(i) 
};

function handleAllFetch(){
    fetch(breedUrl)
    .then(r=> r.json())
    .then(data => renderList(data))
};

function renderList (dogs){
    let dogsArray = Object.keys(dogs.message)
    const dogList = document.getElementById('dog-breeds')
    // console.log(dogsArray)
    dogsArray.forEach((dog)=>{
        let i = document.createElement('li')
        i.innerText = dog
        dogList.appendChild(i)
        i.addEventListener('click',changeColor)
    })
};

function changeColor(e){
    // console.log(e.target)
    e.target.style.color = 'red'
};

function filterBreeds(e){
    const option = document.querySelector('select')
    // console.log(option.value)
    if (option.value === 'all'){
        removeList(document.getElementById('dog-breeds'));
        handleAllFetch();
    }else {
        removeList(document.getElementById('dog-breeds'))
        handleLetterFetch();
    }
};

function removeList (ulDogs){
    let child = ulDogs.lastElementChild
    // console.log(child)
    while(child){
        ulDogs.removeChild(child)
        child = ulDogs.lastElementChild
    }
};

function handleLetterFetch(){
    fetch('https://dog.ceo/api/breeds/list')
    .then (r=> r.json())
    .then(data => filterByLetter(data))  
};

function filterByLetter(data){
    const option = document.querySelector('select').value
    console.log(option)
    let breeds = data.message
    let newList = breeds.filter(breed => breed.startsWith(option))
    console.log(newList)
    newList.forEach(data => createList(data))
};

function createList (data){
    const dogList = document.getElementById('dog-breeds')
    let i = document.createElement('li')
        i.innerText = data
        dogList.appendChild(i)
        i.addEventListener('click',changeColor)
}