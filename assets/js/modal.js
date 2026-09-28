import { getAccessoriesMarkup, initAccessories } from './accessories.js';
import { lockScroll, unlockScroll } from './scroll-lock.js';

const blackoutInfo = document.querySelector('.blackout_info');
const infoContainer = document.querySelector('.info');

export function showInfo(pet) {
    const { age, breed, description, diseases, img, inoculations, name, parasites, type } = pet;
    infoContainer.innerHTML =
    `
    <button class="info__close_button"></button>
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
    ${getAccessoriesMarkup()}
    <button class="info__order_button" type="button">Adopt</button>
    </div>
    `;
    infoContainer.querySelector('.info__close_button').addEventListener('click', hideInfo);
    initAccessories(infoContainer);
    blackoutInfo.classList.add('blackout_info_active');
    infoContainer.classList.add('info_active');
    lockScroll('info');
    document.addEventListener('keydown', onInfoKeydown);
}

function hideInfo() {
    unlockScroll('info');
    blackoutInfo.classList.remove('blackout_info_active');
    infoContainer.classList.remove('info_active');
    document.removeEventListener('keydown', onInfoKeydown);
}

function onInfoKeydown(event) {
    if (event.key === 'Escape') {
        hideInfo();
    }
}

blackoutInfo.addEventListener('click', hideInfo);
