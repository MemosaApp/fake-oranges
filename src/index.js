import faker from 'faker';

import factory from './factory';
import types from './types';

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
const fake = (schema) => {
  return {
    make(amount = 0) {
      if (amount === 0) {
        return factory(schema).generate(1)[0];
      }

      return factory(schema).generate(amount);
    },
  };
};

fake.types = {};

// Map faker function so that instead of immediately calling faker,
// we instead return functions that can get lazily called.
//
// This is so that when somone uses `lorem.words(2)`, they don't get the
// same words for every one of their items.
const mapper = (o) => {
  const holder = {};

  Object.keys(o).forEach(key => {
    if (typeof o[key] === 'function') {
      holder[key] = (...args) => () => o[key](...args);
    } else if (typeof o[key] === 'object') {
      holder[key] = mapper(o[key]);
    }
  });

  return holder;
};

fake.types = mapper(faker);

Object.keys(types).forEach(key => {
  fake.types[key] = types[key];
});

export default fake;
