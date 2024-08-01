import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

const btn = document.querySelector('button');
btn.disabled = true;
btn.style.cursor = 'not-allowed';

let userSelectedDate = null;

const options = {
  locale: Ukrainian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    if (userSelectedDate < now) {
      alert('Please choose a date in the future');
      btn.disabled = true;
      btn.style.cursor = 'not-allowed';
      return;
    }
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  },
};

flatpickr('#datetime-picker', options);

btn.addEventListener('click', () => {
  const differenceTime = timeDiff();
  const calculateTimeValue = convertTime(differenceTime);
  const addZero = addLeadingZero(calculateTimeValue);
  setTimeInterface(addZero);
});

function timeDiff() {
  const now = new Date();
  const differenceTime = userSelectedDate - now;
  return differenceTime;
}

function convertTime(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const newDate = {};
  for (const key in value) {
    newDate[key] = String(value[key]).padStart(2, '0');
  }
  return newDate;
}

function setTimeInterface(date) {
  document.querySelector('[data-days]').textContent = date.days;
  document.querySelector('[data-hours]').textContent = date.hours;
  document.querySelector('[data-minutes]').textContent = date.minutes;
  document.querySelector('[data-seconds]').textContent = date.seconds;
}
