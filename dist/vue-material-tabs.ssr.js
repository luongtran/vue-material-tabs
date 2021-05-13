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
      render: function render(_, ctx) {
        return ctx.props.node;
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
        previous: this.pagination.translate > 0
      };
    },
    orientation: function orientation() {
      return this.vertical ? "portrait" : "landscape";
    }
  },
  watch: {
    vertical: ["sliderHandler", "setPaginationOffset"],
    tabItemActive: ["sliderHandler", "paginationByCollapse"]
  },
  mounted: function mounted() {
    this.setPaginationOffset();
    this.getElementRect(this.$refs.nav, "nav");
  },
  methods: {
    select: function select(navItem) {
      this.$emit("select", {
        tabItem: navItem,
        byUser: true
      });
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
    setPaginationOffset: function setPaginationOffset() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2$$refs, _this2$$refs2;

        var navItemsElement, _this2$getElementRect, navItemsWidth, _this2$getElementRect2, navWidth, navHeight, navItemsHeight, paginationFactory;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.$nextTick();

              case 2:
                navItemsElement = (_this2$$refs = _this2.$refs) === null || _this2$$refs === void 0 ? void 0 : _this2$$refs.navItems;
                _this2$getElementRect = _this2.getElementRect({
                  el: navItemsElement,
                  prefix: "navItems"
                }), navItemsWidth = _this2$getElementRect.navItemsWidth;
                _this2$getElementRect2 = _this2.getElementRect({
                  el: (_this2$$refs2 = _this2.$refs) === null || _this2$$refs2 === void 0 ? void 0 : _this2$$refs2.nav,
                  prefix: "nav"
                }), navWidth = _this2$getElementRect2.navWidth, navHeight = _this2$getElementRect2.navHeight;
                navItemsHeight = _toConsumableArray(navItemsElement === null || navItemsElement === void 0 ? void 0 : navItemsElement.children).slice(0, -1).map(function (el) {
                  return el.offsetHeight;
                }).reduce(function (a, c) {
                  return a + c;
                }, 0);

                paginationFactory = function paginationFactory(has, maxOffset, minOffset) {
                  return {
                    has: has,
                    maxOffset: maxOffset,
                    minOffset: minOffset,
                    offset: minOffset
                  };
                };

                Object.assign(_this2.pagination, {
                  portrait: paginationFactory(navItemsHeight > navHeight, navItemsHeight - navHeight, navHeight),
                  landscape: paginationFactory(navItemsWidth > navWidth, navItemsWidth - navWidth, navWidth)
                }[_this2.orientation]);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    paginationHandler: function paginationHandler(type) {
      var _this$pagination = this.pagination,
          maxOffset = _this$pagination.maxOffset,
          offset = _this$pagination.offset,
          translate = _this$pagination.translate,
          minOffset = _this$pagination.minOffset;

      if (type === "previous" && this.paginateIndicator.previous) {
        if (offset <= minOffset) {
          this.pagination.offset = minOffset;
        }

        if (translate - offset < offset) {
          this.pagination.translate = 0;
          return;
        }

        this.pagination.translate = translate - offset;
      }

      if (type === "next" && this.paginateIndicator.next) {
        if (translate + offset > maxOffset) {
          this.pagination.offset = maxOffset - translate;
        }

        this.pagination.translate = translate + this.pagination.offset;
      }
    },
    paginationByCollapse: function paginationByCollapse(_ref) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3$$refs, _this3$$refs$model, _this3$$refs2;

        var model, _this3$getElementRect, navActiveRight, navActiveLeft, navActiveTop, navActiveBottom, _this3$getElementRect2, navRight, navLeft, navTop, navBottom, toTranslate;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = _ref.model;
                _context3.next = 3;
                return _this3.$nextTick();

              case 3:
                _this3$getElementRect = _this3.getElementRect({
                  el: (_this3$$refs = _this3.$refs) === null || _this3$$refs === void 0 ? void 0 : (_this3$$refs$model = _this3$$refs[model]) === null || _this3$$refs$model === void 0 ? void 0 : _this3$$refs$model[0],
                  prefix: "navActive"
                }), navActiveRight = _this3$getElementRect.navActiveRight, navActiveLeft = _this3$getElementRect.navActiveLeft, navActiveTop = _this3$getElementRect.navActiveTop, navActiveBottom = _this3$getElementRect.navActiveBottom;
                _this3$getElementRect2 = _this3.getElementRect({
                  el: (_this3$$refs2 = _this3.$refs) === null || _this3$$refs2 === void 0 ? void 0 : _this3$$refs2.nav,
                  prefix: "nav"
                }), navRight = _this3$getElementRect2.navRight, navLeft = _this3$getElementRect2.navLeft, navTop = _this3$getElementRect2.navTop, navBottom = _this3$getElementRect2.navBottom;
                toTranslate = _this3.pagination.translate;

                if (_this3.orientation === "portrait") {
                  if (navActiveBottom > navBottom) {
                    toTranslate = toTranslate + (navActiveBottom - navBottom);
                  } else if (navActiveTop < navTop) {
                    toTranslate = toTranslate - (navTop - navActiveTop);
                  }
                } else {
                  if (navActiveRight > navRight) {
                    toTranslate = toTranslate + (navActiveRight - navRight);
                  } else if (navActiveLeft < navLeft) {
                    toTranslate = toTranslate - (navLeft - navActiveLeft);
                  }
                }

                _this3.pagination.translate = toTranslate;

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    resizable: function resizable() {
      this.setPaginationOffset();
      this.sliderHandler();
    },
    getElementRect: function getElementRect(_ref2) {
      var el = _ref2.el,
          prefix = _ref2.prefix;
      if (!el) return;
      var parse = JSON.parse,
          stringify = JSON.stringify;
      var rect = Object.entries(parse(stringify(el.getBoundingClientRect())));
      var newRect = rect.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            i = _ref4[0],
            k = _ref4[1];

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
  }, [_vm._ssrNode("<div class=\"tab__pagination__prev\" data-v-cc184518>", "</div>", [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.previous
    },
    on: {
      "click": function click($event) {
        return _vm.paginationHandler('previous');
      }
    }
  }) : _vm._e()], 1), _vm._ssrNode(" "), _vm._ssrNode("<nav class=\"tab__nav\" data-v-cc184518>", "</nav>", [_vm._ssrNode("<ul class=\"tab__nav__items\"" + _vm._ssrStyle(null, _vm.styles, null) + " data-v-cc184518>", "</ul>", [_vm._l(_vm.navItems, function (navItem, index) {
    return _c('li', {
      directives: [{
        name: "ripple",
        rawName: "v-ripple",
        value: _vm.ripple,
        expression: "ripple"
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
    }, [navItem.nameSlot ? _c('VNode', {
      attrs: {
        "node": navItem.nameSlot
      }
    }) : _c('span', [_vm._v("\n          " + _vm._s(navItem.name) + "\n        ")])], 1);
  }), _vm._ssrNode(" " + (_vm.navSlider ? "<hr class=\"tab__slider\" data-v-cc184518>" : "<!---->"))], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"tab__pagination__next\" data-v-cc184518>", "</div>", [_vm.pagination.has ? _c('Btn', {
    attrs: {
      "disabled": !_vm.paginateIndicator.next
    },
    on: {
      "click": function click($event) {
        return _vm.paginationHandler('next');
      }
    }
  }) : _vm._e()], 1)], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-cc184518_0", {
    source: ".tab__pagination[data-v-cc184518]{display:flex;justify-content:space-between;align-items:center;vertical-align:middle;max-width:100%;flex:0 1 auto;position:relative;contain:content}.tab__pagination .tab__pagination__prev[data-v-cc184518],.tab__pagination__next[data-v-cc184518]{flex:1 40px;min-width:40px}.tab__pagination__next[data-v-cc184518] .btn svg{transform:rotate(180deg)}.tab__nav[data-v-cc184518]{position:relative;display:flex;overflow:hidden;flex:1 100%}.tab__nav__items[data-v-cc184518]{display:flex;margin:0;padding:0;flex:1 auto;transition:.3s cubic-bezier(.25,.8,.5,1);height:100%}.tab__nav__items .tab__nav__item[data-v-cc184518]{list-style:none;text-align:center;cursor:pointer;padding:.9rem 1rem;letter-spacing:.0892857143em;display:flex;justify-content:center;align-items:center;text-align:center;color:gray;text-transform:uppercase;font-size:.875rem;font-weight:500;white-space:normal;transition:background .1s ease;position:relative;overflow:hidden;min-width:90px;max-width:360px;user-select:none}.tab__nav__items .tab__nav__item[data-v-cc184518]:hover:not(.disabled){background:#faf9f9}.tab__nav__items .active[data-v-cc184518]{color:#000;color:#1867c0}.tab__nav__items .active[data-v-cc184518]:hover{background:#1b7ef01c!important}.tab__nav__items .disabled[data-v-cc184518]{background:#f3f2f2}.tab__slider[data-v-cc184518]{height:2px;width:2px;background:#1867c0;border:none;margin:0;padding:0;bottom:0;position:absolute;transition:left .3s cubic-bezier(.25,.8,.5,1),top .3s cubic-bezier(.25,.8,.5,1)}.tab__pagination--vertical[data-v-cc184518]{flex-direction:column}.tab__pagination--vertical .tab__nav__items[data-v-cc184518]{flex-direction:column;flex:1 auto;position:relative}.tab__pagination--vertical .tab__nav__item *[data-v-cc184518]{padding:0;margin:0}.tab__pagination--vertical[data-v-cc184518] .tab__pagination__prev svg{transform:rotate(90deg)}.tab__pagination--vertical[data-v-cc184518] .tab__pagination__next svg{transform:rotate(270deg)}.tab__pagination--vertical .tab__nav__item[data-v-cc184518]{justify-content:left;padding-top:1.6rem;padding-bottom:1.6rem}.tabs--dark .tab__nav__item[data-v-cc184518]:hover{background:#2f3236}.tab__pagination--auto .tab__nav__item[data-v-cc184518]{flex:1 auto}",
    map: undefined,
    media: undefined
  }), inject("data-v-cc184518_1", {
    source: ".ripple{background-color:#1866c04d;border-radius:50%;position:absolute;transform:scale(0);animation:ripple .6s linear;z-index:2}@keyframes ripple{to{transform:scale(4);opacity:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-cc184518";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-cc184518";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);//
var script$1 = {
  name: "Tabs",
  components: {
    NavTab: __vue_component__$2
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
      }
    };
  },
  computed: {
    tabItems: function tabItems() {
      var _this$$slots;

      return (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : _this$$slots.default.map(function (_ref) {
        var componentInstance = _ref.componentInstance,
            componentOptions = _ref.componentOptions;
        if ((componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions.tag) === "TabItem") return componentInstance;
      }).filter(function (el) {
        return el;
      });
    },
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
    this.setNavItems();
    this.activeTabItem({
      tabItem: this.navItems[0],
      byUser: false
    });
  },
  methods: {
    setNavItems: function setNavItems() {
      var _this$tabItems;

      var navItems = (_this$tabItems = this.tabItems) === null || _this$tabItems === void 0 ? void 0 : _this$tabItems.map(function (_ref2) {
        var _$slots$name;

        var model = _ref2.model,
            name = _ref2.name,
            disabled = _ref2.disabled,
            $slots = _ref2.$slots;
        return {
          model: model,
          name: name,
          disabled: disabled,
          nameSlot: $slots === null || $slots === void 0 ? void 0 : (_$slots$name = $slots.name) === null || _$slots$name === void 0 ? void 0 : _$slots$name[0]
        };
      });

      if (navItems !== null && navItems !== void 0 && navItems.length) {
        this.navItems = navItems;
        this.tabItemIndexes.last = navItems.length - 1;
      }
    },
    activeTabItem: function activeTabItem(_ref3) {
      var tabItem = _ref3.tabItem,
          byUser = _ref3.byUser;

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
  }), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"tabs__content\" data-v-dee1394c>", "</div>", [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-dee1394c_0", {
    source: ".tabs[data-v-dee1394c]{background:#fff;display:flex;flex-direction:column;border-radius:.23rem;height:100%;width:100%}.tabs__content[data-v-dee1394c]{display:flex;position:relative;overflow:hidden;justify-content:center;align-items:center;height:100%;width:100%;flex:1 100%}.tabs--vertical[data-v-dee1394c]{flex-direction:row}.tabs--dark[data-v-dee1394c]{background:#222831}.tabs--dark .tabs__nav__item[data-v-dee1394c]{color:#f1f1f1}.tabs--dark .tabs__nav__items .active[data-v-dee1394c]{color:#fff}.tabs--dark .tabs__nav__items .disabled[data-v-dee1394c]{background:#2c2f35}.tabs--dark .tabs__nav[data-v-dee1394c] .btn svg{fill:#d6d5d5}.tabs--dark .tabs__nav[data-v-dee1394c] .btn:disabled svg{fill:#707279}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-dee1394c";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-dee1394c";
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
      model: ""
    };
  },
  created: function created() {
    this.model = Math.random().toString(36).substring(2);
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
      'transition-duration': this.transition.duration + "ms"
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-15af76e8_0", {
    source: ".tab-item[data-v-15af76e8]{position:absolute;top:0;left:0;z-index:1;height:100%;width:100%;transition:transform cubic-bezier(.25,.8,.5,1)}.slide-left-enter[data-v-15af76e8],.slide-right-leave-to[data-v-15af76e8]{transform:translateX(-100%)}.slide-left-leave-to[data-v-15af76e8],.slide-right-enter[data-v-15af76e8]{transform:translateX(100%)}.slide-bottom-leave-to[data-v-15af76e8],.slide-top-enter[data-v-15af76e8]{transform:translateY(-100%)}.slide-bottom-enter[data-v-15af76e8],.slide-top-leave-to[data-v-15af76e8]{transform:translateY(100%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-15af76e8";
/* module identifier */

var __vue_module_identifier__ = "data-v-15af76e8";
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