import { mediaQuery1280, mediaQuery768, mediaQuery320, getPets, createCards } from './cards.js';
import { showInfo } from './modal.js';

const cardsContainer = document.querySelector('.pets__cards');
const categoryButtons = document.querySelectorAll('.pets__button[data-category]');

const paginationContainer = document.getElementById('pagination');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

const renderCards = createCards(cardsContainer, showInfo);

let allPets = [];
let fullPetsList = [];
let activeCategory;
let petsOnPage, pageNumber, pageQuantity;

function filterPets() {
    fullPetsList = allPets.filter((pet) => pet.category === activeCategory);
    for (let i = fullPetsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fullPetsList[i], fullPetsList[j]] = [fullPetsList[j], fullPetsList[i]];
    }
}

function setCategory(category) {
    activeCategory = category;
    categoryButtons.forEach((button) => {
        button.classList.toggle('pets__button_active', button.dataset.category === category);
    });
    filterPets();
    screenCheck();
}

function changeCategory(event) {
    const category = event.currentTarget.dataset.category;
    if (category !== activeCategory) {
        setCategory(category);
    }
}

function generateCards() {
    const start = petsOnPage * (pageNumber - 1);
    return renderCards(fullPetsList.slice(start, start + petsOnPage));
}

function scrollToFirstCard() {
    const firstCard = cardsContainer.firstElementChild;
    if (!firstCard) return;
    const headerBottom = document.querySelector('.header').getBoundingClientRect().bottom;
    const { top } = firstCard.getBoundingClientRect();
    if (top < headerBottom || top > window.innerHeight) {
        window.scrollBy({ top: top - headerBottom, behavior: 'smooth' });
    }
}

function screenCheck(){
    if (mediaQuery1280.matches) {
        petsOnPage = 8;
    } else if (mediaQuery768.matches) {
        petsOnPage = 6;
    } else {
        petsOnPage = 3;
    }
    pageNumber = 1;
    pageQuantity = Math.max(1, Math.ceil(fullPetsList.length / petsOnPage));
    changePaginationStatus();
    generateCards();
}

function changePaginationStatus() {
    paginationContainer.querySelectorAll('.pets__page_button').forEach((button) => button.remove());
    for (let page = 1; page <= pageQuantity; page++) {
        let button = document.createElement('button');
        button.className = page === pageNumber
            ? 'pets__paginator pets__page_button'
            : 'slider__button pets__page_button';
        button.dataset.page = page;
        button.textContent = page;
        nextButton.before(button);
    }
    previousButton.disabled = pageNumber <= 1;
    nextButton.disabled = pageNumber >= pageQuantity;
}

function changePage(event) {
    let button = event.target.closest('button');
    if (!button || button.disabled) return;
    let newPage = pageNumber;
    if (button.dataset.page) {
        newPage = Number(button.dataset.page);
    } else if (button.id === 'next') {
        newPage = pageNumber + 1;
    } else if (button.id === 'previous') {
        newPage = pageNumber - 1;
    }
    if (newPage === pageNumber) return;
    pageNumber = newPage;
    changePaginationStatus();
    generateCards().then(scrollToFirstCard);
}

async function init() {
    allPets = await getPets('./assets/js/pets.json');
    setCategory(categoryButtons[0].dataset.category);

    categoryButtons.forEach((button) => button.addEventListener('click', changeCategory));
    paginationContainer.addEventListener('click', changePage);

    mediaQuery1280.addEventListener('change', screenCheck);
    mediaQuery320.addEventListener('change', screenCheck);
}

init();
