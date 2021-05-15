<template>
  <div v-resize="resizable" :class="classes">
    <div class="tab__pagination__prev">
      <Btn
        v-if="pagination.has"
        :disabled="!paginateIndicator.prev"
        @click="paginationHandler('prev')"
      />
    </div>
    <nav ref="nav" class="tab__nav">
      <ul ref="navItems" class="tab__nav__items" :style="styles">
        <li
          v-ripple="ripple && !navItem.disabled"
          v-for="(navItem, index) in navItems"
          :key="`tab-item-${index}`"
          :ref="navItem.model"
          class="tab__nav__item"
          :class="{
            active: navItem.model === tabItemActive.model,
            disabled: navItem.disabled,
          }"
          @click.prevent="select(navItem)"
        >
          <VNode :node="navItem.nameSlot" :name="navItem.name" />
        </li>
        <hr v-if="navSlider" class="tab__slider" />
      </ul>
    </nav>
    <div class="tab__pagination__next">
      <Btn
        v-if="pagination.has"
        :disabled="!paginateIndicator.next"
        @click="paginationHandler('next')"
      />
    </div>
  </div>
</template>

<script>
import ripple from "./ripple/index";
import resize from "./resize/index";
import Btn from "./Btn";

export default {
  components: {
    Btn,
    VNode: {
      functional: true,
      render: (h, ctx) => {
        return ctx.props.node ? ctx.props.node : h("span", ctx.props.name);
      },
    },
  },

  directives: {
    ripple,
    resize,
  },

  props: {
    vertical: Boolean,
    navSlider: Boolean,
    ripple: Boolean,
    navAuto: Boolean,
    navItems: {
      type: Array,
      required: true,
    },
    tabItemActive: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    pagination: {
      has: false,
      maxOffset: 0,
      minOffset: 0,
      translate: 0,
      offset: 0,
    },
  }),

  computed: {
    classes() {
      return {
        tab__pagination: true,
        "tab__pagination--vertical": this.vertical,
        "tab__pagination--auto": this.navAuto && !this.vertical,
      };
    },

    styles() {
      return {
        transform: `translate${this.vertical ? "Y" : "X"}(-${
          this.pagination.translate
        }px)`,
      };
    },

    paginateIndicator() {
      return {
        next: this.pagination.translate < this.pagination.maxOffset,
        prev: this.pagination.translate > 0,
      };
    },

    orientation() {
      return this.vertical ? "portrait" : "landscape";
    },
  },

  watch: {
    // Force recalc the pagination offsets when the orientation/navItems is change;
    vertical: "resizable",
    navItems: "resizable",
  },

  methods: {
    select(navItem) {
      this.$emit("select", {
        tabItem: navItem,
        byUser: true,
      });
      this.sliderHandler(navItem?.model);
      if (this.pagination.has) {
        this.paginationCollapse(navItem);
      }
    },

    sliderHandler(model) {
      const navItemsElement = this.$refs?.navItems;
      const { navItemsLeft, navItemsTop } = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems",
      });

      const {
        navActiveWidth,
        navActiveHeight,
        navActiveLeft,
        navActiveTop,
      } = this.getElementRect({
        el: this.$refs?.[model || this.tabItemActive.model]?.[0],
        prefix: "navActive",
      });

      const { children } = navItemsElement;
      const sliderEl = children[children.length - 1];
      sliderEl.removeAttribute("style");

      Object.assign(
        sliderEl.style,
        {
          portrait: {
            height: `${navActiveHeight}px`,
            top: `${navActiveTop - navItemsTop}px`,
          },
          landscape: {
            width: `${navActiveWidth}px`,
            left: `${navActiveLeft - navItemsLeft}px`,
          },
        }[this.orientation]
      );
    },

    getPagination() {
      const navItemsElement = this.$refs?.navItems;
      const { navItemsWidth } = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems",
      });

      const { navWidth, navHeight } = this.getElementRect({
        el: this.$refs?.nav,
        prefix: "nav",
      });

      const navItemsHeight = [...navItemsElement?.children]
        .slice(0, -1)
        .map((el) => el.offsetHeight)
        .reduce((a, c) => Math.abs(a + c), 0);

      const paginationFactory = (has, maxOffset, minOffset) => {
        const paginationOffsets = Object.entries({
          has,
          maxOffset,
          minOffset,
          offset: minOffset,
        }).map(([k, v]) => [k, Math.abs(v)]);
        return Object.fromEntries(paginationOffsets);
      };

      Object.assign(
        this.pagination,
        {
          portrait: paginationFactory(
            navItemsHeight > navHeight,
            navItemsHeight - navHeight,
            navHeight
          ),
          landscape: paginationFactory(
            navItemsWidth > navWidth,
            navItemsWidth - navWidth,
            navWidth
          ),
        }[this.orientation]
      );
    },

    paginationHandler(type) {
      const { maxOffset, offset, translate, minOffset } = this.pagination;
      if (type === "prev" && this.paginateIndicator.prev) {
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

    paginationCollapse({ model }) {
      const {
        navActiveRight,
        navActiveLeft,
        navActiveTop,
        navActiveBottom,
        navActiveWidth,
        navActiveHeight,
      } = this.getElementRect({
        el: this.$refs?.[model]?.[0],
        prefix: "navActive",
      });
      const { navRight, navLeft, navTop, navBottom } = this.getElementRect({
        el: this.$refs?.nav,
        prefix: "nav",
      });

      const { translate, maxOffset } = this.pagination;
      let toTranslate = translate;

      // Portrait
      if (this.vertical && navActiveBottom > navBottom) {
        toTranslate = toTranslate + navActiveHeight;
      }

      if (this.vertical && navActiveTop < navTop) {
        toTranslate =
          navActiveHeight > toTranslate ? 0 : toTranslate - navActiveHeight;
      }

      // Landscape
      if (!this.vertical && navActiveRight > navRight) {
        toTranslate = toTranslate + navActiveWidth;
      }

      if (!this.vertical && navActiveLeft < navLeft) {
        toTranslate =
          navActiveWidth > toTranslate ? 0 : toTranslate - navActiveWidth;
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

    getElementRect({ el, prefix }) {
      if (!el) return;
      const { parse, stringify } = JSON;
      const rect = Object.entries(parse(stringify(el.getBoundingClientRect())));
      const newRect = rect.map(([i, k]) => [
        prefix + i.charAt(0).toUpperCase() + i.slice(1),
        k,
      ]);
      return Object.fromEntries(newRect);
    },
  },
};
</script>

<style scoped>
.tab__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  max-width: 100%;
  flex: 0 1 auto;
  position: relative;
  contain: content;
}

.tab__pagination .tab__pagination__prev,
.tab__pagination__next {
  flex: 1 40px;
  min-width: 40px;
}

.tab__pagination__next >>> .btn svg {
  transform: rotate(180deg);
}

.tab__nav {
  position: relative;
  display: flex;
  overflow: hidden;
  flex: 1 100%;
}

.tab__nav__items {
  display: flex;
  margin: 0;
  padding: 0;
  flex: 1 auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  height: 100%;
}

.tab__nav__items .tab__nav__item {
  list-style: none;
  text-align: center;
  cursor: pointer;
  padding: 0.9rem 1rem;
  letter-spacing: 0.0892857143em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: gray;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: normal;
  transition: background 0.1s ease;
  position: relative;
  overflow: hidden;
  min-width: 90px;
  max-width: 360px;
  user-select: none;
}

.tab__nav__items .tab__nav__item:hover:not(.disabled) {
  background: #faf9f9;
}

.tab__nav__items .active {
  color: black;
  color: #1867c0;
}

.tab__nav__items .active:hover {
  background: #1b7ef01c !important;
}

.tab__nav__items .disabled {
  background: #f3f2f2;
}

.tab__slider {
  height: 2px;
  width: 2px;
  background: #1867c0;
  border: none;
  margin: 0;
  padding: 0;
  bottom: 0;
  position: absolute;
  transition: left 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
    top 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

/* Vertical */
.tab__pagination--vertical {
  flex-direction: column;
}

.tab__pagination--vertical .tab__nav__items {
  flex-direction: column;
  flex: 1 auto;
  position: relative;
}

.tab__pagination--vertical .tab__nav__item * {
  padding: 0;
  margin: 0;
}

.tab__pagination--vertical >>> .tab__pagination__prev svg {
  transform: rotate(90deg);
}

.tab__pagination--vertical >>> .tab__pagination__next svg {
  transform: rotate(270deg);
}

.tab__pagination--vertical .tab__nav__item {
  justify-content: left;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
}

.tabs--dark .tab__nav__item:hover {
  background: #2f3236;
}

/* Nav auto */
.tab__pagination--auto .tab__nav__item {
  flex: 1 auto;
}
</style>

<style>
.ripple {
  background-color: #1866c04d;
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  animation: ripple 0.6s linear;
  z-index: 2;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
