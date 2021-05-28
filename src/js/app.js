const app = {
    el: "body",

    data() {
        return {
            testList : [
                "asdf",
                "ghjkl",
                "qwerty"
            ],

            shapeList : []
        }
    },

    methods : {
        showShapeList() {
            console.log(this.shapeList);
        }
    },

    components: {
        "add-shape-button": addShapeButton,
        "add-animation-button": addAnimationButton,
        "delete-button": deleteButton,
        "context-menu": contextMenu
    }
};

var appInstance = Vue.createApp(app);

// // globals
// appInstance.config.globalProperties.$shapeList = [];

appInstance.mount("body");
