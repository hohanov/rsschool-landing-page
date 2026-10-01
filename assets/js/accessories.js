const accessoriesLeashes = ['2 m', '3 m', '5 m'];
const accessoriesItems = ['Food bowl', 'Ball'];

function accessoryButton(group, value, label) {
    return `<button class="info__accessory" type="button" data-group="${group}" data-value="${value}" aria-pressed="false">${label}</button>`;
}

export function getAccessoriesMarkup() {
    return `
        <div class="info__accessories">
            <div class="info__accessories_title">Accessories</div>
            <div class="info__accessories_group">
                <span class="info__accessories_label">Leash:</span>
                ${accessoriesLeashes.map((length) => accessoryButton('leash', `Leash ${length}`, length)).join('')}
            </div>
            <div class="info__accessories_group">
                ${accessoriesItems.map((item) => accessoryButton('item', item, item)).join('')}
            </div>
            <div class="info__accessories_selected">Selected: none</div>
        </div>
    `;
}

function toggleAccessory(button, active) {
    button.classList.toggle('info__accessory_active', active);
    button.setAttribute('aria-pressed', active);
}

export function initAccessories(container) {
    const accessories = container.querySelector('.info__accessories');
    const selected = accessories.querySelector('.info__accessories_selected');
    const buttons = accessories.querySelectorAll('.info__accessory');

    accessories.addEventListener('click', (event) => {
        const button = event.target.closest('.info__accessory');
        if (!button) return;

        const active = !button.classList.contains('info__accessory_active');
        if (button.dataset.group === 'leash' && active) {
            buttons.forEach((other) => {
                if (other.dataset.group === 'leash') toggleAccessory(other, false);
            });
        }
        toggleAccessory(button, active);

        const values = Array.from(buttons)
            .filter((item) => item.classList.contains('info__accessory_active'))
            .map((item) => item.dataset.value);
        selected.textContent = `Selected: ${values.length ? values.join(', ') : 'none'}`;
    });
}
