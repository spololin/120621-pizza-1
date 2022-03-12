import { shallowMount } from '@vue/test-utils';
import AppButton from '@/common/components/AppButton';

describe('AppButton', () => {
  const defaultBtnType = 'button';
  const slots = {
    default: 'content'
  };
  const listeners = {
    click: null
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it('raises the click event on click', async () => {
    createComponent({ listeners });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted("onClick")).toBeTruthy();
  });

  it('button type is button', () => {
    createComponent();
    expect(wrapper.attributes('type')).toBe(defaultBtnType);
  });
});
