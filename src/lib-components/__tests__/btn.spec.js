import { mount } from "@vue/test-utils";
import Btn from "../Btn.vue";

describe("Btn.vue", () => {
  const mountFunction = (options = {}) => mount(Btn, options);

  it("Should mount he component", () => {
    const wrapper = mountFunction();

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm).toBeDefined();
  });

  it("Should emit event 'click' when clicked ", async () => {
    const wrapper = mountFunction();

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click").length).toBe(1);
  });
});
