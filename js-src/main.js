const $ = require('jquery');
const mask = require('jquery-mask-plugin');

const menuBtn = document.querySelector('.btn--menu');
const inputs = document.querySelectorAll('.input');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');

const tooltipLinks = document.querySelectorAll('.tooltip-link');

tooltipLinks.forEach( link => {
  const id = link.dataset.tooltipId;
  const tooltip = document.querySelector('#tooltip-'+id);

  const show = () => {
    const rect = link.getBoundingClientRect();
    tooltip.classList.add('--visibled');

    tooltip.style.top = `${
      rect.bottom
    }px`;
    tooltip.style.left = `${
      rect.left
    }px`
  }

  document.addEventListener('click', (ev) => {
    const btnOk = tooltip.querySelector('.tooltip__btn-ok');

    if (ev.composedPath().includes(tooltip) || ev.composedPath().includes(link)) {
      show();

      if (ev.composedPath().includes(btnOk)) {
        tooltip.classList.remove('--visibled');
      }
    } else {
      tooltip.classList.remove('--visibled');
    }
  });

  document.addEventListener('mousemove', (ev) => {
    if (ev.composedPath().includes(tooltip) || ev.composedPath().includes(link)) {
      show();
    } else {
      tooltip.classList.remove('--visibled');
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

if (search) {
  const form = search.querySelector('.search__form');

  if (form) {
    const inputs = form.querySelectorAll('.input');

    inputs.forEach((input) => {
      const inputElem = input.querySelector('.input__wrapper input');
      
      $(inputElem).mask(inputElem.dataset.mask);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}