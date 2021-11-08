import { mount } from '@vue/test-utils'
import App from './App.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

test("shows the id and name of each shape in that order", () => {
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
            }
        }
    });

    let shapeListEntries = wrapper.findAll('ul > li.shape-entry');

    for (let i = 0; i < shapeList.length; i++) {
        let elementText = shapeListEntries.at(i).element.textContent.trim().replace(/\s+/, ' ');
        let expectedText = shapeList[i].id + ' ' + shapeList[i].name;

        expect(elementText).toBe(expectedText);
    }
});
