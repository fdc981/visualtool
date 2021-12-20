import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

// provide a mock shapeList prop
config.provide['shapeList'] = {
    val: {}
}

test('is invisible by default', () => {
    const wrapper = mount(ContextMenu);

    expect(wrapper.find("ul").isVisible()).toBe(false);
});

test('calling action emits event and closes', () => {
    const wrapper = mount(ContextMenu);

    wrapper.vm.action('asdf');

    expect(wrapper.emitted().asdf).not.toBe(undefined);
    expect(wrapper.find("ul").isVisible()).toBe(false);
});

test("right-clicking on the document toggles component visibility", async () => {
    const wrapper = mount(ContextMenu);

    expect(wrapper.find("ul").isVisible()).toBe(false);

    await document.dispatchEvent(new MouseEvent('contextmenu', {
        button: 2
    }));

    expect(wrapper.find("ul").isVisible()).toBe(true);

    await document.dispatchEvent(new MouseEvent('contextmenu', {
        button: 2
    }));

    expect(wrapper.find("ul").isVisible()).toBe(false);
});
