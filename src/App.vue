<template>
    <div id="app">
        <div class="row row-col-auto position-absolute bottom-0 px-4 py-3 gx-3">
            <div class="col">
                <AddShapeButton>add shape</AddShapeButton>
            </div>
            <div class="col">
                <AddAnimationButton>add anim</AddAnimationButton>
            </div>
            <div class="col">
                <DeleteButton>delete</DeleteButton>
            </div>
            <div class="col">
                <SaveButton>save</SaveButton>
            </div>
        </div>

        <div id="display">
            <template v-for="(shape, shapeIndex) in shapeList">
                <div :style="shape.style"
                 :index="shapeIndex"
                 @mousedown.ctrl.exact = "followMouse"
                 @mousedown.shift.exact = "editShape(shape)"></div>
                <EditArea v-if="shape.currentlyEditing" :shape="shape"></EditArea>
            </template>
        </div>

        <ContextMenu></ContextMenu>
    </div>
</template>

<script>
import AddAnimationButton from "./components/AddAnimationButton"
import AddShapeButton from "./components/AddShapeButton"
import ContextMenu from "./components/ContextMenu"
import DeleteButton from "./components/DeleteButton"
import EditArea from "./components/EditArea"
import SaveButton from "./components/SaveButton"

export default {
    el: "body",

    data() {
        let sl = JSON.parse(localStorage.getItem("shapeList"));

        if (sl === null)
            sl = [];

        return {
            shapeList : sl,
            following : false
        }
    },

    methods : {
        showShapeList() {
            console.log(this.shapeList);
        },

        followMouse(e) {
            let target = e.target;

            let onMouseMove = (e) => {
                target.style.left = e.clientX / window.innerWidth * 100 + "%";
                target.style.top = e.clientY / window.innerHeight * 100 + "%";
            };

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', (e) => {
                document.removeEventListener('mousemove', onMouseMove);

                let index = target.attributes.index.value;

                this.shapeList[index].style = target.style.cssText;
            }, { once: true });
        },

        editShape(shape) {
            shape.currentlyEditing = true;
        },

        updatePos(e) {
            this.following = false;

            e.target.style.left = e.clientX / window.innerWidth + "%";
            e.target.style.top = e.clientY / window.innerHeight + "%";
        }
},

    components : {
        AddAnimationButton,
        AddShapeButton,
        ContextMenu,
        DeleteButton,
        EditArea,
        SaveButton
    }
}
</script>
