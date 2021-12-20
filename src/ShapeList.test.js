import { mount } from '@vue/test-utils'
import App from './App.vue'
import { config } from '@vue/test-utils'
import { makeShapeList } from "./utils.js";
import "regenerator-runtime/runtime";

test("shows the id and name of each shape in that order", () => {
    let shapeList = makeShapeList(20);

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
