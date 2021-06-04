const app = {
    el: "body",

    data() {
        return {
            shapeList : [],
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
            }, { once: true });

        },

        updatePos(e) {
            this.following = false;

            e.target.style.left = e.clientX / window.innerWidth + "%";
            e.target.style.top = e.clientY / window.innerHeight + "%";
        }
    },

    components : {
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
