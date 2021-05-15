// globals

const themes = [
  {
    '--main-bg': 'hsl(222, 26%, 31%)',
    '--keypad-bg': 'hsl(223, 31%, 20%)',
    '--screen-bg': 'hsl(224, 36%, 15%)',

    '--action-key-bg': 'hsl(225, 21%, 49%)',
    '--action-key-shadow': 'hsl(224, 28%, 35%)',
    '--toggle-bg': 'hsl(6, 63%, 50%)',
    '--toggle-shadow': 'hsl(6, 70%, 34%)',

    '--key-bg': 'hsl(30, 25%, 89%)',
    '--key-shadow': 'hsl(28, 16%, 65%)',

    '--text': 'hsl(221, 14%, 31%)',
    '--secondary': 'hsl(0, 0%, 100%)',
    '--screen-text-color': 'hsl(0, 0%, 100%)',
  },
  {
    '--main-bg': 'hsl(0, 0%, 90%)',
    '--keypad-bg': 'hsl(0, 5%, 81%)',
    '--screen-bg': 'hsl(0, 0%, 93%)',

    '--action-key-bg': 'hsl(185, 42%, 37%)',
    '--action-key-shadow': 'hsl(185, 58%, 25%)',
    '--toggle-bg': 'hsl(25, 98%, 40%)',
    '--toggle-shadow': 'hsl(25, 99%, 27%)',

    '--key-bg': 'hsl(30, 25%, 89%)',
    '--key-shadow': 'hsl(28, 16%, 65%)',

    '--text': 'hsl(60, 10%, 19%)',
    '--secondary': 'hsl(0, 0%, 100%)',
    '--screen-text-color': 'hsl(60, 10%, 19%)',
  },
  {
    '--main-bg': 'hsl(268, 75%, 9%)',
    '--keypad-bg': 'hsl(268, 71%, 12%)',
    '--screen-bg': 'hsl(268, 71%, 12%)',

    '--action-key-bg': 'hsl(281, 89%, 26%)',
    '--action-key-shadow': 'hsl(285, 91%, 52%)',
    '--toggle-bg': 'hsl(176, 100%, 44%)',
    '--toggle-shadow': 'hsl(177, 92%, 70%)',

    '--key-bg': 'hsl(268, 47%, 21%)',
    '--key-shadow': 'hsl(290, 70%, 36%)',

    '--text': 'hsl(52, 100%, 62%)',
    '--secondary': 'hsl(0, 0%, 100%)',
    '--tertiary': 'hsl(198, 20%, 13%)',
    '--screen-text-color': 'hsl(52, 100%, 62%)',
  },
];

let answer = 0;
let prevValue = 0;
let operation = null;

const numbers = new Array(10).fill(0).map((el, i) => i);
const nodes = numbers.map((i) => document.querySelector(`#n${i}`));

// utilities
function updateScreen(value) {
  document.querySelector('#screen').textContent = value;
}

function formattedValue(value) {
  return value === '.' ? value : parseFloat(value).toLocaleString();
}

// events
document.querySelector('#keyboard').addEventListener('click', keyPressEvent);

// eventListenteners
function keyPressEvent(event) {
  let key = event.target.textContent;
  console.log('clicked value:', key);

  if ('+-x/'.indexOf(key) !== -1) {
    updateScreen('0');
    prevValue = answer;
    operation = key;
    answer = 0;
  } else if ('1234567890.'.indexOf(key) !== -1) {
    if (answer === 0) {
      answer = key;
    } else {
      answer += key;
    }
    updateScreen(formattedValue(answer));
  } else if (key === '=') {
    if (operation === '+') {
      prevValue = parseFloat(prevValue) + parseFloat(answer);
    } else if (operation === '-') {
      prevValue -= answer;
    } else if (operation === 'x') {
      prevValue *= answer;
    } else {
      prevValue /= answer;
    }
    answer = prevValue;
    updateScreen(formattedValue(prevValue));
  } else {
    if (key === 'DEL') {
      answer = new String(answer).slice(0, answer.length - 1) || 0;
      updateScreen(answer);
    } else if (key === 'RESET') {
      answer = 0;
      prevValue = 0;
      operation = null;
      updateScreen('0');
    }
  }

  console.log(
    `prevValue=${prevValue} | answer=${answer} | operation=${operation}`
  );
}

// THEME handling
document.querySelector('#theme-range').addEventListener('change', (event) => {
  const themeIndex = event.target.value - 1;

  const currentTheme = themes[themeIndex];
  Object.entries(currentTheme).forEach(([key, value]) => {
    // console.log('key, value:', key, value);
    const root = document.querySelector(':root');
    root.style.setProperty(key, value);
  });
});
