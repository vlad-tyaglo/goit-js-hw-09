import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(` Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(` Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.target;

  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, delayEl)
      .then(result => {
        Notiflix.Notify.success(result);
      })
      .catch(err => Notiflix.Notify.failure(err));
    delayEl += stepEl;
  }
  e.target.reset();
}

formEl.addEventListener('submit', onFormSubmit);