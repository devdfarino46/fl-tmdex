const $ = require('jquery');
require('jquery-mask-plugin');

const menuBtn = document.querySelector('.btn--menu');
const inputs = document.querySelectorAll('.input');
const inputsText = document.querySelectorAll('.input-text');
const mktuGroups = document.querySelectorAll('.mktu-group');
const accordeons = document.querySelectorAll('.accordeon');
const reportResult = document.querySelector('.report-result');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const popupLinks = document.querySelectorAll('.popup-link');
const tooltipLinks = document.querySelectorAll('.tooltip-link');
const tooltips = document.querySelectorAll('.tooltip');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');
const searchForm = document.querySelector('.search-form');

const corresps = {
  "10": ["13", "14", "17", "21"],
  "15": ["16", "18", "19", "20"]
}
/**
 * 
 * @param {Element} mktu 
 * @param {Element[]} mktus 
 * @callback handler
 * @param {Element} el
 * @returns {void}
 * @param {handler} handler
 */
function mktuCorrespsHandler(mktu, mktus, handler) {
  for (const [key, value] of Object.entries(corresps)) {
    if (mktu.dataset.value === key) {
      value.forEach(corr => {
        mktus.forEach(el => {
          if (el.dataset.value === corr) {
            handler(el);
          }
        });
      });
    }
  }
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach(el => {
      if (btn.dataset.tab.split(' ')[0] === el.dataset.tab.split(' ')[0]) {
        el.classList.remove('--active');
      }
    });
    btn.classList.add('--active');

    tabContents.forEach(content => {
      if (btn.dataset.tab === content.dataset.tab) {
        content.classList.add('--active');
      } else {
        content.classList.remove('--active');
      }
    })
  });
});

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
  link.addEventListener('mouseout', (e) => {
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
  const title = formMain.querySelector('.form-main__title');
  const descr = formMain.querySelector('.form-main__descr');
  

  if (form) {
    formMain.addEventListener('submit', (e) => {
      e.preventDefault();

      title.innerHTML = title.dataset.textSuccess;
      descr.innerHTML = descr.dataset.textSuccess;
      form.remove();
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
  const mktuSelected = search.querySelector('.search__mktu-selected');
  const title = search.querySelector('.search__title');
  const form = search.querySelector('.search-form');

  if (mktuSelected) {
    const selects = mktuSelected.querySelectorAll('.mktu-select');
    
    selects.forEach(select => {
      const btn = select.querySelector('.mktu-select i');
      btn.addEventListener('click', () => {
        select.remove();
      });
    })
  }

  // Retext title by form type
  if (title && form && title.dataset.text1 && title.dataset.text2) {
    const switchBtn = form.querySelector('.search-form__switch');

    switchBtn.addEventListener('click', () => {
      if (!switchBtn.querySelector('input').checked) {
        title.innerHTML = title.dataset.text1;
      } else {
        title.innerHTML = title.dataset.text2;
      }
    })
  }
}

if (searchForm) {
  const switchInput = searchForm.querySelector('.search-form__switch');
  
  // If search by title and mktu input is not hidden
  if (
    !switchInput.querySelector('input').checked && 
    !searchForm.classList.contains('--hide-mktu')
  ) {
    const mktuInput = searchForm.querySelector('.search-form [data-item="mktu"]');
    const mktuDropdown = searchForm.querySelector('.mktu-dropdown');
    const mktuDropdownText = searchForm.querySelector('.mktu-dropdown-text');

    // MktuDropdown
    if (mktuDropdown) {
      const mktus = mktuDropdown.querySelectorAll('.mktu');
      const checkbox = mktuDropdown.querySelector('.mktu-dropdown__checkbox');
      const applyBtn = mktuDropdown.querySelector('.mktu-dropdown__apply-btn');
      const clearBtn = mktuDropdown.querySelector('.mktu-dropdown__clear-btn');

      // Show dropdown
      mktuInput.addEventListener('click', () => {
        mktuDropdown.classList.add('--active');
      })

      // Hide dropdown
      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(mktuInput) && !ev.composedPath().includes(mktuDropdown) ) {
          mktuDropdown.classList.remove('--active');
        }
      });

      // Toggle allowed search with corresponds mktu
      checkbox.addEventListener('click', () => {
        if (!checkbox.querySelector('input').checked) {
          mktus.forEach(mktu => {
            mktu.nextElementSibling.nextElementSibling.removeAttribute('checked');
          });
        }
      });

      // Apply and hide dropdown
      applyBtn.addEventListener('click', () => {
        mktuDropdown.classList.remove('--active');
      });

      // Clear finters
      clearBtn.addEventListener('click', () => {
        mktus.forEach(mktu => {
          mktu.nextElementSibling.removeAttribute('checked');
          mktu.nextElementSibling.nextElementSibling.removeAttribute('checked');
        });
      });
      
      mktus.forEach(mktu => {
        const input = mktu.nextElementSibling;
        const cInput = mktu.nextElementSibling.nextElementSibling;

        // Hover corresponds mktu
        mktu.addEventListener('mouseover', ev => {
          if (checkbox.querySelector('input').checked) {
            mktuCorrespsHandler(mktu, mktus, el => {
              el.classList.add('--corresp-hover');
            });
          }
        });
        mktu.addEventListener('mouseout', ev => {
          mktus.forEach(el => {
            el.classList.remove('--corresp-hover');
          });
        });
        
        mktu.addEventListener('click', ev => {
          // Clear hover corresponds mktu
          mktus.forEach(el => {
            el.classList.remove('--corresp-hover');
          });

          input.toggleAttribute('checked');

          if (input.getAttribute('checked') !== null) {
            if (checkbox.querySelector('input').checked) {
              mktuCorrespsHandler(mktu, mktus, el => {
                if (el.nextElementSibling.getAttribute('checked') === null) {
                  el.nextElementSibling.nextElementSibling.setAttribute('checked', '');
                } else {
                  el.nextElementSibling.nextElementSibling.removeAttribute('checked');
                }
              });
            }
            cInput.removeAttribute('checked');
          } else {
            if (checkbox.querySelector('input').checked) {
              mktuCorrespsHandler(mktu, mktus, el => {
                el.nextElementSibling.nextElementSibling.removeAttribute('checked');
              });
            }
            cInput.removeAttribute('checked');
          }
        });
      });
    }

    if (mktuDropdownText) {

      const items = mktuDropdownText.querySelectorAll('.mktu-dropdown-text__item');
      const applyBtn = mktuDropdownText.querySelector('.mktu-dropdown-text__apply-btn');
      const clearBtn = mktuDropdownText.querySelector('.mktu-dropdown-text__clear-btn');

      // Show dropdown
      const show = () => {
        if (mktuInput.querySelector('input').value.length > 0) {
          mktuDropdownText.classList.add('--active');
          mktuDropdown.classList.remove('--active');
        } else {
          mktuDropdownText.classList.remove('--active');
          mktuDropdown.classList.add('--active');
        }
      };

      mktuInput.querySelector('input').addEventListener('input', show);
      mktuInput.addEventListener('click', show);

      // Hide dropdown
      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(mktuInput) && !ev.composedPath().includes(mktuDropdownText) ) {
          mktuDropdownText.classList.remove('--active');
        }
      });

      // Apply and hide dropdown
      applyBtn.addEventListener('click', () => {
        mktuDropdownText.classList.remove('--active');
      });

      // Clear finters
      clearBtn.addEventListener('click', () => {
        items.forEach(item => {
          item.nextElementSibling.removeAttribute('checked');
        });
      });

      // Select item
      items.forEach(item => {
        const input = item.nextElementSibling;
        item.addEventListener('click', ev => {
          input.toggleAttribute('checked');
        });
      });
    }
  }
}

if (reportResult) {
  const tabBtns = reportResult.querySelectorAll('.tab-btn');
  const tabContents = reportResult.querySelectorAll('.report-result__notices');

  tabBtns.forEach((tabBtn, index) => {
    tabBtn.addEventListener('click', () => {
      tabBtns.forEach(btn => {
        btn.classList.remove('--active');
      });
      tabBtn.classList.add('--active');

      tabContents.forEach(content => {
        if (tabBtn.dataset.tab === content.dataset.tab) {
          content.classList.add('--active');
        } else {
          content.classList.remove('--active');
        }
      })
    });
  });
}

