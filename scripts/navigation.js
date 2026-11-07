const menuButton = document.querySelector('#menu-button');
const mainNav = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav.classList.add('menu-ready');
menuButton.hidden = false;