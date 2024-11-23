const $ = require('jquery');
require('jquery-mask-plugin');

const menuBtn = document.querySelector('.btn--menu');
const inputs = document.querySelectorAll('.input');
const inputsText = document.querySelectorAll('.input-text');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');

const tooltipLinks = document.querySelectorAll('.tooltip-link');

tooltipLinks.forEach( link => {
  const id = link.dataset.tooltipId;
  const tooltip = document.querySelector('#tooltip-'+id);

  const show = () => {
    const rect = link.getBoundingClientRect();

    tooltip.classList.add('--visibled');
    document.body.classList.add('no-scroll');

    tooltip.style.top = `${ rect.bottom }px`;

    if (window.innerWidth > 740) {
      if (rect.left < window.innerWidth / 2) {
        tooltip.style.right = 'auto';
        tooltip.style.left = `${ rect.left }px`;
      } else {
        tooltip.style.left = 'auto';
        tooltip.style.right = `${ window.innerWidth - rect.right }px`;
      }
    }
  }

  const hide = () => {
    tooltip.classList.remove('--visibled');
    document.body.classList.remove('no-scroll');
  }

  document.addEventListener('click', (ev) => {
    const btnOk = tooltip.querySelector('.tooltip__btn-ok');

    if (ev.composedPath().includes(tooltip) || ev.composedPath().includes(link)) {
      show();
      if (ev.composedPath().includes(btnOk)) {
        hide();
      }
    } else {
      hide();
    }
  });

  document.addEventListener('mousemove', (ev) => {
    if (ev.composedPath().includes(tooltip) || ev.composedPath().includes(link)) {
      show();
    } else {
      hide();
    }
  });
});

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('--opened');
  });
}

if (formMain) {
  const form = formMain.querySelector('.form-main__form');

  if (form) {
    formMain.addEventListener('submit', (e) => {
      e.preventDefault();
    });


  }
}

inputs.forEach((input) => {
  const btn = input.querySelector('.input__wrapper button');
  const inputElem = input.querySelector('.input__wrapper input');

  // Reset state
  input.addEventListener('click', () => {
    input.dataset.status = "";
  });

  // Clear input
  inputElem.addEventListener('input', () => {
    if (inputElem.value.length > 0) {
      input.classList.add('--clear-on');
    } else {
      input.classList.remove('--clear-on');
    }
  });

  btn.addEventListener('click', () => {
    // Passwd visible or hide
    if (input.classList.contains('input--passwd')) {
      if (inputElem.getAttribute('type') === 'password') {
        inputElem.setAttribute('type', 'text');
      } else {
        inputElem.setAttribute('type', 'password');
      }
    }
    // Clear input
    else if (input.classList.contains('--clear-on')) {
      input.classList.remove('--clear-on');
      inputElem.value = '';
    }
  });
})

inputsText.forEach(input => {
  const inputElem = input.querySelector('input');
  const btn = input.querySelector('.btn');

  inputElem.addEventListener('input', ev => {
    if (inputElem.value.length > 0) {
      input.classList.add('--clear-on');
    } else {
      input.classList.remove('--clear-on');
    }
  });

  btn.addEventListener('click', ev => {
    inputElem.value = '';
    input.classList.remove('--clear-on');
  });
});

if (search) {
  const form = search.querySelector('.search__form');

  if (form) {
    const inputs = form.querySelectorAll('.input');
    const switchElem = form.querySelector('.switch input');
    const switchLabel = form.querySelector('.switch__label');

    inputs.forEach((input, index) => {
      const inputElem = input.querySelector('.input__wrapper input');
      const btn = input.querySelector('.input__wrapper button');
      
      // Set mask inputs
      $(inputElem).mask(inputElem.dataset.mask);

      const disableInputs = () => {
        inputs.forEach((input1, index1) => {
          const inputElem1 = input1.querySelector('.input__wrapper input');

          if (inputElem.value.length > 0) {

            
            if (index !== index1) inputElem1.disabled = true;
          } else {
            inputElem1.disabled = false;
          }
        });
      }

      inputElem.addEventListener('input', disableInputs);
      btn.addEventListener('click', disableInputs);
    });

    switchElem.addEventListener('input', ev => {
      if (switchElem.checked) {
        search.classList.add('--search-name');
        switchLabel.textContent = 'Переключить на поиск по названию';
      } else {
        search.classList.remove('--search-name');
        switchLabel.textContent = 'Поиск по заявке, свидетельству, ИНН';
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}