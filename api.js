/**
 * Creates a transformation, using a string containing an object initialiser.
 */
function make_transform(defn) {
    if (typeof(defn) !== "string") {
        return undefined;
    }
    
    defn = defn.replace(/[\x20\x0A\x0D\x09]*/g, "");   // replace all whitespace with nothing
    defn = defn.substring(1, defn.length - 1);         // remove start and end braces
    var pairs = defn.split(',');

    var resultbody = "";
    
    for (let pair of pairs) {
        pair = pair.split(":", 2);
        let key = pair[0];
        let val = pair[1];

        val = val.replace(/prev/g, "x['" + key + "']");

        resultbody += "x['" + key + "'] = " + val + ";\n"
    }
    resultbody += "return x;"

    return Function('x', resultbody);
}

module.exports = make_transform;
