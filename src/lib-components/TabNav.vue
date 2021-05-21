<template>
  <div v-resize="resizable" :class="classes">
    <div class="tab__pagination__prev">
      <Btn
        v-if="pagination.has"
        :disabled="!paginateIndicator.prev"
        @click="onPagination('prev')"
      />
    </div>
    <nav v-touch="onPagination" ref="nav" class="tab__nav">
      <ul ref="navItems" class="tab__nav__items" :style="styles">
        <li
          v-ripple="ripple && !navItem.disabled"
          v-for="navItem in navItems"
          :key="navItem.model"
          :ref="navItem.model"
          class="tab__nav__item"
          :class="{
            active: navItem.model === tabItemActive.model,
            disabled: navItem.disabled,
          }"
          :style="getActiveColor(navItem)"
          @click.prevent="select(navItem)"
        >
          <VNode :node="navItem.nameSlot" :name="navItem.name" />
        </li>
        <hr v-if="navSlider" ref="slider" class="tab__slider" />
      </ul>
    </nav>
    <div class="tab__pagination__next">
      <Btn
        v-if="pagination.has"
        :disabled="!paginateIndicator.next"
        @click="onPagination('next')"
      />
    </div>
  </div>
</template>

<script>
import ripple from "./directives/ripple";
import resize from "./directives/resize";
import touch from "./directives/touch";
import Btn from "./Btn";

export default {
  components: {
    Btn,
    VNode: {
      functional: true,
      render: (h, { props }) => {
        return props.node ? props.node : h("span", props.name);
      },
    },
  },

  inject: ["theme"],

  directives: {
    ripple,
    resize,
    touch,
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
    navItems: "resizable",
    vertical() {
      Object.assign(this.$data, this.$options.data());
      this.resizable();
    },
    tabItemActive(tabItem) {
      this.sliderHandler();

      if (this.pagination.has && tabItem.model) {
        this.paginationCollapse(tabItem);
      }
    },
  },

  mounted() {
    this.setTheme();
  },

  methods: {
    select(navItem) {
      if (!navItem?.disabled) {
        this.$emit("select", {
          tabItem: navItem,
          byUser: true,
        });
      }
    },

    async sliderHandler() {
      await this.$nextTick();
      const navItemsElement = this.$refs?.navItems;
      const { navItemsLeft, navItemsTop } = this.getElementRect({
        el: navItemsElement,
        prefix: "navItems",
      });

      const navActiveElement = this.$refs?.[this.tabItemActive.model]?.[0];
      const {
        navActiveWidth,
        navActiveHeight,
        navActiveLeft,
        navActiveTop,
      } = this.getElementRect({
        el: navActiveElement,
        prefix: "navActive",
      });

      Object.assign(
        this.$refs.slider.style,
        {
          portrait: {
            height: `${navActiveHeight}px`,
            top: `${navActiveTop - navItemsTop}px`,
            width: "",
            left: "",
          },
          landscape: {
            width: `${navActiveWidth}px`,
            left: `${navActiveLeft - navItemsLeft}px`,
            height: "",
            top: "",
          },
        }[this.orientation]
      );
    },

    setPagination() {
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

    onPagination(to) {
      const { maxOffset, offset, translate, minOffset } = this.pagination;
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
      const {
        navActiveRight,
        navActiveLeft,
        navActiveTop,
        navActiveBottom,
        navActiveWidth,
        navActiveHeight,
      } = this.getElementRect({
        el: this.$refs?.[this.tabItemActive.model]?.[0],
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
        this.setPagination();
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

    setTheme() {
      const { nav, navItem, slider } = this.theme;
      this.$el.style.background = nav;
      this.$refs.navItems.style.color = navItem;
      this.$refs.slider.style.background = slider;
    },

    getActiveColor({ model }) {
      if (model === this.tabItemActive.model) {
        return { color: this.theme.navActiveItem };
      }
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

.tab__nav__items .tab__nav__item:hover:not(.disabled, .active) {
  background: hsla(0, 0%, 100%, 0.09);
}

.tab__nav__items .active:hover {
  background: hsla(0, 0%, 100%, 0.18);
}

.tab__nav__items .disabled {
  background: #6969694f;
}

.tab__slider {
  height: 2px;
  width: 2px;
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

/* Nav auto */
.tab__pagination--auto .tab__nav__item {
  flex: 1 auto;
}
</style>

<style>
.ripple {
  z-index: 2;
  background-color: hsla(0, 0%, 100%, 0.23);
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
