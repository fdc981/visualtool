import { mount } from '@vue/test-utils'
import App from './App.vue'
import ContextMenu from './components/ContextMenu.vue'
import Collection from './components/Collection.vue'
import { config } from '@vue/test-utils'
import "regenerator-runtime/runtime";

test("mounts with no error", () => {
    const wrapper = mount(App);
});

test("contains necessary components", async () => {
    const wrapper = await mount(App);

    expect(wrapper.find("div#toolbar").exists()).toBe(true);
    expect(wrapper.findComponent(ContextMenu).exists()).toBe(true);
    expect(wrapper.find("div#display").exists()).toBe(true);
    expect(wrapper.find("div#shape-list").exists()).toBe(true);
    expect(wrapper.findComponent(Collection).exists()).toBe(true);
});
