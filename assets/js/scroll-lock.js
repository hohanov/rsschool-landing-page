const lockOwners = new Set();

export function lockScroll(owner) {
    lockOwners.add(owner);
    document.documentElement.classList.add('overflow-y-hidden');
}

export function unlockScroll(owner) {
    lockOwners.delete(owner);
    if (lockOwners.size === 0) {
        document.documentElement.classList.remove('overflow-y-hidden');
    }
}
