import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// const {
//   elements: { inputDelay, inputDelayStep, inputAmount },
// } = form;
const inputDelay = document.querySelector('input[name=delay]');
const inputDelayStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const btnStart = document.getElementsByTagName('button');
const fieldWidth = '250px';

form.style.display = 'flex';
form.style.flexDirection = 'column';
form.style.alignItems = 'flex-start';
inputDelay.style.display = 'flex';
inputDelay.style.flexDirection = 'column';
inputDelay.style.alignItems = 'flex-start';
inputDelay.style.marginBottom = '10px';
inputDelay.style.width = fieldWidth;
inputDelayStep.style.display = 'flex';
inputDelayStep.style.flexDirection = 'column';
inputDelayStep.style.alignItems = 'flex-start';
inputDelayStep.style.marginBottom = '10px';
inputDelayStep.style.width = fieldWidth;
inputAmount.style.display = 'flex';
inputAmount.style.flexDirection = 'column';
inputAmount.style.alignItems = 'flex-start';
inputAmount.style.marginBottom = '10px';
inputAmount.style.width = fieldWidth;
btnStart[0].style.fontSize = '16px';
btnStart[0].style.fontWeight = '600';
btnStart[0].style.width = fieldWidth;
form.addEventListener('submit', event => {
  event.preventDefault();
  let firstDelay = Number(inputDelay.value);
  let step = Number(inputDelayStep.value);
  let amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}