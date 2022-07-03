/* eslint-disable */
const INFORMATION = 'https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API';
console.log(`Service Worker started! More information at ${INFORMATION}.`);

self.addEventListener('install', (event) => console.warn(`Service Worker: Installed. ${JSON.stringify(event)}`));
self.addEventListener('activate', (event) => {
  console.log(`Service Worker: Activated. => ${JSON.stringify(event)}`);
  
  fetch('lipsum.txt')
    .then(file => file.text())
    .then(contentText => console.info(contentText))
    .catch(() => console.log('An error occurred while loading file.'));
});