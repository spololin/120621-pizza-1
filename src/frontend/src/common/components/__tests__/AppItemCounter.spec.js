import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const propsData = {
    value: 0,
    max: 3,
    min: 0,
    class: "ingredients__counter"
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is prop count", () => {
    createComponent({ propsData });

    let input = wrapper.find("input");
    expect(input.element.value).toBe(String(propsData.value));
  });

  it("emit click event on minus button", async () => {
    createComponent({ propsData });

    if (propsData.value > propsData.min) {
      const minusButton = wrapper.find("[data-test='decrease-button']");
      await minusButton.trigger("click");

      expect(wrapper.emitted().change[0]).toEqual(["decrease"]);
    }
  });

  it("emit click event on plus button", async () => {
    createComponent({ propsData });

    if (propsData.value < propsData.max) {
      const plusButton = wrapper.find("[data-test='increase-button']");
      await plusButton.trigger("click");

      expect(wrapper.emitted().change[0]).toEqual(["increase"]);
    }
  });

  it("sets class to input from $attrs", () => {
    createComponent({ propsData });

    const input = wrapper.find("div");

    expect(input.attributes("class")).toContain(propsData.class);
  });
});
