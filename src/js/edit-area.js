const editArea = {
    props: {
        shape: Object
    },

    template: `
        <div style="position: absolute; left:50%; top:50%">
            <input :value="shape.style" />
            <button @click="updateStyle">update</button>
            <button @click="stopEditing">finish editing</button>
        </div>
    `,

    methods: {
        updateStyle() {
            this.shape.style = this.$el.querySelector("input").value;
        },

        stopEditing() {
            this.updateStyle();
            this.shape.currentlyEditing = false;
        }
    }
};
