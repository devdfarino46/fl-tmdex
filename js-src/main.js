const $ = require('jquery');
require('jquery-mask-plugin');

const toggleBtns = document.querySelectorAll('.btn--toggle');
const inputs = document.querySelectorAll('.input');
const inputsText = document.querySelectorAll('.input-text');
const mktuGroups = document.querySelectorAll('.mktu-group');
const accordeons = document.querySelectorAll('.accordeon');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mktuSelects = document.querySelectorAll('.mktu-select');
const alert = document.querySelectorAll('.alert');
const targetsToTab = document.querySelectorAll('.target-to-tab');
const tariffs = document.querySelectorAll('.tariff');
const consultPopup = document.querySelector('.consult-popup');

const popupLinks = document.querySelectorAll('.popup-link');
const tooltipLinks = document.querySelectorAll('.tooltip-link');
const tooltips = document.querySelectorAll('.tooltip');

const formMain = document.querySelector('.form-main');
const search = document.querySelector('.search');
const searchForm = document.querySelector('.search-form');
const prereport = document.querySelector('.prereport');
const result = document.querySelector('.result');

const MKTUS = {
  "01": "Инновационные решения",
  "02": "Стратегическое планирование",
  "03": "Цифровой маркетинг",
  "04": "Опыт клиента",
  "05": "Финансовое управление",
  "06": "Оптимизация цепочки поставок",
  "07": "Ресурсы человека",
  "08": "Инфраструктура ИТ",
  "09": "Контроль качества",
  "10": "Юридическое соответствие",
  "11": "Разработка бренда",
  "12": "Автоматизация маркетинга",
  "13": "Управление каналом продаж",
  "14": "Создание контента",
  "15": "Оптимизация SEO",
  "16": "Email-маркетинг",
  "17": "Управление социальными сетями",
  "18": "Публичные отношения",
  "19": "Аналитика и отчетность",
  "20": "Управление проектами",
  "21": "Аналитика данных",
  "22": "Бизнес-интеллект",
  "23": "Поддержка клиентов",
  "24": "Найм и набор персонала",
  "25": "Обучение персонала",
  "26": "Управление рабочей силой",
  "27": "Управление производительностью",
  "28": "Льготы для сотрудников",
  "29": "Отношения с сотрудниками",
  "30": "Развитие сотрудников",
  "31": "Участие сотрудников",
  "32": "Удержание сотрудников",
  "33": "Оборот сотрудников",
  "34": "Удовлетворенность сотрудников",
  "35": "Коммуникация с сотрудниками",
  "36": "Здоровье сотрудников",
  "37": "Признание сотрудников",
  "38": "Производительность сотрудников",
  "39": "Оплата труда сотрудников",
  "40": "Льготы для сотрудников",
  "41": "Отношения с сотрудниками",
  "42": "Развитие сотрудников",
  "43": "Участие сотрудников",
  "44": "Удержание сотрудников",
  "45": "Оборот сотрудников"
};
const OKVEDS = {
  "47.19.20": "Производство резины и пластмассовых изделий",
  "47.19.1": "Производство химических продуктов, фармацевтических препаратов и других химических продуктов",
  "47.19": "Производство машин и оборудования"
};

let mktuFilter = ["01", "10", "13", "15"];

const CORRESPS = {
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
  for (const [key, value] of Object.entries(CORRESPS)) {
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

function updateMktuFiltersUI() {
  if (mktuSelects && search && searchForm) {
    const mktuItems = searchForm.querySelectorAll(
      '.mktu-dropdown .mktu');
    const mktuItemsText = searchForm.querySelectorAll(
      '.mktu-dropdown-text .mktu-dropdown-text__item');
    const allowCorrespCheckbox = searchForm.querySelector(
      '.mktu-dropdown .mktu-dropdown__checkbox input');
    
    // Reset UI
    mktuItems.forEach(mktuItem => {
      mktuItem.nextElementSibling.removeAttribute('checked');
      mktuItem.nextElementSibling.nextElementSibling.removeAttribute('checked');
    });
    mktuItemsText.forEach(mktuItemText => {
      mktuItemText.nextElementSibling.removeAttribute('checked');
    });
    mktuSelects.forEach((mktuSelect, index) => {
      mktuSelect.classList.remove('--show');
    });
    
    mktuFilter.forEach(item => {
      mktuItems.forEach(mktuItem => {
        if (mktuItem.dataset.value === item) {
          mktuItem.nextElementSibling.setAttribute('checked', '');
          if (allowCorrespCheckbox.checked) {
            mktuCorrespsHandler(mktuItem, mktuItems, el => {
              el.nextElementSibling.nextElementSibling.setAttribute('checked', '');
            });
          }
        }
      });
      mktuItems.forEach(mktuItem => {
        mktuCorrespsHandler(mktuItem, mktuItems, el => {
          if (el.nextElementSibling.getAttribute('checked') !== null) {
            el.nextElementSibling.nextElementSibling.removeAttribute('checked');
          }
        });
      });
  
      mktuItemsText.forEach(mktuItemText => {
        if (mktuItemText.dataset.value === item) {
          mktuItemText.nextElementSibling.setAttribute('checked', '');
        }
      });
  
      mktuSelects.forEach(mktuSelect => {
        if (mktuSelect.dataset.value === item) {
          mktuSelect.classList.add('--show');
        }
      })
    });
  }
}
updateMktuFiltersUI();

/** 
 * @param {Element} btn 
 * @param {ELement} tabBtn
**/
function toggleTabs(btn, tabBtn = null) {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach(el => {
      if (btn.dataset.tab.split(' ')[0] === el.dataset.tab.split(' ')[0]) {
        el.classList.remove('--active');
      }
    });
    if (tabBtn === null) {
      btn.classList.add('--active');
    } else {
      tabBtn.classList.add('--active');
      window.scroll({
        top: tabBtn.offsetTop - 100,
        behavior: 'smooth'
      });
    }

    tabContents.forEach(content => {
      if (btn.dataset.tab === content.dataset.tab) {
        content.classList.add('--active');
      } else if (btn.dataset.tab.split(' ')[0] === content.dataset.tab.split(' ')[0]) {
        content.classList.remove('--active');
      }
    });
  });
}
tabBtns.forEach(btn => { toggleTabs(btn); });
targetsToTab.forEach(btn => { 
  const tabBtn = document.querySelector(`.tab-btn[data-tab="${btn.dataset.tab}"]`);
  toggleTabs(btn, tabBtn);
});

popupLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const popup = document.querySelector(link.getAttribute('href'));
    const btnOk = popup.querySelector('._btn-ok');
    const btnClose = popup.querySelector('._close-btn');

    popup.classList.add('--visibled');
    document.body.classList.add('no-scroll');

    if (btnOk) btnOk.addEventListener('click', () => {
      popup.classList.remove('--visibled');
      document.body.classList.remove('no-scroll');
    });

    if (btnClose) btnClose.addEventListener('click', () => {
      popup.classList.remove('--visibled');
      document.body.classList.remove('no-scroll');
    });
  })
});

if (consultPopup) {
  const form = consultPopup.querySelector('.consult-popup__form');
  const btnOk = consultPopup.querySelector('.consult-popup__btn-ok');
  
  btnOk.addEventListener('click', () => {
    consultPopup.classList.remove('--success');
  })

  if (form) {
    const checkbox = form.querySelector('.checkbox');
    const submitBtn = form.querySelector('.consult-popup__submit-btn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      consultPopup.classList.add('--success');
      // send form
    });

    const disableSubmitBtn = () => {
      if (checkbox.querySelector('input').checked) {
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.setAttribute('disabled', '');
      }
    }
    disableSubmitBtn();
    checkbox.addEventListener('click', disableSubmitBtn);
  }
}

alert.forEach(alert => {
  const btn = alert.querySelector('.alert__show-details-btn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('--active');
  
      if (btn.classList.contains('--active')) {
        btn.innerHTML = btn.dataset.textHide;
      } else {
        btn.innerHTML = btn.dataset.textShow;
      }
    });
  }
});

/**
 * 
 * @param {Element} link 
 * @returns {Element}
 */
function getTooltip(link) {
  return document.querySelector(link.getAttribute('data-href'));
}
tooltipLinks.forEach(link => {

  const change = (tooltip) => {
    const rect = tooltip.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();

    // Positioning tooltip
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
    
    // Texting tooltip
    if (link.getAttribute('data-href') === '#tooltip-mktu-0') {
      const value = link.getAttribute('data-value');
      const num = tooltip.querySelector('._mktu-num');
      const descr = tooltip.querySelector('._mktu-descr');

      num.innerHTML = value;
      descr.innerHTML = MKTUS[value];
    }

    if (link.getAttribute('data-href') === '#tooltip-okved') {
      const value = link.getAttribute('data-value');
      const num = tooltip.querySelector('._okved-num');
      const descr = tooltip.querySelector('._okved-descr');
      const type = tooltip.querySelector('._okved-type');

      num.innerHTML = value;
      descr.innerHTML = OKVEDS[value];

      if (link.getAttribute('data-main') !== null) {
        type.innerHTML = type.getAttribute('data-text-main');
      } else {
        type.innerHTML = type.getAttribute('data-text-addit');
      }
    }
  }

  link.addEventListener('mouseenter', (e) => {
    change(getTooltip(e.target));
    getTooltip(e.target).classList.add('--visibled');
  });
  link.addEventListener('mouseleave', (e) => {
    tooltips.forEach(t => t.classList.remove('--visibled'));
  });

  window.addEventListener('scroll', () => {
    tooltips.forEach(t => t.classList.remove('--visibled'));
  });
});

mktuGroups.forEach(group => {
  const btn = group.querySelector('.mktu-group .btn');
  const list = group.querySelector('.mktu-group__list div');
  const mktus = group.querySelectorAll('.mktu');

  const hide = () => {
    let timer;
    let groupRect = group.getBoundingClientRect();
    let count = 0;

    const medias = [
      [1230, 10],
      [1140, 8],
      [940, 6],
      [740, 4],
      [0, 2]
    ];

    btn.classList.add('--hidden');

    mktus.forEach((mktu, index) => {
      const displayStyle = window.getComputedStyle(mktu).getPropertyValue('display');

      if (displayStyle === 'none') {
        count += 1;
        btn.querySelector('span').textContent = `+${count}`;
        btn.classList.remove('--hidden');
      }
    });
  };

  window.addEventListener('load', hide);
  window.addEventListener('resize', hide);

  btn.addEventListener('click', ev => {
    group.classList.toggle('--opened');
  });
});

function openAccordeon(accordeon, subaccordeon, delay = 50, open = false) {
  if (!open) {
    accordeon.classList.toggle('--active');
  } else {
    accordeon.classList.add('--active');
  }

  if (accordeon.classList.contains('--active')) {
    setTimeout(() => {
      subaccordeon.classList.add('--show');
    }, delay);
  } else {
    subaccordeon.classList.remove('--show');
  }
}
accordeons.forEach((accordeon, index) => {
  const subaccordeon = accordeon.nextElementSibling;

  if (accordeon.classList.contains('--active')) {
    subaccordeon.classList.add('--show');
  }

  accordeon.addEventListener('click', ev => {
    openAccordeon(accordeon, subaccordeon);
  });
})

toggleBtns.forEach(btn => {
  if (!btn.classList.contains('--no-event')) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('--opened');
    });
  }
});

if (formMain) {
  const form = formMain.querySelector('.form-main__form');
  const title = formMain.querySelector('.form-main__title');
  const descr = formMain.querySelector('.form-main__descr');
  const policyInput = form.querySelector('.form-main__policy-input');
  const submitBtn = form.querySelector('.form-main__submit');
  
  const toggleSubmit = () => {
    if (
      policyInput.querySelector('input').checked
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  toggleSubmit();

  if (form) {
    formMain.addEventListener('submit', (e) => {
      e.preventDefault();
      toggleSubmit();

      title.innerHTML = title.dataset.textSuccess;
      descr.innerHTML = descr.dataset.textSuccess;
      form.remove();
    });
  }

  policyInput.addEventListener('click', toggleSubmit);
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
      inputElem.focus();
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
  const title = search.querySelector('.search__title');
  const form = search.querySelector('.search-form');

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

if (mktuSelects) {
  mktuSelects.forEach(select => {
    const btn = select.querySelector('.mktu-select i');
    btn.addEventListener('click', () => {
      mktuFilter.splice(mktuFilter.indexOf(select.dataset.value), 1);
      updateMktuFiltersUI();
    });
  });
}

if (searchForm) {
  const switchInput = searchForm.querySelector('.search-form__switch');
  const proInputs = searchForm.querySelectorAll('.search-form__pro-input');

  if (proInputs) {
    proInputs.forEach((input, index) => {
      const disableHandler = () => {
        if (input.querySelector('input').value.length > 0) {
          proInputs.forEach((el, i) => {
            if (i !== index) {
              el.querySelector('input').disabled = true;
            }
          });
        } else {
          proInputs.forEach((el, i) => {
            el.querySelector('input').disabled = false;
          });
        }
      };

      input.querySelector('input').addEventListener('input', disableHandler);
      input.querySelector('input').addEventListener('focus', disableHandler);
      input.querySelector('input').addEventListener('blur', disableHandler);
      input.addEventListener('click', disableHandler);
    });
  }
  
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
        updateMktuFiltersUI();
      });

      // Apply and hide dropdown
      applyBtn.addEventListener('click', () => {
        mktuDropdown.classList.remove('--active');
      });

      // Clear finters
      clearBtn.addEventListener('click', () => {
        mktuFilter = [];
        updateMktuFiltersUI();
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
            mktuFilter.push(mktu.dataset.value);
            updateMktuFiltersUI();
          } else {
            mktuFilter.splice(mktuFilter.indexOf(mktu.dataset.value), 1);
            updateMktuFiltersUI();
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
        mktuFilter = [];
        updateMktuFiltersUI();
      });

      // Select item
      items.forEach(item => {
        const input = item.nextElementSibling;
        item.addEventListener('click', ev => {
          input.toggleAttribute('checked');
          
          if (input.hasAttribute('checked')) {
            mktuFilter.push(item.dataset.value);
            updateMktuFiltersUI();
          } else {
            mktuFilter.splice(mktuFilter.indexOf(item.dataset.value), 1);
            updateMktuFiltersUI();
          }
        });
      });
    }
  }
}

if (prereport) {
  const label = prereport.querySelector('.prereport__label');
  const labelBtn = prereport.querySelector('.prereport__label-btn');
  const hideBtn = prereport.querySelector('.prereport__hide-btn');
  const content = prereport.querySelector('.prereport__content');
  const lookBtns = prereport.querySelectorAll('.prereport__look-btn');

  lookBtns.forEach(lookBtn => {
    lookBtn.addEventListener('click', (ev) => {
      const content = document.querySelector(
        `.result__tab[data-tab="${lookBtn.dataset.tab}"]`
      );
      const accordeon = content.querySelectorAll('.accordeon')[0];

      const contentRect = content.getBoundingClientRect();
      const timer = setInterval(() => {
        if (
          contentRect.top >= 90
        ) {
          openAccordeon(accordeon, accordeon.nextElementSibling, 600, true);
          
          clearInterval(timer);
        }
      }, 50);
    });
  })

  if (labelBtn.classList.contains('--opened')) {
    content.classList.add('--show');
  }

  label.addEventListener('click', (ev) => {
    labelBtn.classList.toggle('--opened');

    if (labelBtn.classList.contains('--opened')) {
      setTimeout( () => {
        content.classList.add('--show');
      }, 10);
    } else {
      content.classList.remove('--show');
    }
  });

  hideBtn.addEventListener('click', () => {
    labelBtn.classList.remove('--opened');
    window.scrollTo({
      top: prereport.offsetTop - 100
    });
    
    content.classList.remove('--show');
  });
}

tariffs.forEach(tariff => {
  const listLabel = tariff.querySelector('.tariff__list-label');

  if (listLabel) {
    if (window.innerWidth < 740) {
      listLabel.classList.remove('--active');
    }

    listLabel.addEventListener('click', () => {
      listLabel.classList.toggle('--active');
    });
  }
});

if (result) {
  const toUpBtn = result.querySelector('.result__to-up-btn');
  
  toUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: prereport.offsetTop - 100,
      behavior: 'smooth'
    });
  })
}