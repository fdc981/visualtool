<template>
    <div class="font-monospace" style="position: absolute; left:50%; top:50%" @mousedown.ctrl.exact="followMouse">
        <div id="edit-region" class="bg-white p-3" contentEditable="true"
             v-html="shape.style.replace(/;/g, ';<br>')"></div>
        <div class="px-3">
            <a href="#" @click="updateStyle">update</a>&nbsp;
            <a href="#" @click="stopEditing">finish editing</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shape: Object
    },

    methods: {
        updateStyle() {
            this.shape.style = this.$el.querySelector("#edit-region").textContent;
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
            this.shape.currentlyEditing = false;
        }
    }
}
</script>
