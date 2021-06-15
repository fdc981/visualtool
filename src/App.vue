<template>
    <div id="app">
        <div class="row row-col-auto position-absolute bottom-0 px-4 py-3 gx-3">
            <div class="col">
                <add-shape-button>add shape</add-shape-button>
            </div>
            <div class="col">
                <add-animation-button>add anim</add-animation-button>
            </div>
            <div class="col">
                <delete-button>delete</delete-button>
            </div>
            <div class="col">
                <save-button>save</save-button>
            </div>
        </div>

        <div id="display">
            <template v-for="(shape, shapeIndex) in shapeList">
                <div :style="shape.style"
                 :index="shapeIndex"
                 @mousedown.ctrl.exact = "followMouse"
                 @mousedown.shift.exact = "editShape(shape)"></div>
                <edit-area v-if="shape.currentlyEditing" :shape="shape"></edit-area>
            </template>
        </div>

        <context-menu></context-menu>
    </div>
</template>

<script>
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

    /* components : { 
        "add-shape-button": addShapeButton,
        "add-animation-button": addAnimationButton,
        "delete-button": deleteButton,
        "save-button": saveButton,
        "context-menu": contextMenu,
        "edit-area": editArea
    } */
}
</script>
