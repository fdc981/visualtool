
module.exports = {
    "New shape can be created via 'add shape' button of toolbar" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .assert.titleContains('visualtool')
                  .assert.visible('@toolbar')
                  .click("@toolbarAddShape")
                  .assert.visible("#display div[index='0']")
                  .assert.visible("@firstShape")
                  .assert.cssProperty("@firstShape", "position", "absolute")
                  .assert.cssProperty("@firstShape", "width", "50px")
                  .assert.cssProperty("@firstShape", "height", "50px")
                  .assert.cssProperty("@firstShape", "background-color", "rgba(0, 0, 0, 0.5)")
                  .end();
    },

    "New shape can be created via 'add shape' button of context menu" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.visible("@firstShape")
                  .assert.cssProperty("@firstShape", "position", "absolute")
                  .assert.cssProperty("@firstShape", "width", "50px")
                  .assert.cssProperty("@firstShape", "height", "50px")
                  .assert.cssProperty("@firstShape", "background-color", "rgba(0, 0, 0, 0.5)")
                  .end();
    },

    "An edit window can be opened by holding shift-clicking on a shape" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .waitForElementVisible("@firstShape")
                  .shiftClick("@firstShape")
                  .assert.visible("#display .edit-region")
                  .end()
    },

    "An edit window can be opened via the 'edit shape' button of the context menu" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .waitForElementVisible("@display")
                  .moveToElement("@display", 0, 0)
                  .openMenu()
                  .click("@menuEditShape")
                  .assert.visible("#display .edit-region")
                  .end()
    },

    "Context menu can be opened on the viewport with expected items" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .assert.visible("@menuAddShape")
                  .assert.visible("@menuSaveWorkspace")
                  .end()
    },

    "Context menu can be opened on a shape with expected items" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .waitForElementVisible("@firstShape")
                  .moveToElement("@firstShape", 0, 0)
                  .openMenu()
                  .assert.visible("@menuEditShape")
                  .assert.visible("@menuDeleteShape")
                  .assert.visible("@menuCopyShape")
                  .end()
    },

    "Context menu disappears after clicking on one of its items" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible("@display")
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.cssProperty("@contextMenu", "display", "none")
                  .end()
    },
};
