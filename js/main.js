"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MKTUS = {
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
var OKVEDS = {
  "47.19.20": "Производство резины и пластмассовых изделий",
  "47.19.1": "Производство химических продуктов, фармацевтических препаратов и других химических продуктов",
  "47.19": "Производство машин и оборудования"
};
var CORRESPS = {
  "10": ["13", "14", "17", "21"],
  "15": ["16", "18", "19", "20"]
};
var MktuFilter = ["01", "10", "13", "15", "35"];
var Ui = {
  toggleTabs: function toggleTabs(btn) {
    var tabBtn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var scroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var tabBtns = document.querySelectorAll('.tab-btn, .tab-btn-nocss');
    var tabContents = document.querySelectorAll('.tab-content');
    btn.addEventListener('click', function (ev) {
      tabBtns.forEach(function (el) {
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
      tabContents.forEach(function (content) {
        if (btn.dataset.tab === content.dataset.tab) {
          content.classList.add('--active');
        } else if (btn.dataset.tab.split(' ')[0] === content.dataset.tab.split(' ')[0]) {
          content.classList.remove('--active');
        }
      });
    });
  },
  accordeonOpen: function accordeonOpen(accordeon) {
    var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var subaccordeon = accordeon.nextElementSibling;
    if (!open) {
      accordeon.classList.toggle('--active');
    } else {
      accordeon.classList.add('--active');
    }
    if (accordeon.classList.contains('--active')) {} else {}
  },
  mktuCorrespsHandler: function mktuCorrespsHandler(mktu, mktus, handler) {
    for (var _i = 0, _Object$entries = Object.entries(CORRESPS); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (mktu.dataset.value === key) {
        value.forEach(function (corr) {
          mktus.forEach(function (el) {
            if (el.dataset.value === corr) {
              handler(el);
            }
          });
        });
      }
    }
  },
  updateMktuFiltersUI: function updateMktuFiltersUI() {
    var search = document.querySelector('.search');
    var searchForm = document.querySelector('.search-form');
    var mktuSelects = document.querySelectorAll('.mktu-select');
    if (mktuSelects && search && searchForm) {
      var mktuItems = searchForm.querySelectorAll('.mktu-dropdown .mktu');
      var mktuItemsText = searchForm.querySelectorAll('.mktu-dropdown-text .mktu-dropdown-text__item');
      var allowCorrespCheckbox = searchForm.querySelector('.mktu-dropdown .mktu-dropdown__checkbox input');

      // Reset UI
      mktuItems.forEach(function (mktuItem) {
        mktuItem.nextElementSibling.removeAttribute('checked');
        mktuItem.nextElementSibling.nextElementSibling.removeAttribute('checked');
      });
      mktuItemsText.forEach(function (mktuItemText) {
        mktuItemText.nextElementSibling.removeAttribute('checked');
      });
      mktuSelects.forEach(function (mktuSelect, index) {
        mktuSelect.classList.remove('--show');
      });
      MktuFilter.forEach(function (item) {
        mktuItems.forEach(function (mktuItem) {
          if (mktuItem.dataset.value === item) {
            mktuItem.nextElementSibling.setAttribute('checked', '');
            if (allowCorrespCheckbox.checked) {
              Ui.mktuCorrespsHandler(mktuItem, mktuItems, function (el) {
                el.nextElementSibling.nextElementSibling.setAttribute('checked', '');
              });
            }
          }
        });
        mktuItems.forEach(function (mktuItem) {
          Ui.mktuCorrespsHandler(mktuItem, mktuItems, function (el) {
            if (el.nextElementSibling.getAttribute('checked') !== null) {
              el.nextElementSibling.nextElementSibling.removeAttribute('checked');
            }
          });
        });
        mktuItemsText.forEach(function (mktuItemText) {
          if (mktuItemText.dataset.value === item) {
            mktuItemText.nextElementSibling.setAttribute('checked', '');
          }
        });
        mktuSelects.forEach(function (mktuSelect) {
          if (mktuSelect.dataset.value === item) {
            mktuSelect.classList.add('--show');
          }
        });
      });
    }
  },
  getTooltip: function getTooltip(link) {
    return document.querySelector(link.getAttribute('data-href'));
  },
  tariffInit: function tariffInit() {
    document.querySelectorAll('.tariff').forEach(function (tariff) {
      var listLabel = tariff.querySelector('.tariff__list-label');
      if (listLabel) {
        if (window.innerWidth < 740) {
          listLabel.classList.remove('--active');
        }
        listLabel.addEventListener('click', function () {
          listLabel.classList.toggle('--active');
        });
      }
    });
  },
  searchInit: function searchInit() {
    document.querySelectorAll('.search').forEach(function (search) {
      var title = search.querySelector('.search__title');
      var form = search.querySelector('.search-form');
      var switchBtn = search.querySelector('.search-form__switch');
      if (title && form && switchBtn && title.dataset.text1 && title.dataset.text2) {
        switchBtn.addEventListener('click', function () {
          if (!switchBtn.querySelector('input').checked) {
            title.innerHTML = title.dataset.text1;
          } else {
            title.innerHTML = title.dataset.text2;
          }
        });
      }
    });
  },
  searchFormInit: function searchFormInit() {
    document.querySelectorAll('.search-form').forEach(function (searchForm) {
      var switchInput = searchForm.querySelector('.search-form__switch');
      var proInputs = searchForm.querySelectorAll('.search-form__pro-input');
      if (proInputs) {
        proInputs.forEach(function (input, index) {
          var disableHandler = function disableHandler() {
            if (input.querySelector('input').value.length > 0) {
              proInputs.forEach(function (el, i) {
                if (i !== index) {
                  el.querySelector('input').disabled = true;
                }
              });
            } else {
              proInputs.forEach(function (el, i) {
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
      if (!switchInput.querySelector('input').checked && !searchForm.classList.contains('--hide-mktu')) {
        var mktuInput = searchForm.querySelector('.search-form [data-item="mktu"]');
        var mktuDropdown = searchForm.querySelector('.mktu-dropdown');
        var mktuDropdownText = searchForm.querySelector('.mktu-dropdown-text');

        // MktuDropdown
        if (mktuDropdown) {
          var mktus = mktuDropdown.querySelectorAll('.mktu');
          var checkbox = mktuDropdown.querySelector('.mktu-dropdown__checkbox');
          var applyBtn = mktuDropdown.querySelector('.mktu-dropdown__apply-btn');
          var clearBtn = mktuDropdown.querySelector('.mktu-dropdown__clear-btn');

          // Show dropdown
          mktuInput.addEventListener('click', function () {
            mktuDropdown.classList.add('--active');
          });

          // Hide dropdown
          document.addEventListener('click', function (ev) {
            if (!ev.composedPath().includes(mktuInput) && !ev.composedPath().includes(mktuDropdown)) {
              mktuDropdown.classList.remove('--active');
            }
          });

          // Toggle allowed search with corresponds mktu
          checkbox.addEventListener('click', function () {
            Ui.updateMktuFiltersUI();
          });

          // Apply and hide dropdown
          applyBtn.addEventListener('click', function () {
            mktuDropdown.classList.remove('--active');
          });

          // Clear finters
          clearBtn.addEventListener('click', function () {
            MktuFilter = [];
            Ui.updateMktuFiltersUI();
          });
          mktus.forEach(function (mktu) {
            var input = mktu.nextElementSibling;
            var cInput = mktu.nextElementSibling.nextElementSibling;

            // Hover corresponds mktu
            mktu.addEventListener('mouseover', function (ev) {
              if (checkbox.querySelector('input').checked) {
                Ui.mktuCorrespsHandler(mktu, mktus, function (el) {
                  el.classList.add('--corresp-hover');
                });
              }
            });
            mktu.addEventListener('mouseout', function (ev) {
              mktus.forEach(function (el) {
                el.classList.remove('--corresp-hover');
              });
            });
            mktu.addEventListener('click', function (ev) {
              // Clear hover corresponds mktu
              mktus.forEach(function (el) {
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
          var items = mktuDropdownText.querySelectorAll('.mktu-dropdown-text__item');
          var _applyBtn = mktuDropdownText.querySelector('.mktu-dropdown-text__apply-btn');
          var _clearBtn = mktuDropdownText.querySelector('.mktu-dropdown-text__clear-btn');

          // Show dropdown
          var show = function show() {
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
          document.addEventListener('click', function (ev) {
            if (!ev.composedPath().includes(mktuInput) && !ev.composedPath().includes(mktuDropdownText)) {
              mktuDropdownText.classList.remove('--active');
            }
          });

          // Apply and hide dropdown
          _applyBtn.addEventListener('click', function () {
            mktuDropdownText.classList.remove('--active');
          });

          // Clear finters
          _clearBtn.addEventListener('click', function () {
            MktuFilter = [];
            Ui.updateMktuFiltersUI();
          });

          // Select item
          items.forEach(function (item) {
            var input = item.nextElementSibling;
            item.addEventListener('click', function (ev) {
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
  formMainInit: function formMainInit() {
    document.querySelectorAll('.form-main').forEach(function (formMain) {
      var form = formMain.querySelector('.form-main__form');
      var title = formMain.querySelector('.form-main__title');
      var descr = formMain.querySelector('.form-main__descr');
      var policyInput = form.querySelector('.form-main__policy-input');
      var submitBtn = form.querySelector('.form-main__submit');
      var toggleSubmit = function toggleSubmit() {
        if (policyInput.querySelector('input').checked) {
          submitBtn.disabled = false;
        } else {
          submitBtn.disabled = true;
        }
      };
      toggleSubmit();
      if (form) {
        formMain.addEventListener('submit', function (e) {
          e.preventDefault();
          toggleSubmit();
          title.innerHTML = title.dataset.textSuccess;
          descr.innerHTML = descr.dataset.textSuccess;
          form.remove();
        });
      }
      policyInput.addEventListener('click', toggleSubmit);
    });
  },
  alertInit: function alertInit() {
    document.querySelectorAll('.alert').forEach(function (alert) {
      var btn = alert.querySelector('.alert__show-details-btn');
      if (btn) {
        btn.addEventListener('click', function (e) {
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
  accordeonInit: function accordeonInit() {
    document.querySelectorAll('.accordeon').forEach(function (accordeon) {
      var subaccordeon = accordeon.nextElementSibling;
      var btn = accordeon.querySelector('.btn');
      accordeon.addEventListener('click', function (ev) {
        Ui.accordeonOpen(accordeon);
      });
      accordeon.addEventListener('mouseover', function (ev) {
        btn.classList.add('--hover');
      });
      accordeon.addEventListener('mouseout', function (ev) {
        btn.classList.remove('--hover');
      });
    });
  },
  prereportInit: function prereportInit() {
    document.querySelectorAll('.prereport').forEach(function (prereport) {
      var label = prereport.querySelector('.prereport__label');
      var labelBtn = prereport.querySelector('.prereport__label-btn');
      var content = prereport.querySelector('.prereport__content');
      var hideBtn = prereport.querySelector('.prereport__hide-btn');
      var lookBtns = prereport.querySelectorAll('.prereport__look-btn');
      var upTo = document.querySelector('.up-to-prereport');
      var docTextLabels = prereport.querySelectorAll('.prereport__doc-text-label');
      if (labelBtn.classList.contains('--opened')) {
        content.classList.add('--show');
      }
      label.addEventListener('click', function (ev) {
        labelBtn.classList.toggle('--opened');
      });
      label.addEventListener('mouseover', function (ev) {
        labelBtn.classList.add('--hover');
      });
      label.addEventListener('mouseout', function (ev) {
        labelBtn.classList.remove('--hover');
      });
      docTextLabels.forEach(function (docTextLabel) {
        docTextLabel.addEventListener('click', function (ev) {
          docTextLabel.classList.toggle('--opened');
        });
      });
      hideBtn.addEventListener('click', function () {
        labelBtn.classList.remove('--opened');
        window.scrollTo({
          top: prereport.offsetTop - 100
        });
        content.classList.remove('--show');
      });
      lookBtns.forEach(function (lookBtn) {
        lookBtn.addEventListener('click', function (ev) {
          var result = document.querySelector('.result');
          var content = document.querySelector(".result__tab[data-tab=\"".concat(lookBtn.dataset.tab, "\"]"));
          var accordeon = content.querySelectorAll('.accordeon')[0];
          var timer = setInterval(function () {
            var resultRect = result.getBoundingClientRect();
            if (resultRect.top <= 90) {
              console.log(resultRect.top);
              setTimeout(function () {
                return Ui.accordeonOpen(accordeon, true);
              }, 100);
              clearInterval(timer);
            }
          }, 50);
          upTo.dataset.section = lookBtn.closest('.prereport__subcontent').getAttribute('id');
          upTo.classList.add('--visibled');
        });
      });
      upTo.querySelector('.btn').addEventListener('click', function (ev) {
        window.scrollBy({
          top: document.querySelector('#' + upTo.dataset.section).getBoundingClientRect().top - 100,
          behavior: 'smooth'
        });
        upTo.classList.remove('--visibled');
      });
    });
  },
  toggleBtnInit: function toggleBtnInit() {
    document.querySelectorAll('.btn--toggle').forEach(function (btn) {
      if (!btn.classList.contains('--no-event')) {
        btn.addEventListener('click', function () {
          btn.classList.toggle('--opened');
        });
      }
    });
  },
  inputInit: function inputInit() {
    document.querySelectorAll('.input').forEach(function (input) {
      var btn = input.querySelector('.input__wrapper button');
      var inputElem = input.querySelector('.input__wrapper input');

      // Reset state
      input.addEventListener('click', function () {
        input.dataset.status = "";
      });

      // Clear input
      inputElem.addEventListener('input', function () {
        if (inputElem.value.length > 0) {
          input.classList.add('--clear-on');
        } else {
          input.classList.remove('--clear-on');
        }
      });
      btn.addEventListener('click', function () {
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
  inputTextInit: function inputTextInit() {
    document.querySelectorAll('.input-text').forEach(function (input) {
      var inputElem = input.querySelector('input');
      var btn = input.querySelector('.btn');
      inputElem.addEventListener('input', function (ev) {
        if (inputElem.value.length > 0) {
          input.classList.add('--clear-on');
        } else {
          input.classList.remove('--clear-on');
        }
      });
      btn.addEventListener('click', function (ev) {
        inputElem.value = '';
        input.classList.remove('--clear-on');
      });
    });
  },
  mktuSelectInit: function mktuSelectInit() {
    document.querySelectorAll('.mktu-select').forEach(function (select) {
      var btn = select.querySelector('.mktu-select i');
      btn.addEventListener('click', function () {
        MktuFilter.splice(MktuFilter.indexOf(select.dataset.value), 1);
        Ui.updateMktuFiltersUI();
      });
    });
  },
  tabBtnInit: function tabBtnInit() {
    document.querySelectorAll('.tab-btn, .tab-btn-nocss').forEach(function (btn) {
      Ui.toggleTabs(btn);
    });
  },
  targetToTabInit: function targetToTabInit() {
    document.querySelectorAll('.target-to-tab').forEach(function (btn) {
      var tabBtn = document.querySelector(".tab-btn[data-tab=\"".concat(btn.dataset.tab, "\"]"));
      Ui.toggleTabs(btn, tabBtn, true);
    });
  },
  popupLinkInit: function popupLinkInit() {
    document.querySelectorAll('.popup-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var popup = document.querySelector(link.getAttribute('href'));
        var btnOk = popup.querySelector('._btn-ok');
        var btnClose = popup.querySelector('._close-btn');
        popup.classList.add('--visibled');
        document.body.classList.add('no-scroll');
      });
    });
  },
  popupInit: function popupInit() {
    document.querySelectorAll('.popup').forEach(function (popup) {
      var wrapper = popup.querySelector('.popup-wrapper');
      var btnOk = popup.querySelector('._btn-ok');
      var btnClose = popup.querySelector('._close-btn');
      if (popup.classList.contains('--visibled')) {
        document.body.classList.add('no-scroll');
      }
      popup.addEventListener('click', function (e) {
        if (!e.composedPath().includes(wrapper)) {
          popup.classList.remove('--visibled');
          document.body.classList.remove('no-scroll');
        }
      });
      if (btnOk) btnOk.addEventListener('click', function () {
        popup.classList.remove('--visibled');
        document.body.classList.remove('no-scroll');
      });
      if (btnClose) btnClose.addEventListener('click', function () {
        popup.classList.remove('--visibled');
        document.body.classList.remove('no-scroll');
      });
    });
  },
  consultPopupInit: function consultPopupInit() {
    document.querySelectorAll('.consult-popup').forEach(function (consultPopup) {
      var form = consultPopup.querySelector('.consult-popup__form');
      var btnOk = consultPopup.querySelector('.consult-popup__btn-ok');
      btnOk.addEventListener('click', function () {
        consultPopup.classList.remove('--success');
      });
      if (form) {
        var checkbox = form.querySelector('.checkbox');
        var submitBtn = form.querySelector('.consult-popup__submit-btn');
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          consultPopup.classList.add('--success');
          // send form
        });
        var disableSubmitBtn = function disableSubmitBtn() {
          if (checkbox.querySelector('input').checked) {
            submitBtn.removeAttribute('disabled');
          } else {
            submitBtn.setAttribute('disabled', '');
          }
        };
        disableSubmitBtn();
        checkbox.addEventListener('click', disableSubmitBtn);
      }
    });
  },
  tooltipInit: function tooltipInit() {
    var tooltips = document.querySelectorAll('.tooltip');
    var tooltipLinks = document.querySelectorAll('.tooltip-link');
    var change = function change(tooltip, link) {
      var rect = tooltip.getBoundingClientRect();
      var lRect = link.getBoundingClientRect();

      // Positioning tooltip
      if (window.innerWidth > 700) {
        if (lRect.left < 450) {
          tooltip.style.paddingLeft = "".concat(lRect.left, "px");
          tooltip.style.paddingRight = "0";
          tooltip.style.alignItems = 'flex-start';
        } else {
          tooltip.style.paddingLeft = "0";
          tooltip.style.paddingRight = "".concat(window.innerWidth - lRect.right, "px");
          tooltip.style.alignItems = 'flex-end';
        }
      } else {
        tooltip.style.paddingLeft = "20px";
        tooltip.style.paddingRight = "20px";
        tooltip.style.alignItems = 'stretch';
      }
      if (lRect.top < window.innerHeight - 350) {
        tooltip.style.paddingTop = "".concat(lRect.bottom + 5, "px");
        tooltip.style.paddingBottom = "5px";
        tooltip.style.justifyContent = 'flex-start';
      } else {
        tooltip.style.paddingTop = "5px";
        tooltip.style.paddingBottom = "".concat(window.innerHeight - lRect.top - 5, "px");
        tooltip.style.justifyContent = 'flex-end';
      }

      // Texting tooltip
      if (link.getAttribute('data-href') === '#tooltip-mktu-0') {
        var value = link.getAttribute('data-value');
        var num = tooltip.querySelector('._mktu-num');
        var descr = tooltip.querySelector('._mktu-descr');
        num.innerHTML = value;
        descr.innerHTML = MKTUS[value];
      }
      if (link.getAttribute('data-href') === '#tooltip-okved') {
        var _value = link.getAttribute('data-value');
        var _num = tooltip.querySelector('._okved-num');
        var _descr = tooltip.querySelector('._okved-descr');
        var type = tooltip.querySelector('._okved-type');
        _num.innerHTML = _value;
        _descr.innerHTML = OKVEDS[_value];
        if (link.getAttribute('data-main') !== null) {
          type.innerHTML = type.getAttribute('data-text-main');
        } else {
          type.innerHTML = type.getAttribute('data-text-addit');
        }
      }
    };
    var lockMouseMove = false;
    document.body.addEventListener('mousemove', function (e) {
      var link = e.target.closest('.tooltip-link');
      if (link && !lockMouseMove) {
        var tooltipTarget = Ui.getTooltip(link);
        change(tooltipTarget, link);
        tooltips.forEach(function (t) {
          return t.classList.remove('--visibled');
        });
        tooltipTarget.classList.add('--visibled');
      } else if (!lockMouseMove) {
        tooltips.forEach(function (t) {
          return t.classList.remove('--visibled');
        });
      }
    });
    document.body.addEventListener('mouseup', function (e) {
      var link = e.target.closest('.tooltip-link');
      var tooltip = e.target.closest('.tooltip');
      var tooltipWrapper = e.target.closest('.tooltip__wrapper');
      if (link) {
        lockMouseMove = true;
        var tooltipTarget = Ui.getTooltip(link);
        change(tooltipTarget, link);
        tooltips.forEach(function (t) {
          return t.classList.remove('--visibled');
        });
        tooltipTarget.classList.add('--visibled');
      } else {
        lockMouseMove = false;
        tooltips.forEach(function (t) {
          return t.classList.remove('--visibled');
        });
      }
    });
    window.addEventListener('scroll', function (e) {
      tooltips.forEach(function (t) {
        return t.classList.remove('--visibled');
      });
      lockMouseMove = false;
    });
    window.addEventListener('resize', function (e) {
      tooltips.forEach(function (t) {
        return t.classList.remove('--visibled');
      });
      lockMouseMove = false;
    });
  },
  mktuGroupInit: function mktuGroupInit() {
    document.querySelectorAll('.mktu-group').forEach(function (group) {
      var btn = group.querySelector('.mktu-group .btn');
      var list = group.querySelector('.mktu-group__list div');
      var mktus = group.querySelectorAll('.mktu');
      var hide = function hide() {
        var count = 0;
        btn.classList.add('--hidden');
        mktus.forEach(function (mktu, index) {
          var displayStyle = window.getComputedStyle(mktu).getPropertyValue('display');
          if (displayStyle === 'none') {
            count += 1;
            btn.querySelector('span').textContent = "+".concat(count);
            btn.classList.remove('--hidden');
          }
        });
      };
      hide();
      btn.addEventListener('click', function (ev) {
        group.classList.toggle('--opened');
      });
    });
  },
  menuInit: function menuInit() {
    document.querySelectorAll('.menu').forEach(function (menu) {
      var menuOpenBtn = document.querySelector('.menu-open-btn');
      var slideLeftBtn = menu.querySelector('.menu__slide-left-btn');
      var slideRightBtn = menu.querySelector('.menu__slide-right-btn');
      var menuItems = menu.querySelector('.menu__items');
      var menuItensWrap = menu.querySelector('.menu__items-wrap');
      var swiperSlides = menu.querySelectorAll('.menu__items .swiper-slide');
      var prevBtn = menu.querySelector('.menu__btn-prev');
      var menuCards = menu.querySelectorAll('.menu-card');
      var swiper = new Swiper(menuItems, {
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
      var swiperInit = function swiperInit() {
        if (window.innerWidth > 740) {
          swiper.enable();
        } else {
          swiper.disable();
        }
      };
      swiperInit();
      window.addEventListener('resize', swiperInit);
      menuCards.forEach(function (card) {
        var listColls = card.querySelectorAll('.menu-card__list-coll');
        listColls.forEach(function (coll, index) {
          coll.style.transitionDelay = "".concat(index * 0.2 + 0.2, "s");
        });
      });
      swiperSlides.forEach(function (slide, index) {
        slide.style.transitionDelay = "".concat(index * 0.1, "s");
        if (slide.getAttribute('data-menu-card-link') !== null) {
          slide.addEventListener('click', function (ev) {
            menuCards.forEach(function (menuCard) {
              if (menuCard.getAttribute('data-menu-card-link') === slide.getAttribute('data-menu-card')) {
                menuCard.classList.add('--opened');
                menuItensWrap.style.minHeight = "".concat(menuCard.offsetHeight, "px");
              } else {
                menuCard.classList.remove('--opened');
                menuItensWrap.style.minHeight = 0;
              }
            });
            prevBtn.addEventListener('click', function (ev) {
              menuCards.forEach(function (menuCard) {
                menuCard.classList.remove('--opened');
              });
              menuItensWrap.style.minHeight = 0;
            });
          });
        }
      });
      menuOpenBtn.addEventListener('click', function (ev) {
        if (menu.classList.contains('--opened')) {
          menu.classList.remove('--opened');
          document.body.classList.remove('no-scroll');
          swiper.slideTo(0);
          menuCards.forEach(function (menuCard) {
            menuCard.classList.remove('--opened');
          });
        } else {
          menu.classList.add('--opened');
          document.body.classList.add('no-scroll');
        }
      });
      document.addEventListener('click', function (ev) {
        if (!ev.target.closest('.menu') && !ev.target.closest('.menu-open-btn')) {
          menu.classList.remove('--opened');
          menuOpenBtn.classList.remove('--opened');
          menuCards.forEach(function (menuCard) {
            menuCard.classList.remove('--opened');
          });
        }
      });
    });
  },
  headerInit: function headerInit() {
    document.querySelectorAll('.header').forEach(function (header) {
      var scrollY = 0;
      window.addEventListener('scroll', function (ev) {
        if (scrollY > window.scrollY) {
          header.classList.remove('--scrolled');
        } else if (scrollY > 100) {
          header.classList.add('--scrolled');
        }
        scrollY = window.scrollY;
      });
    });
  },
  orgsSliderInit: function orgsSliderInit() {
    document.querySelectorAll('.orgs-slider').forEach(function (slider) {
      var swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        freeMode: true,
        loop: true,
        mousewheel: {
          forceToAxis: true,
          enabled: true
        },
        autoplay: {
          delay: 1
        },
        speed: 1000,
        breakpoints: {
          1230: {
            autoplay: false,
            loop: false
          }
        }
      });
      window.addEventListener('resize', function (ev) {
        swiper.update();
        if (window.innerWidth < 1230) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    });
  },
  achievsInit: function achievsInit() {
    document.querySelectorAll('.achievs').forEach(function (achievs) {
      var slider = achievs.querySelector('.achievs__slider');
      var swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 10,
        loop: true,
        mousewheel: {
          enabled: true,
          forceToAxis: true
        },
        autoplay: {
          delay: 1
        },
        speed: 1000,
        breakpoints: {
          1230: {
            loop: false,
            autoplay: false
          }
        }
      });
      window.addEventListener('resize', function (ev) {
        swiper.update();
        if (window.innerWidth < 1230) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    });
  },
  publicsInit: function publicsInit() {
    document.querySelectorAll('.publics').forEach(function (publics) {
      var slider = publics.querySelector('.publics__slider');
      var sliderNum = publics.querySelector('.publics__slider-num');
      var slideBtnPrev = publics.querySelector('.publics__slider-btn-prev');
      var slideBtnNext = publics.querySelector('.publics__slider-btn-next');
      var swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        mousewheel: {
          forceToAxis: true,
          enable: true
        },
        spaceBetween: 10,
        navigation: {
          nextEl: slideBtnNext,
          prevEl: slideBtnPrev
        }
      });
      sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length - 1);
      swiper.on('slideChange', function () {
        sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length - 1);
      });
      window.addEventListener('resize', function (ev) {
        swiper.update();
      });
    });
  },
  teamSliderInit: function teamSliderInit() {
    document.querySelectorAll('.team-slider').forEach(function (team) {
      var slider = team.querySelector('.team-slider__slider');
      var sliderNum = team.querySelector('.team-slider__num');
      var slideBtnPrev = team.querySelector('.team-slider__btns ._slide-prev');
      var slideBtnNext = team.querySelector('.team-slider__btns ._slide-next');
      var slides = team.querySelectorAll('.team-slider__slide');
      var swiper = new Swiper(slider, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: slideBtnNext,
          prevEl: slideBtnPrev
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true
        }
      });
      slides.forEach(function (slide) {
        slide.addEventListener('mouseenter', function (ev) {
          slides.forEach(function (el) {
            el.classList.remove('--hover');
          });
          slide.classList.add('--hover');
        });
        slide.addEventListener('mouseleave', function (ev) {
          slides.forEach(function (el) {
            el.classList.remove('--hover');
          });
        });
      });
      if (window.innerWidth <= 740) {
        slides.forEach(function (slide) {
          slide.classList.remove('--hover');
        });
        slides[swiper.activeIndex].classList.add('--hover');
      }
      sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length - 1);
      swiper.on('slideChange', function () {
        sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length - 1);
        if (window.innerWidth <= 740) {
          slides.forEach(function (slide) {
            slide.classList.remove('--hover');
          });
          slides[swiper.activeIndex].classList.add('--hover');
        }
      });
      window.addEventListener('resize', function (ev) {
        swiper.update();
      });
    });
  },
  certifsInit: function certifsInit() {
    document.querySelectorAll('.certifs').forEach(function (certif) {
      var slider = certif.querySelector('.certifs__slider');
      var slidePrev = certif.querySelector('.certifs__btn-prev');
      var slideNext = certif.querySelector('.certifs__btn-next');
      var sliderNum = certif.querySelector('.certifs__num');
      var gallery = document.querySelector('.certifs-gallery');
      var swiper = new Swiper(slider, {
        slidesPerView: 1,
        navigation: {
          nextEl: certif.querySelector('.certifs__btn-next'),
          prevEl: certif.querySelector('.certifs__btn-prev')
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true
        }
      });
      sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length);
      swiper.on('slideChange', function () {
        sliderNum.innerHTML = "".concat(swiper.activeIndex + 1, "/").concat(swiper.slides.length);
      });
      window.addEventListener('resize', function (ev) {
        swiper.update();
      });
      if (gallery) {
        var gSlider = gallery.querySelector('.certifs-gallery__images');
        var gSlidePrev = gallery.querySelector('.certifs-gallery__btn-prev');
        var gSlideNext = gallery.querySelector('.certifs-gallery__btn-next');
        var gSliderNum = gallery.querySelector('.certifs-gallery__num');
        var gTitle = gallery.querySelector('.certifs-gallery__title');
        var gDate = gallery.querySelector('.certifs-gallery__date');
        var gSwiper = new Swiper(gSlider, {
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheel: true,
          navigation: {
            nextEl: gSlideNext,
            prevEl: gSlidePrev
          }
        });
        var textUpdate = function textUpdate() {
          gTitle.innerHTML = gSwiper.slides[gSwiper.activeIndex].dataset.title;
          gDate.innerHTML = gSwiper.slides[gSwiper.activeIndex].dataset.date;
          gSliderNum.innerHTML = "".concat(gSwiper.activeIndex + 1, "/").concat(gSwiper.slides.length);
        };
        textUpdate();
        gSwiper.on('slideChange', function () {
          textUpdate();
          swiper.slideTo(gSwiper.activeIndex, 0);
        });
        window.addEventListener('resize', function () {
          textUpdate();
          gSwiper.update();
        });
        swiper.slides.forEach(function (slide) {
          slide.addEventListener('click', function () {
            gSwiper.slideTo(slide.dataset.index, 0);
          });
        });
      }
    });
  },
  historyInit: function historyInit() {
    document.querySelectorAll('.history').forEach(function (history) {
      var items = history.querySelectorAll('.history__item');
      items.forEach(function (item, index) {
        item.addEventListener('click', function (ev) {
          if (!item.classList.contains('--active')) {
            items.forEach(function (el, i) {
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
  popularSliderInit: function popularSliderInit() {
    document.querySelectorAll('.popular-slider').forEach(function (popular) {
      var slider = popular.querySelector('.popular-slider__items');
      var btnPrev = popular.querySelector('.popular-slider__btn-prev');
      var btnNext = popular.querySelector('.popular-slider__btn-next');
      var swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev
        },
        mousewheel: {
          enabled: true,
          forceToAxis: true
        },
        breakpoints: {
          501: {
            slidesPerView: 2
          }
        }
      });
      var update = function update() {
        var sliderPRight = (document.body.clientWidth - popular.clientWidth) / 2;
        slider.style.paddingRight = "".concat(sliderPRight + 100, "px");
        slider.style.marginRight = "".concat(-sliderPRight - 100, "px");
        swiper.update();
      };
      update();
      window.addEventListener('resize', update);
    });
  },
  articlesCatInit: function articlesCatInit() {
    var pageTabs = document.querySelector('.page-tabs');
    var header = document.querySelector('.header');
    if (header && pageTabs) {
      var pageTabsBtns = pageTabs.querySelectorAll('.page-tabs__btn');
      var update = function update() {
        var articlesCat = document.querySelector('.articles-cat.--active');
        if (articlesCat) {
          var title = articlesCat.querySelector('.articles-cat__title');
          var rect = articlesCat.getBoundingClientRect();
          var pageTabsRect = pageTabs.getBoundingClientRect();
          var pageTabsStyle = getComputedStyle(pageTabs);
          var pageTabsHeight = Number(pageTabsStyle.height.replace('px', ''));
          var pageTabsMBottom = Number(pageTabsStyle.marginBottom.replace('px', ''));
          pageTabs.classList.add('--fixed');
          if (rect.top < pageTabsHeight + pageTabsMBottom && rect.bottom >= window.innerHeight) {
            pageTabs.style.top = "0px";
            pageTabs.style.position = "fixed";
            pageTabs.style.marginTop = "0";
            pageTabs.style.translate = null;
            header.classList.add('--scrolled');
          } else if (rect.bottom < window.innerHeight && rect.top < pageTabsHeight + pageTabsMBottom) {
            pageTabs.style.top = "0px";
            pageTabs.style.position = "fixed";
            pageTabs.style.marginTop = "0";
            pageTabs.style.translate = "0 -100%";
          } else {
            pageTabs.style.top = null;
            pageTabs.style.position = null;
            pageTabs.style.marginTop = null;
            pageTabs.style.translate = null;
          }
          if (rect.top < pageTabsHeight && rect.bottom >= window.innerHeight && window.innerWidth > 940) {
            title.style.top = "".concat(pageTabsHeight, "px");
            title.style.position = "fixed";
            title.style.translate = null;
          } else if (rect.bottom < window.innerHeight && rect.top < pageTabsHeight && window.innerWidth > 940) {
            title.style.top = "".concat(pageTabsHeight, "px");
            title.style.position = "fixed";
            title.style.translate = "0 calc(-100% - ".concat(pageTabsHeight, "px)");
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
      };
      window.addEventListener('scroll', update);
      window.scroll({
        top: 10
      });
      window.scroll({
        top: 0
      });
      window.addEventListener('resize', update);
      pageTabsBtns.forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
          update();
          window.scroll({
            top: 10,
            behavior: 'smooth'
          });
        });
      });
    }
  },
  init: function init() {
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
  }
};
Ui.init();
//# sourceMappingURL=main.js.map
