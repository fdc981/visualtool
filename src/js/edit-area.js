const editArea = {
    props: {
        shape: Object
    },

    template: `
        <div style="position: absolute; left:50%; top:50%">
            <div id="edit-region" class="bg-white font-monospace p-3" contentEditable="true"
                 v-html="shape.style.replace(/;/g, ';<br>')"></div>
            <button @click="updateStyle">update</button>
            <button @click="stopEditing">finish editing</button>
        </div>
    `,

    methods: {
        updateStyle() {
            this.shape.style = this.$el.querySelector("#edit-region").textContent;
        },

        stopEditing() {
            this.updateStyle();
            this.shape.currentlyEditing = false;
        }
    }
};
