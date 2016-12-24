'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * fake
 *
 * Usage:
 *
 * ```
 * import fake from 'fake-oranges';
 *
 * const schema = {
 *   id: fake.types.sequential.offset(10).string,
 *   title: fake.types.lorem.words,
 *   data: {
 *     href: (id) => `/a/b/c/${sequential.offset(10).string(i)}`,
 *   },
 * };
 * ```
 */
var fake = function fake(schema) {
  return {
    make: function make() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (amount === 0) {
        return (0, _factory2.default)(schema).generate(1)[0];
      }

      return (0, _factory2.default)(schema).generate(amount);
    }
  };
};

fake.types = {};

// Map faker function so that instead of immediately calling faker,
// we instead return functions that can get lazily called.
//
// This is so that when somone uses `lorem.words(2)`, they don't get the
// same words for every one of their items.
var mapper = function mapper(o) {
  var holder = {};

  Object.keys(o).forEach(function (key) {
    if (typeof o[key] === 'function') {
      holder[key] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return function () {
          return o[key].apply(o, args);
        };
      };
    } else if (_typeof(o[key]) === 'object') {
      holder[key] = mapper(o[key]);
    }
  });

  return holder;
};

fake.types = mapper(_faker2.default);

Object.keys(_types2.default).forEach(function (key) {
  fake.types[key] = _types2.default[key];
});

exports.default = fake;