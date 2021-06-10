// https://www.npmjs.com/package/selenium-webdriver

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

(async function newShapeCanBeCreated() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        let path = "file://" + process.cwd() + "/src/index.html";
        console.log(path);
        await driver.get(path);

        await driver.findElement(By.id("add-shape")).click();

        let newShapeElem = await driver.findElement(By.id("display")).findElement(By.tagName("div"));
        assert(await newShapeElem.getAttribute("index") === '0');
        assert(await newShapeElem.getAttribute("style")
            === "position: absolute; width: 50px; height: 50px; background-color: rgba(0, 0, 0, 0.5);");
    } finally {
        await driver.quit();
    }
})();
