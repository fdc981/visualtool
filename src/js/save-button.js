const saveButton = {
    template : `
        <button class="btn btn-toolbar" @click="save"><slot></slot></button>
    `,

    methods : {
        save() {
            localStorage.setItem("shapeList", JSON.stringify(this.$parent.shapeList));
        }
    }
};
