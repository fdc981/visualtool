import { mount, config } from '@vue/test-utils';
import { makeShapeList, makeRandomShape, shapeSpec } from "../src/utils.js";
import "regenerator-runtime/runtime";
import { mutations } from './index.js'
import Vuex from 'vuex';


test("addNewShape adds a shape to the shapeList", () => {
    const numShapes = 5;

    let state = {
        shapeList: makeShapeList(numShapes),
        currID: numShapes
    };

    mutations.addNewShape(state);

    expect(Object.keys(state)).toHaveLength(2);
    expect(state.shapeList).toHaveLength(numShapes + 1);

    // check that each shape is valid
    for (let shape of state.shapeList) {
        expect(shape).toEqual(shapeSpec);
    }
});

test("deleteShape removes a shape from the shapeList", () => {
    const numShapes = 5;

    let state = {
        shapeList: makeShapeList(numShapes)
    };

    const randomShapeIndex = Math.floor(Math.random() * numShapes);

    let deletedShape = state.shapeList[randomShapeIndex];

    mutations.deleteShape(state, randomShapeIndex);

    expect(Object.keys(state)).toHaveLength(1);
    expect(state.shapeList).toHaveLength(numShapes - 1);
    expect(state.shapeList).not.toContain(deletedShape);
});

test("copyShape duplicates a shape from the shapeList", () => {
    let state = {
        shapeList: makeShapeList(1)
    };

    mutations.copyShape(state, 0);

    expect(Object.keys(state)).toHaveLength(1);
    expect(state.shapeList).toHaveLength(2);

    for (let key of Object.keys(state.shapeList[0])) {
        if (key !== "currID") {
            expect(state.shapeList[0][key]).toBe(state.shapeList[1][key]);
        }
        else {
            expect(state.shapeList[0].currID).not.toBe(state.shapeList[1].currID);
        }
    }
});

test("editShape toggles currentlyEditing of a shape", () => {
    let state = {
        shapeList: makeShapeList(1, [{ currentlyEditing: false }])
    };

    mutations.editShape(state, 0);

    expect(Object.keys(state)).toHaveLength(1);
    expect(state.shapeList[0].currentlyEditing).toBe(true);

    mutations.editShape(state, 0);

    expect(Object.keys(state)).toHaveLength(1);
    expect(state.shapeList[0].currentlyEditing).toBe(true);
});
