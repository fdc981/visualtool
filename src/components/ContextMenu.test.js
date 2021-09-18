import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

// provide a mock shapeList prop
config.provide['shapeList'] = {
    val: {}
}

test('is invisible upon mount', () => {
    const wrapper = mount(ContextMenu)

    expect(wrapper.find("ul").isVisible()).toBe(false)
});

test('is visible when opened', () => {
    const wrapper = mount(ContextMenu)

    wrapper.open()

    expect(wrapper.vm.$root.style.visibility).toBe("visible")
});

test('is invisible after closing', () => {
    const wrapper = mount(ContextMenu)

    wrapper.open()
    wrapper.close()

    expect(wrapper.vm.$root.style.visibility).toBe("hidden")
});

test('calling action emits event and closes', () => {
    const wrapper = mount(ContextMenu)

    wrapper.open()
    wrapper.action('asdf')

    expect(wrapper.emitted().asdf).toBe("truthy")
    expect(wrapper.vm.$root.style.visibility).toBe("hidden")
});
