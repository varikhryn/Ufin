document.addEventListener("DOMContentLoaded", function (event) {
  // Company slider
  var swiper = new Swiper(".sm-swiper__slider", {
    slidesPerView: 3.5,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".sm-swiper__btn",
    },
    breakpoints: {
      1201: {
        slidesPerView: 3.5,

        spaceBetween: 20,
      },
      769: {
        slidesPerView: 2.5,

        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1.3,

        spaceBetween: 20,
      },
    },
  });

  document.addEventListener("click", (e) => {
    hideBlckWhenClickOtherBlock(e, document.querySelectorAll(".drd-lang"));
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
    });
  });

  allModals.forEach(function (item) {
    item.addEventListener("click", function () {
      this.classList.remove("_visible");
      if (menuBtn.classList.contains("_active")) {
        menuBtn.classList.remove("_active");
      }
    });
  });

  // appHeight
  window.addEventListener("resize", setFunctionResize);

  setHeight100();
  setPaddigForRubric();
  setWrapperForSmSlider();
  setSliderHistory();
  setTabs();
  setAccordion();
  toggleBlock(document.querySelectorAll(".drd-lang"));
  setModalPadding();

  popUpMenu();
  changeTypeHeader();
  setActiveBurger();

  function setFunctionResize() {
    setPaddigForRubric();
    setModalPadding();
    changeTypeHeader();
    popUpMenu();

    const allModals = document.querySelectorAll("[data-modal]");
    const menuBtn = document.querySelector(".header__burger");
    if (menuBtn.classList.contains("_active")) {
      menuBtn.classList.remove("_active");
      closeAllModals(allModals);
    }
  }

  window.addEventListener("scroll", function () {
    changeTypeHeader();
  });
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
  var swiper = new Swiper(".big-swiper__slider", {
    speed: 1200,
    loop: false,
    parallax: true,
    spaceBetween: 120,
    effect: "coverflow",
    navigation: {
      nextEl: ".big-swiper__btn",
    },
    pagination: {
      el: ".big-swiper__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + arrYears[index] + "</span>";
      },
    },
  });
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

function setWrapperForSmSlider() {
  if (!document.querySelectorAll(".sm-swiper__container")[0]) return;

  let smSwiperWrapper = document.querySelectorAll(".sm-swiper__container");
  let innerWidth = window.innerWidth;

  smSwiperWrapper.forEach((element) => {
    element.style.paddingLeft = getPaddingContainer();
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

function setPaddigForRubric() {
  if (
    !document.querySelectorAll(".prewiew-rybric__item_left-js")[0] ||
    !document.querySelectorAll(".prewiew-rybric__item_right-js")[0]
  )
    return;

  const rubricLeft = document.querySelectorAll(".prewiew-rybric__item_left-js");
  const rubricRight = document.querySelectorAll(
    ".prewiew-rybric__item_right-js"
  );

  rubricLeft.forEach((element) => {
    element.style.paddingLeft = getPaddingContainer();
  });

  rubricRight.forEach((element) => {
    element.style.paddingRight = getPaddingContainer();
  });
}

function setAccordion() {
  if (!document.querySelectorAll(".accordion .accordion__item-trigger-btn")[0])
    return;
  //ACCORDION
  document
    .querySelectorAll(".accordion .accordion__item-trigger-btn")
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

function getPaddingContainer() {
  let myContainer = document.querySelectorAll(".container")[0];
  return (innerWidth - myContainer.getBoundingClientRect().width) / 2 + "px";
}

function getElemHeight(selector) {
  let sumHeight = 0;
  selector.forEach((item) => {
    let itemHeight = item.getBoundingClientRect().height;
    sumHeight += itemHeight;
  });
  return sumHeight;
}
