import App from './App';
import { createRoot } from 'react-dom/client';
import { playTyping, playEnter } from './lib/AudioPlayer';
import { body } from './lib/Splash';
import './assets/fonts/HaiEisya.woff'
import './css/index.css';

const appRoot = document.querySelector('main');

createRoot(appRoot).render(
  <App
    TodoItems={localStorage.getItem('todo')}
    ReadyListener={body} />
);

/* disable right click */
//document.oncontextmenu = () => false;

document.onkeydown = (event) => {
  if (event.key === 'Enter' || event.key === 'Backspace')
    playEnter();

  if (
    event.key !== 'Enter' &&
    event.key !== 'Escape' &&
    event.key !== 'Shift' &&
    event.key !== 'Backspace' &&
    event.key !== 'Control'
  ) playTyping();

  if (event.key === 'Escape')
    document.querySelectorAll('input').forEach(input => input.blur());
};

if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('/sw.js').catch(() =>
    console.warn('An error occurred while registering service worker.')
  );