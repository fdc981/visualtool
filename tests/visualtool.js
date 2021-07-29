
var toolbarElements = {
    toolbar: {
        selector: '#toolbar',
        locateStrategy: 'css selector'
    },
    toolbarAddShape: {
        selector: "//div[@id = 'toolbar']//button[normalize-space()='add shape']",
        locateStrategy: 'xpath'
    }
};

var displayElements = {
    display: {
        selector: "#display",
        locateStrategy: "css selector"
    },
    firstShape: {
        selector: "#display div[index='0']",
        locateStrategy: "css selector"
    },
    secondShape: {
        selector: "#display div[index='1']",
        locateStrategy: "css selector"
    },
    thirdShape: {
        selector: "#display div[index='2']",
        locateStrategy: "css selector"
    },
};

var contextMenuElements = {
    contextMenu: {
        selector: 'ul#context-menu',
        locateStrategy: 'css selector'
    },

    menuAddShape: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='add shape']",
        locateStrategy: 'xpath'
    },
    menuEditShape: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='edit shape']",
        locateStrategy: 'xpath'
    },
    menuDeleteShape: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='delete shape']",
        locateStrategy: 'xpath'
    },
    menuCopyShape: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='copy shape']",
        locateStrategy: 'xpath'
    },
    menuSaveWorkspace: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='save workspace']",
        locateStrategy: 'xpath'
    },
};


var shapeListElements = {
    shapeList: {
        selector: '#shape-list',
        locateStrategy: 'css selector'
    },
};


module.exports = {
    url: "http://localhost:8080",

    elements: [
        toolbarElements,
        displayElements,
        contextMenuElements,
        shapeListElements,
    ],

    commands: [{
        openMenu() {
            this.api.mouseButtonClick("right");

            return this.waitForElementVisible('@contextMenu');
        },

        shiftClick(targetSelector) {
            this.api.keys(''); // press and hold shift

            return this.click(targetSelector);
        },

        dragAndDrop(targetSelector, x, y) {
            // drag and drop does not work??
            let page = this;

            this.moveToElement(targetSelector, 0, 0, function(val, visualtool) {
                page.api.mouseButtonDown("left", function(val, visualtool) {
                    page.api.moveToElement("body", x, y, function(val, visualtool) {
                        page.api.mouseButtonUp("left");
                    });
                });
            });

            return this;
        }
    }]
};
