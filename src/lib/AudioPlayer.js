import audioFile_add from '../assets/sounds/add.wav';
import audioFile_delete from '../assets/sounds/delete.wav';
import audioFile_deleteall from '../assets/sounds/deleteall.wav';

import audioFile_keyboard_1 from '../assets/sounds/keyboard/1.wav';
import audioFile_keyboard_2 from '../assets/sounds/keyboard/2.wav';
import audioFile_keyboard_3 from '../assets/sounds/keyboard/3.wav';
import audioFile_keyboard_4 from '../assets/sounds/keyboard/4.wav';
import audioFile_keyboard_5 from '../assets/sounds/keyboard/5.wav';
import audioFile_keyboard_6 from '../assets/sounds/keyboard/6.wav';
import audioFile_keyboard_7 from '../assets/sounds/keyboard/7.wav';
import audioFile_keyboard_8 from '../assets/sounds/keyboard/8.wav';

import audioFile_keyboard_enter from '../assets/sounds/keyboard/enter/enter.wav';

const KEYBOARD_TYPING = [
  audioFile_keyboard_1,
  audioFile_keyboard_2,
  audioFile_keyboard_3,
  audioFile_keyboard_4,
  audioFile_keyboard_5,
  audioFile_keyboard_6,
  audioFile_keyboard_7,
  audioFile_keyboard_8
];

function playTyping() {
  let randomIndex = Math.floor(Math.random(1, KEYBOARD_TYPING.length - 1) * 10);
  while (randomIndex >= KEYBOARD_TYPING.length)
    randomIndex--;
  let typingAudio = new Audio(KEYBOARD_TYPING[randomIndex]);
  typingAudio.volume = 0.4;
  audioPromise(typingAudio.play());
}

let audioEnter = new Audio(audioFile_keyboard_enter);
audioEnter.volume = 0.4;
function playEnter() {
  audioPromise(audioEnter.play());
}

const ADD = 'add';
const DELETE = 'delete';
const DELETEALL = 'deleteall';
const EMPTY = 'empty';
const SELECT = 'select';

const AUDIO_TYPES = [
  ADD,
  DELETE,
  DELETEALL,
  EMPTY,
  SELECT
];

function playAudio(audioType) {
  if (audioType === undefined || audioType === null)
    throw new Error('Audio type must be specified.');
  else if (!AUDIO_TYPES.includes(audioType))
    throw new Error('Audio type does not match any.');

  const audioDeleteAll = new Audio(audioFile_deleteall);
  const audioDelete = new Audio(audioFile_delete);
  const audioPlay = new Audio(audioFile_add);

  switch (audioType) {
    case ADD:
      audioPromise(audioPlay.play());
      break;
    case DELETE:
      audioPromise(audioDelete.play());
      break;
    case DELETEALL:
      audioPromise(audioDeleteAll.play());
      break;
    default:
      throw new Error(`Unknown audio type: ${audioType}`);
  }
}

function audioPromise(promise) {
  if (promise !== undefined)
    promise.catch(() => console.warn('Audio reproduction failed.'));
}

export {
  ADD, DELETE, DELETEALL, EMPTY, SELECT,
  playAudio, playTyping, playEnter
}