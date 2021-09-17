import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import { config } from '@vue/test-utils'

// provide a mock shapeList prop
config.provide['shapeList'] = {
    val: {}
}

test('is invisible upon mount', () => {
    const wrapper = mount(ContextMenu)

    expect(wrapper.vm.$root.style.visibility).toBe("hidden")
});
