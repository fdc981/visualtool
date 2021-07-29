/*
 * Tests on the custom context menu of visualtool.
 */

module.exports = {
    "Context menu can be opened on the viewport with expected items" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .assert.visible("@menuAddShape")
                  .assert.visible("@menuSaveWorkspace")
                  .assert.visible("@menuOpenCollection")
                  .end();
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
                  .end();
    },

    "Context menu disappears after clicking on one of its items" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible("@display")
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.cssProperty("@contextMenu", "display", "none")
                  .end();
    },
};
