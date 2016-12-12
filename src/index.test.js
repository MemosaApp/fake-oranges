import { expect } from 'chai';
import fake from './index';

const { lorem, sequential, shape } = fake.types;

describe('Fake Oranges', () => {
  it('builds an object from a schema', () => {
    const schema = {
      id: sequential,
      href: () => `/a/b/c/${sequential}`,
      data: shape({
        id: sequential,
        title: lorem.words(2),
      }),
    };
    
    const item = fake(schema).make();
    
    expect(item).to.not.be.an.array;
    expect(item).to.be.an.object;
  });
  
   it('makes many objects from a schema', () => {
    const schema = {
      id: sequential,
      href: () => `/a/b/c/${sequential}`,
      data: shape({
        id: sequential,
        title: lorem.words(2),
      }),
    };
    
    const items = fake(schema).make(10);
    
    expect(items).to.be.an.array;
    expect(items).to.be.length(10);
  });
});
