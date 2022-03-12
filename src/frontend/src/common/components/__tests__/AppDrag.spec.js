import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  const slots = { default: "content" };
  const defaultIsDraggable = "true";

  const propsData = {
    transferData: {
      data: "data",
    },
    allowDrag: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render with content", () => {
    createComponent({
      slots,
      propsData,
    });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("default component draggable is true", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("draggable")).toBe(defaultIsDraggable);
  });

  it("components draggable attribute is isDraggable prop", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("draggable")).toBe(String(propsData.allowDrag));
  });
});
