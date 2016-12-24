# fake-oranges

[![CircleCI](https://circleci.com/gh/MemosaApp/fake-oranges.svg?style=svg)](https://circleci.com/gh/MemosaApp/fake-oranges)

Factory methods for creating fake data

## Installing

```
yarn add fake-oranges
```

## Usage

```
import fake from 'fake-oranges';

const schema = {
  id: fake.types.sequential.offset(10).string,
  title: fake.types.lorem.words,
  data: {
    href: (id) => `/a/b/c/${sequential.offset(10).string(i)}`,
  },
};
```

All of the types available from [fakerjs](https://github.com/marak/Faker.js/) are
available from `fake.types`.

We have added the following types for convenience:

```
// sequential:

const example = {
  id: sequential,
  id2: sequential.offset(1);
  idString: sequential.string;
  id2String: sequential.offset(1).string,
};
```
