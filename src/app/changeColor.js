const buttonChangeColor = document.querySelector('#button_changeColor');
const headline = document.querySelector('#headline');

buttonChangeColor.addEventListener('click', () => {

    headline.classList.toggle("red");
    if (buttonChangeColor.innerHTML === 'Make it Red!')
        buttonChangeColor.innerHTML = 'Make it back!';
    else if (buttonChangeColor.innerHTML === 'Make it back!')
        buttonChangeColor.innerHTML = 'Make it Red!';

}, false)