import { mediaQuery1280, mediaQuery768, mediaQuery320, getPets, createCards } from './cards.js';
import { showInfo } from './modal.js';

const cardsContainer = document.querySelector('.pets__cards');
const previousButton = document.getElementById('slider-previous');
const nextButton = document.getElementById('slider-next');

const renderCards = createCards(cardsContainer, showInfo);

let sliderPets = [];
let startIndex = 0;
let petsOnPage;

function generateCards(){
    const pets = [];
    for (let i = 0; i < petsOnPage; i++) {
        pets.push(sliderPets[(startIndex + i) % sliderPets.length]);
    }
    renderCards(pets);
}

function screenCheck(){
    if (mediaQuery1280.matches) {
        petsOnPage = 3;
    } else if (mediaQuery768.matches) {
        petsOnPage = 2;
    } else {
        petsOnPage = 1;
    }
    generateCards();
}

function changePage(step) {
    const count = sliderPets.length;
    startIndex = ((startIndex + step * petsOnPage) % count + count) % count;
    generateCards();
}

async function init() {
    sliderPets = (await getPets('assets/js/pets.json')).slice(0, 9);
    screenCheck();

    previousButton.addEventListener('click', () => changePage(-1));
    nextButton.addEventListener('click', () => changePage(1));

    mediaQuery1280.addEventListener('change', screenCheck);
    mediaQuery320.addEventListener('change', screenCheck);
}

init();
