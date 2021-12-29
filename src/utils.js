/*
 * Test helper.
 */

import { JSDOM } from 'jsdom';

expect.extend({
    toBeAValidStyle(received, styleString) {
        let dom = new JSDOM('<div></div>');
        let div = dom.window.document.querySelector('div');
        div.cssText = received;

        if (div.cssText == received) {
            return {
                message: "expected valid inline CSS",
                pass: true
            }
        }
        else {
            return {
                message: "expected invalid inline CSS",
                pass: false
            }
        }
    }
});

export const shapeSpec = {
    id: expect.any(Number),
    name: expect.stringMatching(".+"),
    style: expect.toBeAValidStyle(),
    currentlyEditing: expect.any(Boolean)
};

const testableCSSProperties = {
    'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    'left': ['-1%', '0px', '10px', '50%', '100%', '101%'],
    'top': ['-1%', '0px', '10px', '50%', '100%', '101%'],
    'width': ['0px', '10px', '50%', '100%'],
    'height': ['0px', '10px', '50%', '100%'],
    'background-color': ['white', 'rgba(0,0,0,0)', 'rgb(0,0,0)']
};

function randomChoice(array) {
    let min = 0;
    let max = array.length;

    // random integer x such that min <= x < max
    let randomIndex = Math.floor(Math.random() * (max - min) + min);

    return array[randomIndex];
}

function makeRandomStyle() {
    let style = "";

    for (let prop of Object.keys(testableCSSProperties)) {
        style += prop + ':' + randomChoice(testableCSSProperties[prop]) + ';';
    }

    return style
}

export function makeRandomShape(id) {
    let name = "Random shape " + id;
    let style = makeRandomStyle();
    let randomBool = Math.random() < 0.5 ? true : false;

    return {
        id: id,
        name: name,
        style: style,
        currentlyEditing: randomBool
    }
}

export function makeShapeList(length, presets) {
    let shapeList = [];

    for (let i = 0; i < length; i++) {
        shapeList.push(makeRandomShape(i));
    }

    if (presets !== undefined) {
        for (let i = 0; i < presets.length; i++) {
            for (let key of Object.keys(presets[i])) {
                shapeList[i][key] = presets[i][key];
            }
        }
    }

    return shapeList;
}
