<template>
  <div v-resize="resizable" :class="classes">
    <div v-if="pagination.has" class="tab-pagination__prev">
      <Btn
        :disabled="!paginateIndicator.previous"
        @click="paginationHandler('previous')"
      />
    </div>
    <nav ref="nav" class="tab__nav">
      <ul ref="navItems" class="tab__nav__items" :style="styles">
        <li
          v-ripple="ripple"
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
          <VNode v-if="navItem.nameSlot" :node="navItem.nameSlot" />
          <span v-else>
            {{ navItem.name }}
          </span>
        </li>
        <hr v-if="navSlider" class="tab__slider" />
      </ul>
    </nav>
    <div v-if="pagination.has" class="tab-pagination__next">
      <Btn
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
      render: (h, ctx) => h("span", [ctx.props.node]),
    },
  },

  directives: { ripple, resize },

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
        "tabs__nav--auto": this.navAuto && !this.vertical,
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
        previous: this.pagination.translate > 0,
      };
    },
  },

  watch: {
    vertical: ["sliderHandler", "setPagination"],
    tabItemActive: ["sliderHandler", "paginationBySomething"],
  },

  mounted() {
    this.setPagination();
  },

  methods: {
    select(navItem) {
      this.$emit("select", {
        tabItem: navItem,
        byUser: true,
      });
    },

    testando() {
      console.log("está fazendo o resize");
    },

    async sliderHandler() {
      await this.$nextTick();

      const navActiveItemElement = this.$refs?.[this.tabItemActive.model]?.[0];
      const navItemsElement = this.$refs?.navItems;
      if (navActiveItemElement && navItemsElement) {
        const {
          width,
          height,
          left: navActiveLeft,
          top: navActiveTop,
        } = navActiveItemElement.getBoundingClientRect();

        const {
          left: navItemsLeft,
          top: navItemsTop,
        } = navItemsElement.getBoundingClientRect();

        const { children } = navItemsElement;
        const sliderElement = children[children.length - 1];
        sliderElement.removeAttribute("style");

        Object.assign(
          sliderElement.style,
          {
            vertical: {
              height: `${height}px`,
              top: `${navActiveTop - navItemsTop}px`,
            },
            horizontal: {
              width: `${width}px`,
              left: `${navActiveLeft - navItemsLeft}px`,
            },
          }[this.vertical ? "vertical" : "horizontal"]
        );
      }
    },

    async setPagination() {
      await this.$nextTick();

      this.pagination.translate = 0;
      const offsetOrigin = this.vertical ? "offsetHeight" : "offsetWidth";
      const navItemsOfsset = this.$refs.navItems[offsetOrigin];
      const navOffset = this.$refs?.nav[offsetOrigin];
      this.pagination.has = navItemsOfsset > navOffset;
      if (this.pagination.has) {
        let maxOffset = navItemsOfsset - navOffset;
        // Temporary solution to get height og nav items when vertical is set
        if (offsetOrigin === "offsetHeight") {
          const height = [...this.$refs?.navItems.children].map(
            ({ offsetHeight }) => offsetHeight
          );
          maxOffset = height.reduce((a, c) => a + c) - navOffset;
        }

        this.pagination.maxOffset = maxOffset;
        this.pagination.offset = this.pagination.minOffset = navOffset;
      }
    },

    paginationHandler(type) {
      const { maxOffset, offset, translate, minOffset } = this.pagination;
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

    paginationBySomething({ model }) {
      const navActiveItemElement = this.$refs?.[model]?.[0];
      const navElement = this.$refs?.nav;

      if (navActiveItemElement && navElement) {
        let toTranslate = this.pagination.translate;

        const {
          right: navActiveRight,
          left: navActiveLeft,
        } = navActiveItemElement.getBoundingClientRect();

        const {
          right: navRight,
          left: navLeft,
        } = navElement.getBoundingClientRect();

        if (navActiveRight > navRight) {
          toTranslate = toTranslate + (navActiveRight - navRight);
        }

        if (navActiveLeft < navLeft) {
          toTranslate = toTranslate - (navLeft - navActiveLeft);
        }

        this.pagination.translate = Math.floor(toTranslate);
      }
    },

    resizable() {
      this.setPagination();
      this.sliderHandler();
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

.tab__pagination .tab-pagination__prev,
.tab-pagination__next {
  flex: 1 40px;
  min-width: 40px;
}

.tab-pagination__next >>> .btn svg {
  transform: rotate(180deg);
}

.tab__nav {
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0 0.3rem;
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

.tab__pagination--vertical >>> .tab-pagination__prev svg {
  transform: rotate(90deg);
}

.tab__pagination--vertical >>> .tab-pagination__next svg {
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
.tabs__nav--auto .tab__nav__item {
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
    transform: scale(4);
    opacity: 0;
  }
}
</style>
