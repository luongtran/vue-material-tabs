import Vue from "vue";
import Dev from "./serve.vue";
import VueMaterialTabs from "@/entry.esm";

Vue.use(VueMaterialTabs);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
