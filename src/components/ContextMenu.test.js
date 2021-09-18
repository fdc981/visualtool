import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

// provide a mock shapeList prop
config.provide['shapeList'] = {
    val: {}
}

test('is invisible upon default', () => {
    const wrapper = mount(ContextMenu)

    expect(wrapper.find("ul").isVisible()).toBe(false)
});

test('is invisible when the isVisible prop is false', () => {
    const wrapper = mount(ContextMenu, {
        isVisible: false
    })

    expect(wrapper.find("ul").isVisible()).toBe(false)
});

test('is visible when the isVisible prop is true', () => {
    const wrapper = mount(ContextMenu, {
        isVisible: true
    })

    expect(wrapper.find("ul").isVisible()).toBe(true)
});

test('calling action emits event and closes', () => {
    const wrapper = mount(ContextMenu, {
        isVisible: true,
        context: {}
    })

    wrapper.vm.action('asdf')

    expect(wrapper.emitted().asdf).toBe("truthy")
    expect(wrapper.find("ul").isVisible()).toBe(false)
});
