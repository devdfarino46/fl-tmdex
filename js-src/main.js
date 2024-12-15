const $ = require('jquery');
require('jquery-mask-plugin');

// === Renamed ===
// mktuFilter -> Ui.MktuFilter
// updateTooltips -> Ui.tooltipInit
// updateMktuGroups -> Ui.mktuGroupInit
// function accordeonOpen(accordeon, subaccordeon, delay = 50, open = false) -> Ui.accordeonOpen: function (accordeon, delay = 50, open = false)

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
let MktuFilter = ["01", "10", "13", "15"];


const Ui = {
  toggleTabs: function (btn, tabBtn = null) {
    const tabBtns = document.querySelectorAll('.tab-btn');
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
  },

  accordeonOpen: function (accordeon, delay = 50, open = false) {
    const subaccordeon = accordeon.nextElementSibling;

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
    const search = document.querySelector('.search');
    const searchForm = document.querySelector('.search-form');
    const mktuSelects = document.querySelectorAll('.mktu-select');
  
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
  },

  getTooltip: function (link) {
    return document.querySelector(link.getAttribute('data-href'));
  },


  tariffInit: function () {
    document.querySelectorAll('.tariff').forEach(function (tariff) {
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
    document.querySelectorAll('.search-form').forEach(searchForm => {
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

      btn.addEventListener('click', (e) => {
        btn.classList.toggle('--active');
    
        if (btn.classList.contains('--active')) {
          btn.innerHTML = btn.dataset.textHide;
        } else {
          btn.innerHTML = btn.dataset.textShow;
        }
      });
    });
  },

  accordeonInit: function () {
    document.querySelectorAll('.accordeon').forEach(function (accordeon) {
      const subaccordeon = accordeon.nextElementSibling;

      if (accordeon.classList.contains('--active')) {
        subaccordeon.classList.add('--show');
      }
    
      accordeon.addEventListener('click', ev => {
        Ui.accordeonOpen(accordeon);
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

      lookBtns.forEach(lookBtn => {
        lookBtn.addEventListener('click', (ev) => {
          const result = document.querySelector('.result');
          const content = document.querySelector(
            `.result__tab[data-tab="${lookBtn.dataset.tab}"]`
          );
          const accordeon = content.querySelectorAll('.accordeon')[0];
    
          const resultRect = result.getBoundingClientRect();
          const timer = setInterval(() => {
            if (
              resultRect.top >= 90
            ) {
              Ui.accordeonOpen(accordeon, 600, true);
              
              clearInterval(timer);
            }
          }, 50);
        });
      });
    });
  },

  toggleBtnInit: function () {
    document.querySelectorAll('.btn--toggle').forEach(function (btn) {
      if (!btn.classList.contains('--no-event')) {
        btn.addEventListener('click', () => {
          btn.classList.toggle('--opened');
        });
      }
    });
  },
  
  inputInit: function () {
    document.querySelectorAll('.input').forEach(function (input) {
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
    document.querySelectorAll('.tab-btn').forEach(btn => {
      Ui.toggleTabs(btn);
    });
  },

  targetToTab: function () {
    document.querySelectorAll('.target-to-tab').forEach(btn => {
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${btn.dataset.tab}"]`);
      Ui.toggleTabs(btn, tabBtn);
    });
  },

  resultInit: function () {
    document.querySelectorAll('.result').forEach(result => {
      const prereport = document.querySelector('.prereport');
      const toUpBtn = result.querySelector('.result__to-up-btn');
      
      if (toUpBtn) toUpBtn.addEventListener('click', () => {
        window.scrollTo({
          top: prereport.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
  },

  popupLinkInit: function () {
    document.querySelectorAll('.popup-link').forEach(link => {
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
  },

  consultPopupInit: function () {
    document.querySelectorAll('.consult-popup').forEach(consultPopup => {
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
    });
  },

  tooltipInit: function () {
    const tooltips = document.querySelectorAll('.tooltip');
    const tooltipLinks = document.querySelectorAll('.tooltip-link');

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
        change(Ui.getTooltip(e.target));
        Ui.getTooltip(e.target).classList.add('--visibled');
      });
      link.addEventListener('mouseleave', (e) => {
        tooltips.forEach(t => t.classList.remove('--visibled'));
      });
    
      window.addEventListener('scroll', () => {
        tooltips.forEach(t => t.classList.remove('--visibled'));
      });
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
      const slideLeftBtn = menu.querySelector('.menu__slide-left-btn');
      const slideRightBtn = menu.querySelector('.menu__slide-right-btn');
      const menuItens = menu.querySelector('.menu__items');
      const menuItensWrap = menu.querySelector('.menu__items-wrap');
      const swiperSlides = menu.querySelectorAll('.menu__items .swiper-slide');
      const menuCards = menu.querySelectorAll('.menu-card');
      const prevBtn = menu.querySelector('.menu__btn-prev');

      const transitionDelayStep = 0.1;
      const swiper = new Swiper(menuItens, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: slideRightBtn,
          prevEl: slideLeftBtn
        },
        mousewheel: true,
        init: false
      });

      if (window.innerWidth > 740) {
        swiper.init();
      }

      swiperSlides.forEach((slide, index) => {
        slide.style.transitionDelay = `${index * transitionDelayStep}s`;

        if (slide.getAttribute('data-menu-card-link') !== null) {
          slide.addEventListener('click', ev => {
            menuCards.forEach(menuCard => {
              if (menuCard.getAttribute('data-menu-card-link') === slide.getAttribute('data-menu-card')) {
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
        } else {
          menu.classList.add('--opened');
        }
      });

      document.addEventListener('click', ev => {
        if (!ev.target.closest('.menu') && !ev.target.closest('.menu-open-btn')) {
          menu.classList.remove('--opened');
        }
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
    this.targetToTab();
    this.popupLinkInit();
    this.resultInit();
    this.consultPopupInit();
    this.tooltipInit();
    this.mktuGroupInit();
    this.menuInit();
  }
}
Ui.init();