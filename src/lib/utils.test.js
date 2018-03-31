import { calculateDepth, stringifyJson, splitStringByChar } from "./utils";

describe("helper functions", () => {
  test("stringifyJson returns a string", () => {
    const data = [1, 2, 3];
    const actual = stringifyJson(data);
    const expected = "[1,2,3]";

    expect(actual).toEqual(expected);
  });

  test("splitStringByChar returns an array", () => {
    const data = "[1,2,3]";
    const actual = splitStringByChar(data);
    const expected = ["[", "1", ",", "2", ",", "3", "]"];

    expect(actual).toEqual(expected);
  });
});

describe("calculateDepth", () => {
  test("returns 1 for an empty array", () => {
    const data = ["[", "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test("handles 2 dimensional arrays", () => {
    const data = ["[", "[", "]", "[", "]", "]"];
    const actual = calculateDepth(data);
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  test("handles 3 dimensional arrays", () => {
    const data = ["[", "[", "[", "]", "]", "]"];
    const actual = calculateDepth(data);
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  test("handles 3 dimensional arrays, where siblings have different depth", () => {
    const data = ["[", "[", "[", "]", "]", "[", "]", "]"];
    const actual = calculateDepth(data);
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  test("ignores depth of an array inside an object", () => {
    // i.e. [1, {"insideOjbect": [1, [2]]}] => should return 1
    const data = ["[", "{", "[", "[", "]", "]", "}", "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test("ignores depth of an array inside nested objects", () => {
    // i.e. [1, {"insideObject": { "nestedObject": [] }}]
    const data = ["[", "{", "{", "[", "[", "]", "]", "}", "}", "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test("ignores depth of an array inside of single quoted strings", () => {
    // i.e. ['[]']
    const data = ["[", "'", "[", "]", "'", "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test("ignores depth of an array inside of double quoted strings", () => {
    // i.e. ["[]"]
    const data = ["[", '"', "[", "]", '"', "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test("ignores depth of an array inside of back ticks", () => {
    // i.e. [`[]`]
    const data = ["[", "`", "[", "]", "`", "]"];
    const actual = calculateDepth(data);
    const expected = 1;

    expect(actual).toEqual(expected);
  });
});

describe("integrates helper functions with calculateDepth()", () => {
  test("should return 1 for crazy edge case", () => {
    const data = [1, "[[]", ']', ']', `[[[]]]`, {foo: [[[]]]}, "["];
    const formattedData = splitStringByChar(stringifyJson(data));
    const actual = calculateDepth(formattedData);
    const expected = 1;

    expect(actual).toEqual(expected);
  });
})
