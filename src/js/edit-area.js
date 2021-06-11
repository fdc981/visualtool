const editArea = {
    props: {
        shape: Object
    },

    template: `
        <div style="position: absolute; left:50%; top:50%">
            <div id="edit-region" class="bg-white font-monospace p-3" contentEditable="true"
                 v-html="shape.style.replace(/;/g, ';<br>')"></div>
            <div class="px-3">
                <a href="#" @click="updateStyle">update</a>&nbsp;
                <a href="#" @click="stopEditing">finish editing</a>
            </div>
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
