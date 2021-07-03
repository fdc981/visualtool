<template>
    <div class="font-monospace"
         style="position: absolute; left:50%; top:50%"
         @mousedown.ctrl.exact="followMouse"
         @keydown.shift="varySelection">
        <div id="edit-region" class="bg-white p-3" contentEditable="true"
             v-html="this.$parent.shapeList[this.shapeIndex].style.replace(/;/g, ';<br>')"></div>
        <div class="px-3">
            <a href="#" @click="updateStyle">update</a>&nbsp;
            <a href="#" @click="stopEditing">finish editing</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shapeIndex: Number
    },

    methods: {
        updateStyle() {
            this.$parent.shapeList[this.shapeIndex].style = this.$el.querySelector("#edit-region").textContent;
        },

        followMouse(e) {
            let target = this.$el;

            let onMouseMove = (e) => {
                target.style.left = e.clientX / window.innerWidth * 100 + "%";
                target.style.top = e.clientY / window.innerHeight * 100 + "%";
            };

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', (e) => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        },

        stopEditing() {
            this.updateStyle();
            this.$parent.shapeList[this.shapeIndex].currentlyEditing = false;
        },

        varySelection(e) {
            let selectedRange = window.getSelection().getRangeAt(0);

            // return if selection is not a number
            const selection = window.getSelection().toString();
            if (isNaN(Number(selection)) || selection === "") {
                return;
            }

            let originX = Number(window.innerWidth / 2);
            let originY = Number(window.innerHeight / 2);

            let onmousemove = (e) => {
                let diff = (e.clientX - originX) + (e.clientY - originY);
                let newContents = document.createTextNode(String(diff));

                selectedRange.deleteContents();
                selectedRange.insertNode(newContents);
            };

            // initial event to set origin, continues to onmousemove
            document.addEventListener("mousemove", (e) => {
                originX = e.clientX - Number(selection);
                originY = e.clientY;

                document.addEventListener("mousemove", onmousemove);
            }, { once : true });

            document.addEventListener("keyup", () => {
                document.removeEventListener("mousemove", onmousemove);

                this.updateStyle();
            }, { once : true });
        }
    }
}
</script>
