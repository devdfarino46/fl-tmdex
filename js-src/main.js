const $ = require('jquery');
require('jquery-mask-plugin');

const menuBtn = document.querySelector('.btn--menu');
const inputs = document.querySelectorAll('.input');
const inputsText = document.querySelectorAll('.input-text');
const mktuGroups = document.querySelectorAll('.mktu-group');
const accordeons = document.querySelectorAll('.accordeon');

const popupLinks = document.querySelectorAll('.popup-link');
const tooltipLinks = document.querySelectorAll('.tooltip-link');
const tooltips = document.querySelectorAll('.tooltip');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');
const result = document.querySelector('.result');
const searchForm = document.querySelector('.search-form');

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

  const show = (e) => {
    const rect = tooltip.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();

    if (window.innerWidth >= 700) {
      if (lRect.left < 450) {
        tooltip.style.left = `${lRect.left}px`;
      } else {
        tooltip.style.left = `${lRect.right - rect.width}px`;
      }
    } else {
      tooltip.style.left = `0`;
      tooltip.style.right = `0`;
    }

    if (lRect.top < window.innerHeight - 150) {
      tooltip.style.top = `${lRect.bottom + 5}px`;
    } else {
      tooltip.style.top = `${lRect.top - rect.height - 5}px`;
    }
    tooltip.classList.add('--visibled');
  }

  link.addEventListener('mouseover', (e) => show(e));
  link.addEventListener('mouseleave', (e) => {
    tooltips.forEach(t => t.classList.remove('--visibled'));
  });
  
  link.addEventListener('click', (e) =>  show(e));

  window.addEventListener('scroll', () => {
    tooltips.forEach(t => t.classList.remove('--visibled'));
  })
});

mktuGroups.forEach(group => {
  const btn = group.querySelector('.mktu-group .btn');
  const list = group.querySelector('.mktu-group__list div');
  const mktus = group.querySelectorAll('.mktu');

  const hide = () => {
    let groupRect = group.getBoundingClientRect();
    if (groupRect.top >= -100 && groupRect.bottom <= window.innerHeight + 100) {
      let count = 0;
      mktus.forEach((mktu, index) => {
        let listRight = list.getBoundingClientRect().right;
        let mktuRight = mktu.getBoundingClientRect().right;
    
        if (mktuRight > listRight) {
          btn.classList.remove('--hidden');
          mktu.classList.add('--hidden');
          count += 1;
          btn.querySelector('span').textContent = `+${count}`;
          return;
        } else {
          mktu.classList.remove('--hidden');
          if (!group.classList.contains('--opened')) {
            btn.classList.add('--hidden');
          }
        }
      });
    }
  };

  btn.addEventListener('click', ev => {
    group.classList.toggle('--opened');
  });

  window.addEventListener('load', hide);
  setInterval(hide, 2000);
});

accordeons.forEach((accordeon, index) => {
  accordeon.addEventListener('click', ev => {
    accordeon.classList.toggle('--active');
  });
})

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

if (result) {
  const tabBtns = result.querySelectorAll('.result__tabs .tab-btn');
  const tabs = result.querySelectorAll('.result__tab');

  tabBtns.forEach((tabBtn, index) => {
    tabBtn.addEventListener('click', () => {
      tabBtns.forEach((el) => {
        el.classList.remove('--active');
      });
      tabBtn.classList.add('--active');

      tabs.forEach((el) => {
        el.classList.remove('--active');

        if (el.dataset.tab === tabBtn.dataset.tab) {
          el.classList.add('--active');
        }
      });
    });
  });
}

if (searchForm) {
  const switchInput = searchForm.querySelector('.search-form__switch');

  if (
    !switchInput.querySelector('input').checked && 
    !searchForm.classList.contains('--hide-mktu')
  ) {
    const mktuInput = searchForm.querySelector('.search-form [data-item="mktu"]');
    const mktuDropdown = searchForm.querySelector('.mktu-dropdown');

    document.addEventListener('click', ev => {
      if (
        ( ev.composedPath().includes(mktuInput) ||
        ev.composedPath().includes(mktuDropdown) ) &&
        mktuInput.querySelector('input').value === ''
      ) {
        mktuDropdown.classList.add('--active');
      } else {
        mktuDropdown.classList.remove('--active');
      }
    });
  }
}