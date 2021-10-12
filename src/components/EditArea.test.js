import { mount } from '@vue/test-utils'
import EditArea from './EditArea.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

// TODO: find a way to avoid hardcoding the index of the shapeList in the 'update' tests

var shapeList = [
    {
        id : 0,
        name : "Unnamed " + 0,
        style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
        currentlyEditing : false
    },
    {
        id : 1,
        name : "Unnamed " + 1,
        style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
        currentlyEditing : true
    },
];

config.provide['shapeList'] = shapeList;

/**
 * Re-initialises the shapeList variable.
 */
function initialiseShapeList() {
    shapeList = [
        {
            id : 0,
            name : "Unnamed " + 0,
            style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
            currentlyEditing : false
        },
        {
            id : 1,
            name : "Unnamed " + 1,
            style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
            currentlyEditing : true
        },
    ];

    config.provide['shapeList'] = shapeList;
}

/**
 * Retrieves the style of shapeList[0], with all whitespace removed.
 */
function getShapeListStyle(index = 0) {
    return shapeList[index].style.replace(/\s/g, '');
}

/**
 * Retrieves the CSS code being edited within the EditArea, with all whitespace removed.
 */
function getEditTextContent(EditAreaWrapper) {
    return EditAreaWrapper.find('div.edit-region').text().replace(/\s/g, '');
}

test("mounts successfully", () => {
    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 0
        }
    });
});

test("is invisible if currentlyEditing == false", () => {
    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 0
        }
    });

    expect(wrapper.isVisible()).toBe(false);
});

test("is visible if currentlyEditing == true", () => {
    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 1
        }
    });

    expect(wrapper.isVisible()).toBe(true);
});

test("displays an equivalent of the CSS of the shape being edited (up to whitespace)", () => {
    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 1
        }
    });

    expect(getEditTextContent(wrapper)).toBe(getShapeListStyle());
});

test("updates style upon ctrl+enter", async () => {
    // this test has side effect of changing shapeList - re-initialisation is required
    initialiseShapeList();

    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 1
        }
    });

    let originalStyle = getShapeListStyle(1);
    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";

    await wrapper.trigger('keyup.enter', {
        ctrlKey: true
    });

    let newStyle = getShapeListStyle(1);

    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("updates style upon clicking on the 'update' button", async () => {
    // this test has side effect of changing shapeList - re-initialisation is required
    initialiseShapeList();

    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 1
        }
    });

    let originalStyle = getShapeListStyle(1);

    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";
    await wrapper.find("button[name='update']").trigger('click');

    let newStyle = getShapeListStyle(1);

    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("stops editing upon clicking on the 'finish editing' button, also updating the style afterward", async () => {
    // this test has side effect of changing shapeList - re-initialisation is required
    initialiseShapeList();

    const wrapper = mount(EditArea, {
        propsData: {
            shapeIndex: 1
        }
    });

    let originalStyle = getShapeListStyle(1);
    expect(originalStyle).toBe(getEditTextContent(wrapper));

    wrapper.find('div.edit-region').element.textContent = "top: 50px; left: 50px; background-color: #ffbcde";

    await wrapper.find("button[name='finish-editing'").trigger('click');

    let newStyle = getShapeListStyle(1);
    expect(originalStyle).not.toBe(newStyle);
    expect(newStyle).toBe(getEditTextContent(wrapper));
});

test("can increment/decrement selected numerical parameters by selecting text, holding shift, then moving the mouse around", () => {
});
