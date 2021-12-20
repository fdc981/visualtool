import { mount } from '@vue/test-utils'
import App from './App.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

test("all buttons are present", () => {
    const wrapper = mount(App);

    let expectedLabels = ["add shape", "add anim", "delete", "export", "save workspace"];
    let toolbarButtons = wrapper.findAll("div#toolbar button");

    for (let i = 0; i < toolbarButtons.length; i++) {
        let buttonLabel = toolbarButtons.at(i).element.textContent.trim();
        expect(buttonLabel).toBe(expectedLabels[i]);
    }
});
