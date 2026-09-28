export const mediaQuery1280 = window.matchMedia('(min-width: 1281px)');
export const mediaQuery768 = window.matchMedia('(max-width: 1280px) and (min-width: 769px)');
export const mediaQuery320 = window.matchMedia('(max-width: 768px)');

export async function getPets(src) {
    const res = await fetch(src);
    return res.json();
}

function cardMarkup({ img, name, type }, index) {
    return `
    <div class="pets__card_item" data-index="${index}">
        <img src="${img}" alt="${type} ${name}" class="pets__card_image">
        <div class="pets__card_content">
            <h4 class="pets__card_title">
            ${name}
            </h4>
            <button class="pets__card_button">
                Learn more
            </button>
        </div>
    </div>
    `;
}

// Returns a render(pets) function that resolves once the new cards are in the DOM;
// clicks on a card call onSelect(pet).
export function createCards(container, onSelect) {
    let shownPets = [];

    container.addEventListener('click', (event) => {
        const card = event.target.closest('.pets__card_item');
        if (card) onSelect(shownPets[card.dataset.index]);
    });

    return function render(pets) {
        container.classList.remove('pets__cards_show');
        container.classList.add('pets__cards_hide');
        return new Promise((resolve) => setTimeout(() => {
            shownPets = pets;
            container.innerHTML = pets.map(cardMarkup).join('');
            container.classList.remove('pets__cards_hide');
            container.classList.add('pets__cards_show');
            resolve();
        }, 400));
    };
}
