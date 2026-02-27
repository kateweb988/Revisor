
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  window.location = "/thanks.html";

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener("DOMContentLoaded", () => {
   $(document).ready(function () {
      $(".youtube-link").grtyoutube({
         autoPlay: true
      });
   });

   (function ($) {

      $.fn.grtyoutube = function (options) {

         return this.each(function () {

            // Get video ID
            var getvideoid = $(this).attr("youtubeid");

            // Default options
            var settings = $.extend({
               videoID: getvideoid,
               autoPlay: true
            }, options);

            // Convert some values
            if (settings.autoPlay === true) { settings.autoPlay = 1 } else { settings.autoPlay = 0 }

            // Initialize on click
            if (getvideoid) {
               $(this).on("click", function () {
                  $("body").append('<div class="grtvideo-popup">' +
                     '<div class="grtvideo-popup-content">' +
                     '<span class="grtvideo-popup-close"></span>' +
                     '<iframe class="grtyoutube-iframe" src="https://www.youtube.com/embed/' + settings.videoID + '?rel=0&wmode=transparent&autoplay=' + settings.autoPlay + '&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>' +
                     '</div>' +
                     '</div>');
               });
            }

            // Close the box on click or escape
            $(this).on('click', function (event) {
               event.preventDefault();
               $(".grtvideo-popup-close, .grtvideo-popup").click(function () {
                  $(".grtvideo-popup").remove();
               });
            });

            $(document).keyup(function (event) {
               if (event.keyCode == 27) {
                  $(".grtvideo-popup").remove();
               }
            });
         });
      };
   }(jQuery));
});
document.addEventListener('DOMContentLoaded', function () {

  // ====================== SWIPER 1 ======================
  const swiper = new Swiper('.swiper1', {
    slidesPerView: 1,
    spaceBetween: 20,
    

   navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        },
  pagination: {
    el: '.pag1',
    clickable: true,
  },

    on: {
      init() {
        updateSwiper1Counter(this);
        updateProgressBar(this);
      },
      slideChange() {
        updateSwiper1Counter(this);
        updateProgressBar(this);
      }
    }
  });

  function updateSwiper1Counter(swiper) {
    const current = document.querySelector('.swiper1-counter .current');
    const total = document.querySelector('.swiper1-counter .total');

    let cur = swiper.realIndex + 1;
    let tot = swiper.slides.length;

    current.textContent = cur < 10 ? `0${cur}` : cur;
    total.textContent = tot < 10 ? `0${tot}` : tot;
  }

  // === прогресс бар для swiper1 ===
  function updateProgressBar(swiper) {
    const bar = document.querySelector(".swiper1-progress-inner");
    const curMob = document.querySelector(".swiper1-progress-current");
    const totMob = document.querySelector(".swiper1-progress-total");

    if (!bar) return;

    let cur = swiper.realIndex + 1;
    let tot = swiper.slides.length;

    const progress = (cur / tot) * 100;
    bar.style.width = progress + "%";

    curMob.textContent = cur < 10 ? `0${cur}` : cur;
    totMob.textContent = tot < 10 ? `0${tot}` : tot;
  }



  // ====================== SWIPER 2 ======================
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        },
    pagination: {
      el: '.pag10',
      clickable: true,
    },

    breakpoints: {
      320: {
        spaceBetween: 10,
        initialSlide: 0, // старт со второго слайда
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 4
      }
    }
  });



  // ====================== КАСТОМНАЯ ПАГИНАЦИЯ SWIPER 3 ======================
  function updateCustomPagination(swiper) {
    const currentEl = document.querySelector('.swiper-custom-pagination3 .current');
    const totalEl = document.querySelector('.swiper-custom-pagination3 .total');
    const barFill = document.querySelector('.swiper-custom-pagination3 .bar-fill');

    // получаем реальные слайды, исключая дубли
    const realSlides = swiper.wrapperEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
    const total = realSlides.length;

    // корректный реальный индекс
    let realIndex = ((swiper.realIndex % total) + total) % total + 1;

    // форматируем 01/02/03
    currentEl.textContent = realIndex.toString().padStart(2, '0');
    totalEl.textContent = total.toString().padStart(2, '0');

    // прогрессбар
    const progress = realIndex / total * 100;
    barFill.style.width = progress + '%';
  }



  // ====================== SWIPER 3 ======================
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
     pagination: {
      el: '.pag5',
      clickable: true,
    },


    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: false
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: false
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next3',
          prevEl: '.swiper-button-prev3',
        }
      }
    }
  });
   // ====================== SWIPER 4 ======================
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
      pagination: {
      el: '.pag6',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: false
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next4',
          prevEl: '.swiper-button-prev4',
        }
      }
    }
  });
   // ====================== SWIPER 5 ======================
  const swiper5 = new Swiper('.swiper5', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next5',
      prevEl: '.swiper-button-prev5',
    },
      pagination: {
      el: '.pag7',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: false
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: false
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next5',
          prevEl: '.swiper-button-prev5',
        }
      }
    }
  });
    // ====================== SWIPER 6 ======================
  const swiper6 = new Swiper('.swiper6', {
    slidesPerView: 2,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next6',
      prevEl: '.swiper-button-prev6',
    },
     pagination: {
      el: '.pag9',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next6',
          prevEl: '.swiper-button-prev6',
        }
      }
    }
  });
   // ====================== SWIPER 7 ======================
  const swiper7 = new Swiper('.swiper7', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next7',
      prevEl: '.swiper-button-prev7',
    },
     pagination: {
      el: '.pag3',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next7',
          prevEl: '.swiper-button-prev7',
        }
      }
    }
  });
   // ====================== SWIPER 8 ======================
  const swiper8 = new Swiper('.swiper8', {
    slidesPerView: 4,
    initialSlide: 1, // старт со второго слайда
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next8',
      prevEl: '.swiper-button-prev8',
    },
      pagination: {
      el: '.pag8',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next8',
          prevEl: '.swiper-button-prev8',
        }
      }
    }
  });
   // ====================== SWIPER 9 ======================
  const swiper9 = new Swiper('.swiper9', {
    slidesPerView: 1,
    spaceBetween: 0,
     pagination: {
      el: '.pag2',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
    // ====================== SWIPER 10 ======================
  const swiper10 = new Swiper('.swiper10', {
    slidesPerView: 3,
    spaceBetween: 20,
     pagination: {
      el: '.pag4',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 10,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  // ====================== SWIPER 11 ======================
  const swiper11 = new Swiper('.swiper11', {
    slidesPerView: 2,
    slidesPerGroup: 2,   // ← листаем сразу 2
    spaceBetween: 20,

    navigation: {
      nextEl: '.swiper-button-next11',
      prevEl: '.swiper-button-prev11',
    },

    pagination: {
      el: '.pag11',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        navigation: false
      },
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        navigation: false
      },
      992: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next11',
          prevEl: '.swiper-button-prev11',
        }
      }
    }
  });
    // ====================== SWIPER 12 ======================
  // const swiper12 = new Swiper('.swiper12', {
  //   slidesPerView: 3,
  //   spaceBetween: 20,
  //    pagination: {
  //     el: '.pag12',
  //     clickable: true,
  //   },

  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 0,
  //       allowTouchMove: true,
  //       simulateTouch: true,
  //     },
  //     767: {
  //       slidesPerView: 1,
  //       spaceBetween: 10,
  //       allowTouchMove: true,
  //       simulateTouch: true,
  //     },
  //     992: {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //       allowTouchMove: true,
  //       simulateTouch: true,
  //     },
  //     1200: {
  //       slidesPerView: 3,
  //       spaceBetween: 20,
  //       allowTouchMove: false,   // ❌ тач
  //       simulateTouch: false,    // ❌ мышь
  //     }
  //   }
  // });
  let swiper12 = new Swiper('.swiper12', {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: '.pag12',
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 0, allowTouchMove: true, simulateTouch: true },
    767: { slidesPerView: 1, spaceBetween: 10, allowTouchMove: true, simulateTouch: true },
    992: { slidesPerView: 2, spaceBetween: 20, allowTouchMove: true, simulateTouch: true },
    1200: { slidesPerView: 3, spaceBetween: 20 }
  }
});

function updateSwiper12() {
  if (window.innerWidth >= 1200) {
    // Десктоп: отключаем свайпы
    swiper12.allowSlideNext = false;
    swiper12.allowSlidePrev = false;
  } else {
    // Адаптив: включаем свайпы
    swiper12.allowSlideNext = true;
    swiper12.allowSlidePrev = true;
  }
}

// Запуск и ресайз
updateSwiper12();
window.addEventListener('resize', updateSwiper12);
});
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav__local');
  const addressBlock = e.target.closest('.nav__address');

  // Закрыть все списки, если клик вне
  if (!addressBlock) {
    document.querySelectorAll('.nav__address-list.active')
      .forEach(list => list.classList.remove('active'));
    return;
  }

  // Клик по заголовку
  if (toggle) {
    const list = addressBlock.querySelector('.nav__address-list');

    // закрываем все остальные
    document.querySelectorAll('.nav__address-list.active')
      .forEach(l => {
        if (l !== list) l.classList.remove('active');
      });

    list.classList.toggle('active');
  }

  // Клик по адресу
  if (e.target.tagName === 'LI') {
    const current = addressBlock.querySelector('.nav__address-current');
    current.textContent = e.target.textContent;

    addressBlock
      .querySelector('.nav__address-list')
      .classList.remove('active');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.a1').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.a2').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });
   $('.a3').click(function (e) {
    e.preventDefault();
    $('#popup-call3').arcticmodal({
    });
  });
  $('.a4').click(function (e) {
    e.preventDefault();
    $('#popup-call4').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const body = document.body;

  if (!menuBtn || !menu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    menuBtn.classList.toggle('active');

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.classList.add('lock');
      body.style.paddingRight = scrollBarWidth + 'px';
    } else {
      body.classList.remove('lock');
      body.style.paddingRight = '';
    }
  });
});
// svg
$(function () {
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});
