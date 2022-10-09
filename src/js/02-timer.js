// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const timerShow = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
let timeInterval = null;
let selectedDate = null;
btnStart.disabled = true;

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
  timerShow.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
