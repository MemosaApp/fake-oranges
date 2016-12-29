let sequentialBuilder;
/**
 * sequential
 *
 * Add a sequential type, basically passes through a number with a given
 * offset.
 *
 * - `sequential.string` will return a stringified version of the sequential number
 * - `sequential.offset(x)` will bind sequential with an offset
 *
 * Usage in fake-oranges:
 *
 * ```
 * const schema = {
 *   id: sequential.offset(10).string,
 * };
 * ```
 */
const sequential = (number = 0, offset = 0) => {
  if (number instanceof Array) {
    return sequentialBuilder(number, offset);
  }

  return offset + number;
};

sequential.string = (...args) => {
  return String(sequential(...args));
};

sequential.offset = (offset = 0) => {
  const s = (...args) => {
    return sequential(...args, offset);
  };

  Object.keys(sequential).forEach(key => {
    s[key] = (...args) => sequential[key](...args, offset);
  });

  return s;
};

sequential.loop = (arr, arrOffset = 0) => {
  return sequentialBuilder(arr, arrOffset, true);
};

sequentialBuilder = (arr, arrOffset = 0, loop = false) => {
  const extendedSequential = (number = 0, offset = 0) => {
    let index = number + arrOffset + offset;

    if (loop) {
      index %= arr.length;
    }

    return index >= arr.length ? null : arr[index];
  };
  return extendedSequential;
};

export default sequential;
