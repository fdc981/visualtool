/**
 * Creates a transformation.
 * Example: make_transform({a : window.prev.a + 1}).
 */
function make_transform(defn) {
    return function (x) {
        window.prev = x;
        console.log(window.prev);
        for (var key in defn) {
            x[key] = defn[key];
        }
        return x;
    };
}

// placeholder for previous object
var prev = {};
