# fake-oranges

[![CircleCI](https://circleci.com/gh/MemosaApp/fake-oranges.svg?style=svg)](https://circleci.com/gh/MemosaApp/fake-oranges) [![npm version](https://badge.fury.io/js/fake-oranges.svg)](https://badge.fury.io/js/fake-oranges)

Factory methods for creating fake data

## Installing

```
yarn add fake-oranges
```

## Usage

```js
import fake from 'fake-oranges';

const { sequential, lorem } = fake.types;

const schema = {
  id: sequential.offset(10).string,
  title: lorem.words(),
  data: {
    href: (id) => `/a/b/c/${sequential.offset(10).string(i)}`,
    otherData: sequential(['a', 'b', 'c']),
    otherDataLooped: sequential.loop(['a', 'b', 'c'])
  },
};

// Single item
const item = fake(schema).make();
// Array of items
const items = fake(schema).make(100);
// Array of a single item
const singleItemAsArray = fake(schema).make(1);
// Start at an offset:
const singleItemAsArray = fake(schema).offset(100).make(1);
```

All of the types available from [fakerjs](https://github.com/marak/Faker.js/) are
available from `fake.types`.
Call them as functions as you normally would, they will
be lazily evaluated when you call `make()`.

We have added the following types for convenience:

```
// sequential:

const example = {
  id: sequential,
  id2: sequential.offset(1);
  idString: sequential.string;
  id2String: sequential.offset(1).string,
  pickAndThenNull: sequential(['a', 'b', 'c']),
  pickAndThenLooped: sequential.loop(['a', 'b', 'c']),
  pickStartAtB: sequential.offset(1)(['a', 'b', 'c']),
  pickLoopedStartAtB: sequential.offset(1).loop(['a', 'b', 'c']),
};
```
