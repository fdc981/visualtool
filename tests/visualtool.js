
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
    menuOpenCollection: {
        selector: "//ul[@id = 'context-menu']//a[normalize-space()='open collection']",
        locateStrategy: 'xpath'
    },
};


var shapeListElements = {
    shapeList: {
        selector: '#shape-list',
        locateStrategy: 'css selector'
    },
};


var collectionElements = {
    collection: {
        selector: "#collection",
        locateStrategy: "css selector"
    },
};


module.exports = {
    url: "http://localhost:8080",

    elements: [
        toolbarElements,
        displayElements,
        contextMenuElements,
        shapeListElements,
        collectionElements,
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

        dragAndDrop() {
            if (arguments.length !== 2 && arguments.length !== 3) {
                throw new Error("2 or 3 arguments required for dragAndDrop");
            }

            let page = this;
            let sourceSelector = arguments[0];

            if (arguments.length === 3) {
                let toX = arguments[1];
                let toY = arguments[2];

                this.moveToElement(sourceSelector, 0, 0, function() {
                    page.api.mouseButtonDown("left", function() {
                        page.api.moveToElement("body", toX, toY, function() {
                            page.api.mouseButtonUp("left");
                        });
                    });
                });
            }
            else {
                let destinationSelector = arguments[1];

                this.moveToElement(sourceSelector, 0, 0, function() {
                    page.api.mouseButtonDown("left", function() {
                        page.api.moveToElement(destinationSelector, 1, 1, function() {
                            page.api.mouseButtonUp("left");
                        });
                    });
                });
            }

            return this;
        }
    }]
};
