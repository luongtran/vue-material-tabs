import { mount, createLocalVue } from "@vue/test-utils";
import TabNav from "../TabNav.vue";
import Btn from "../Btn.vue";

const localVue = createLocalVue();
localVue.component(Btn.name, Btn);

describe("TabNav.vue", () => {
  const navItems = [
    {
      name: "Test",
      model: "123",
      disabled: false,
    },
  ];

  const mountFunction = (options = {}) => {
    return mount(TabNav, {
      ...options,
      localVue,
      propsData: {
        navItems,
        tabItemActive: navItems[0],
      },
    });
  };

  it("Should mount the component", () => {
    const wrapper = mountFunction();
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
