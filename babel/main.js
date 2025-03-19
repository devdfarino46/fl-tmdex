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
const CORRESPS = {
  "10": ["13", "14", "17", "21"],
  "15": ["16", "18", "19", "20"]
}
let MktuFilter = ["01", "10", "13", "15", "35"];

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


const Ui = {
  toggleTabs: function (btn, tabBtn = null, scroll = false) {
    const tabBtns = document.querySelectorAll('.tab-btn, .tab-btn-nocss, .radio-tab-btn, .menu-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    btn.addEventListener('click', ev => {
      tabBtns.forEach(el => {
        if (btn.dataset.tab.split(' ')[0] === el.dataset.tab.split(' ')[0]) {
          el.classList.remove('--active');
        }
      });
      if (tabBtn === null) {
        btn.classList.add('--active');
      } else {
        tabBtn.classList.add('--active');
        
        if (scroll) window.scroll({
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
  },

  toggleTabContents: function (tabLink, scroll = true) {
    const tabContents = document.querySelectorAll('.tab-content');

    tabLink.addEventListener('click', ev => {
      ev.preventDefault();
      
      tabContents.forEach(content => {
        if (tabLink.dataset.tab === content.dataset.tab) {
          content.classList.add('--active');
        
          if (scroll) window.scroll({
            top: 0,
            behavior: 'instant'
          });
        } else if (tabLink.dataset.tab.split(' ')[0] === content.dataset.tab.split(' ')[0]) {
          content.classList.remove('--active');
        }
      });

      // ДЛЯ ЧЕЛОВЕКА С КОМАНДЫ (для бекендера)

      // Чтобы не нагружать пользователя лишними данными в ОЗУ, так как людей может быть много
      // лучше оставить один блок человека, и динамично изменять его контент, общаясь с сервером
      if (tabLink.hasAttribute('data-employer-id')) {
        // Получаем id человека
        const dataEmployerId = tabLink.getAttribute('data-employer-id');
        // Секция для изменения контента
        const employerSections = document.querySelector('.employer-section');

        // С помощью запросов и DOM делаем манипуляции:
        // TODO
      }
    });
  },

  targetToTabContentInit: function () {
    document.querySelectorAll('.target-to-tab-content').forEach(tabLink => {
      Ui.toggleTabContents(tabLink);
    });
  },

  accordeonOpen: function (accordeon, open = false) {
    const subaccordeon = accordeon.nextElementSibling;

    if (!open) {
      accordeon.classList.toggle('--active');
    } else {
      accordeon.classList.add('--active');
    }
  },

  mktuCorrespsHandler: function (mktu, mktus, handler) {
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
  },

  updateMktuFiltersUI: function () {
    const searchForm = document.querySelector('.search-form, .search-form-mktu');
    const mktuSelects = document.querySelectorAll('.mktu-select');
    const mktuHelper = document.querySelector('.mktu-helper');
  
    if (searchForm) {
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
      
      MktuFilter.forEach(item => {
        mktuItems.forEach(mktuItem => {
          if (mktuItem.dataset.value === item) {
            mktuItem.nextElementSibling.setAttribute('checked', '');
            if (allowCorrespCheckbox.checked) {
              Ui.mktuCorrespsHandler(mktuItem, mktuItems, el => {
                el.nextElementSibling.nextElementSibling.setAttribute('checked', '');
              });
            }
          }
        });
        mktuItems.forEach(mktuItem => {
          Ui.mktuCorrespsHandler(mktuItem, mktuItems, el => {
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

    if (mktuHelper) {
      const items = mktuHelper.querySelectorAll('.mktu-helper__item');
      
      items.forEach(item => {
        item.classList.remove('--active');
      });
      MktuFilter.forEach((value) => {
        items.forEach(el => {
          if (el.dataset.value === value) {
            el.classList.add('--active');
          }
        });
      });
    }
  },

  pageTabLoad: function () {
    const update = () => {
      const hash = window.location.hash.split('#')[1];
      const tab = document.getElementById(hash);
      const pageTabs = document.querySelectorAll('.page-tab-load');
      const tabContents = document.querySelectorAll('.tab-content');

      
      if (tab && tab.classList.contains('page-tab-load')) {
        pageTabs.forEach(el => {
          el.classList.remove('--active');
        });
        tab.classList.add('--active');
    
        tabContents.forEach(content => {
          if (tab.dataset.tab === content.dataset.tab) {
            content.classList.add('--active');
          } else if (tab.dataset.tab.split(' ')[0] === content.dataset.tab.split(' ')[0]) {
            content.classList.remove('--active');
          }
        });

        window.scroll(0, 0);
      }
    }
    window.addEventListener('hashchange', ev => {
      update();
    });
    window.addEventListener('load', ev => {
      update();
    });
  },

  getTooltip: function (link) {
    return document.querySelector(link.getAttribute('data-href'));
  },

  swiperPerViewAutoUpdate(swiper, slideWidth, loop = 'dynamic') {
    swiper.width = slideWidth * swiper.slidesPerViewDynamic();
    if (loop === 'dynamic') {
      if (swiper.slides.length <= swiper.slidesPerViewDynamic()) {
        swiper.params.loop = false;
      } else {
        swiper.params.loop = true;
      }
    } else if (loop === true) {
      swiper.params.loop = true;
    } else if (loop === false) {
      swiper.params.loop = false;
    }
  },

  copyBtnInit: function () {
    document.querySelectorAll('.copy-btn').forEach(copyBtn => {
      copyBtn.addEventListener('click', ev => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(
          copyBtn.closest('.copy-parent').
          querySelector('.copy-text')
        );
        selection.removeAllRanges();
        selection.addRange(range);
      });
    });
  },

  tariffInit: function () {
    document.querySelectorAll('.tariff').forEach(function (tariff) {
      const listLabel = tariff.querySelector('.tariff__list-label');
      if (listLabel) {
        if (window.innerWidth < 940) {
          listLabel.classList.remove('--active');
        }
    
        listLabel.addEventListener('click', () => {
          listLabel.classList.toggle('--active');
        });
      }
    });
  },

  searchInit: function() {
    document.querySelectorAll('.search').forEach(function (search) {
      const title = search.querySelector('.search__title');
      const form = search.querySelector('.search-form');
      const switchBtn = search.querySelector('.search-form__switch');
    
      if (
        title && form && switchBtn && 
        title.dataset.text1 && title.dataset.text2
      ) {
        switchBtn.addEventListener('click', () => {
          if (!switchBtn.querySelector('input').checked) {
            title.innerHTML = title.dataset.text1;
          } else {
            title.innerHTML = title.dataset.text2;
          }
        });
      }
    });
  },

  searchFormInit: function () {
    document.querySelectorAll('.search-form, .search-form-mktu').forEach(searchForm => {
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
      if ( true
      ) {
        const mktuInput = searchForm.querySelector('.search-form [data-item="mktu"], .search-form-mktu__input');
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
            Ui.updateMktuFiltersUI();
          });
    
          // Apply and hide dropdown
          applyBtn.addEventListener('click', () => {
            mktuDropdown.classList.remove('--active');
          });
    
          // Clear finters
          clearBtn.addEventListener('click', () => {
            MktuFilter = [];
            Ui.updateMktuFiltersUI();
          });
          
          mktus.forEach(mktu => {
            const input = mktu.nextElementSibling;
            const cInput = mktu.nextElementSibling.nextElementSibling;
    
            // Hover corresponds mktu
            mktu.addEventListener('mouseover', ev => {
              if (checkbox.querySelector('input').checked) {
                Ui.mktuCorrespsHandler(mktu, mktus, el => {
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
                MktuFilter.push(mktu.dataset.value);
                Ui.updateMktuFiltersUI();
              } else {
                MktuFilter.splice(MktuFilter.indexOf(mktu.dataset.value), 1);
                Ui.updateMktuFiltersUI();
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
            MktuFilter = [];
            Ui.updateMktuFiltersUI();
          });
    
          // Select item
          items.forEach(item => {
            const input = item.nextElementSibling;
            item.addEventListener('click', ev => {
              input.toggleAttribute('checked');
              
              if (input.hasAttribute('checked')) {
                MktuFilter.push(item.dataset.value);
                Ui.updateMktuFiltersUI();
              } else {
                MktuFilter.splice(MktuFilter.indexOf(item.dataset.value), 1);
                Ui.updateMktuFiltersUI();
              }
            });
          });
        }
      }
    });
  },

  formMainInit: function() {
    document.querySelectorAll('.form-main').forEach(function (formMain) {
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
    })
  },

  alertInit: function () {
    document.querySelectorAll('.alert').forEach(function (alert) {
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
  },

  accordeonInit: function () {
    document.querySelectorAll('.accordeon').forEach(function (accordeon) {
      const subaccordeon = accordeon.nextElementSibling;
      const btn = accordeon.querySelector('.btn');
      const switchElem = accordeon.querySelector('.switch');
    
      accordeon.addEventListener('click', ev => {
        if (!ev.composedPath().includes(switchElem)) {
          Ui.accordeonOpen(accordeon);
        }
      });

      accordeon.addEventListener('mouseover', ev => {
        btn.classList.add('--hover');
      });
      accordeon.addEventListener('mouseout', ev => {
        btn.classList.remove('--hover');
      });
    });
  },

  prereportInit: function () {
    document.querySelectorAll('.prereport').forEach(function (prereport) {
      const label = prereport.querySelector('.prereport__label');
      const labelBtn = prereport.querySelector('.prereport__label-btn');
      const content = prereport.querySelector('.prereport__content');
      const hideBtn = prereport.querySelector('.prereport__hide-btn');
      const lookBtns = prereport.querySelectorAll('.prereport__look-btn');
      const upTo = document.querySelector('.up-to-prereport');
      const docTextLabels = prereport.querySelectorAll('.prereport__doc-text-label');

      if (labelBtn.classList.contains('--opened')) {
        content.classList.add('--show');
      }

      label.addEventListener('click', (ev) => {
        labelBtn.classList.toggle('--opened');
      });
      label.addEventListener('mouseover', (ev) => {
        labelBtn.classList.add('--hover');
      });
      label.addEventListener('mouseout', (ev) => {
        labelBtn.classList.remove('--hover');
      })

      docTextLabels.forEach(function (docTextLabel) {
        docTextLabel.addEventListener('click', (ev) => {
          docTextLabel.classList.toggle('--opened');
        })
      });

      hideBtn.addEventListener('click', () => {
        labelBtn.classList.remove('--opened');
        window.scrollTo({
          top: prereport.offsetTop - 100
        });
        
        content.classList.remove('--show');
      });

      lookBtns.forEach(lookBtn => {
        lookBtn.addEventListener('click', (ev) => {
          const result = document.querySelector('.result');
          const content = document.querySelector(
            `.result__tab[data-tab="${lookBtn.dataset.tab}"]`
          );
          const accordeon = content.querySelectorAll('.accordeon')[0];
    
          const timer = setInterval(() => {
            const resultRect = result.getBoundingClientRect();
            if (resultRect.top <= 90) {
              console.log(resultRect.top);
              
              setTimeout( () => Ui.accordeonOpen(accordeon, true), 100);
              
              
              clearInterval(timer);
            }
          }, 50);

          upTo.dataset.section = lookBtn.closest('.prereport__subcontent').getAttribute('id');
          upTo.classList.add('--visibled');
        });
      });

      upTo.querySelector('.btn').addEventListener('click', ev => {
        window.scrollBy({
          top: document.querySelector('#'+upTo.dataset.section)
            .getBoundingClientRect().top - 100,
          behavior: 'smooth'
        });

        upTo.classList.remove('--visibled');
      });
    });
  },

  toggleBtnInit: function () {
    document.querySelectorAll('.btn--toggle').forEach(function (btn) {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('--no-event')) {
          console.log(123);
          btn.classList.toggle('--opened');
        }
      });
    });
  },
  
  inputInit: function () {
    document.querySelectorAll('.input').forEach(function (input) {
      const btn = input.querySelector('.input__wrapper button');
      const inputElem = input.querySelector('.input__wrapper input');

      if (inputElem.hasAttribute('data-mask')) {
        IMask(inputElem, {
          mask: inputElem.dataset.mask
        });
      } else if (input.classList.contains('--integer-min-max')) {
        IMask(inputElem, {
          mask: Number,
          min: Number(inputElem.dataset.maskMin),
          max: Number(inputElem.dataset.maskMax),
          autofix: true,
          scale: 0,
        });
      }
    
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
  },

  inputTextInit: function () {
    document.querySelectorAll('.input-text').forEach(input => {
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
  },

  mktuSelectInit: function () {
    document.querySelectorAll('.mktu-select').forEach(select => {
      const btn = select.querySelector('.mktu-select i');
      btn.addEventListener('click', () => {
        MktuFilter.splice(MktuFilter.indexOf(select.dataset.value), 1);
        Ui.updateMktuFiltersUI();
      });
    });
  },

  tabBtnInit: function () {
    document.querySelectorAll('.tab-btn, .tab-btn-nocss, .radio-tab-btn, .menu-tab').forEach(btn => {
      Ui.toggleTabs(btn);
    });
  },

  targetToTabInit: function () {
    document.querySelectorAll('.target-to-tab').forEach(btn => {
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${btn.dataset.tab}"]`);
      Ui.toggleTabs(btn, tabBtn, true);
    });
  },

  popupLinkInit: function () {
    document.querySelectorAll('.popup-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (!e.target.closest('.card a') &&
            !e.target.closest('.card .tooltip-link') &&
            !e.target.closest('.card .popup-link') &&
            !e.target.closest('.card .btn')) {
          const popup = document.querySelector(link.getAttribute('href'));
      
          popup.classList.add('--visibled');
          document.body.classList.add('no-scroll');
  
          if (link.getAttribute('href') === '#popup-consult-employer') {
            const dataMenId = link.getAttribute('data-consult-men-id');
            const dataTitle = link.getAttribute('data-consult-title');
  
            const consultPopup = document.querySelector('#popup-consult-employer');
  
            if (consultPopup) {
              const title = consultPopup.querySelector('.consult-popup__title');
              const id = consultPopup.querySelector('.consult-popup__men-id');
  
              if (dataMenId !== null) {
                title.innerHTML = dataTitle;
                id.value = dataMenId;
              } else {
                title.innerHTML = title.getAttribute('data-default-title');
                id.value = '';z
              }
            }
          }
        }
      });
    });
  },

  popupInit: function () {
    document.querySelectorAll('.popup').forEach(popup => {
      const wrapper = popup.querySelector('.popup-wrapper');
      const btnOk = popup.querySelector('._btn-ok');
      const btnClose = popup.querySelector('._close-btn');

      if (popup.classList.contains('--visibled')) {
        document.body.classList.add('no-scroll');
      }

      popup.addEventListener('click', (e) => {
        if (!e.composedPath().includes(wrapper) && !popup.classList.contains('--no-close')) {
          popup.classList.remove('--visibled');
          document.body.classList.remove('no-scroll');
        }
      });
    
      if (btnOk) btnOk.addEventListener('click', () => {
        popup.classList.remove('--visibled');
        document.body.classList.remove('no-scroll');
      });
  
      if (btnClose) btnClose.addEventListener('click', () => {
        popup.classList.remove('--visibled');
        document.body.classList.remove('no-scroll');
      });
    });
  },

  consultPopupInit: function () {
    document.querySelectorAll('.consult-popup').forEach(consultPopup => {
      const form = consultPopup.querySelector('.consult-popup__form');
    
      if (form) {
        const checkbox = form.querySelector('.checkbox');
        const submitBtn = form.querySelector('.consult-popup__submit-btn');
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
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
    });
  },

  tooltipInit: function () {
    const tooltips = document.querySelectorAll('.tooltip');
    const tooltipLinks = document.querySelectorAll('.tooltip-link');

    const change = (tooltip, link) => {
      const rect = tooltip.getBoundingClientRect();
      const lRect = link.getBoundingClientRect();
  
      // Positioning tooltip
      if (window.innerWidth > 700) {
        if (lRect.left < 450) {
          tooltip.style.paddingLeft = `${lRect.left}px`;
          tooltip.style.paddingRight = `0`;
          tooltip.style.alignItems = 'flex-start';
        } else {
          tooltip.style.paddingLeft = `0`;
          tooltip.style.paddingRight = `${window.innerWidth - lRect.right}px`;
          tooltip.style.alignItems = 'flex-end';
        }
      } else {
        tooltip.style.paddingLeft = `20px`;
        tooltip.style.paddingRight = `20px`;
        tooltip.style.alignItems = 'stretch';
      }
      if (lRect.top < window.innerHeight - 350) {
        tooltip.style.paddingTop = `${lRect.bottom + 5}px`;
        tooltip.style.paddingBottom = `5px`;
        tooltip.style.justifyContent = 'flex-start';
      } else {
        tooltip.style.paddingTop = `5px`;
        tooltip.style.paddingBottom = `${window.innerHeight - lRect.top - 5}px`;
        tooltip.style.justifyContent = 'flex-end';
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

      if (link.getAttribute('data-href') === '#tooltip-stats') {
        const title = tooltip.querySelector('._title');

        title.innerHTML = link.getAttribute('data-title');
      }
    }

    let lockMouseMove = false;
    
    document.body.addEventListener('mousemove', (e) => {
      const link = e.target.closest('.tooltip-link');

      if (link && !lockMouseMove) {
        const tooltipTarget = Ui.getTooltip(link);

        change(tooltipTarget, link);
        tooltips.forEach(t => t.classList.remove('--visibled'));
        tooltipTarget.classList.add('--visibled');
      } else if (!lockMouseMove) {
        tooltips.forEach(t => t.classList.remove('--visibled'));
      }
    });

    document.body.addEventListener('mouseup', (e) => {
      const link = e.target.closest('.tooltip-link');
      const tooltip = e.target.closest('.tooltip');
      const tooltipWrapper = e.target.closest('.tooltip__wrapper');

      if (link) {
        lockMouseMove = true;
        const tooltipTarget = Ui.getTooltip(link);

        change(tooltipTarget, link);
        tooltips.forEach(t => t.classList.remove('--visibled'));
        tooltipTarget.classList.add('--visibled');
      } else {
        lockMouseMove = false;
        tooltips.forEach(t => t.classList.remove('--visibled'));
      }
    });

    window.addEventListener('scroll', e => {
      tooltips.forEach(t => t.classList.remove('--visibled'));
      lockMouseMove = false;
    });

    window.addEventListener('resize', e => {
      tooltips.forEach(t => t.classList.remove('--visibled'));
      lockMouseMove = false;
    });
  },

  mktuGroupInit: function () {
    document.querySelectorAll('.mktu-group').forEach(group => {
      const btn = group.querySelector('.mktu-group .btn');
      const list = group.querySelector('.mktu-group__list div');
      const mktus = group.querySelectorAll('.mktu');
    
      const hide = () => {
        let count = 0;
    
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
      hide();
    
      btn.addEventListener('click', ev => {
        group.classList.toggle('--opened');
      });
    });
  },
  
  menuInit: function () {
    document.querySelectorAll('.menu').forEach(menu => {
      const menuOpenBtn = document.querySelector('.menu-open-btn');
      const menuWrapper = menu.querySelector('.menu__wrapper');
      const slideLeftBtn = menu.querySelector('.menu__slide-left-btn');
      const slideRightBtn = menu.querySelector('.menu__slide-right-btn');
      const menuItems = menu.querySelector('.menu__items');
      const menuItensWrap = menu.querySelector('.menu__items-wrap');
      const swiperSlides = menu.querySelectorAll('.menu__items .swiper-slide');
      const prevBtn = menu.querySelector('.menu__btn-prev');
      
      const menuCards = menu.querySelectorAll('.menu-card');
      const swiper = new Swiper(menuItems, {
        direction: 'horizontal',
        // slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: slideRightBtn,
          prevEl: slideLeftBtn
        },
        mousewheel: true,

        breakpoints: {
          741: {
            slidesPerView: 2
          },

          841: {
            slidesPerView: 3
          },

          1141: {
            slidesPerView: 4
          }
        }
      });

      const swiperInit = () => {
        if (window.innerWidth > 740) {
          swiper.enable();
        } else {
          swiper.disable();
        }
      }
      swiperInit();

      window.addEventListener('resize', swiperInit);

      menuCards.forEach(card => {
        const listColls = card.querySelectorAll('.menu-card__list-coll');

        listColls.forEach((coll, index) => {
          coll.style.transitionDelay = `${index * 0.2 + 0.2}s`
        });
      })

      swiperSlides.forEach((slide, index) => {
        slide.style.transitionDelay = `${index * 0.1}s`;

        if (slide.getAttribute('data-menu-card-link') !== null) {
          slide.addEventListener('click', ev => {
            const slideClicked = ev.currentTarget;
            menu.scroll({
              top: 0,
              behavior: 'smooth'
            });
            
            menuCards.forEach(menuCard => {
              
              if (menuCard.getAttribute('data-menu-card') === slideClicked.getAttribute('data-menu-card-link')) {
                menuCard.classList.add('--opened');
                menuItensWrap.style.minHeight = `${menuCard.offsetHeight}px`;
              } else {
                menuCard.classList.remove('--opened');
                menuItensWrap.style.minHeight = 0;
              }
            });

            prevBtn.addEventListener('click', ev => {
              menuCards.forEach(menuCard => {
                menuCard.classList.remove('--opened'); 
              });
              menuItensWrap.style.minHeight = 0;
            });
          });
        }
      });

      menuOpenBtn.addEventListener('click', ev => {
        if (menu.classList.contains('--opened')) {
          menu.classList.remove('--opened');
          document.body.classList.remove('no-scroll');
          swiper.slideTo(0);
          menuCards.forEach(menuCard => {
            menuCard.classList.remove('--opened');
          });
        } else {
          menu.classList.add('--opened');
          document.body.classList.add('no-scroll');
        }
      });

      document.addEventListener('click', ev => {
        if (!ev.target.closest('.menu') && !ev.target.closest('.menu-open-btn')) {
          menu.classList.remove('--opened');
          menuOpenBtn.classList.remove('--opened');
          menuCards.forEach(menuCard => {
            menuCard.classList.remove('--opened');
          });
        }
      });
    });
  },

  headerInit: function() {
    document.querySelectorAll('.header').forEach(header => {

      let scrollY = 0;
      window.addEventListener('scroll', ev => {
        if (scrollY > window.scrollY) {
          header.classList.remove('--scrolled');
        } else if (scrollY > 100) {
          header.classList.add('--scrolled');
        }

        scrollY = window.scrollY;
      });
    });
  },

  orgsSliderInit: function() {
    document.querySelectorAll('.orgs-slider').forEach(orgsSlider => {
      const slider = orgsSlider.querySelector('.swiper')
      const slideWidth = 220;

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        mousewheel: {
          forceToAxis: true,
          enabled: true,
        },
        on: {
          init: function () {
            Ui.swiperPerViewAutoUpdate(this, slideWidth);
            this.update();
          },
          resize: function () {
            Ui.swiperPerViewAutoUpdate(this, slideWidth);
            this.update();
          },
        }
      });
    });
  },

  achievsInit: function() {
    document.querySelectorAll('.achievs').forEach(achievs => {
      const slider = achievs.querySelector('.achievs__slider');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 285);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 285);
            this.update();
          }
        }
      });
    });
  },

  publicsInit: function() {
    document.querySelectorAll('.publics').forEach(publics => {
      const slider = publics.querySelector('.publics__slider');
      const sliderNum = publics.querySelector('.publics__slider-num');
      const slideBtnPrev = publics.querySelector('.publics__slider-btn-prev');
      const slideBtnNext = publics.querySelector('.publics__slider-btn-next');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          forceToAxis: true,
          enable: true,
        },
        // spaceBetween: 10,
        navigation: {
          nextEl: slideBtnNext,
          prevEl: slideBtnPrev,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 270+10);
            this.update();
            sliderNum.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 270+10);
            this.update();
          },
          slideChange: function() {
            sliderNum.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;
          }
        }
      });
    });
  },

  teamSliderInit: function() {
    document.querySelectorAll('.team-slider').forEach(team => {
      const slider = team.querySelector('.team-slider__slider');
      const sliderNum = team.querySelector('.team-slider__num');
      const slideBtnPrev = team.querySelector('.team-slider__btns ._slide-prev');
      const slideBtnNext = team.querySelector('.team-slider__btns ._slide-next');
      const slides = team.querySelectorAll('.team-slider__slide');

      const swiper = new Swiper(slider, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 10,
        slidesOffsetAfter: 20,
        navigation: {
          nextEl: slideBtnNext,
          prevEl: slideBtnPrev,
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        breakpoints: {
          741: {
            slidesOffsetAfter: 40,
          }
        },
        on: {
          init: function () {
            this.slides.forEach(slide => {
              slide.addEventListener('mouseenter', ev => {
                this.slides.forEach(el => { el.classList.remove('--hover'); });
                ev.currentTarget.classList.add('--hover');
              });
      
              slide.addEventListener('mouseleave', ev => {
                this.slides.forEach(el => { el.classList.remove('--hover'); });
              });
            });

            Ui.swiperPerViewAutoUpdate(this, 260+10, false);

            sliderNum.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;

            if (window.innerWidth < 740) {
              this.slides.forEach(slide => {
                slide.classList.remove('--hover');
              });
              if (this.slides[this.activeIndex]) this.slides[this.activeIndex].classList.add('--hover');
            }
            this.update();
          },
          slideChange: function () {
            sliderNum.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;

            if (window.innerWidth < 740) {
              this.slides.forEach(slide => {
                slide.classList.remove('--hover');
              });
              if (this.slides[this.activeIndex]) this.slides[this.activeIndex].classList.add('--hover');
            }
          },
          resize: function () {
            Ui.swiperPerViewAutoUpdate(this, 260+10, false);
            
            this.update();
          }
        }
      });
    });
  },

  certifsInit: function() {
    document.querySelectorAll('.certifs').forEach(certif => {
      const slider = certif.querySelector('.certifs__slider');
      const slidePrev = certif.querySelector('.certifs__btn-prev');
      const slideNext = certif.querySelector('.certifs__btn-next');
      const sliderNum = certif.querySelector('.certifs__num');

      const gallery = document.querySelector('.certifs-gallery');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        navigation: {
          nextEl: certif.querySelector('.certifs__btn-next'),
          prevEl: certif.querySelector('.certifs__btn-prev'),
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        on: {
          init: function() {
            sliderNum.innerHTML = 
              `${this.realIndex + 1}/${this.slides.length}`;
          },
          slideChange: function() {
            sliderNum.innerHTML = 
              `${this.realIndex + 1}/${this.slides.length}`;
          },
        }
      });

      window.addEventListener('resize', ev => {
        swiper.update();
      });

      if (gallery) {
        const gSlider = gallery.querySelector('.certifs-gallery__images');
        const gSlidePrev = gallery.querySelector('.certifs-gallery__btn-prev');
        const gSlideNext = gallery.querySelector('.certifs-gallery__btn-next');
        const gSliderNum = gallery.querySelector('.certifs-gallery__num');
        const gTitle = gallery.querySelector('.certifs-gallery__title');
        const gDate = gallery.querySelector('.certifs-gallery__date');

        const gSwiper = new Swiper(gSlider, {
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheel: true,
          navigation: {
            nextEl: gSlideNext,
            prevEl: gSlidePrev,
          }
        });

        const textUpdate = () => {
          if (gSwiper.slides[gSwiper.activeIndex]) gTitle.innerHTML = 
            gSwiper.slides[gSwiper.activeIndex].dataset.title || '';
          if (gSwiper.slides[gSwiper.activeIndex]) gDate.innerHTML = 
            gSwiper.slides[gSwiper.activeIndex].dataset.date || '';
          gSliderNum.innerHTML = `${gSwiper.activeIndex + 1}/${gSwiper.slides.length}`;
        };

        textUpdate();
        gSwiper.on('slideChange', () => {
          textUpdate();

          swiper.slideTo(gSwiper.activeIndex, 0);
        });
        window.addEventListener('resize', () => {
          textUpdate();
          gSwiper.update();
        });

        swiper.slides.forEach((slide) => {
          slide.addEventListener('click', () => {
            gSwiper.slideTo(slide.dataset.index, 0);
          });
        });
      }
    });
  },

  certifsAllInit: function () {
    const certifPopup = document.querySelector('.certif-popup');

    document.querySelectorAll('.certifs-all').forEach((certifsAll) => {
      const items = certifsAll.querySelectorAll('.certifs-all__item');

      items.forEach((item, index) => {
        item.addEventListener('click', ev => {
          const title = item.querySelector('.certifs-all__item-title');
          const date = item.querySelector('.certifs-all__item-date');
          const image = item.querySelector('.certifs-all__item-image');

          if (certifPopup) {
            if (title) certifPopup.querySelector('.certif-popup__title').textContent = title.textContent || '';
            if (date) certifPopup.querySelector('.certif-popup__date').textContent = date.textContent || '';
            certifPopup.querySelector('.certif-popup__image').src = image.src || image.dataset.src;
          }
        });
      });
    });
  },

  reviewCardInit: function () {
    const certifPopup = document.querySelector('.certif-popup');

    document.querySelectorAll('.review-card').forEach((reviewCard) => {
      const title = reviewCard.querySelector('.review-card__title');
      const date = reviewCard.querySelector('.review-card__date');
      const image = reviewCard.querySelector('.review-card__certif');
      
      if (image && certifPopup) image.addEventListener('click', ev => {
        if (title) certifPopup.querySelector('.certif-popup__title').textContent = title.textContent;
        if (date) certifPopup.querySelector('.certif-popup__date').textContent = date.textContent;
        certifPopup.querySelector('.certif-popup__image').src = image.src || image.dataset.src;
      });
    });
  },

  historyInit: function () {
    document.querySelectorAll('.history').forEach((history) => {
      const items = history.querySelectorAll('.history__item');

      items.forEach((item, index) => {
        item.addEventListener('click', ev => {
          if (!item.classList.contains('--active')) {
            items.forEach((el, i) => {
              el.classList.remove('--active');
              el.classList.remove('--transform');

              if (i > index) {
                el.classList.add('--transform');
              }
            });
            item.classList.add('--active');
          }
        });
      });
    });
  },

  videoPopupInit: function () {
    const videoPopup = document.querySelector('.video-popup');
    const videoPopupLinks = document.querySelectorAll('.video-popup-link');
    
    if (videoPopup && videoPopupLinks) {
      /**
       * @type {HTMLVideoElement}
       */
      const video = videoPopup.querySelector('video.video-js');
      const topImage = videoPopup.querySelector('.video-popup__top-image');
      const title = videoPopup.querySelector('.video-popup__title');
      const date = videoPopup.querySelector('.video-popup__date');

      videoPopupLinks.forEach(link => {
        link.addEventListener('click', ev => {
          title.textContent = link.dataset.title || '';
          topImage.src = link.dataset.topImg || '';
          date.textContent = link.dataset.date || '';
          video.src = link.dataset.videoSrc || '';
          video.play();
        });
      });

      videoPopup.querySelector('._close-btn').addEventListener('click', ev => {
        video.pause();
        video.removeAttribute('src'); // empty source
        video.load();
      });
      videoPopup.addEventListener('click', ev => {
        if (!ev.target.closest('.popup-wrapper')) {
          video.pause();
          video.removeAttribute('src'); // empty source
          video.load();
        }
      });
    }
  },

  popularSliderInit: function() {
    document.querySelectorAll('.popular-slider').forEach(popular => {
      const slider = popular.querySelector('.popular-slider__items');
      const btnPrev = popular.querySelector('.popular-slider__btn-prev');
      const btnNext = popular.querySelector('.popular-slider__btn-next');
      const num = popular.querySelector('.popular-slider__num');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        breakpoints: {
          501: {
            slidesPerView: 2
          }
        },

        on: {
          init: function() {
            num.textContent = `${this.realIndex + 1}/${this.slides.length}`;
          },
          slideChange: function() {
            num.textContent = `${this.realIndex + 1}/${this.slides.length}`;
          }
        }
      });

      const update = () => {
        swiper.update();
      }
      update();

      window.addEventListener('resize', update);
    });
  },

  articlesCatInit: function() {
    const pageTabs = document.querySelector('.page-tabs');
    const header = document.querySelector('.header');

    if (header && pageTabs) {
      const pageTabsBtns = pageTabs.querySelectorAll('.page-tabs__btn');
      
      const update = () => {
        const articlesCat = document.querySelector('.articles-cat.--active');

        if (articlesCat) {
          const title = articlesCat.querySelector('.articles-cat__title');
          const rect = articlesCat.getBoundingClientRect();
          const pageTabsRect = pageTabs.getBoundingClientRect();
          const pageTabsStyle = getComputedStyle(pageTabs);

          let pageTabsHeight = Number(pageTabsStyle.height.replace('px', ''));
          let pageTabsMBottom = Number(pageTabsStyle.marginBottom.replace('px', ''));
          

          pageTabs.classList.add('--fixed');

          if (rect.top < pageTabsHeight + pageTabsMBottom && rect.bottom >= window.innerHeight) {
            pageTabs.style.top = `0px`;
            pageTabs.style.position = `fixed`;
            pageTabs.style.marginTop = `0`;
            pageTabs.style.translate = null;
            header.classList.add('--scrolled');
          } else if (rect.bottom < window.innerHeight && rect.top < pageTabsHeight + pageTabsMBottom) {
            pageTabs.style.top = `0px`;
            pageTabs.style.position = `fixed`;
            pageTabs.style.marginTop = `0`;
            pageTabs.style.translate = `0 -100%`;
          } else {
            pageTabs.style.top = null;
            pageTabs.style.position = null;
            pageTabs.style.marginTop = null;
            pageTabs.style.translate = null;
          }

          if (rect.top < pageTabsHeight && rect.bottom >= window.innerHeight && window.innerWidth > 940) {
            title.style.top = `${pageTabsHeight}px`;
            title.style.position = `fixed`;
            title.style.translate = null;
          } else if (rect.bottom < window.innerHeight && rect.top < pageTabsHeight && window.innerWidth > 940) {
            title.style.top = `${pageTabsHeight}px`;
            title.style.position = `fixed`;
            title.style.translate = `0 calc(-100% - ${pageTabsHeight}px)`;
          } else {
            title.style.top = null;
            title.style.position = null;
            title.style.translate = null;
          }
        } else {
          pageTabs.classList.remove('--fixed');
          pageTabs.style.top = null;
          pageTabs.style.position = null;
          pageTabs.style.marginTop = null;
          pageTabs.style.translate = null;
          pageTabs.style.top = null;
          pageTabs.style.position = null;
          pageTabs.style.marginTop = null;
          pageTabs.style.translate = null;
        }
      }
      window.addEventListener('scroll', update);
      window.scroll({top: 10}); window.scroll({ top: 0 });
      window.addEventListener('resize', update);
      pageTabsBtns.forEach((btn) => {
        btn.addEventListener('click', ev => {
          update();
          window.scroll({top: 10, behavior: 'smooth'});
        });
      });
    }
  },

  homeSliderInit: function () {
    document.querySelectorAll('.home-slider').forEach((homeSlider) => {
      const slider = homeSlider.querySelector('.home-slider__slider');
      const prevBtn = homeSlider.querySelector('.home-slider__prev-btn');
      const nextBtn = homeSlider.querySelector('.home-slider__next-btn');

      const swiper = new Swiper(slider.querySelector('.swiper'), {
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          }
        }
      });
    });
  },

  servicesSliderInit: function () {
    document.querySelectorAll('.services-slider').forEach((servicesSlider) => {
      const slider = servicesSlider.querySelector('.services-slider__slider');
      const prevBtn = servicesSlider.querySelector('.services-slider__prev-btn');
      const nextBtn = servicesSlider.querySelector('.services-slider__next-btn');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          }
        }
      });
    });
  },

  publicsSliderInit: function() {
    document.querySelectorAll('.publics-slider').forEach((publicsSlider) => {
      const slider = publicsSlider.querySelector('.publics-slider__slider');
      const prevBtn = publicsSlider.querySelector('.publics-slider__prev-btn');
      const nextBtn = publicsSlider.querySelector('.publics-slider__next-btn');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          }
        }
      })
    })
  },

  clientsSliderInit: function() {
    document.querySelectorAll('.clients-slider').forEach((clientsSlider) => {
      const slider = clientsSlider.querySelector('.clients-slider__slider');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 150+10);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 150+10);
            this.update();
          }
        }
      });
    });
  },

  ratingCardInit: function() {
    document.querySelectorAll('.rating-card').forEach((ratingCard) => {
      const slider = ratingCard.querySelector('.rating-card__slider');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 2000,
        },
      })
    });
  },

  reviewsSliderInit: function() {
    document.querySelectorAll('.reviews-slider').forEach((reviewsSlider) => {
      const slider = reviewsSlider.querySelector('.reviews-slider__slider');
      const sliderCount = reviewsSlider.querySelector('.reviews-slider__slider-count');
      const prevBtn = reviewsSlider.querySelector('.reviews-slider__prev-btn');
      const nextBtn = reviewsSlider.querySelector('.reviews-slider__next-btn');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        on: {
          init: function () {
            sliderCount.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;
          },
          slideChange: function () {
            sliderCount.innerHTML = `${this.realIndex + 1}/${this.slides.length}`;
          }
        }
      });
    });
  },

  pieChartInit: function () {
    document.querySelectorAll('.pie-chart').forEach( pieChart => {
      const segments = pieChart.querySelectorAll('.pie-chart__canvas svg>g>circle');
      const legendItems = pieChart.querySelectorAll('.pie-chart__legend li');

      let clicked = false;

      document.addEventListener('click', ev => {
        const targetSegment = ev.target.closest('.pie-chart__canvas svg>g>circle');
        const targetLegendItem = ev.target.closest('.pie-chart__legend li');
        
        if (targetSegment || targetLegendItem) {
          clicked = true;
          segments.forEach( (el, i) => {
            el.classList.remove('--hover');
          });
          legendItems.forEach( (el, i) => {
            el.classList.remove('--hover');
          });
          if (targetSegment) {
            const dataIndex = targetSegment.dataset.index;
            targetSegment.classList.add('--hover');
            if (legendItems[dataIndex]) {
              legendItems[dataIndex].classList.add('--hover');
            }
          }
          if (targetLegendItem) {
            const dataIndex = targetLegendItem.dataset.index;
            targetLegendItem.classList.add('--hover');
            if (segments[dataIndex]) {
              segments[dataIndex].classList.add('--hover');
            }
          }
        } else {
          clicked = false;
          segments.forEach( (el, i) => {
            el.classList.remove('--hover');
          });
          legendItems.forEach( (el, i) => {
            el.classList.remove('--hover');
          });
        }
      });

      document.addEventListener('mouseover', ev => {
        const targetSegment = ev.target.closest('.pie-chart__canvas svg>g>circle');
        const targetLegendItem = ev.target.closest('.pie-chart__legend li');
        
        if (!clicked) {
          if (targetSegment || targetLegendItem) {
            segments.forEach( (el, i) => {
              el.classList.remove('--hover');
            });
            legendItems.forEach( (el, i) => {
              el.classList.remove('--hover');
            });
            if (targetSegment) {
              const dataIndex = targetSegment.dataset.index;
              targetSegment.classList.add('--hover');
              if (legendItems[dataIndex]) {
                legendItems[dataIndex].classList.add('--hover');
              }
            }
            if (targetLegendItem) {
              const dataIndex = targetLegendItem.dataset.index;
              targetLegendItem.classList.add('--hover');
              if (segments[dataIndex]) {
                segments[dataIndex].classList.add('--hover');
              }
            }
          } else {
            segments.forEach( (el, i) => {
              el.classList.remove('--hover');
            });
            legendItems.forEach( (el, i) => {
              el.classList.remove('--hover');
            });
          }
        }
      });
    });
  },

  selectUpdate: function (select, selectItemClicked = null) {
    const button = select.querySelector('.select__button');
    const selectMenu = select.querySelector('.select-menu');
    
    let selected = [];

    if (selectMenu) {
      const items = selectMenu.querySelectorAll('.select-item');

      if (selectMenu.classList.contains('select-menu--radio')) {
        if (selectItemClicked) {
          selected = [];
          items.forEach((item) => {
            item.querySelector('input').checked = false;
          });
          selected.push(selectItemClicked.querySelector('input').value);
          selectItemClicked.querySelector('input').checked = true;
        }
      } else {
        items.forEach((item) => {
          if (item.querySelector('input').checked) {
            selected.push(item.querySelector('input').value);
          }
        });
      }
      if (selected.length !== 0) {
        select.classList.add('--filled');
        button.querySelector('span').textContent = selected.join(', ');
      } else {
        select.classList.remove('--filled');
        button.querySelector('span').textContent = button.dataset.emptyLabel;
      }
    }
  },

  selectReset: function (select) {
    const selectMenu = select.querySelector('.select-menu');

    if (selectMenu) {
      const items = selectMenu.querySelectorAll('.select-item');
      items.forEach((item) => {
        if (!item.querySelector('input').hasAttribute('data-start-checked')) {
          item.querySelector('input').checked = false;
        }
      });
      Ui.selectUpdate(select);
    }
  },

  selectInit: function () {
    const select = document.querySelectorAll('.select').forEach((select) => {
      const button = select.querySelector('.select__button');
      const selectMenu = select.querySelector('.select-menu');

      button.addEventListener('click', () => {
        select.classList.toggle('--active');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.select')) {
          select.classList.remove('--active');
        }
      });

      if (selectMenu) {
        Ui.selectUpdate(select);
        const items = selectMenu.querySelectorAll('.select-item');

        items.forEach((item) => {
          item.addEventListener('click', ev => {
            Ui.selectUpdate(select, ev.currentTarget);
          });
        });
      }
    });
  },

  publicsSiteInit: function () {
    document.querySelectorAll('.publics-site').forEach((publicsSite) => {
      const slider = publicsSite.querySelector('.publics-site__slider');
      const prevBtn = publicsSite.querySelector('.publics-site__prev-btn');
      const nextBtn = publicsSite.querySelector('.publics-site__next-btn');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        loop: true,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        on: {
          init: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            this.update();
          },
          resize: function() {
            Ui.swiperPerViewAutoUpdate(this, 285+10);
            
            this.update();
          }
        }
      });
    });
  },

  casesInit: function () {
    document.querySelectorAll('.cases').forEach(cases => {
      const slider = cases.querySelector('.cases__slider');
      const prevBtn = cases.querySelector('.cases__prev-btn');
      const nextBtn = cases.querySelector('.cases__next-btn');
      const num = cases.querySelector('.cases__num');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        },
        on: {
          init: function () {
            num.innerHTML = `${this.realIndex + 1} / ${this.slides.length}`;
          },
          slideChange: function () {
            num.innerHTML = `${this.realIndex + 1} / ${this.slides.length}`;
          }
        }
      })
    });
  },

  mktuSliderInit: function () {
    document.querySelectorAll('.mktu-slider').forEach(mktuSlider => {
      const slider = mktuSlider.querySelector('.mktu-slider__slider');

      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        slidesOffsetAfter: 30,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal',
        }
      });
    });
  },

  mktuProductsInit: function () {
    document.querySelectorAll('.mktu-products').forEach(mktuProducts => {
      const list = mktuProducts.querySelector('.mktu-products__list');
      const filterBtns = mktuProducts.querySelectorAll('.mktu-products__filter-btns .mktu');
      const items = mktuProducts.querySelectorAll('.mktu-products__list>li');

      let values = [];
      
      const update = function () {
        // Сброс values[]
        values = [];
        // Ищем активные кнопки
        filterBtns.forEach(btn => {
          if (btn.classList.contains('--active')) {
            values.push(btn.dataset.value);
          }
        });

        if (values.length > 0) {
          items.forEach(item => {
            item.classList.remove('--active');
          });
          values.forEach(value => {
            items.forEach(item => {
              if (item.dataset.value === value) {
                item.classList.add('--active');
              }
            });
          });
        } else {
          items.forEach(item => {
            item.classList.add('--active');
          });
        }

        if (values.length === 2) {
          list.setAttribute('data-colls', '2');
        } else if (values.length === 1) {
          list.setAttribute('data-colls', '1');
        } else {
          list.removeAttribute('data-colls');
        }
      }
      update();
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', ev => {
          btn.classList.toggle('--active');
          update();
        });
      });
    });
  },

  mktuAccordeonInit: function () {
    document.querySelectorAll('.mktu-accordeon').forEach(mktuAccordeon => {
      const label = mktuAccordeon.querySelector('.mktu-accordeon__label');
      const toggleBtn = mktuAccordeon.querySelector('.mktu-accordeon__toggle-btn');
      const dropdown = mktuAccordeon.querySelector('.mktu-accordeon__dropdown');
      const text = mktuAccordeon.querySelector('.mktu-accordeon__text');
      const textOpenBtn = mktuAccordeon.querySelector('.mktu-accordeon__text-open-btn');
      const textCloseBtn = mktuAccordeon.querySelector('.mktu-accordeon__text-close-btn');

      if (mktuAccordeon.classList.contains('--active')) {
        toggleBtn.classList.add('--opened');
      }

      const updateDropdownHeight = function () {
        if (mktuAccordeon.classList.contains('--active')) {
          dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
        } else {
          dropdown.style.maxHeight = '0px';
        }
      }
      updateDropdownHeight();

      label.addEventListener('click', ev => {
        mktuAccordeon.classList.toggle('--active');
        toggleBtn.classList.toggle('--opened');

        updateDropdownHeight();
      });

      label.addEventListener('mouseover', ev => {
        toggleBtn.classList.add('--hover');
      });
      label.addEventListener('mouseout', ev => {
        toggleBtn.classList.remove('--hover');
      });
      if (textCloseBtn) textCloseBtn.addEventListener('click', ev => {
        mktuAccordeon.classList.remove('--active');
        toggleBtn.classList.remove('--opened');
        updateDropdownHeight();
      });
    });
  },

  contactsSliderInit: function () {
    document.querySelectorAll('.contacts-slider').forEach(contactsSlider => {
      const swiper = new Swiper(contactsSlider.querySelector('.swiper'), {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 10,
        allowTouchMove: false,
        mousewheel: {
          forceToAxis: 'horizontal',
          enabled: true
        },
        effect: 'fade',
        navigation: {
          nextEl: contactsSlider.querySelector('.contacts-slider__next-btn'),
          prevEl: contactsSlider.querySelector('.contacts-slider__prev-btn'),
        },
        on: {
          init: function () {
            contactsSlider.querySelector('.contacts-slider__slider-num').innerHTML = 
              `${this.realIndex+1}/${this.slides.length}`;
          },
          slideChange: function () {
            contactsSlider.querySelector('.contacts-slider__slider-num').innerHTML =
              `${this.realIndex+1}/${this.slides.length}`;
          }
        }
      });
    });
  },

  textareaUpdate: function (textarea, value = null) {
    const textareaElem = textarea.querySelector('textarea');
    if (value && value !== null) {
      textareaElem.value = value;
    }
    if (textareaElem.value.length > 0) {
      textarea.classList.add('--filled');
    } else {
      textarea.classList.remove('--filled');
    }
  },

  textareaInit: function () {
    document.querySelectorAll('.textarea').forEach(textarea => {
      const textareaElem = textarea.querySelector('textarea');
      
      Ui.textareaUpdate(textarea);

      textareaElem.addEventListener('input', ev => {
        Ui.textareaUpdate(textarea);
      });
    });
  },

  contactsFeedbackInit: function () {
    document.querySelectorAll('.contacts-feedback').forEach(contactsFeedback => {
      const form = contactsFeedback.querySelector('form');
      const submitBtn = contactsFeedback.querySelector('.contacts-feedback__submit-btn');
      const policyInput = contactsFeedback.querySelector('.contacts-feedback__policy-input');

      const update = () => {
        if (!policyInput.querySelector('input').checked) {
          submitBtn.setAttribute('disabled', '');
        } else {
          submitBtn.removeAttribute('disabled');
        }
      };
      update();

      form.addEventListener('submit', ev => {
        ev.preventDefault();
      });

      policyInput.addEventListener('click', ev => {
        update();
      });
    });
  },

  supportSliderInit: function () {
    document.querySelectorAll('.support-slider').forEach(supportSlider => {
      const swiper = new Swiper(supportSlider.querySelector('.swiper'), {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 10,
        slidesOffsetAfter: 30,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal'
        }
      });
    });
  },

  svcProSliderInit: function () {
    document.querySelectorAll('.svc-pro-slider').forEach(svcProSlider => {
      const swiper = new Swiper(svcProSlider.querySelector('.swiper'), {
        direction: 'horizontal',
        slidesPerView: 'auto',
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: 'horizontal'
        },
        navigation: {
          nextEl: svcProSlider.querySelector('.swiper-slide-next'),
          prevEl: svcProSlider.querySelector('.swiper-slide-prev'),
        },

        on: {
          init: function () {
            svcProSlider.querySelector('.swiper-num').innerHTML =
              `${this.realIndex + 1}/${this.slides.length}`;
            Ui.swiperPerViewAutoUpdate(this, 330);
            this.update();
          },
          resize: function () {
            Ui.swiperPerViewAutoUpdate(this, 330);
            this.update();
          },
          slideChange: function () {
            svcProSlider.querySelector('.swiper-num').innerHTML =
              `${this.realIndex + 1}/${this.slides.length}`;
          }
        }
      });
    });
  },

  servicesTabInit: function () {
    document.querySelectorAll('.services-tab').forEach(svcTab => {
      const accordeons = svcTab.querySelectorAll('.services-tab__accordeon');

      const updateLaptopHeight = () => {
        if (window.innerWidth >= 740) {
          if (svcTab.querySelector('.services-tab__accordeon.--active')) {
            svcTab.style.minHeight = `${
              svcTab.querySelector('.services-tab__accordeon.--active').nextElementSibling.scrollHeight + 40
            }px`;
          } else {
            svcTab.style.minHeight = '0px';
          }

          accordeons.forEach(accordeon => {
            accordeon.nextElementSibling.style.maxHeight = null;
          });
        } else {
          svcTab.style.minHeight = null;

          accordeons.forEach(accordeon => {
            if (accordeon.classList.contains('--active')) {
              accordeon.nextElementSibling.style.maxHeight = `${
                accordeon.nextElementSibling.scrollHeight
              }px`;
            } else {
              accordeon.nextElementSibling.style.maxHeight = `0px`;
            }
          });
        }
      }
      updateLaptopHeight();

      accordeons.forEach((accordeon, index) => {
        accordeon.addEventListener('click', ev => {
          accordeons.forEach( (el, i) => {
            if (i === index) {
              el.classList.toggle('--active');
            } else {
              el.classList.remove('--active');
            }
          });
          updateLaptopHeight();
        });
      });

      window.addEventListener('resize', ev => {
        updateLaptopHeight();
      });
    });
  },

  priceCalcInit: function () {
    document.querySelectorAll('.price-calc').forEach(priceCalc => {
      const countMinus = priceCalc.querySelectorAll('.price-calc__count-wrap .btn')[0];
      const countPlus = priceCalc.querySelectorAll('.price-calc__count-wrap .btn')[1];
      const countValue = priceCalc.querySelector('.price-calc__count-wrap .input input');
      const countAll = priceCalc.querySelector('.price-calc__count-wrap .checkbox input');

      const tariffsLists = priceCalc.querySelectorAll('.price-calc__tariffs-list');

      priceCalc.addEventListener('submit', ev => {
        ev.preventDefault();
      });

      const updateCountBtns = () => {
        if (Number(countValue.value) <= 1) {
          countMinus.setAttribute('disabled', 'disabled');
        } else {
          countMinus.removeAttribute('disabled');
        }
        if (Number(countValue.value) >= Number(countValue.dataset.maskMax)) {
          countPlus.setAttribute('disabled', 'disabled');
        } else {
          countPlus.removeAttribute('disabled');
        }
      }

      countMinus.addEventListener('click', ev => {
        countValue.value = Number(countValue.value) - 1;
        updateCountBtns();
      });
      
      countPlus.addEventListener('click', ev => {
        countValue.value = Number(countValue.value) + 1;
        updateCountBtns();
      });

      countValue.addEventListener('input', ev => {
        updateCountBtns();
      });

      countAll.addEventListener('change', ev => {
        if (countAll.checked) {
          countMinus.setAttribute('disabled', 'disabled');
          countPlus.setAttribute('disabled', 'disabled');
          countValue.setAttribute('disabled', 'disabled');
        } else {
          updateCountBtns();
          countValue.removeAttribute('disabled');
        }
      });

      tariffsLists.forEach(list => {
        const label = list.querySelector('.price-calc__tariffs-list>p');
        const content = list.querySelector('.price-calc__tariffs-list>ul');

        const updateHeight = () => {
          if (label.classList.contains('--active')) {
            content.style.maxHeight = `${content.scrollHeight}px`;
          } else {
            content.style.maxHeight = `0px`;
          }
        }
        updateHeight();

        label.addEventListener('click', ev => {
          label.classList.toggle('--active');
          updateHeight();
        });

        window.addEventListener('resize', ev => {
          updateHeight();
        });
      });
    });
  },

  articleContentInit: function () {
    document.querySelectorAll('.article-content').forEach(articleContent => {
      const moreArticles = articleContent.querySelector('.more-articles');

      const updatePos = () => {
        if (window.innerWidth >= 1230) {
          const rect = articleContent.getBoundingClientRect();
          
          if (moreArticles) moreArticles.style.top = `${
            Number(-rect.top).clamp(-120, rect.height - moreArticles.clientHeight )
          }px`;
        }
      };

      window.addEventListener('DOMContentLoaded', ev => {
        updatePos();
      });

      window.addEventListener('scroll', ev => {
        updatePos();
      });

      window.addEventListener('resize', ev => {
        updatePos();
      });
    });
  },

  tariffSingleInit: function () {
    document.querySelectorAll('.tariff-single').forEach(tariffSingle => {
      const list = tariffSingle.querySelector('.tariff-single__list');
      const listLabel = tariffSingle.querySelector('.tariff-single__list-label');
      const listDropdown = tariffSingle.querySelector('.tariff-single__list-dropdown');
      
      const updateHeight = () => {
        if (listLabel.classList.contains('--active')) {
          listDropdown.style.maxHeight = `${listDropdown.scrollHeight}px`;
        } else {
          listDropdown.style.maxHeight = `0px`;
        }
      }

      if (window.innerWidth < 940) {
        listLabel.classList.remove('--active');
      } else {
        listLabel.classList.add('--active');
      }

      updateHeight();
      
      listLabel.addEventListener('click', ev => {
        listLabel.classList.toggle('--active');
        updateHeight();
      });
      
      window.addEventListener('resize', ev => {
        updateHeight();
      });
    });
  },

  fishChartInit: function () {
    document.querySelectorAll('.fish-chart').forEach(chart => {
      const update = () => {
        const segmentsGroupes = chart.querySelectorAll('.fish-chart__segments-group');
  
        segmentsGroupes.forEach(group => {
          const lines = group.querySelectorAll('.fish-chart__lines>div');
          const shape = group.querySelector('.fish-chart__shape');
  
          const shapeHeight = shape.getBoundingClientRect().height;
          shape.style.width = `${(lines.length -1) / lines.length * 100}%`;
  
          let shapePoints = [];
    
          lines.forEach((line, index) => {
            const nextLine = line.nextElementSibling;
            const span = line.querySelector('span');
    
            const width = line.getBoundingClientRect().width;
            const height = line.getBoundingClientRect().height;
            const heightNextLine = nextLine ? nextLine.getBoundingClientRect().height : line.getBoundingClientRect().height;
            
            let rad = Math.atan( 
              ( (heightNextLine - height) ) / width
            );
            let hypScale = 
              1 / Math.sin( Math.PI / 2 - rad);
            span.style.transform = `rotate(${-rad}rad) scaleX(${hypScale})`;
            console.log(hypScale, (heightNextLine - height));
            
  
            shapePoints.push([
              `${1 / (lines.length-1) * index * 100}%`,
              `${(1 - height / shapeHeight) * 100}%`
            ].join(' '));
          });
  
          let shapePointsStr = shapePoints.join(', ');
          
          shape.style.clipPath = `polygon(${shapePointsStr}, 100% 100%, 0 100%)`;
        });
      }

      update();

      window.addEventListener('resize', ev => {
        update();
      });
    });
  },

  init: function () {
    this.updateMktuFiltersUI();
    this.tariffInit();
    this.searchInit();
    this.searchFormInit();
    this.formMainInit();
    this.alertInit();
    this.accordeonInit();
    this.prereportInit();
    this.toggleBtnInit();
    this.inputInit();
    this.inputTextInit();
    this.mktuSelectInit();
    this.tabBtnInit();
    this.targetToTabInit();
    this.popupLinkInit();
    this.popupInit();
    this.consultPopupInit();
    this.tooltipInit();
    this.mktuGroupInit();
    this.menuInit();
    this.headerInit();
    this.orgsSliderInit();
    this.achievsInit();
    this.publicsInit();
    this.teamSliderInit();
    this.certifsInit();
    this.historyInit();
    this.popularSliderInit();
    this.articlesCatInit();
    this.homeSliderInit();
    this.servicesSliderInit();
    this.publicsSliderInit();
    this.clientsSliderInit();
    this.ratingCardInit();
    this.reviewsSliderInit();
    this.pieChartInit();
    this.selectInit();
    this.targetToTabContentInit();
    this.publicsSiteInit();
    this.casesInit();
    this.certifsAllInit();
    this.mktuSliderInit();
    this.mktuProductsInit();
    this.mktuAccordeonInit();
    this.reviewCardInit();
    this.videoPopupInit();
    this.copyBtnInit();
    this.contactsSliderInit();
    this.textareaInit();
    this.contactsFeedbackInit();
    this.supportSliderInit();
    this.svcProSliderInit();
    this.servicesTabInit();
    this.priceCalcInit();
    this.pageTabLoad();
    this.articleContentInit();
    this.tariffSingleInit();
    this.fishChartInit();
  }
}
Ui.init();