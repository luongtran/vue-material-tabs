function calc(e) {
  const offset = e.currentTarget.getBoundingClientRect();
  const localX = e.clientX - offset.left;
  const localY = e.clientY - offset.top;
  const radius = Math.sqrt(e.currentTarget.clientWidth ** 2 + e.currentTarget.clientHeight ** 2) / 2;
  const x = `${localX - radius}px`;
  const y = `${localY - radius}px`;
  const size = `${radius * 2}px`;
  return {
    x,
    y,
    size
  };
}

function rippleShow(e) {
  const {
    currentTarget
  } = e;
  const {
    size,
    y,
    x
  } = calc(e);
  const rippleElement = document.createElement("span");
  rippleElement.classList.add("ripple");
  rippleElement.style.width = rippleElement.style.height = size;
  rippleElement.style.top = y;
  rippleElement.style.left = x;
  currentTarget.appendChild(rippleElement);
  setTimeout(() => rippleElement.remove(), 1000);
}

function rippleListener(el, rippleEnable) {
  el === null || el === void 0 ? void 0 : el[rippleEnable ? "addEventListener" : "removeEventListener"]("click", rippleShow);
}

var ripple = {
  bind: (el, {
    value
  }) => rippleListener(el, value),
  update: (el, {
    value
  }) => rippleListener(el, value),
  unbind: el => rippleListener(el, false)
};

function inserted(el, binding) {
  const callback = binding === null || binding === void 0 ? void 0 : binding.value;
  if (callback) window.addEventListener("resize", callback);
  el._onResize = callback;
}

function unbind(el) {
  if (!el._onResize) return;
  window.removeEventListener("resize", el._onResize);
  delete el._onResize;
}

var resize = {
  inserted,
  unbind
};

//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: "Btn"
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "btn",
    on: {
      "click": function ($event) {
        return _vm.$emit('click');
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24",
      "role": "img",
      "aria-hidden": "true"
    }
  }, [_c('path', {
    attrs: {
      "d": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
    }
  })])]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-41f7b064_0", {
    source: ".btn[data-v-41f7b064]{outline:0;border:none;background:0 0;cursor:pointer}.btn svg[data-v-41f7b064]{height:24px;width:24px}.btn:disabled svg[data-v-41f7b064]{fill:#d6d5d5;cursor:default}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-41f7b064";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

//
var script$2 = {
  components: {
    Btn: __vue_component__$3,
    VNode: {
      functional: true,
      render: (h, {
        props
      }) => {
        return props.node ? props.node : h("span", props.name);
      }
    }
  },
  directives: {
    ripple,
    resize
  },
  props: {
    vertical: Boolean,
    navSlider: Boolean,
    ripple: Boolean,
    navAuto: Boolean,
    navItems: {
      type: Array,
      required: true
    },
    tabItemActive: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    pagination: {
      has: false,
      maxOffset: 0,
      minOffset: 0,
      translate: 0,
      offset: 0
    }
  }),
  computed: {
    classes() {
      return {
        tab__pagination: true,
        "tab__pagination--vertical": this.vertical,
        "tab__pagination--auto": this.navAuto && !this.vertical
      };
    },

    styles() {
      return {
        transform: `translate${this.vertical ? "Y" : "X"}(-${this.pagination.translate}px)`
      };
    },

    paginateIndicator() {
      return {
        next: this.pagination.translate < this.pagination.maxOffset,
        prev: this.pagination.translate > 0
      };
    },

    orientation() {
      return this.vertical ? "portrait" : "landscape";
    }

  },
  watch: {
    // Force recalc the pagination offsets when the orientation/navItems is change;
    navItems: "resizable",

    vertical() {
      Object.assign(this.$data, this.$options.data());
      this.resizable();
    },

    tabItemActive(payload) {
      this.sliderHandler();

      if (this.pagination.has) {
        this.paginationCollapse(payload);
      }
    }

  },
  methods: {
    select(navItem) {
      if (!(navItem !== null && navItem !== void 0 && navItem.disabled)) {
        this.$emit("select", {
          tabItem: navItem,
          byUser: true
        });
      }
    },

    async sliderHandler() {
      var _this$$refs, _this$$refs2, _this$$refs2$this$tab;

      await this.$nextTick();
      const navItemsElement = (_this$$refs = this.$refs) === null || _this$$refs === void 0 ? void 0 : _this$$refs.navItems;
      const {
        navItemsLeft,
        navItemsTop
      } = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems"
      });
      const {
        navActiveWidth,
        navActiveHeight,
        navActiveLeft,
        navActiveTop
      } = this.getElementRect({
        el: (_this$$refs2 = this.$refs) === null || _this$$refs2 === void 0 ? void 0 : (_this$$refs2$this$tab = _this$$refs2[this.tabItemActive.model]) === null || _this$$refs2$this$tab === void 0 ? void 0 : _this$$refs2$this$tab[0],
        prefix: "navActive"
      });
      const {
        children
      } = navItemsElement;
      const sliderEl = children[children.length - 1];
      sliderEl.removeAttribute("style");
      Object.assign(sliderEl.style, {
        portrait: {
          height: `${navActiveHeight}px`,
          top: `${navActiveTop - navItemsTop}px`
        },
        landscape: {
          width: `${navActiveWidth}px`,
          left: `${navActiveLeft - navItemsLeft}px`
        }
      }[this.orientation]);
    },

    getPagination() {
      var _this$$refs3, _this$$refs4;

      const navItemsElement = (_this$$refs3 = this.$refs) === null || _this$$refs3 === void 0 ? void 0 : _this$$refs3.navItems;
      const {
        navItemsWidth
      } = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems"
      });
      const {
        navWidth,
        navHeight
      } = this.getElementRect({
        el: (_this$$refs4 = this.$refs) === null || _this$$refs4 === void 0 ? void 0 : _this$$refs4.nav,
        prefix: "nav"
      });
      const navItemsHeight = [...(navItemsElement === null || navItemsElement === void 0 ? void 0 : navItemsElement.children)].slice(0, -1).map(el => el.offsetHeight).reduce((a, c) => Math.abs(a + c), 0);

      const paginationFactory = (has, maxOffset, minOffset) => {
        const paginationOffsets = Object.entries({
          has,
          maxOffset,
          minOffset,
          offset: minOffset
        }).map(([k, v]) => [k, Math.abs(v)]);
        return Object.fromEntries(paginationOffsets);
      };

      Object.assign(this.pagination, {
        portrait: paginationFactory(navItemsHeight > navHeight, navItemsHeight - navHeight, navHeight),
        landscape: paginationFactory(navItemsWidth > navWidth, navItemsWidth - navWidth, navWidth)
      }[this.orientation]);
    },

    onPagination(to) {
      const {
        maxOffset,
        offset,
        translate,
        minOffset
      } = this.pagination;

      if (to === "prev" && this.paginateIndicator.prev) {
        if (offset <= minOffset) {
          this.pagination.offset = minOffset;
        }

        if (translate - offset < offset) {
          this.pagination.translate = 0;
          return;
        }

        this.pagination.translate = translate - offset;
      }

      if (to === "next" && this.paginateIndicator.next) {
        if (translate + offset > maxOffset) {
          this.pagination.offset = maxOffset - translate;
        }

        this.pagination.translate = translate + this.pagination.offset;
      }
    },

    paginationCollapse() {
      var _this$$refs5, _this$$refs5$this$tab, _this$$refs6;

      const {
        navActiveRight,
        navActiveLeft,
        navActiveTop,
        navActiveBottom,
        navActiveWidth,
        navActiveHeight
      } = this.getElementRect({
        el: (_this$$refs5 = this.$refs) === null || _this$$refs5 === void 0 ? void 0 : (_this$$refs5$this$tab = _this$$refs5[this.tabItemActive.model]) === null || _this$$refs5$this$tab === void 0 ? void 0 : _this$$refs5$this$tab[0],
        prefix: "navActive"
      });
      const {
        navRight,
        navLeft,
        navTop,
        navBottom
      } = this.getElementRect({
        el: (_this$$refs6 = this.$refs) === null || _this$$refs6 === void 0 ? void 0 : _this$$refs6.nav,
        prefix: "nav"
      });
      const {
        translate,
        maxOffset
      } = this.pagination;
      let toTranslate = translate; // Portrait

      if (this.vertical && navActiveBottom > navBottom) {
        toTranslate = toTranslate + navActiveHeight;
      }

      if (this.vertical && navActiveTop < navTop) {
        toTranslate = navActiveHeight > toTranslate ? 0 : toTranslate - navActiveHeight;
      } // Landscape


      if (!this.vertical && navActiveRight > navRight) {
        toTranslate = toTranslate + navActiveWidth;
      }

      if (!this.vertical && navActiveLeft < navLeft) {
        toTranslate = navActiveWidth > toTranslate ? 0 : toTranslate - navActiveWidth;
      }

      if (toTranslate > maxOffset) {
        toTranslate = toTranslate + (maxOffset - toTranslate);
      }

      this.pagination.translate = Math.abs(toTranslate);
    },

    resizable() {
      this.$nextTick(() => {
        this.getPagination();
        this.sliderHandler();
      });
    },

    getElementRect({
      el,
      prefix
    }) {
      if (!el) return;
      const {
        parse,
        stringify
      } = JSON;
      const rect = Object.entries(parse(stringify(el.getBoundingClientRect())));
      const newRect = rect.map(([i, k]) => [prefix + i.charAt(0).toUpperCase() + i.slice(1), k]);
      return Object.fromEntries(newRect);
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "resize",
      rawName: "v-resize",
      value: _vm.resizable,
      expression: "resizable"
    }],
    class: _vm.classes
  }, [_c('div', {
    staticClass: "tab__pagination__prev"
  }, [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.prev
    },
    on: {
      "click": function ($event) {
        return _vm.onPagination('prev');
      }
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('nav', {
    ref: "nav",
    staticClass: "tab__nav"
  }, [_c('ul', {
    ref: "navItems",
    staticClass: "tab__nav__items",
    style: _vm.styles
  }, [_vm._l(_vm.navItems, function (navItem, index) {
    return _c('li', {
      directives: [{
        name: "ripple",
        rawName: "v-ripple",
        value: _vm.ripple && !navItem.disabled,
        expression: "ripple && !navItem.disabled"
      }],
      key: "tab-item-" + index,
      ref: navItem.model,
      refInFor: true,
      staticClass: "tab__nav__item",
      class: {
        active: navItem.model === _vm.tabItemActive.model,
        disabled: navItem.disabled
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.select(navItem);
        }
      }
    }, [_c('VNode', {
      attrs: {
        "node": navItem.nameSlot,
        "name": navItem.name
      }
    })], 1);
  }), _vm._v(" "), _vm.navSlider ? _c('hr', {
    staticClass: "tab__slider"
  }) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    staticClass: "tab__pagination__next"
  }, [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.next
    },
    on: {
      "click": function ($event) {
        return _vm.onPagination('next');
      }
    }
  }) : _vm._e()], 1)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-c06add7c_0", {
    source: ".tab__pagination[data-v-c06add7c]{display:flex;justify-content:space-between;align-items:center;vertical-align:middle;max-width:100%;flex:0 1 auto;position:relative;contain:content}.tab__pagination .tab__pagination__prev[data-v-c06add7c],.tab__pagination__next[data-v-c06add7c]{flex:1 40px;min-width:40px}.tab__pagination__next[data-v-c06add7c] .btn svg{transform:rotate(180deg)}.tab__nav[data-v-c06add7c]{position:relative;display:flex;overflow:hidden;flex:1 100%}.tab__nav__items[data-v-c06add7c]{display:flex;margin:0;padding:0;flex:1 auto;transition:.3s cubic-bezier(.25,.8,.5,1);height:100%}.tab__nav__items .tab__nav__item[data-v-c06add7c]{list-style:none;text-align:center;cursor:pointer;padding:.9rem 1rem;letter-spacing:.0892857143em;display:flex;justify-content:center;align-items:center;text-align:center;color:gray;text-transform:uppercase;font-size:.875rem;font-weight:500;white-space:normal;transition:background .1s ease;position:relative;overflow:hidden;min-width:90px;max-width:360px;user-select:none}.tab__nav__items .tab__nav__item[data-v-c06add7c]:hover:not(.disabled){background:#faf9f9}.tab__nav__items .active[data-v-c06add7c]{color:#000;color:#1867c0}.tab__nav__items .active[data-v-c06add7c]:hover{background:#1b7ef01c!important}.tab__nav__items .disabled[data-v-c06add7c]{background:#f3f2f2}.tab__slider[data-v-c06add7c]{height:2px;width:2px;background:#1867c0;border:none;margin:0;padding:0;bottom:0;position:absolute;transition:left .3s cubic-bezier(.25,.8,.5,1),top .3s cubic-bezier(.25,.8,.5,1)}.tab__pagination--vertical[data-v-c06add7c]{flex-direction:column}.tab__pagination--vertical .tab__nav__items[data-v-c06add7c]{flex-direction:column;flex:1 auto;position:relative}.tab__pagination--vertical .tab__nav__item *[data-v-c06add7c]{padding:0;margin:0}.tab__pagination--vertical[data-v-c06add7c] .tab__pagination__prev svg{transform:rotate(90deg)}.tab__pagination--vertical[data-v-c06add7c] .tab__pagination__next svg{transform:rotate(270deg)}.tab__pagination--vertical .tab__nav__item[data-v-c06add7c]{justify-content:left;padding-top:1.6rem;padding-bottom:1.6rem}.tabs--dark .tab__nav__item[data-v-c06add7c]:hover{background:#2f3236}.tab__pagination--auto .tab__nav__item[data-v-c06add7c]{flex:1 auto}",
    map: undefined,
    media: undefined
  }), inject("data-v-c06add7c_1", {
    source: ".ripple{background-color:#1866c04d;border-radius:50%;position:absolute;transform:scale(0);animation:ripple .6s linear;z-index:2}@keyframes ripple{to{transform:scale(2.5);opacity:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-c06add7c";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

const state = {
  target: null,
  touchstartX: 0,
  touchstartY: 0,
  isSwiping: 0
};

function start(e) {
  if (!e) return;
  state.isSwiping = true;
  state.touchstartX = e === null || e === void 0 ? void 0 : e.touches[0].clientX;
  state.touchstartY = e === null || e === void 0 ? void 0 : e.touches[0].clientY;
}

function move(e) {
  var _state$target;

  if (!state.isSwiping || !((_state$target = state.target) !== null && _state$target !== void 0 && _state$target._callback)) return;
  const touchendX = e === null || e === void 0 ? void 0 : e.changedTouches[0].clientX;
  const touchendY = e === null || e === void 0 ? void 0 : e.changedTouches[0].clientY;
  const diffX = state.touchstartX - touchendX;
  const diffY = state.touchstartY - touchendY;
  if (diffY > 0 || diffX > 0) state.target._callback("next");else state.target._callback("prev");
  state.isSwiping = false;
}

function listeners(add) {
  [["touchstart", start], ["touchmove", move]].forEach(([k, v]) => {
    var _state$target2;

    state === null || state === void 0 ? void 0 : (_state$target2 = state.target) === null || _state$target2 === void 0 ? void 0 : _state$target2[add ? "addEventListener" : "removeEventListener"](k, v);
  });
}

var touch = {
  inserted(el, {
    value
  }) {
    if (!value || !el) return;
    state.target = el;
    state.target._callback = value;
    listeners(true);
  },

  unbind() {
    listeners(false);
  }

};

//
var script$1 = {
  name: "Tabs",
  components: {
    NavTab: __vue_component__$2
  },
  directives: {
    touch
  },
  props: {
    dark: Boolean,
    vertical: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    slideDuration: {
      type: [String, Number],
      default: 200
    },
    slideVertical: Boolean,
    slide: {
      type: Boolean,
      default: true
    },
    navAuto: Boolean,
    navSlider: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    slideSide: "",
    navItems: [],
    tabItemActive: {
      model: "",
      name: "",
      disabled: false
    },
    tabItemIndexes: {
      current: 0,
      last: 0,
      previous: 0
    },
    tabItems: []
  }),
  computed: {
    classes() {
      return {
        tabs: true,
        "tabs--vertical": this.vertical,
        "tabs--dark": this.dark
      };
    },

    transition() {
      return {
        slide: this.slide,
        duration: this.slide ? this.slideDuration : 0,
        vertical: this.slideVertical,
        side: this.slideSide
      };
    }

  },
  watch: {
    tabItemActive(newTabItem, oldTabItem) {
      this.tabItemIndexes.previous = this.findIndexTab(oldTabItem);
      this.tabItemIndexes.current = this.findIndexTab(newTabItem);
      this.tabItems[this.tabItemIndexes.current].activeModel = newTabItem.model;

      if (this.tabItemIndexes.previous > -1) {
        this.setTabItemTransitionSide();
        this.tabItems[this.tabItemIndexes.previous].activeModel = newTabItem.model;
      }
    }

  },

  mounted() {
    this.activeTabItem({
      tabItem: this.navItems[0],
      byUser: false
    });
  },

  methods: {
    setTabItem(tabItemInstance) {
      var _tabItemInstance$$opt;

      if ((tabItemInstance === null || tabItemInstance === void 0 ? void 0 : (_tabItemInstance$$opt = tabItemInstance.$options) === null || _tabItemInstance$$opt === void 0 ? void 0 : _tabItemInstance$$opt._componentTag) === "TabItem") {
        this.tabItems.push(tabItemInstance);
        this.setNavItem(tabItemInstance);
      }
    },

    setNavItem({
      model,
      name,
      disabled,
      $slots
    }) {
      var _$slots$name;

      this.navItems.push({
        model,
        name,
        disabled,
        nameSlot: (_$slots$name = $slots.name) === null || _$slots$name === void 0 ? void 0 : _$slots$name[0]
      });
      this.tabItemIndexes.last = this.navItems.length - 1;
    },

    activeTabItem({
      tabItem,
      byUser
    }) {
      if (!tabItem.disabled) {
        this.tabItemActive = tabItem;
        this.$emit("input", tabItem === null || tabItem === void 0 ? void 0 : tabItem.name);
        byUser && this.$emit("change", tabItem === null || tabItem === void 0 ? void 0 : tabItem.name);
      }
    },

    disableTabItem(tabItemIndexesToDisable) {
      const {
        current,
        last
      } = this.tabItemIndexes;

      if (tabItemIndexesToDisable === current) {
        const nextTabItem = current === last ? current - 1 : current + 1;
        this.activeTabItem({
          tabItem: this.navItems[nextTabItem],
          byUser: true
        });
      }
    },

    setTabItemTransitionSide() {
      const {
        current,
        previous
      } = this.tabItemIndexes;
      this.slideSide = current > previous ? "right" : "left";
    },

    onTouchSlide(to) {
      let tabItem;
      const {
        current,
        last
      } = this.tabItemIndexes;

      if (to === "next" && current < last) {
        tabItem = this.navItems[current + 1];
      } else if (to === "prev" && current > 0) {
        tabItem = this.navItems[current - 1];
      }

      tabItem && this.activeTabItem({
        tabItem,
        byUser: true
      });
    },

    findIndexTab(tab) {
      return this.tabItems.findIndex(el => el.model == tab.model);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classes
  }, [_vm._t("nav", [_c('NavTab', _vm._b({
    on: {
      "select": _vm.activeTabItem
    }
  }, 'NavTab', {
    ripple: _vm.ripple,
    navAuto: _vm.navAuto,
    navItems: _vm.navItems,
    vertical: _vm.vertical,
    navSlider: _vm.navSlider,
    tabItemActive: _vm.tabItemActive
  }, false))], {
    "items": _vm.navItems,
    "active": _vm.tabItemActive
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "touch",
      rawName: "v-touch",
      value: _vm.onTouchSlide,
      expression: "onTouchSlide"
    }],
    staticClass: "tabs__content"
  }, [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-3d0a3126_0", {
    source: ".tabs[data-v-3d0a3126]{background:#fff;display:flex;flex-direction:column;border-radius:.23rem;height:100%;width:100%}.tabs__content[data-v-3d0a3126]{display:flex;position:relative;overflow:hidden;justify-content:center;align-items:center;height:100%;width:100%;flex:1 100%}.tabs--vertical[data-v-3d0a3126]{flex-direction:row}.tabs--dark[data-v-3d0a3126]{background:#222831}.tabs--dark .tabs__nav__item[data-v-3d0a3126]{color:#f1f1f1}.tabs--dark .tabs__nav__items .active[data-v-3d0a3126]{color:#fff}.tabs--dark .tabs__nav__items .disabled[data-v-3d0a3126]{background:#2c2f35}.tabs--dark .tab__pagination[data-v-3d0a3126] .btn svg{fill:#d6d5d5}.tabs--dark .tab__pagination[data-v-3d0a3126] .btn:disabled svg{fill:#56575c}.tabs--dark .tab__pagination[data-v-3d0a3126] .tab__nav__item:hover{background:#424750}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-3d0a3126";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
const crypto = require("crypto");

var script = {
  name: "TabItem",
  props: {
    name: {
      type: String,
      default: "Tab Item"
    },
    disabled: Boolean
  },
  data: () => ({
    activeModel: "",
    model: crypto.randomBytes(10).toString("hex")
  }),

  mounted() {
    this.tabs.setTabItem(this);
  },

  computed: {
    tabs() {
      return this.$parent;
    },

    transition() {
      return this.tabs.transition;
    },

    isActived() {
      return this.activeModel === this.model && !this.disabled;
    },

    slideDirection() {
      if (!this.transition.slide) return "";

      if (this.transition.vertical) {
        return {
          left: "slide-top",
          right: "slide-bottom"
        }[this.transition.side];
      }

      return {
        left: "slide-left",
        right: "slide-right"
      }[this.transition.side];
    },

    ownNavItemIndex() {
      return this.tabs.navItems.findIndex(navItem => navItem.model === this.model);
    }

  },
  watch: {
    disabled(payload) {
      var _this$tabs;

      payload && ((_this$tabs = this.tabs) === null || _this$tabs === void 0 ? void 0 : _this$tabs.disableTabItem(this.ownNavItemIndex));
      this.tabs.navItems[this.ownNavItemIndex].disabled = payload;
    }

  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": _vm.slideDirection
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActived,
      expression: "isActived"
    }],
    staticClass: "tab-item",
    style: {
      'transition-duration': _vm.transition.duration + "ms"
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-2610bb0c_0", {
    source: ".tab-item[data-v-2610bb0c]{position:absolute;top:0;left:0;z-index:1;height:100%;width:100%;transition:transform cubic-bezier(.25,.8,.5,1)}.slide-left-enter[data-v-2610bb0c],.slide-right-leave-to[data-v-2610bb0c]{transform:translateX(-100%)}.slide-left-leave-to[data-v-2610bb0c],.slide-right-enter[data-v-2610bb0c]{transform:translateX(100%)}.slide-bottom-leave-to[data-v-2610bb0c],.slide-top-enter[data-v-2610bb0c]{transform:translateY(-100%)}.slide-bottom-enter[data-v-2610bb0c],.slide-top-leave-to[data-v-2610bb0c]{transform:translateY(100%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-2610bb0c";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Tabs: __vue_component__$1,
  TabItem: __vue_component__
});

const install = function installVueMaterialTabs(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

export default install;
export { __vue_component__ as TabItem, __vue_component__$1 as Tabs };
