import { mount } from '@vue/test-utils'
import Collection from './Collection.vue'
import ShapeRender from './ShapeRender.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

config.provide['shapeHeld'] = {
    val : null
};

test("is invisible by default", () => {
    const wrapper = mount(Collection);

    expect(wrapper.find('div').isVisible()).toBe(false);
});

test("is invisible if collectionVisible is false", () => {
    const wrapper = mount(Collection, {
        propsData: {
            collectionVisible: false
        }
    });

    expect(wrapper.find('div').isVisible()).toBe(false);
});

test("is visible if collectionVisible is true", () => {
    const wrapper = mount(Collection, {
        propsData: {
            collectionVisible: true
        }
    });

    expect(wrapper.find('div').isVisible()).toBe(true);
});

test("when visible, it is ctrl+draggable", async () => {
    const wrapper = mount(Collection, {
        propsData: {
            collectionVisible: true
        }
    });

    await wrapper.trigger("mousedown", {
        ctrlKey: true
    });

    // select a random position to move the mouse to:
    let randomX = Math.floor(Math.random() * window.innerWidth);
    let randomY = Math.floor(Math.random() * window.innerHeight);

    await document.dispatchEvent(new MouseEvent("mousemove", {
        clientX: randomX,
        clientY: randomY
    }));

    await document.dispatchEvent(new MouseEvent("mouseup"));

    expect(wrapper.element.style.left).toBe(randomX / window.innerWidth * 100 + "%");
    expect(wrapper.element.style.top).toBe(randomY / window.innerHeight * 100 + "%");
});
