document.addEventListener("DOMContentLoaded", function (event) {
  // Company slider
  (function () {
    if (document.querySelectorAll(".sm-swiper .sm-swiper__slider").length > 0) {
      var swiper = new Swiper(".sm-swiper .sm-swiper__slider", {
        slidesPerView: "auto",
        centeredSlides: false,
        loopAdditionalSlides: 1,
        speed: 800,
        loop: false,
        spaceBetween: 20,
        watchOverflow: true,
        autoResize: true,
        // effect: "fade",
        // fadeEffect: {
        //   crossFade: true,
        // },
        observer: true,
        observeParents: true,
        watchSlidesVisibility: true,
        navigation: {
          prevEl: ".sm-swiper__btn_prev",
          nextEl: ".sm-swiper__btn_next",
          clickable: true,
        },
        // Отключаем автоинициализацию
        // init: false,

        // События
        // on: {
        //   // Событие инициализации
        //   init: function () {
        //     // const swiperWrapper = document.querySelectorAll(
        //     //   ".sm-swiper .sm-swiper__wrapper"
        //     // );

        //     // swiperWrapper.forEach(function (item) {
        //     //   console.log(item);
        //     // });

        //     const newSlider = this.slides[0];

        //     newSlider.classList.add("sm-swiper__item_dublicate");
        //     this.wrapperEl.innerHTML = ``;
        //     this.slides[this.slides.length] = newSlider;
        //     // this.slides.forEach(function (element) {
        //     //   console.log(element);
        //     // });

        //     // for (let item in this.slides) {
        //     //   console.log(this.slides[item]);
        //     // }

        //     for (let i = 0; i < this.slides.length; i++) {
        //       console.log(this.slides[i]);
        //       this.wrapperEl.append(this.slides[i]);
        //     }

        //     // console.log(this.slides);
        //   },

        //   // Событие смены слайда
        //   slideChange: function () {},
        //   resize: function () {},
        // },
      });

      // swiper.forEach((element) => {
      //   element.init();
      // });
    }
  })();

  document.addEventListener("click", (e) => {
    hideBlckWhenClickOtherBlock(e, document.querySelectorAll(".drd-lang"));
  });

  window.addEventListener("resize", setFunctionResize);

  window.addEventListener("scroll", function () {
    changeTypeHeader();
  });

  //MODALS
  const modalButtons = document.querySelectorAll("[data-modal-button]");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
  const allModals = document.querySelectorAll("[data-modal]");
  const menuBtn = document.querySelector(".header__burger");

  modalButtons.forEach(function (item) {
    item.addEventListener("click", function () {
      const modalId = this.dataset.modalButton;
      let modal = document.querySelector("#" + modalId);

      modal.classList.add("_visible");
      if (!document.querySelector("html").classList.contains("_visible")) {
        document.querySelector("html").classList.add("_visible");
      }

      modal
        .querySelector(".modal__content")
        .addEventListener("click", function (e) {
          e.stopPropagation();
        });
    });
  });

  modalCloseButtons.forEach(function (item) {
    item.addEventListener("click", function () {
      this.closest(".modal").classList.remove("_visible");

      if (document.querySelector("html").classList.contains("_visible")) {
        document.querySelector("html").classList.remove("_visible");
      }
    });
  });

  allModals.forEach(function (item) {
    item.addEventListener("click", function () {
      this.classList.remove("_visible");
      if (menuBtn.classList.contains("_active")) {
        menuBtn.classList.remove("_active");
      }
      if (document.querySelector("html").classList.contains("_visible")) {
        document.querySelector("html").classList.remove("_visible");
      }
    });
  });

  // appHeight
  setHeight100();
  setSliderHistory();
  setTabs();
  setAccordion();
  toggleBlock(document.querySelectorAll(".drd-lang"));
  setModalPadding();
  setMarginTopHulfHeight();

  popUpMenu();
  changeTypeHeader();
  setActiveBurger();
  setPaddingForMobileBaners();
  (function () {
    if (document.querySelectorAll("._pdd-left").length <= 0) return;
    setPadding(document.querySelectorAll("._pdd-left"), "paddingLeft");
  })();

  (function () {
    if (document.querySelectorAll("._pdd-right").length <= 0) return;
    setPadding(document.querySelectorAll("._pdd-right"), "paddingRight");
  })();

  function setFunctionResize() {
    setModalPadding();
    changeTypeHeader();
    popUpMenu();
    setPaddingForMobileBaners();
    setHeight100();
    setMarginTopHulfHeight();

    const allModals = document.querySelectorAll("[data-modal]");
    const menuBtn = document.querySelector(".header__burger");
    if (menuBtn.classList.contains("_active")) {
      menuBtn.classList.remove("_active");
      closeAllModals(allModals);
    }

    (function () {
      if (document.querySelectorAll("._pdd-left").length <= 0) return;
      setPadding(document.querySelectorAll("._pdd-left"), "paddingLeft");
    })();

    (function () {
      if (document.querySelectorAll("._pdd-right").length <= 0) return;
      setPadding(document.querySelectorAll("._pdd-right"), "paddingRight");
    })();
  }
});

function setActiveBurger() {
  if (!document.querySelector(".header__burger")) return;
  // MENU
  const menuBtn = document.querySelector(".header__burger");
  const allModals = document.querySelectorAll("[data-modal]");

  menuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (this.classList.contains("_active")) {
      this.classList.remove("_active");
      closeAllModals(allModals);
    } else {
      this.classList.add("_active");
    }
  });
}

function closeAllModals(element) {
  if (element.length <= 0) return;

  element.forEach(function (item) {
    item.classList.remove("_visible");
  });
}

function changeTypeHeader() {
  if (
    !document.querySelector("header") &&
    !document.body.classList.contains("home")
  )
    return;

  const header = document.querySelector("header");

  if (window.innerWidth > 1200) {
    if (pageYOffset > 60) {
      if (header.classList.contains("header_opacity")) {
        header.classList.remove("header_opacity");
      }
      if (!header.classList.contains("bg-white")) {
        header.classList.add("bg-white");
      }
    } else if (pageYOffset >= 0 && pageYOffset <= 60) {
      if (!header.classList.contains("header_opacity")) {
        header.classList.add("header_opacity");
      }
      if (header.classList.contains("bg-white")) {
        header.classList.remove("bg-white");
      }
    }
  } else {
    if (!header.classList.contains("bg-white")) {
      header.classList.add("bg-white");
    }
    if (header.classList.contains("header_opacity")) {
      header.classList.remove("header_opacity");
    }
  }
}

// Pop-up menu
function popUpMenu() {
  const header = document.querySelector("header"),
    headerMenuItem = document.querySelectorAll(".header__menu-item"),
    modalMenu = document.querySelector(".modal-menu"),
    modalMenuContent = document.querySelectorAll(".modal-menu__content"),
    modalMenuContentWr = document.querySelectorAll(".modal-menu__content-wr");
  if (document.body.clientWidth >= 1024) {
    headerMenuItem.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        showModalMenu(item, i);
      });

      item.addEventListener("click", () => {
        showModalMenu(item, i);
      });
    });

    modalMenu.addEventListener("mouseleave", () => {
      hideModalMenu();
    });

    modalMenuContentWr.forEach((element) => {
      element.addEventListener("mouseleave", () => {
        hideModalMenu();
      });
    });
  }

  function showModalMenu(item, i) {
    removeActiveClass(item);
    modalMenuContent.forEach((item, i) => {
      removeActiveClass(item);
    });

    header.classList.add("_active");
    modalMenu.classList.add("_active");
    modalMenuContent[i].classList.add("_active");
    headerMenuItem.forEach((item) => {
      removeActiveClass(item);
    });
    headerMenuItem[i].classList.add("_active");
  }

  function hideModalMenu() {
    removeActiveClass(header);
    removeActiveClass(modalMenu);
    modalMenuContent.forEach((element) => {
      removeActiveClass(element);
    });

    headerMenuItem.forEach((item) => {
      removeActiveClass(item);
    });
  }
}

function hideBlckWhenClickOtherBlock(e, elements) {
  if (elements.length > 0) {
    let target = e.target;
    elements.forEach((element) => {
      let its_menu = target == element || element.contains(target);
      let element_is_active = element.classList.contains("_active");

      if (!its_menu && element_is_active) {
        element.classList.toggle("_active");
      }
    });
  }
}

function toggleBlock(elements) {
  if (elements.length > 0) {
    elements.forEach((element) => {
      element.addEventListener("click", function (e) {
        this.classList.toggle("_active");
        e.stopPropagation();
      });
    });
  }
}

function setSliderHistory() {
  if (!document.querySelectorAll(".big-swiper__slider")[0]) return;

  if (!document.querySelectorAll(".history-js__item")[0]) return;

  const historyJsItem = document.querySelectorAll(".history-js__item");

  let arrYears = [];

  historyJsItem.forEach((element) => {
    let dataYears = element.getAttribute("data-year");

    arrYears.push(dataYears);
  });

  console.log(arrYears);

  // History slider
  var swiperBig = new Swiper(".big-swiper__slider", {
    speed: 1200,
    loop: false,
    parallax: true,
    spaceBetween: 120,
    effect: "coverflow",
    navigation: {
      prevEl: ".big-swiper__btn_prev",
      nextEl: ".big-swiper__btn_next",
    },
    pagination: {
      el: ".big-swiper__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + arrYears[index] + "</span>";
      },
    },
    init: false,
    // События
    on: {
      // Событие инициализации
      init: function () {
        if (this.slides.length > 1) {
          this.el.closest(".big-swiper").classList.add("big-swiper_more");
        }
      },
    },
  });

  swiperBig.init();
}

function setModalPadding() {
  if (!document.querySelectorAll(".pd-header")) return;

  if (!document.querySelector("header")) return;

  const pdHeader = document.querySelectorAll(".pd-header");
  const header = document.querySelector("header");

  pdHeader.forEach((element) => {
    element.style.paddingTop = getElemHeight([header]) + "px";
  });
}

function setTabs() {
  if (!document.querySelectorAll("[data-tab]")[0]) return;

  if (!document.querySelectorAll("[data-tab-content]")[0]) return;

  // TABS
  const tabHeaders = document.querySelectorAll("[data-tab]");
  const tabContent = document.querySelectorAll("[data-tab-content]");

  tabHeaders.forEach(function (item) {
    item.addEventListener("click", function () {
      if (!document.querySelectorAll(".tab__navigation-item")[0]) return;
      const tabsContainer = document.querySelectorAll(".main-tabs__container");

      tabsContainer.forEach((element) => {
        const tabItem = element.querySelectorAll(".tab__navigation-item");

        tabItem.forEach(function (tabItem) {
          tabItem.classList.remove("_active");
        });

        tabContent.forEach(function (item) {
          item.classList.remove("_visible");
        });

        const tabContentItem = document.querySelector("#" + this.dataset.tab);
        tabContentItem.classList.add("_visible");
        this.classList.add("_active");
      });
    });
  });
}

function setAccordion() {
  if (
    !document.querySelectorAll(
      ".accordion .accordion__item .accordion__item-trigger .accordion__item-trigger-btn"
    )[0]
  )
    return;
  //ACCORDION
  document
    .querySelectorAll(
      ".accordion .accordion__item .accordion__item-trigger .accordion__item-trigger-btn"
    )
    .forEach((item) =>
      item.addEventListener("click", () => {
        const parent = item.closest(".accordion__item");

        if (parent.classList.contains("_active")) {
          parent.classList.remove("_active");
        } else {
          document
            .querySelectorAll(".accordion__item")
            .forEach((child) => child.classList.remove("_active"));
          parent.classList.add("_active");
        }
      })
    );
}

function setMarginTopHulfHeight() {
  if (window.innerWidth > 540) {
    if (document.querySelectorAll(".half-height").length > 0) {
      const block = document.querySelectorAll(".half-height");

      block.forEach((element) => {
        if (element.querySelector(".half-height-mt")) {
          const blockHeight = getElemHeight([
            element.querySelector(".half-height-mt"),
          ]);
          element.querySelector(".half-height-mt").style.marginTop =
            -blockHeight / 2 + "px";

          if (element.querySelector(".half-height-pb")) {
            element.querySelector(".half-height-pb").style.paddingBottom =
              blockHeight / 2 + "px";
          }
        }
      });
    }
  } else {
    if (document.querySelectorAll(".half-height").length > 0) {
      const block = document.querySelectorAll(".half-height");

      block.forEach((element) => {
        if (element.querySelector(".half-height-mt")) {
          const blockHeight = getElemHeight([
            element.querySelector(".half-height-mt"),
          ]);
          element.querySelector(".half-height-mt").style.marginTop =
            -blockHeight / 2 + "px";

          if (element.querySelector(".half-height-pb")) {
            element.querySelector(
              ".half-height .half-height-pb"
            ).style.paddingBottom = 0;
          }
        }
      });
    }
  }
}

// fix menu
(function () {
  let scr_fix_block = document.querySelectorAll("._side-wrapper");
  let scrollDirection = 0;

  window.addEventListener("scroll", scroll_scroll);
  function scroll_scroll() {
    let src_value = pageYOffset;

    if (scr_fix_block.length > 0) {
      fix_block(scr_fix_block, src_value);
    }

    scrollDirection = src_value <= 0 ? 0 : src_value;
  }
  scroll_scroll();

  function fix_block(scr_fix_block, scr_value) {
    let window_width = parseInt(window.innerWidth);
    let window_height = parseInt(window.innerHeight);
    for (let index = 0; index < scr_fix_block.length; index++) {
      const block = scr_fix_block[index];
      let block_width = block.getAttribute("data-width");
      const item = block.querySelector("._side-block");
      if (!block_width) {
        block_width = 0;
      }
      if (window_width > block_width) {
        if (item.offsetHeight < window_height) {
          if (scr_value > offset(block).top) {
            item.style.cssText =
              "position:fixed;bottom:unset;top:0;width:" +
              block.offsetWidth +
              "px;left:" +
              offset(block).left +
              "px;";
          } else {
            gotoRelative(item);
          }
          if (
            scr_value >
            block.offsetHeight + offset(block).top - item.offsetHeight
          ) {
            block.style.cssText = "position:relative;";
            item.style.cssText =
              "position:absolute;bottom:0;top:auto;left:0;width:100%";
          }
        } else {
          gotoRelative(item);
        }
      }
    }
    function gotoRelative(item) {
      item.style.cssText = "position:relative;bottom:auto;top:0;left:0;";
    }
  }

  let link = document.querySelectorAll("._goto-block");
  if (link) {
    let blocks = [];
    for (let index = 0; index < link.length; index++) {
      let el = link[index];
      let block_name = el.getAttribute("href").replace("#", "");
      if (block_name !== "" && !~blocks.indexOf(block_name)) {
        blocks.push(block_name);
      }
    }

    window.addEventListener("scroll", function (el) {
      let old_current_link = document.querySelectorAll("._goto-block._active");
      if (old_current_link) {
        for (let index = 0; index < old_current_link.length; index++) {
          let el = old_current_link[index];
          el.classList.remove("_active");
        }
      }
      for (let index = 0; index < blocks.length; index++) {
        let block = blocks[index];
        let block_item = document.querySelector("#" + block);
        if (block_item) {
          let block_offset = offset(block_item).top;
          let block_height = block_item.offsetHeight;
          if (
            pageYOffset > block_offset - window.innerHeight / 3 &&
            pageYOffset < block_offset + block_height - window.innerHeight / 3
          ) {
            let current_links = document.querySelectorAll(
              '._goto-block[href="#' + block + '"]'
            );
            for (let index = 0; index < current_links.length; index++) {
              let current_link = current_links[index];
              current_link.classList.add("_active");
            }
          }
        }
      }
    });
  }

  let links = document.querySelectorAll("._goto-block");
  for (let link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  }
})();

function offset(el) {
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

// optimization function

function setPadding(element, paddingPosition) {
  if (element.left <= 0) return;

  element.forEach((item) => {
    if (paddingPosition === "paddingLeft") {
      if (getPaddingContainer() != 0) {
        item.style.paddingLeft = getPaddingContainer() + "px";
      } else {
        item.style.paddingLeft = 15 + "px";
      }
    } else if (paddingPosition === "paddingRight") {
      if (getPaddingContainer() != 0) {
        item.style.paddingRight = getPaddingContainer() + "px";
      } else {
        item.style.paddingRight = 15 + "px";
      }
    }
  });
}
function removeActiveClass(item) {
  if (item.classList.contains("_active")) {
    item.classList.remove("_active");
  }
}
function setHeight100() {
  if (document.querySelectorAll("._100vh").length <= 0) return;
  const blck100Vh = document.querySelectorAll("._100vh");
  const clientWidth = document.body.clientWidth;

  if (clientWidth < 1200) {
    blck100Vh.forEach((item) => {
      item.style.minHeight = `${window.innerHeight}px`;
    });
  } else {
    blck100Vh.forEach((item) => {
      item.style.minHeight = `100vh`;
    });
  }
}

function setPaddingForMobileBaners() {
  if (!document.querySelector(".banners_main .banners__content")) return;

  const mainBannersContent = document.querySelector(
    ".banners_main .banners__content"
  );
  const header = document.querySelector("header");

  mainBannersContent.style.paddingTop = getElemHeight([header]) + "px";
}

function getPaddingContainer() {
  if (!document.querySelectorAll(".container")[0]) return;

  let myContainer = document.querySelectorAll(".container")[0];
  if (window.innerWidth <= 1920) {
    return (innerWidth - myContainer.getBoundingClientRect().width) / 2;
  } else {
    return (1920 - myContainer.getBoundingClientRect().width) / 2;
  }
}

function getElemHeight(selector) {
  let sumHeight = 0;
  selector.forEach((item) => {
    let itemHeight = item.getBoundingClientRect().height;
    sumHeight += itemHeight;
  });
  return sumHeight;
}
