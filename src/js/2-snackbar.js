// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = delayInput();
  const radio = radioChoice();
  makePromise({ delay, radio })
    .then(message => {
      const optionSucces = {
        backgroundColor: 'green',
        imageWidth: '25px',
        messageColor: 'white',
        messageSize: '35px',
        position: 'topRight',
        theme: 'light',
        close: false,
        maxWidth: '500px',
        message: `${message}`,
      };
      iziToast.show(optionSucces);
    })
    .catch(error => {
      const optionFail = {
        backgroundColor: 'red',
        imageWidth: '25px',
        messageColor: 'white',
        messageSize: '35px',
        position: 'topRight',
        theme: 'light',
        close: false,
        minWidth: '500px',
        message: `${error}`,
      };
      iziToast.show(optionFail);
    });
});

function delayInput() {
  const delay = form.elements['delay'].value;
  return delay;
}

function radioChoice() {
  const radio = form.elements['state'].value;
  return radio;
}

const makePromise = ({ delay, radio }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radio === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};
