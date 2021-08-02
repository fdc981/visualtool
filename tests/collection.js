/*
 * Tests on collections.
 */

module.exports = {
    "A shape can be dragged and dropped to the collection, saving it" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.visible("@firstShape")
                  .openMenu()
                  .click("@menuOpenCollection")
                  .waitForElementVisible("@collection")
                  .dragAndDrop("@firstShape", "#collection")
                  .assert.visible("#collection [index='0']")
                  .end();
    },

    "The collection saves the shapes it contains between page loads" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.visible("@firstShape")
                  .openMenu()
                  .click("@menuOpenCollection")
                  .waitForElementVisible("@collection")
                  .dragAndDrop("@firstShape", "#collection")
                  .api.refresh();

        visualtool.waitForElementVisible('@display')
                  .openMenu()
                  .click("@menuOpenCollection")
                  .waitForElementVisible("@collection")
                  .assert.visible("#collection [index='0']")
                  .end();
    },
};
