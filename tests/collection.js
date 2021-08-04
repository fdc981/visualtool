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

    "The collection can be dragged and dropped to any point on the screen" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate().waitForElementVisible("@display");

        visualtool.api.getElementSize("#display", function (size) {
            let randomX = Math.floor(Math.random() * size.value.width);
            let randomY = Math.floor(Math.random() * size.value.height);
            let expectedLeft = randomX + "px";
            let expectedTop = randomY + "px";

            console.log(`Initialised random point (${randomX}, ${randomY})`);

            visualtool.openMenu()
                      .click("@menuOpenCollection")
                      .waitForElementVisible("@collection")
                      .api.keys(''); // press and hold control
            visualtool.dragAndDrop("@collection", randomX, randomY)
                      .assert.cssProperty("@collection", "left", expectedLeft)
                      .assert.cssProperty("@collection", "top", expectedTop)
                      .end();
        });
    },
};
