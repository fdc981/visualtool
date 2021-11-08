import { mount } from '@vue/test-utils'
import App from './App.vue'
import ShapeRender from './components/ContextMenu.vue'
import Collection from './components/Collection.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

test("shows renders of all the shapes in the ShapeList", () => {
    let shapeList = [
        {
            id : 0,
            name : "Unnamed " + 0,
            style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
            currentlyEditing : false
        },
        {
            id : 1,
            name : "Unnamed " + 1,
            style : "position: relative; width: 50px; height: 999px; background-color: rgba(255,255,0,0.5);",
            currentlyEditing : false
        },
        {
            id : 2,
            name : "Unnamed " + 2,
            style : "position: absolute; width: 50px; height: 999px; background-color: rgba(255,255,0,0.5);",
            currentlyEditing : false
        }
    ];

    const wrapper = mount(App, {
        data() {
            return {
                shapeList: shapeList
            };
        }
    });

    let elementsWithShapeClass = wrapper.findAll('.shape');

    expect(elementsWithShapeClass).toHaveLength(3);

    for (let i = 0; i < shapeList.length; i++) {
        let elementStyle = elementsWithShapeClass.at(i).element.style.cssText.replace(/\s/g, '');
        let shapeStyle = shapeList[i].style.replace(/\s/g, '');

        expect(elementStyle).toBe(shapeStyle);
    }

    // code below is not returning as expected - maybe since it does not look for component instances?
    //let shapeRenders = wrapper.findAllComponents(ShapeRender);
    //expect(shapeRenders).toHaveLength(3);
});

test("whenever currentlyEditing is true, the editArea is shown", () => {
    let shapeList = [
        {
            id : 0,
            name : "Unnamed " + 0,
            style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
            currentlyEditing : true
        },
        {
            id : 1,
            name : "Unnamed " + 1,
            style : "position: relative; width: 50px; height: 999px; background-color: rgba(255,255,0,0.5);",
            currentlyEditing : false
        },
        {
            id : 2,
            name : "Unnamed " + 2,
            style : "position: absolute; width: 50px; height: 999px; background-color: rgba(255,255,0,0.5);",
            currentlyEditing : true
        }
    ];

    const wrapper = mount(App, {
        data() {
            return {
                shapeList: shapeList
            };
        }
    });

    let editAreaElements = wrapper.findAll('.edit-region');

    expect(editAreaElements).toHaveLength(3);

    for (let i = 0; i < shapeList.length; i++) {
        if (shapeList[i].currentlyEditing) {
            expect(editAreaElements.at(i).isVisible()).toBe(true);
        }
        else {
            expect(editAreaElements.at(i).isVisible()).not.toBe(true);
        }
    }
});
