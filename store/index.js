import Vue from 'vue';
import Vuex from 'vuex';

export const store = new Vuex.Store({
    state: {
        shapeList: [],
        currID: 0,
        held: null
    },

    mutations: {
        addShape(state) {
            state.shapeList.push({
                id: state.currID,
                name: "Unnamed " + state.currID,
                style: "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                currentlyEditing: false
            });

            state.currID += 1;
        },

        deleteShape(state, targetShapeNode) {
            let ind = Number(targetShapeNode.attributes.index.value);

            state.shapeList = state.shapeList.filter((element, index) => {
                return index !== ind;
            });
        },

        copyShape(state, targetShapeNode) {
            // Copies a shape, assigning it with currID
            let ind = Number(targetShapeNode.attributes.index.value);
            let newShape = JSON.parse(JSON.stringify(state.shapeList[ind]));
            newShape.id = state.currID;

            state.shapeList.push(newShape);

            state.currID += 1;
        },

        editShape(state, targetShapeNode) {
            let shape = state.shapeList[Number(targetShapeNode.attributes.index.value)];
            shape.currentlyEditing = true;
        },

        saveShapeList(state) {
            localStorage.setItem("shapeList", JSON.stringify(state.shapeList));
        },
    }
});
