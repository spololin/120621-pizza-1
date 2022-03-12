import { shallowMount } from '@vue/test-utils';
import AppInput from '@/common/components/AppInput';

describe('AppInput', () => {
  const propsData = {
    value: 'testValue',
    placeholder: "test placeholder",
  };
  const defaultType = 'text';

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  it('It emits an input event when typing', async () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    await input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('emits the current input value when typing', async () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.element.value = 'test';
    await input.trigger('input');
    expect(wrapper.emitted().input[0][0]).toEqual('test');
  });

  it('input name is prop name', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('name')).toBe(propsData.name);
  });

  it('input type is prop type', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('type')).toBe(defaultType);
  });

  it('input placeholder is prop placeholder', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(propsData.placeholder);
  });
});
