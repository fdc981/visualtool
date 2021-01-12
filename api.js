/**
 * Creates a transformation.
 */
function transform(defn) {
    return function (x) {
        for (var key in defn) {
            x[key] = defn[key]
        }
        return x
    }
}
