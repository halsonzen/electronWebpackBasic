
const {ipcRenderer} = require('electron');
const navbar = document.querySelector('#navbar');
const menuToggleButton = document.querySelector('#menuToggleButton');
const minimizeButton = document.querySelector('#minimizeButton');
const maximizeButton = document.querySelector('#maximizeButton');
const closeButton = document.querySelector('#closeButton');

console.log(navbar)
menuToggleButton.addEventListener('click', () => {
    // menuColumn.classList.toggle("is-hidden");
    // menuToggleButton.classList.toggle("is-active");
}, false)

minimizeButton.addEventListener('click', () => {
   ipcRenderer.invoke('window.minimize');
}, false)

maximizeButton.addEventListener('click', () => {

    const iElement = maximizeButton.querySelector("i");
    if (iElement.classList.value.includes('far fa-window-maximize')) {
        ipcRenderer.invoke('window.maximize');
        iElement.classList = 'far fa-window-restore';
    }
    else if (iElement.classList.value.includes('far fa-window-restore')) {
        ipcRenderer.invoke('window.unmaximize');
        iElement.classList = 'far fa-window-maximize';
    }

}, false)

closeButton.addEventListener('click', () => {
    ipcRenderer.invoke('window.close')
}, false)

window.addEventListener('resize', ()=>{
    const iElement = maximizeButton.querySelector('i');
    if(window.outerHeight != window.screen.availHeight && window.outerWidth != window.screen.availWidth)
        iElement.classList = 'far fa-window-maximize';
    else
        iElement.classList = 'far fa-window-restore';
})