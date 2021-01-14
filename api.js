/**
 * Creates a transformation, using a JSON string.
 */
function make_transform(defn) {
    if (typeof(defn) !== "string") {
        return undefined;
    }
    
    var resultobj = {};
    
    defn = defn.replace(/[\x20\x0A\x0D\x09]*/g, "");   // replace all whitespace with nothing
    defn = defn.substring(1, defn.length - 1);         // remove start and end braces
    defn = defn.split(',');
    
    for (let pair of defn) {
        pair = pair.split(":", 2);
        let key = pair[0];
        let val = pair[1];

        resultobj[key] = val;
    }

    return function (x) {
        console.log(resultobj);
        for (var key in resultobj) {
            x[key] = eval(resultobj[key].replace("prev", x[key]));
        }
        return x;
    };
}

