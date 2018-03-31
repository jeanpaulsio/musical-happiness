export const stringifyJson = input => {
  return JSON.stringify(input);
};

export const splitStringByChar = str => {
  return str.split("");
};

export const calculateDepth = arr => {
  let stack = 0;
  let maxHeight = stack;
  let insideObject = false;
  let insideSingleQuotes = false;
  let insideDoubleQuotes = false;
  let insideBackTicks = false;

  arr.forEach(character => {
    if (character === "'") {
      insideSingleQuotes = !insideSingleQuotes;
    }

    if (character === '"') {
      insideDoubleQuotes = !insideDoubleQuotes;
    }

    if (character === "`") {
      insideBackTicks = !insideBackTicks;
    }

    if (character === "{") {
      insideObject = true;
    }

    if (character === "}") {
      insideObject = false;
    }

    if (
      character === "[" &&
      !insideObject &&
      !insideSingleQuotes &&
      !insideDoubleQuotes &&
      !insideBackTicks
    ) {
      stack++;
      maxHeight = maxHeight > stack ? maxHeight : stack;
    }

    if (
      character === "]" &&
      !insideObject &&
      !insideSingleQuotes &&
      !insideDoubleQuotes &&
      !insideBackTicks
    ) {
      stack--;
    }
  });

  return maxHeight;
};
