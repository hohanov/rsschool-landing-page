
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuCloseItem = document.querySelector('.header__nav-close');
const menuLinks = document.querySelectorAll('.list__link');
const blackout = document.querySelector('.blackout');
const logo = document.querySelector('.logo');
const selfLink = document.querySelector('.list__link_active');

function toggle() {
    if (menu.classList.contains('burger_menu_active')) {
        document.documentElement.classList.remove('overflow-y-hidden');
        burger.classList.add('burger_inactive');
        menu.classList.add('burger_menu_inactive');
        menu.classList.remove('burger_menu_active');
        blackout.classList.remove('blackout_active');
        logo.classList.remove('logo_active');
        burger.classList.remove('burger_active');
    } else {
        blackout.classList.add('blackout_active');
        menu.classList.add('burger_menu_active');
        logo.classList.add('logo_active');
        burger.classList.add('burger_active');
        menu.classList.remove('burger_menu_inactive');
        burger.classList.remove('burger_inactive');
        document.documentElement.classList.add('overflow-y-hidden');
    }
}

burger.addEventListener('click', toggle);
blackout.addEventListener('click', toggle);
selfLink.addEventListener('click', toggle);

