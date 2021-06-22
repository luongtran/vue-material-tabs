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
    <div v-touch="onTouchSlide" class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
import NavTab from "./TabNav";
import touch from "./directives/touch";
import $themes from "./themes";

export default {
  name: "Tabs",

  components: {
    NavTab,
  },

  directives: {
    touch,
  },

  provide() {
    return {
      theme: this.getTheme,
    };
  },

  props: {
    theme: {
      type: [Object, String],
      default: "default",
    },
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
    tabItems: [],
  }),

  computed: {
    classes() {
      return {
        tabs: true,
        "tabs--vertical": this.vertical,
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

    getTheme() {
      if (typeof this.theme === "string") {
        return $themes[this.theme] || $themes.default;
      } else if (typeof this.theme === "object" && this.theme !== null) {
        return this.theme;
      }
      return $themes.default;
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
    this.activeTabItem({
      tabItem: this.navItems[0],
      byUser: false,
    });
  },

  methods: {
    addTabItem(tabItemInstance) {
      if (this.isTabItemComponent(tabItemInstance)) {
        this.tabItems.push(tabItemInstance);
        this.setNavItem(tabItemInstance);
      }
    },

    removeTabItem(tabItemInstance) {
      if (this.isTabItemComponent(tabItemInstance)) {
        this.disableTabItem(tabItemInstance.ownNavItemIndex);
        this.tabItems.splice(this.findIndexTab(tabItemInstance), 1);
        this.navItems.splice(tabItemInstance.ownNavItemIndex, 1);
        this.tabItemIndexes.last = this.navItems.length - 1;
      }
    },

    isTabItemComponent({ $options }) {
      return $options?._componentTag === "TabItem";
    },

    setNavItem({ model, name, disabled, $slots }) {
      this.navItems.push({
        model,
        name,
        disabled,
        nameSlot: $slots.name?.[0],
      });
      this.tabItemIndexes.last = this.navItems.length - 1;
    },

    setNavItems(navItems) {
      this.navItems = navItems;
    },

    activeTabItem({ tabItem, byUser }) {
      try {
        if (!tabItem.disabled) {
          this.tabItemActive = tabItem;
          this.$emit("input", tabItem?.name);
          byUser && this.$emit("change", tabItem?.name);
        }
      } catch {
        console.log("-------- ERROR in set active TabItem ------");
      }
    },

    currentNavItems() {
      return this.navItems;
    },

    disableTabItem(tabItemIndex) {
      const { current, last } = this.tabItemIndexes;
      if (tabItemIndex === current) {
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

    onTouchSlide(to) {
      let tabItem;
      const { current, last } = this.tabItemIndexes;
      if (to === "next" && current < last) {
        tabItem = this.navItems[current + 1];
      } else if (to === "prev" && current > 0) {
        tabItem = this.navItems[current - 1];
      }
      tabItem && this.activeTabItem({ tabItem, byUser: true });
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
  overflow: hidden;
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
</style>
