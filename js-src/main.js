const $ = require('jquery');
require('jquery-mask-plugin');

const menuBtn = document.querySelector('.btn--menu');
const inputs = document.querySelectorAll('.input');
const inputsText = document.querySelectorAll('.input-text');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');

const popupLinks = document.querySelectorAll('.popup-link');
const tooltipLinks = document.querySelectorAll('.tooltip-link');
const mktuGroups = document.querySelectorAll('.mktu-group');

popupLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const popup = document.querySelector(link.getAttribute('href'));
    const btnOk = popup.querySelector('.popup__btn-ok');

    popup.classList.add('--visibled');
    document.body.classList.add('no-scroll');

    btnOk.addEventListener('click', () => {
      popup.classList.remove('--visibled');
      document.body.classList.remove('no-scroll');
    })
  })
});

tooltipLinks.forEach(link => {
  const tooltip = document.querySelector(link.getAttribute('data-href'));

  link.addEventListener('mouseenter', (e) => {
    const rect = tooltip.getBoundingClientRect();
    tooltip.style.top = `${e.clientY - 5}px`;

    if (window.innerWidth >= 700) {
      if (e.clientX < 450) {
        tooltip.style.left = `${e.clientX - 20}px`;
      } else {
        tooltip.style.left = `${e.clientX - rect.width + 20}px`;
      }
    } else {
      tooltip.style.left = `0`;
      tooltip.style.right = `0`;
    }

    tooltip.classList.add('--visibled');
  });
  tooltip.addEventListener('mouseleave', (e) => {
      document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('--visibled'));
  });
});

mktuGroups.forEach(group => {
  const btn = group.querySelector('.mktu-group .btn');
  const list = group.querySelector('.mktu-group__list div');
  const mktus = group.querySelectorAll('.mktu');

  const hide = () => {
    let count = 0;
    mktus.forEach((mktu, index) => {
      let listRight = list.getBoundingClientRect().right;
      let mktuRight = mktu.getBoundingClientRect().right;
  
      if (mktuRight > listRight - 40) {
        btn.classList.remove('--hidden');
        mktu.classList.add('--hidden');
        count += 1;
        btn.querySelector('span').textContent = `+${count}`;
        return;
      } else {
        btn.classList.add('--hidden');
      }
    });
  };

  btn.addEventListener('click', ev => {
    group.classList.toggle('--opened');
  });

  window.addEventListener('load', hide);
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
});

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

      // Disable inputs
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
        switchLabel.textContent = 'Переключить на поиск по названию';
      } else {
        switchLabel.textContent = 'Поиск по заявке, свидетельству, ИНН';
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}