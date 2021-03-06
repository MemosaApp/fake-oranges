"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sequentialBuilder = void 0;
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
var sequential = function sequential() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (number instanceof Array) {
    return sequentialBuilder(number, offset);
  }

  return offset + number;
};

sequential.string = function () {
  return String(sequential.apply(undefined, arguments));
};

sequential.offset = function () {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var s = function s() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return sequential.apply(undefined, args.concat([offset]));
  };

  Object.keys(sequential).forEach(function (key) {
    s[key] = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return sequential[key].apply(sequential, args.concat([offset]));
    };
  });

  return s;
};

sequential.loop = function (arr) {
  var arrOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return sequentialBuilder(arr, arrOffset, true);
};

sequentialBuilder = function sequentialBuilder(arr) {
  var arrOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var extendedSequential = function extendedSequential() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var index = number + arrOffset + offset;

    if (loop) {
      index %= arr.length;
    }

    return index >= arr.length ? null : arr[index];
  };
  return extendedSequential;
};

exports.default = sequential;