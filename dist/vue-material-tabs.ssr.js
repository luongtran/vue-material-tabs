'use strict';function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function calc(e) {
  var offset = e.currentTarget.getBoundingClientRect();
  var localX = e.clientX - offset.left;
  var localY = e.clientY - offset.top;
  var radius = Math.sqrt(Math.pow(e.currentTarget.clientWidth, 2) + Math.pow(e.currentTarget.clientHeight, 2)) / 2;
  var x = "".concat(localX - radius, "px");
  var y = "".concat(localY - radius, "px");
  var size = "".concat(radius * 2, "px");
  return {
    x: x,
    y: y,
    size: size
  };
}

function rippleShow(e) {
  var currentTarget = e.currentTarget;

  var _calc = calc(e),
      size = _calc.size,
      y = _calc.y,
      x = _calc.x;

  var rippleElement = document.createElement("span");
  rippleElement.classList.add("ripple");
  rippleElement.style.width = rippleElement.style.height = size;
  rippleElement.style.top = y;
  rippleElement.style.left = x;
  currentTarget.appendChild(rippleElement);
  setTimeout(function () {
    return rippleElement.remove();
  }, 1000);
}

function rippleListener(el, rippleEnable) {
  el === null || el === void 0 ? void 0 : el[rippleEnable ? "addEventListener" : "removeEventListener"]("click", rippleShow);
}

var ripple = {
  bind: function bind(el, _ref) {
    var value = _ref.value;
    return rippleListener(el, value);
  },
  update: function update(el, _ref2) {
    var value = _ref2.value;
    return rippleListener(el, value);
  },
  unbind: function unbind(el) {
    return rippleListener(el, false);
  }
};function inserted(el, binding) {
  var callback = binding === null || binding === void 0 ? void 0 : binding.value;
  if (callback) window.addEventListener("resize", callback);
  el._onResize = callback;
}

function unbind(el) {
  if (!el._onResize) return;
  window.removeEventListener("resize", el._onResize);
  delete el._onResize;
}

var resize = {
  inserted: inserted,
  unbind: unbind
};//
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
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "btn",
    on: {
      "click": function click($event) {
        return _vm.$emit('click');
      }
    }
  }, [_vm._ssrNode("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" role=\"img\" aria-hidden=\"true\" data-v-41f7b064><path d=\"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z\" data-v-41f7b064></path></svg>")]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-41f7b064_0", {
    source: ".btn[data-v-41f7b064]{outline:0;border:none;background:0 0;cursor:pointer}.btn svg[data-v-41f7b064]{height:24px;width:24px}.btn:disabled svg[data-v-41f7b064]{fill:#d6d5d5;cursor:default}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-41f7b064";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-41f7b064";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, createInjectorSSR, undefined);var script$2 = {
  components: {
    Btn: __vue_component__$3,
    VNode: {
      functional: true,
      render: function render(h, _ref) {
        var props = _ref.props;
        return props.node ? props.node : h("span", props.name);
      }
    }
  },
  directives: {
    ripple: ripple,
    resize: resize
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
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      pagination: {
        has: false,
        maxOffset: 0,
        minOffset: 0,
        translate: 0,
        offset: 0
      }
    };
  },
  computed: {
    classes: function classes() {
      return {
        tab__pagination: true,
        "tab__pagination--vertical": this.vertical,
        "tab__pagination--auto": this.navAuto && !this.vertical
      };
    },
    styles: function styles() {
      return {
        transform: "translate".concat(this.vertical ? "Y" : "X", "(-").concat(this.pagination.translate, "px)")
      };
    },
    paginateIndicator: function paginateIndicator() {
      return {
        next: this.pagination.translate < this.pagination.maxOffset,
        prev: this.pagination.translate > 0
      };
    },
    orientation: function orientation() {
      return this.vertical ? "portrait" : "landscape";
    }
  },
  watch: {
    // Force recalc the pagination offsets when the orientation/navItems is change;
    navItems: "resizable",
    vertical: function vertical() {
      Object.assign(this.$data, this.$options.data());
      this.resizable();
    },
    tabItemActive: function tabItemActive(payload) {
      this.sliderHandler();

      if (this.pagination.has) {
        this.paginationCollapse(payload);
      }
    }
  },
  methods: {
    select: function select(navItem) {
      if (!(navItem !== null && navItem !== void 0 && navItem.disabled)) {
        this.$emit("select", {
          tabItem: navItem,
          byUser: true
        });
      }
    },
    sliderHandler: function sliderHandler() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$$refs, _this$$refs2, _this$$refs2$_this$ta;

        var navItemsElement, _this$getElementRect, navItemsLeft, navItemsTop, _this$getElementRect2, navActiveWidth, navActiveHeight, navActiveLeft, navActiveTop, children, sliderEl;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$nextTick();

              case 2:
                navItemsElement = (_this$$refs = _this.$refs) === null || _this$$refs === void 0 ? void 0 : _this$$refs.navItems;
                _this$getElementRect = _this.getElementRect({
                  el: navItemsElement,
                  prefix: "navItems"
                }), navItemsLeft = _this$getElementRect.navItemsLeft, navItemsTop = _this$getElementRect.navItemsTop;
                _this$getElementRect2 = _this.getElementRect({
                  el: (_this$$refs2 = _this.$refs) === null || _this$$refs2 === void 0 ? void 0 : (_this$$refs2$_this$ta = _this$$refs2[_this.tabItemActive.model]) === null || _this$$refs2$_this$ta === void 0 ? void 0 : _this$$refs2$_this$ta[0],
                  prefix: "navActive"
                }), navActiveWidth = _this$getElementRect2.navActiveWidth, navActiveHeight = _this$getElementRect2.navActiveHeight, navActiveLeft = _this$getElementRect2.navActiveLeft, navActiveTop = _this$getElementRect2.navActiveTop;
                children = navItemsElement.children;
                sliderEl = children[children.length - 1];
                sliderEl.removeAttribute("style");
                Object.assign(sliderEl.style, {
                  portrait: {
                    height: "".concat(navActiveHeight, "px"),
                    top: "".concat(navActiveTop - navItemsTop, "px")
                  },
                  landscape: {
                    width: "".concat(navActiveWidth, "px"),
                    left: "".concat(navActiveLeft - navItemsLeft, "px")
                  }
                }[_this.orientation]);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getPagination: function getPagination() {
      var _this$$refs3, _this$$refs4;

      var navItemsElement = (_this$$refs3 = this.$refs) === null || _this$$refs3 === void 0 ? void 0 : _this$$refs3.navItems;

      var _this$getElementRect3 = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems"
      }),
          navItemsWidth = _this$getElementRect3.navItemsWidth;

      var _this$getElementRect4 = this.getElementRect({
        el: (_this$$refs4 = this.$refs) === null || _this$$refs4 === void 0 ? void 0 : _this$$refs4.nav,
        prefix: "nav"
      }),
          navWidth = _this$getElementRect4.navWidth,
          navHeight = _this$getElementRect4.navHeight;

      var navItemsHeight = _toConsumableArray(navItemsElement === null || navItemsElement === void 0 ? void 0 : navItemsElement.children).slice(0, -1).map(function (el) {
        return el.offsetHeight;
      }).reduce(function (a, c) {
        return Math.abs(a + c);
      }, 0);

      var paginationFactory = function paginationFactory(has, maxOffset, minOffset) {
        var paginationOffsets = Object.entries({
          has: has,
          maxOffset: maxOffset,
          minOffset: minOffset,
          offset: minOffset
        }).map(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          return [k, Math.abs(v)];
        });
        return Object.fromEntries(paginationOffsets);
      };

      Object.assign(this.pagination, {
        portrait: paginationFactory(navItemsHeight > navHeight, navItemsHeight - navHeight, navHeight),
        landscape: paginationFactory(navItemsWidth > navWidth, navItemsWidth - navWidth, navWidth)
      }[this.orientation]);
    },
    onPagination: function onPagination(to) {
      var _this$pagination = this.pagination,
          maxOffset = _this$pagination.maxOffset,
          offset = _this$pagination.offset,
          translate = _this$pagination.translate,
          minOffset = _this$pagination.minOffset;

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
    paginationCollapse: function paginationCollapse() {
      var _this$$refs5, _this$$refs5$this$tab, _this$$refs6;

      var _this$getElementRect5 = this.getElementRect({
        el: (_this$$refs5 = this.$refs) === null || _this$$refs5 === void 0 ? void 0 : (_this$$refs5$this$tab = _this$$refs5[this.tabItemActive.model]) === null || _this$$refs5$this$tab === void 0 ? void 0 : _this$$refs5$this$tab[0],
        prefix: "navActive"
      }),
          navActiveRight = _this$getElementRect5.navActiveRight,
          navActiveLeft = _this$getElementRect5.navActiveLeft,
          navActiveTop = _this$getElementRect5.navActiveTop,
          navActiveBottom = _this$getElementRect5.navActiveBottom,
          navActiveWidth = _this$getElementRect5.navActiveWidth,
          navActiveHeight = _this$getElementRect5.navActiveHeight;

      var _this$getElementRect6 = this.getElementRect({
        el: (_this$$refs6 = this.$refs) === null || _this$$refs6 === void 0 ? void 0 : _this$$refs6.nav,
        prefix: "nav"
      }),
          navRight = _this$getElementRect6.navRight,
          navLeft = _this$getElementRect6.navLeft,
          navTop = _this$getElementRect6.navTop,
          navBottom = _this$getElementRect6.navBottom;

      var _this$pagination2 = this.pagination,
          translate = _this$pagination2.translate,
          maxOffset = _this$pagination2.maxOffset;
      var toTranslate = translate; // Portrait

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
    resizable: function resizable() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.getPagination();

        _this2.sliderHandler();
      });
    },
    getElementRect: function getElementRect(_ref4) {
      var el = _ref4.el,
          prefix = _ref4.prefix;
      if (!el) return;
      var parse = JSON.parse,
          stringify = JSON.stringify;
      var rect = Object.entries(parse(stringify(el.getBoundingClientRect())));
      var newRect = rect.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            i = _ref6[0],
            k = _ref6[1];

        return [prefix + i.charAt(0).toUpperCase() + i.slice(1), k];
      });
      return Object.fromEntries(newRect);
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
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
  }, [_vm._ssrNode("<div class=\"tab__pagination__prev\" data-v-c06add7c>", "</div>", [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.prev
    },
    on: {
      "click": function click($event) {
        return _vm.onPagination('prev');
      }
    }
  }) : _vm._e()], 1), _vm._ssrNode(" "), _vm._ssrNode("<nav class=\"tab__nav\" data-v-c06add7c>", "</nav>", [_vm._ssrNode("<ul class=\"tab__nav__items\"" + _vm._ssrStyle(null, _vm.styles, null) + " data-v-c06add7c>", "</ul>", [_vm._l(_vm.navItems, function (navItem, index) {
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
        "click": function click($event) {
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
  }), _vm._ssrNode(" " + (_vm.navSlider ? "<hr class=\"tab__slider\" data-v-c06add7c>" : "<!---->"))], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"tab__pagination__next\" data-v-c06add7c>", "</div>", [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.next
    },
    on: {
      "click": function click($event) {
        return _vm.onPagination('next');
      }
    }
  }) : _vm._e()], 1)], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
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


var __vue_scope_id__$2 = "data-v-c06add7c";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-c06add7c";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);var state = {
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
  var touchendX = e === null || e === void 0 ? void 0 : e.changedTouches[0].clientX;
  var touchendY = e === null || e === void 0 ? void 0 : e.changedTouches[0].clientY;
  var diffX = state.touchstartX - touchendX;
  var diffY = state.touchstartY - touchendY;
  if (diffY > 0 || diffX > 0) state.target._callback("next");else state.target._callback("prev");
  state.isSwiping = false;
}

function listeners(add) {
  [["touchstart", start], ["touchmove", move]].forEach(function (_ref) {
    var _state$target2;

    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    state === null || state === void 0 ? void 0 : (_state$target2 = state.target) === null || _state$target2 === void 0 ? void 0 : _state$target2[add ? "addEventListener" : "removeEventListener"](k, v);
  });
}

var touch = {
  inserted: function inserted(el, _ref3) {
    var value = _ref3.value;
    if (!value || !el) return;
    state.target = el;
    state.target._callback = value;
    listeners(true);
  },
  unbind: function unbind() {
    listeners(false);
  }
};//
var script$1 = {
  name: "Tabs",
  components: {
    NavTab: __vue_component__$2
  },
  directives: {
    touch: touch
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
  data: function data() {
    return {
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
    };
  },
  computed: {
    classes: function classes() {
      return {
        tabs: true,
        "tabs--vertical": this.vertical,
        "tabs--dark": this.dark
      };
    },
    transition: function transition() {
      return {
        slide: this.slide,
        duration: this.slide ? this.slideDuration : 0,
        vertical: this.slideVertical,
        side: this.slideSide
      };
    }
  },
  watch: {
    tabItemActive: function tabItemActive(newTabItem, oldTabItem) {
      this.tabItemIndexes.previous = this.findIndexTab(oldTabItem);
      this.tabItemIndexes.current = this.findIndexTab(newTabItem);
      this.tabItems[this.tabItemIndexes.current].activeModel = newTabItem.model;

      if (this.tabItemIndexes.previous > -1) {
        this.setTabItemTransitionSide();
        this.tabItems[this.tabItemIndexes.previous].activeModel = newTabItem.model;
      }
    }
  },
  mounted: function mounted() {
    this.activeTabItem({
      tabItem: this.navItems[0],
      byUser: false
    });
  },
  methods: {
    setTabItem: function setTabItem(tabItemInstance) {
      var _tabItemInstance$$opt;

      if ((tabItemInstance === null || tabItemInstance === void 0 ? void 0 : (_tabItemInstance$$opt = tabItemInstance.$options) === null || _tabItemInstance$$opt === void 0 ? void 0 : _tabItemInstance$$opt._componentTag) === "TabItem") {
        this.tabItems.push(tabItemInstance);
        this.setNavItem(tabItemInstance);
      }
    },
    setNavItem: function setNavItem(_ref) {
      var _$slots$name;

      var model = _ref.model,
          name = _ref.name,
          disabled = _ref.disabled,
          $slots = _ref.$slots;
      this.navItems.push({
        model: model,
        name: name,
        disabled: disabled,
        nameSlot: (_$slots$name = $slots.name) === null || _$slots$name === void 0 ? void 0 : _$slots$name[0]
      });
      this.tabItemIndexes.last = this.navItems.length - 1;
    },
    activeTabItem: function activeTabItem(_ref2) {
      var tabItem = _ref2.tabItem,
          byUser = _ref2.byUser;

      if (!tabItem.disabled) {
        this.tabItemActive = tabItem;
        this.$emit("input", tabItem === null || tabItem === void 0 ? void 0 : tabItem.name);
        byUser && this.$emit("change", tabItem === null || tabItem === void 0 ? void 0 : tabItem.name);
      }
    },
    disableTabItem: function disableTabItem(tabItemIndexesToDisable) {
      var _this$tabItemIndexes = this.tabItemIndexes,
          current = _this$tabItemIndexes.current,
          last = _this$tabItemIndexes.last;

      if (tabItemIndexesToDisable === current) {
        var nextTabItem = current === last ? current - 1 : current + 1;
        this.activeTabItem({
          tabItem: this.navItems[nextTabItem],
          byUser: true
        });
      }
    },
    setTabItemTransitionSide: function setTabItemTransitionSide() {
      var _this$tabItemIndexes2 = this.tabItemIndexes,
          current = _this$tabItemIndexes2.current,
          previous = _this$tabItemIndexes2.previous;
      this.slideSide = current > previous ? "right" : "left";
    },
    onTouchSlide: function onTouchSlide(to) {
      var tabItem;
      var _this$tabItemIndexes3 = this.tabItemIndexes,
          current = _this$tabItemIndexes3.current,
          last = _this$tabItemIndexes3.last;

      if (to === "next" && current < last) {
        tabItem = this.navItems[current + 1];
      } else if (to === "prev" && current > 0) {
        tabItem = this.navItems[current - 1];
      }

      tabItem && this.activeTabItem({
        tabItem: tabItem,
        byUser: true
      });
    },
    findIndexTab: function findIndexTab(tab) {
      return this.tabItems.findIndex(function (el) {
        return el.model == tab.model;
      });
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
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
  }), _vm._ssrNode(" "), _c('div', {
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

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3d0a3126_0", {
    source: ".tabs[data-v-3d0a3126]{background:#fff;display:flex;flex-direction:column;border-radius:.23rem;height:100%;width:100%}.tabs__content[data-v-3d0a3126]{display:flex;position:relative;overflow:hidden;justify-content:center;align-items:center;height:100%;width:100%;flex:1 100%}.tabs--vertical[data-v-3d0a3126]{flex-direction:row}.tabs--dark[data-v-3d0a3126]{background:#222831}.tabs--dark .tabs__nav__item[data-v-3d0a3126]{color:#f1f1f1}.tabs--dark .tabs__nav__items .active[data-v-3d0a3126]{color:#fff}.tabs--dark .tabs__nav__items .disabled[data-v-3d0a3126]{background:#2c2f35}.tabs--dark .tab__pagination[data-v-3d0a3126] .btn svg{fill:#d6d5d5}.tabs--dark .tab__pagination[data-v-3d0a3126] .btn:disabled svg{fill:#56575c}.tabs--dark .tab__pagination[data-v-3d0a3126] .tab__nav__item:hover{background:#424750}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-3d0a3126";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-3d0a3126";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
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
var crypto = require("crypto");

var script = {
  name: "TabItem",
  props: {
    name: {
      type: String,
      default: "Tab Item"
    },
    disabled: Boolean
  },
  data: function data() {
    return {
      activeModel: "",
      model: crypto.randomBytes(10).toString("hex")
    };
  },
  mounted: function mounted() {
    this.tabs.setTabItem(this);
  },
  computed: {
    tabs: function tabs() {
      return this.$parent;
    },
    transition: function transition() {
      return this.tabs.transition;
    },
    isActived: function isActived() {
      return this.activeModel === this.model && !this.disabled;
    },
    slideDirection: function slideDirection() {
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
    ownNavItemIndex: function ownNavItemIndex() {
      var _this = this;

      return this.tabs.navItems.findIndex(function (navItem) {
        return navItem.model === _this.model;
      });
    }
  },
  watch: {
    disabled: function disabled(payload) {
      var _this$tabs;

      payload && ((_this$tabs = this.tabs) === null || _this$tabs === void 0 ? void 0 : _this$tabs.disableTabItem(this.ownNavItemIndex));
      this.tabs.navItems[this.ownNavItemIndex].disabled = payload;
    }
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2610bb0c_0", {
    source: ".tab-item[data-v-2610bb0c]{position:absolute;top:0;left:0;z-index:1;height:100%;width:100%;transition:transform cubic-bezier(.25,.8,.5,1)}.slide-left-enter[data-v-2610bb0c],.slide-right-leave-to[data-v-2610bb0c]{transform:translateX(-100%)}.slide-left-leave-to[data-v-2610bb0c],.slide-right-enter[data-v-2610bb0c]{transform:translateX(100%)}.slide-bottom-leave-to[data-v-2610bb0c],.slide-top-enter[data-v-2610bb0c]{transform:translateY(-100%)}.slide-bottom-enter[data-v-2610bb0c],.slide-top-leave-to[data-v-2610bb0c]{transform:translateY(100%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-2610bb0c";
/* module identifier */

var __vue_module_identifier__ = "data-v-2610bb0c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,Tabs: __vue_component__$1,TabItem: __vue_component__});var install = function installVueMaterialTabs(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,Tabs: __vue_component__$1,TabItem: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;