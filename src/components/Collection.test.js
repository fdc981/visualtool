import { config, createLocalVue, mount } from '@vue/test-utils'
import Collection from './Collection.vue'
import ShapeRender from './ShapeRender.vue'
import { makeShapeList } from "../utils.js";
import { mutations } from "../../store/index.js";
import "regenerator-runtime/runtime";
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Collection.vue", () => {
    const numShapes = 5;

    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: { shapeList: makeShapeList(numShapes), held: null },
            mutations: mutations
        });
    });

    it("is invisible by default", () => {
        const wrapper = mount(Collection);

        expect(wrapper.find('div').isVisible()).toBe(false);
    });

    it("is invisible if collectionVisible is false", () => {
        const wrapper = mount(Collection, {
            propsData: {
                collectionVisible: false
            }
        });

        expect(wrapper.find('div').isVisible()).toBe(false);
    });

    it("is visible if collectionVisible is true", () => {
        const wrapper = mount(Collection, {
            propsData: {
                collectionVisible: true
            }
        });

        expect(wrapper.find('div').isVisible()).toBe(true);
    });

    it("is ctrl+draggable when it is visible", async () => {
        const wrapper = mount(Collection, {
            propsData: { collectionVisible: true },
            store,
            localVue
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

    it("can collect shapes by dragging and dropping a ShapeRender into it", async () => {
        const CollectionWrapper = mount(Collection, {
            propsData: { collectionVisible: true },
            store,
            localVue
        });

        const ShapeRenderWrapper = mount(ShapeRender, {
            propsData: { shapeIndex: 0 },
            store,
            localVue
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
        let collectedShape = CollectionWrapper.find("div[index='0'][class='shape']").element;

        expect(oldStyle).toBe(currentStyle);
        expect(collectedShape.style.cssText).toBe(currentStyle);
    });

    it("can add collected shapes into the display by dragging a shape out of it", async () => {
        const CollectionWrapper = mount(Collection, {
            propsData: { collectionVisible: true },

            data() {
                return {
                    collection: [
                        {
                            type: "shape",
                            name : "Unnamed " + 0,
                            style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                        }
                    ]
                }
            },
            store,
            localVue
        });

        await CollectionWrapper.find("div[index=0]").trigger("dragstart");

        await document.dispatchEvent("drag");

        await document.dispatchEvent("drop");

        // expect a ShapeRender to be present in the shapeList
    });
});
