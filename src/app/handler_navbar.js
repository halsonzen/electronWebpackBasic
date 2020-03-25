const electron = require('electron');
const window = electron.remote.getCurrentWindow();
const menuColumn = document.querySelector('#menuColumn');
const menuToggleButton = document.querySelector('#menuToggleButton');
const minimizeButton = document.querySelector('#minimizeButton');
const maximizeButton = document.querySelector('#maximizeButton');
const closeButton = document.querySelector('#closeButton');

menuToggleButton.addEventListener('click', () => {
    menuColumn.classList.toggle("is-hidden");
    menuToggleButton.classList.toggle("is-active");
}, false)

minimizeButton.addEventListener('click', () => {
    window.minimize();
}, false)

maximizeButton.addEventListener('click', () => {

    const iElement = maximizeButton.querySelector("i");
    if (iElement.classList.value.includes('far fa-window-maximize')) {
        window.maximize();
        iElement.classList = 'far fa-window-restore';
    }
    else if (iElement.classList.value.includes('far fa-window-restore')) {
        window.unmaximize();
        iElement.classList = 'far fa-window-maximize';
    }

}, false)

closeButton.addEventListener('click', () => {
    window.close();
}, false)

window.on('move', (e) => {
    if (!window.isMaximized()) {
        const iElement = maximizeButton.querySelector("i");
        iElement.classList = 'far fa-window-maximize';
    }
});

