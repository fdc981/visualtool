const make_transform = require('./api');

test("identity transformation does nothing", () => {
    let t = make_transform("{}");

    expect(t({})).toStrictEqual({});
    expect(t({a : 1, b : 1})).toStrictEqual({a : 1, b : 1});
});

describe("transformations", () => {
    test("can add attributes", () => {
        let t = make_transform("{a : 1}");

        expect(t({})).toStrictEqual({a : 1});
        expect(t({b : 1})).toStrictEqual({a : 1, b : 1});
    });

    test("can replace values", () => {
        let t = make_transform("{a : 1}");

        expect(t({a : 7, b : 7})).toStrictEqual({a : 1, b : 7});
    });

    test("can use previous values", () => {
        let t = make_transform("{a : prev + 1}");

        expect(t({a : 1, b : 1})).toStrictEqual({a : 2, b : 1});
        expect(t({a : 99, b : 1})).toStrictEqual({a : 100, b : 1});

        
        t = make_transform("{ lin  : 2 * prev + 3, "
                           + "quad : prev ** 2 + 3 * prev + 1, "
                           + "cub  : prev ** 3 + prev ** 2 + 1 }");

        let linf = (x) => 2 * x + 3;
        let quadf = (x) => x ** 2 + 3 * x + 1;
        let cubf = (x) => x ** 3 + x ** 2 + 1;

        for (let i = -100; i <= 100; i++) {
            expect(t({lin : i, quad : i, cub : i})).toStrictEqual({lin : linf(i), quad : quadf(i), cub : cubf(i)});
        }
    });
});

test("make_transform throws with incorrectly parsed object initialiser", () => {
    expect(make_transform("")).toThrow();
    expect(make_transform("}")).toThrow();
    expect(make_transform("{")).toThrow();
});
