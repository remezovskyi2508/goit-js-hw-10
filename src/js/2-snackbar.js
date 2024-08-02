const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
});

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


//Перевірка
makePromise({ delay: 2000, radio: 'Rejected' })
  .then(message => {
    console.log(message);
  })
  .catch(error => {
    console.error(error);
  });
