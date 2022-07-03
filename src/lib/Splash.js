const Delay = 500;
const FadeTransition = 1000;

const body = document.querySelector('body');
const listenerEvent = new Event('finishedSplash');

(() => {
  const elementExistent = document.querySelector('#splashElement');
  if (elementExistent) elementExistent.remove();

  const splashElement = document.createElement('div');
  splashElement.id = 'splashElement';

  const loader = document.createElement('div');
  loader.className = 'loader';

  const styles = document.createElement('style');
  styles.textContent = `#splashElement {position:absolute;background:black;top:0;left:0;width:100%;height:100%;
    display:flex;justify-content:center;align-items: center;}
  @keyframes fadein {0%{opacity:0;}100%{opacity:1;}}
  @keyframes fadeout {0%{opacity:1;}100%{opacity:0;}}
  #splashElement.applyFadeOut {animation:fadeout ${FadeTransition}ms linear;}
  #splashElement .loader {position:absolute;width:3rem;height:3rem;border-radius:50%;
    background:linear-gradient(0deg,transparent 50%,white);animation:loaderMove ${Delay / 3}ms linear infinite;}
  #splashElement .loader::before {position:absolute;content:"";top:10px;left:10px;right:10px;bottom:10px;
    background:black;border-radius:50%;z-index:2;}
  #splashElement .loader::after {position:absolute;content:"";top:0;left:0;width:100%;height:100%;
    border-radius:50%;background:linear-gradient(0deg,transparent 50%,rgb(255,255,255,.8));filter:blur(20px);}
  @keyframes loaderMove {0%{transform:rotate(0deg);}100%{transform:rotate(360deg)}}`;

  splashElement.appendChild(loader);
  body.appendChild(splashElement);
  body.appendChild(styles);

  function deleteElement() {
    splashElement.classList.add('applyFadeOut');
    setTimeout(() => {
      splashElement.remove();
      styles.remove();
      body.dispatchEvent(listenerEvent);
    }, FadeTransition);
  }

  setTimeout(deleteElement, Delay);
})();

export {
  body
}