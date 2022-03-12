import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  const defaultType = "radio";
  const propsData = {
    params: {
      type: "sauces",
      value: "test value",
      checked: "test checked",
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("emits change event on change", () => {
    createComponent({ propsData });

    wrapper.trigger("change");
    expect(wrapper.emitted().selected).toBeTruthy();
  });

  it('input type is radio', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('type')).toBe(defaultType);
  });
});
