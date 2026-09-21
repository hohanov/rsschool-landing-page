const blackoutInfo = document.querySelector('.blackout_info');
const infoContainer = document.querySelector('.info');
const cardsContainer = document.querySelector('.pets__cards');
const body = document.querySelector("body");

const mediaQuery1280 = window.matchMedia('(min-width: 1280px)');
const mediaQuery768 = window.matchMedia('(max-width: 1279px) and (min-width: 768px)');
const mediaQuery320 = window.matchMedia('(max-width: 767px)');

let pagesButtons = document.querySelectorAll('.slider__button');
let cardsButtons = document.querySelectorAll('.pets__card_item');
let closeButton = document.querySelector('.info__close_button');

let fullPetsList = [];
let pastPets = [];
let currentPets = [];
let petsOnPage;

async function getObjectPets(src) {
    const res = await fetch(src);
    fullPetsList = await res.json();
}

function getRandomPets(){
    pastPets = currentPets.slice();
    currentPets = [];
    let n;
    for (let i = 0; i < petsOnPage; i++) {
        do {
            n = (Math.floor(Math.random() * 8));
        } while (pastPets.includes(n) || currentPets.includes(n));
        currentPets.push(n);
    }
}

function generateCards(){
    Array.from(cardsButtons).forEach(function(element) {element.removeEventListener('click', showInfo);});
    Array.from(pagesButtons).forEach(function(element) {element.removeEventListener('click', changePage);});
    cardsContainer.classList.remove('pets__cards_show');
    cardsContainer.classList.add('pets__cards_hide');
    setTimeout(() => {
        cardsContainer.innerHTML = '';
        for (let i = 0; i < petsOnPage; i++) {
            let { img, name, type } = fullPetsList[currentPets[i]];
            let card = document.createElement('div');
            card.className = 'pets__card_item';
            card.id = currentPets[i];
            card.innerHTML =
            `
            <img src="${img}" alt="${type} ${name}" class="pets__card_image">
            <div class="pets__card_content">
                <h4 class="pets__card_title">
                ${name}
                </h4>
                <button class="pets__card_button">
                    Learn more
                </button>
            </div>
            `;
            cardsContainer.append(card);
        }
          cardsButtons = document.querySelectorAll('.pets__card_item');
        Array.from(cardsButtons).forEach(function(element) {element.addEventListener('click', showInfo);});
        Array.from(pagesButtons).forEach(function(element) {element.addEventListener('click', changePage);});
        cardsContainer.classList.remove('pets__cards_hide');
        cardsContainer.classList.add('pets__cards_show');
    }, 800)

}

function screenCheck(){
    if (mediaQuery1280.matches) {
        petsOnPage = 3;
    } else if (mediaQuery768.matches) {
        petsOnPage = 2;
    } else {
        petsOnPage = 1;
    }
    getRandomPets();
    generateCards();
}

function showInfo(event) {
        let id = event.target.closest('.pets__card_item').id;
        infoContainer.innerHTML = '';
        let { age, breed, description, diseases, img, inoculations, name, parasites, type } = fullPetsList[id];
        infoContainer.innerHTML =
        `
        <button class="info__close_button">
        <img src="../../assets/icons/close.svg">
        </button>
        <img class="info__img" src="${img}" alt="${type} ${name}">
        <div class="info__more">
        <div class="info__title">${name}</div>
        <div class="info__subtitle">${type} - ${breed}</div>
        <div class="info__text">${description}</div>
        <ul class="info__about">
            <li><b>Age:</b> ${age}</li>
            <li><b>Inoculations:</b> ${inoculations}</li>
            <li><b>Diseases:</b> ${diseases}</li>
            <li><b>Parasites:</b> ${parasites}</li>
        </ul>
        </div>
        `;
        closeButton = document.querySelector('.info__close_button');
        closeButton.addEventListener('click', hideInfo);
        blackoutInfo.classList.add('blackout_info_active');
        infoContainer.classList.add('info_active');
        document.body.style.overflow = 'hidden';
}

function hideInfo() {
        document.body.style.overflow = 'visible';
        blackoutInfo.classList.remove('blackout_info_active');
        infoContainer.classList.remove('info_active');
}

function changePage(event) {
    getRandomPets();
    generateCards();
}

async function init() {
    screenCheck();
    await getObjectPets('assets/js/pets.json', 8);
    getRandomPets();
    generateCards();

    blackoutInfo.addEventListener('click', hideInfo);
    blackoutInfo.addEventListener("mouseleave", ()=>{closeButton.classList.remove("info__close_button_hover")});
    blackoutInfo.addEventListener("mouseenter", ()=>{closeButton.classList.add("info__close_button_hover")});

    mediaQuery1280.addEventListener('change', screenCheck);
    mediaQuery320.addEventListener('change', screenCheck);
}

init();