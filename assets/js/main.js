import { mediaQuery1280, mediaQuery768, mediaQuery320, getPets, createCards } from './cards.js';
import { showInfo } from './modal.js';

const cardsContainer = document.querySelector('.pets__cards');

const pagesButtons = document.querySelectorAll('.slider__button');

const renderCards = createCards(cardsContainer, showInfo);

let fullPetsList = [];
let pastPets = [];
let currentPets = [];
let petsOnPage;

function getRandomPets(){
    pastPets = currentPets.slice();
    currentPets = [];
    let n;
    for (let i = 0; i < petsOnPage; i++) {
        do {
            n = (Math.floor(Math.random() * 16));
        } while (pastPets.includes(n) || currentPets.includes(n));
        currentPets.push(n);
    }
}

function generateCards(){
    renderCards(currentPets.map((index) => fullPetsList[index]));
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

function changePage() {
    getRandomPets();
    generateCards();
}

async function init() {
    fullPetsList = await getPets('assets/js/pets.json');
    screenCheck();

    pagesButtons.forEach((button) => button.addEventListener('click', changePage));

    mediaQuery1280.addEventListener('change', screenCheck);
    mediaQuery320.addEventListener('change', screenCheck);
}

init();
