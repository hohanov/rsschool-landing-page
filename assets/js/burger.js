import { lockScroll, unlockScroll } from './scroll-lock.js';

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuCloseItem = document.querySelector('.header__nav-close');
const menuLinks = document.querySelectorAll('.list__link');
const blackout = document.querySelector('.blackout');
// const selfLink = document.querySelector('.list__link_active');

const desktopQuery = window.matchMedia("(min-width: 769px)");

function closeMenu() {
    unlockScroll('menu');
    burger.classList.add('burger_inactive');
    menu.classList.add('burger_menu_inactive');
    menu.classList.remove('burger_menu_active');
    blackout.classList.remove('blackout_active');
    burger.classList.remove('burger_active');
    document.removeEventListener("keydown", onMenuKeydown);
}

function openMenu() {
    blackout.classList.add('blackout_active');
    menu.classList.add('burger_menu_active');
    burger.classList.add('burger_active');
    menu.classList.remove('burger_menu_inactive');
    burger.classList.remove('burger_inactive');
    lockScroll('menu');
    document.addEventListener("keydown", onMenuKeydown);
}

function toggle() {
    if (menu.classList.contains('burger_menu_active')) closeMenu();
    else openMenu()
}

function onBreakpointChange(event) {
    if (event.matches && menu.classList.contains('burger_menu_active')) {
        closeMenu();
    }
}

function onMenuKeydown(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}

burger.addEventListener('click', toggle);
blackout.addEventListener('click', toggle);
menuLinks.forEach(element => element.addEventListener('click', toggle));
// selfLink.addEventListener('click', toggle);

desktopQuery.addEventListener("change", onBreakpointChange);

