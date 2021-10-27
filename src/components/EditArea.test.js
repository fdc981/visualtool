import { mount } from '@vue/test-utils'
import EditArea from './EditArea.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

// TODO: find a way to avoid hardcoding the index of the shapeList in the 'update' tests
//       maybe use enumerations?

/**
 * Retrieves the CSS code being edited within the EditArea, with all whitespace removed.
 */
function getEditTextContent(EditAreaWrapper) {
    return EditAreaWrapper.find('div.edit-region').text().replace(/\s/g, '');
}

/**
 * Retrieves the style of the first element of the shapeList provided to the EditArea, with all whitespace removed.
 */
function getShapeListStyle(wrapper) {
    return wrapper.vm.shapeList[0].style.replace(/\s/g, '');
}

test("mounts successfully", () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : false
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });
});

test("is invisible if currentlyEditing == false", () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : false
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    expect(wrapper.isVisible()).toBe(false);
});

test("is visible if currentlyEditing == true", () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    expect(wrapper.isVisible()).toBe(true);
});

test("when currentlyEditing, displays an equivalent of the CSS of the shape being edited (up to whitespace)", () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    expect(getEditTextContent(wrapper)).toBe(getShapeListStyle(wrapper));
});

test("when currentlyEditing, updates style upon ctrl+enter", async () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    let originalStyle = getShapeListStyle(wrapper);
    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";

    await wrapper.trigger('keyup.enter', {
        ctrlKey: true
    });

    let newStyle = getShapeListStyle(wrapper);

    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("when currentlyEditing, updates style upon clicking on the 'update' button", async () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    let originalStyle = getShapeListStyle(wrapper);

    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";
    await wrapper.find("button[name='update']").trigger('click');

    let newStyle = getShapeListStyle(wrapper);

    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("when currentlyEditing, stops editing upon clicking on the 'finish editing' button, also updating the style afterward", async () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    let originalStyle = getShapeListStyle(wrapper);
    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";

    await wrapper.find("button[name='finish-editing'").trigger('click');

    let newStyle = getShapeListStyle(wrapper);
    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("can modify an arbitrary number by selecting text, holding shift, then moving the mouse around", async () => {
    const wrapper = mount(EditArea, {
        provide: {
            shapeList: [
                {
                    id : 0,
                    name : "Unnamed " + 0,
                    style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                    currentlyEditing : true
                }
            ]
        },

        propsData: {
            shapeIndex: 0
        }
    });

    // find text node containing a '50' in it
    let editRegionNode = wrapper.find('.edit-region').element;

    let editRegionTextNode = undefined;
    for (let node of editRegionNode.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.indexOf('50') !== -1) {
            editRegionTextNode = node;
            break;
        }
    }

    expect(editRegionTextNode).not.toBe(undefined);

    let originalStyle = getShapeListStyle(wrapper);

    // select range with number
    let selected = document.getSelection();
    selected.removeAllRanges();

    let start = editRegionTextNode.textContent.indexOf('50');
    let end = editRegionTextNode.textContent.indexOf('px', start);

    // NOTE: range must be added to selection before being modified
    selected.addRange(document.createRange());
    selected.getRangeAt(0).setStart(editRegionTextNode, start);
    selected.getRangeAt(0).setEnd(editRegionTextNode, end);

    // press and hold shift
    await wrapper.trigger('keydown', { shiftKey: true });

    // move mouse
    let originX = Math.floor(Math.random() * window.innerWidth);
    let originY = Math.floor(Math.random() * window.innerHeight);

    // set origin with initial mouse move
    await document.dispatchEvent(new MouseEvent("mousemove", {
        clientX: originX,
        clientY: originY
    }));

    let newX = Math.floor(Math.random() * window.innerWidth);
    let newY = Math.floor(Math.random() * window.innerHeight);

    await document.dispatchEvent(new MouseEvent("mousemove", {
        clientX: newX,
        clientY: newY
    }));

    await document.dispatchEvent(new MouseEvent("mouseup"));

    await document.dispatchEvent(new KeyboardEvent("keyup", { shiftKey: true }));

    let expectedContents = originalStyle.replace('50px', 50 + (newX - originX) + (newY - originY) + 'px');

    expect(getShapeListStyle(wrapper)).toBe(expectedContents);
});
