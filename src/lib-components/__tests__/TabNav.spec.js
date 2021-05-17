import { mount, createLocalVue } from "@vue/test-utils";
import TabNav from "../TabNav.vue";
import Btn from "../Btn.vue";

const localVue = createLocalVue();
localVue.component(Btn.name, Btn);

describe("TabNav.vue", () => {
  const item = [
    {
      name: "Test",
      model: "123",
      disabled: false,
    },
  ];

  const TabNavItems = {
    navItems: item,
    tabItemActive: item[0],
  };

  const mountFunction = (options = {}) => {
    return mount(TabNav, {
      localVue,
      propsData: {
        ...TabNavItems,
        ...options,
      },
    });
  };

  it("Should mount the component", () => {
    const wrapper = mountFunction();
    expect(wrapper).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should have 'tab__pagination--vertical' class when vertical prop is set to true ", () => {
    const wrapper = mountFunction({ vertical: true });
    expect(wrapper.classes("tab__pagination--vertical")).toBe(true);
  });

  it("Should have 'tab__pagination--auto' class when navAuto prop is true and vertical prop is set to false", () => {
    const wrapper = mountFunction({ navAuto: true });
    expect(wrapper.classes("tab__pagination--auto")).toBe(true);
  });

  it("Should have 'translate' style by pagination translate", async () => {
    const wrapper = mountFunction({ vertical: true });

    const translate = 500;

    wrapper.setData({ pagination: { translate } });
    expect(wrapper.vm.styles.transform).toEqual("translateY(-500px)");
  });

  it("Should have accept the correct pagination type", async () => {
    const wrapper = mountFunction();
    await wrapper.vm.$nextTick();

    wrapper.setData({
      pagination: {
        maxOffset: 500,
        translate: 250,
      },
    });

    expect(wrapper.vm.paginateIndicator.next).toBe(true);
    expect(wrapper.vm.paginateIndicator.prev).toBe(true);
  });

  it("Should have 'portrait' when vertical is set to true", async () => {
    const wrapper = mountFunction({ vertical: true });

    expect(wrapper.vm.orientation).toBe("portrait");

    await wrapper.setProps({ vertical: false });
    expect(wrapper.vm.orientation).toBe("landscape");
  });

  it("Should have 'disabled' class when disabled set to true in navItem", () => {
    const navItems = [{ ...item, disabled: true }];
    const wrapper = mountFunction({ navItems });

    expect(wrapper.find(".tab__nav__item").classes("disabled")).toBe(true);
  });

  it("Should have 'active' class when nav item is selected", () => {
    const wrapper = mountFunction();

    expect(wrapper.find(".tab__nav__item").classes("active")).toBe(true);
  });

  it("Should disable nav slider when navSlider prop set to false", async () => {
    const wrapper = mountFunction({ navSlider: false });

    expect(wrapper.find("hr").exists()).toBe(false);

    await wrapper.setProps({ navSlider: true });
    expect(wrapper.find("hr").exists()).toBe(true);
  });

  it("Should emmit 'select' event with nav item selected when tab__nav__item is clicked", async () => {
    const wrapper = mountFunction();
    await wrapper.findComponent({ ref: item[0].model }).trigger("click");

    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select").length).toBe(1);
    expect(wrapper.emitted("select")[0]).toEqual([
      { tabItem: item[0], byUser: true },
    ]);
  });

  it("Should render Btn's when pagination has set true", async () => {
    const wrapper = mountFunction();
    await wrapper.setData({ pagination: { has: true } });
    const Btns = await wrapper.findAllComponents(Btn);
    expect(Btns.length).toBe(2);
  });
});
