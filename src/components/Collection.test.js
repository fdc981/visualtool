import { mount } from '@vue/test-utils'
import Collection from './Collection.vue'
import ShapeRender from './ShapeRender.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

config.provide['shapeHeld'] = {
    val : null
};

config.provide['shapeList'] = [];

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

test("a visible ShapeRender can be dragged and dropped into a visible Collection, adding it", async () => {
    const CollectionWrapper = mount(Collection, {
        propsData: {
            collectionVisible: true
        }
    });

    const ShapeRenderWrapper = mount(ShapeRender, {
        propsData: {
            shapeIndex: 0
        },

        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        }
    });

    let oldStyle = ShapeRenderWrapper.element.style.cssText;

    await ShapeRenderWrapper.trigger("dragstart", {
        ctrlKey: true
    });

    let style = CollectionWrapper.element.style;
    let midX = style.left + style.width / 2;
    let midY = style.top + style.height / 2;

    await document.dispatchEvent(new MouseEvent("drag", {
        clientX: midX,
        clientY: midY
    }));

    await CollectionWrapper.trigger("drop");

    let currentStyle = ShapeRenderWrapper.element.style.cssText;

    expect(oldStyle).toBe(currentStyle);
    expect(CollectionWrapper.find("div[index='0'][class='shape']").style.cssText).toBe(currentStyle);
});
