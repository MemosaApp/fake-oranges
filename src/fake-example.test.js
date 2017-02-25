import { expect } from 'chai';
import fake from './';

const { lorem } = fake.types;

const example = {
  title: lorem.word(),
  uuid: 'xxx',
};

describe('fake example', () => {
  it('builds an item of the example', () => {
    const made = fake(example).make();
    expect(made).to.be.a('Object');
    expect(made.title).to.be.a('String');
  });
});
