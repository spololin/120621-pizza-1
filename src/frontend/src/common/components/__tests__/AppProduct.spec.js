import { shallowMount } from "@vue/test-utils";
import AppProduct from "@/common/components/AppProduct";

describe("AppProduct", () => {
  const propsData = {
    product: {
      name: "test name",
      size: "test size",
      dough: "test dough",
      sauce: "test sauce",
      fillings: "test fillings",
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppProduct, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("img alt is props product.name", () => {
    createComponent({ propsData });

    const img = wrapper.find("img");

    expect(img.attributes("alt")).toBe(propsData.product.name);
  });

  it("props are passed to template", () => {
    createComponent({ propsData });

    expect(wrapper.html()).toContain(propsData.product.dough);
    expect(wrapper.html()).toContain(propsData.product.size);
    expect(wrapper.html()).toContain(propsData.product.sauce);
    expect(wrapper.html()).toContain(propsData.product.fillings);
  });
});
