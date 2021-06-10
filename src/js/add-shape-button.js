const addShapeButton = {
    template: `
        <button id="add-shape" class="btn btn-toolbar" v-on:click="test">
            <span>
                <slot></slot>
            </span>
        </button>
    `,

    data() {
        return {
            currID : 0
        };
    },

    methods: {
        test() {
            this.$parent.shapeList.push({
                id : this.currID,
                name : "Unnamed " + this.currID,
                style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                currentlyEditing : false
            });

            this.currID += 1;
        }
    }
};
