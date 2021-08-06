/*
 * Tests on shape manipulation and rendering.
 */

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

    "A new shape can be created via 'add shape' button of context menu" : function(browser) {
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
                  .end();
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
                  .end();
    },

    "Saving workspace (through context menu) preserves shapes after reloading page" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.visible("@firstShape")
                  .openMenu()
                  .click("@menuSaveWorkspace")
                  .api.refresh();

        visualtool.waitForElementVisible('@display')
                  .assert.visible("@firstShape")
                  .assert.cssProperty("@firstShape", "position", "absolute")
                  .assert.cssProperty("@firstShape", "width", "50px")
                  .assert.cssProperty("@firstShape", "height", "50px")
                  .assert.cssProperty("@firstShape", "background-color", "rgba(0, 0, 0, 0.5)")
                  .end();
    },

    "Saving workspace (through toolbar) preserves shapes after reloading page" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate()
                  .waitForElementVisible('@display')
                  .moveToElement("@display", 50, 50)
                  .openMenu()
                  .click("@menuAddShape")
                  .assert.visible("@firstShape")
                  .click("@toolbarSaveWorkspace")
                  .api.refresh();

        visualtool.waitForElementVisible('@display')
                  .assert.visible("@firstShape")
                  .assert.cssProperty("@firstShape", "position", "absolute")
                  .assert.cssProperty("@firstShape", "width", "50px")
                  .assert.cssProperty("@firstShape", "height", "50px")
                  .assert.cssProperty("@firstShape", "background-color", "rgba(0, 0, 0, 0.5)")
                  .end();
    },

    "Existing shapes saved in localStorage are retrieved page load" : function(browser) {
        let visualtool = browser.page.visualtool();


        visualtool.navigate();

        visualtool.api.execute(function() {
                      let testData = JSON.stringify([
                          {
                              id: 0,
                              name: "test shape",
                              style: "position: absolute; width: 50px; height: 50px; background-color: blue;",
                              currentlyEditing: false
                          }
                      ]);

                      window.localStorage.setItem('shapeList', testData);
                  }, [], function() {
                      visualtool.api.refresh();

                      visualtool.assert.visible("@display")
                                .assert.visible("@firstShape")
                                .assert.cssProperty("@firstShape", "position", "absolute")
                                .assert.cssProperty("@firstShape", "width", "50px")
                                .assert.cssProperty("@firstShape", "height", "50px")
                                .assert.cssProperty("@firstShape", "background-color", "rgba(0, 0, 255, 1)")
                                .end();
                  });
    },

    "Shapes can be dragged and dropped into any point on the screen" : function(browser) {
        let visualtool = browser.page.visualtool();

        visualtool.navigate().waitForElementVisible("@display");

        visualtool.api.getElementSize("#display", function (size) {
            let randomX = Math.floor(Math.random() * size.value.width);
            let randomY = Math.floor(Math.random() * size.value.height);
            let expectedLeft = randomX + "px";
            let expectedTop = randomY + "px";

            console.log(`Initialised random point (${randomX}, ${randomY})`);

            visualtool.openMenu()
                      .click("@menuAddShape")
                      .waitForElementVisible("@firstShape")
                      .api.keys(''); // press and hold control
            visualtool.dragAndDrop("@firstShape", randomX, randomY)
                      .assert.cssProperty("@firstShape", "left", expectedLeft)
                      .assert.cssProperty("@firstShape", "top", expectedTop)
                      .end();
        });
    },
};
