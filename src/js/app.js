const app = {
    el: "body",
    components: {
        "add-shape-button": addShapeButton,
        "add-animation-button": addAnimationButton,
        "delete-button": deleteButton,
        "context-menu": contextMenu
    }
};

Vue.createApp(app).mount("body");
