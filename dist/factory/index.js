'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (originalSchema) {
  var generateSchema = function generateSchema(schema, iteration) {
    if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) === 'object') {
      var _ret = function () {
        var keyPairs = {};

        Object.keys(schema).forEach(function (key) {
          keyPairs[key] = generateSchema(schema[key], iteration);
        });

        return {
          v: keyPairs
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else if (typeof schema === 'function') {
      return schema(iteration);
    } else {
      return schema;
    }
  };

  return {
    generate: function generate(amount) {
      return Array.from(Array(amount).keys()).map(function (i) {
        return generateSchema(originalSchema, i);
      });
    }
  };
};