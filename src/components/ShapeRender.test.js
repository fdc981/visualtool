import { mount } from '@vue/test-utils'
import ShapeRender from './ShapeRender.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

var shapeList = [{
    id : 0,
    name : "Unnamed " + 0,
    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
    currentlyEditing : false
}];

config.provide['shapeList'] = shapeList;

config.provide['shapeHeld'] = {
    val : null
};

test("displays shapes from the shapeList with the given shapeIndex", () => {
    var index = 0;

    const wrapper = mount(ShapeRender, {
        propsData: {
            shapeIndex: index
        }
    });

    var expectedCSSText = shapeList[index].style.replace(/,/g, ', ');

    expect(wrapper.vm.$el.style.cssText).toBe(expectedCSSText);
});

test("doing shift+mousedown on this component turns currentlyEditing to be true", () => {
    var index = 0;

    const wrapper = mount(ShapeRender, {
        propsData: {
            shapeIndex: index
        }
    });

    expect(shapeList[index].currentlyEditing).toBe(false);

    wrapper.trigger("mousedown", {
        shiftKey: true
    });

    expect(shapeList[index].currentlyEditing).toBe(true);
});
