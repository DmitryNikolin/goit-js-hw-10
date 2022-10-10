// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const timerShow = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');

const fields = document.querySelectorAll('.field');
const spanValue = document.querySelectorAll('.value');
const spanLabel = document.querySelectorAll('.label');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timeInterval = null;
let selectedDate = new Date();
btnStart.disabled = true;
timerShow.style.display = 'flex';

for (const span of spanValue) {
  span.style.fontSize = '2.25rem';
  span.style.fontWeight = '500';
}

for (const span of spanLabel) {
  span.style.fontSize = '0.75rem';
  span.style.textTransform = 'uppercase';
}

for (const field of fields) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.justifyContent = 'center';
  field.style.alignItems = 'center';
  field.style.marginRight = '10px';
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Пожалуйста выберите дату больше текущей...');
      return clearInterval(timeInterval);
    }
    if (selectedDates[0] > new Date()) {
      btnStart.disabled = false;
    }
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
  },
};
flatpickr(dateTimePicker, options);

btnStart.addEventListener('click', startCount);

function startCount() {
  timeInterval = setInterval(timeCounter, 1000);
}

function timeCounter() {
  let deltaTime = selectedDate - new Date();
  const time = convertMs(deltaTime);

  if (deltaTime <= 0) {
    Notiflix.Notify.success('Обратный отсчет окончен!');
    btnStart.disabled = true;
    clearInterval(timeInterval);
    return;
  }

  updateTimerFace(time);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms/day));
  const hours = addLeadingZero(Math.floor((ms%day)/hour));
  const minutes = addLeadingZero(Math.floor(((ms%day)%hour)/minute));
  const seconds = addLeadingZero(Math.floor((((ms % day)%hour)%minute)/second));

  return { days, hours, minutes, seconds };
}
