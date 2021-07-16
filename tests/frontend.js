module.exports = {
  "New shape can be created via 'add shape' button of toolbar" : function(browser) {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#display')
      .assert.titleContains('visualtool')
      .assert.visible('div#toolbar')
      /* select add shape and click */
      .useXpath()
      .click("//button[normalize-space()='add shape']")
      .useCss()
      .assert.visible("#display div[index='0']")
      /* verify that the new shape has appropriate styling */
      .assert.cssProperty("#display div[index='0']", "position", "absolute")
      .assert.cssProperty("#display div[index='0']", "width", "50px")
      .assert.cssProperty("#display div[index='0']", "height", "50px")
      .assert.cssProperty("#display div[index='0']", "background-color", "rgba(0, 0, 0, 0.5)")
      .end();
  },

  "New shape can be created via 'add shape' button of context menu" : function(browser) {
    browser
      .url('http://localhost:8080/')
      .assert.titleContains('visualtool')
      .waitForElementVisible('#display')
      .moveToElement("#display", 50, 50) // works for chromedriver but not geckodriver?
      .mouseButtonClick("right")
      .waitForElementVisible('#context-menu')
      /* select add shape and click */
      .useXpath()
      .click("//a[normalize-space()='add shape']")
      .useCss()
      .assert.visible("#display div[index='0']")
      /* verify that the new shape has appropriate styling */
      .assert.cssProperty("#display div[index='0']", "position", "absolute")
      .assert.cssProperty("#display div[index='0']", "width", "50px")
      .assert.cssProperty("#display div[index='0']", "height", "50px")
      .assert.cssProperty("#display div[index='0']", "background-color", "rgba(0, 0, 0, 0.5)")
      .end();
  },
};
