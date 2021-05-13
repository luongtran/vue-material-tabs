<template>
  <div :class="classes">
    <slot name="nav" :items="navItems" :active="tabItemActive">
      <NavTab
        v-bind="{
          ripple,
          navAuto,
          navItems,
          vertical,
          navSlider,
          tabItemActive,
        }"
        @select="activeTabItem"
      />
    </slot>

    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
import NavTab from "./TabNav";

export default {
  name: "Tabs",

  components: {
    NavTab,
  },

  props: {
    dark: Boolean,
    vertical: Boolean,
    ripple: {
      type: Boolean,
      default: true,
    },
    slideDuration: {
      type: [String, Number],
      default: 200,
    },
    slideVertical: Boolean,
    slide: {
      type: Boolean,
      default: true,
    },
    navAuto: Boolean,
    navSlider: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    slideSide: "",
    navItems: [],
    tabItemActive: {
      model: "",
      name: "",
      disabled: false,
    },
    tabItemIndexes: {
      current: 0,
      last: 0,
      previous: 0,
    },
  }),

  computed: {
    tabItems() {
      return this.$slots?.default
        .map(({ componentInstance, componentOptions }) => {
          if (componentOptions?.tag === "TabItem") return componentInstance;
        })
        .filter((el) => el);
    },

    classes() {
      return {
        tabs: true,
        "tabs--vertical": this.vertical,
        "tabs--dark": this.dark,
      };
    },

    transition() {
      return {
        slide: this.slide,
        duration: this.slide ? this.slideDuration : 0,
        vertical: this.slideVertical,
        side: this.slideSide,
      };
    },
  },

  watch: {
    tabItemActive(newTabItem, oldTabItem) {
      this.tabItemIndexes.previous = this.findIndexTab(oldTabItem);
      this.tabItemIndexes.current = this.findIndexTab(newTabItem);
      this.tabItems[this.tabItemIndexes.current].activeModel = newTabItem.model;
      if (this.tabItemIndexes.previous > -1) {
        this.setTabItemTransitionSide();
        this.tabItems[this.tabItemIndexes.previous].activeModel =
          newTabItem.model;
      }
    },
  },

  mounted() {
    this.setNavItems();
    this.activeTabItem({
      tabItem: this.navItems[0],
      byUser: false,
    });
  },

  methods: {
    setNavItems() {
      const navItems = this.tabItems?.map(
        ({ model, name, disabled, $slots }) => ({
          model,
          name,
          disabled,
          nameSlot: $slots?.name?.[0],
        })
      );
      if (navItems?.length) {
        this.navItems = navItems;
        this.tabItemIndexes.last = navItems.length - 1;
      }
    },

    activeTabItem({ tabItem, byUser }) {
      if (!tabItem.disabled) {
        this.tabItemActive = tabItem;
        this.$emit("input", tabItem?.name);
        byUser && this.$emit("change", tabItem?.name);
      }
    },

    disableTabItem(tabItemIndexesToDisable) {
      const { current, last } = this.tabItemIndexes;
      if (tabItemIndexesToDisable === current) {
        const nextTabItem = current === last ? current - 1 : current + 1;
        this.activeTabItem({
          tabItem: this.navItems[nextTabItem],
          byUser: true,
        });
      }
    },

    setTabItemTransitionSide() {
      const { current, previous } = this.tabItemIndexes;
      this.slideSide = current > previous ? "right" : "left";
    },

    findIndexTab(tab) {
      return this.tabItems.findIndex((el) => el.model == tab.model);
    },
  },
};
</script>
<style scoped>
.tabs {
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.23rem;
  height: 100%;
  width: 100%;
}

.tabs__content {
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1 100%;
}

.tabs--vertical {
  flex-direction: row;
}

.tabs--dark {
  background: #222831;
}

.tabs--dark .tabs__nav__item {
  color: #f1f1f1;
}

.tabs--dark .tabs__nav__items .active {
  color: #fff;
}

.tabs--dark .tabs__nav__items .disabled {
  background: #2c2f35;
}

.tabs--dark .tabs__nav >>> .btn svg {
  fill: rgb(214, 213, 213);
}

.tabs--dark .tabs__nav >>> .btn:disabled svg {
  fill: #707279;
}
</style>
