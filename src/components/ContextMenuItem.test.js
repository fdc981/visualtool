import { mount } from '@vue/test-utils'
import ContextMenuItem from './ContextMenuItem.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

test('is invisible by default', () => {
    const wrapper = mount(ContextMenuItem)

    expect(wrapper.find("li").isVisible()).toBe(false)
});

test('is invisible when condition is false', () => {
    const wrapper = mount(ContextMenuItem, {
        condition: false
    })

    expect(wrapper.find("li").isVisible()).toBe(false)
});

test('is visible when condition is true', () => {
    const wrapper = mount(ContextMenuItem, {
        condition: true
    })

    expect(wrapper.find("li").isVisible()).toBe(true)
});
