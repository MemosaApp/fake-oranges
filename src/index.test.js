import { expect } from 'chai';
import fake from './index';

describe('Fake Oranges', () => {
  describe('Fake', () => {
    it('is a function', () => {
      expect(fake).to.be.a.function;
    });

    it('has a types entry', () => {
      expect(fake.type).to.be.an.object;
    });
  });

  describe('Fake Usage', () => {
    const { lorem, sequential } = fake.types;
    const schema = {
      id: sequential,
      href: (i) => `/a/b/c/${sequential(i)}`,
      data: {
        id: sequential,
        title: lorem.words(2),
      },
    };

    const schema2 = {
      id: sequential.string,
      data: {},
    };

    const schema3 = {
      id: sequential.loop(['10', '9', '8']),
    };

    it('builds an object from a schema', () => {
      const item = fake(schema).make();

      expect(item).to.not.be.an.array;
      expect(item).to.be.an.object;
    });

    it('makes many objects from a schema', () => {
      const items = fake(schema).make(10);

      expect(items).to.be.an.array;
      expect(items).to.be.length(10);
    });

    it('makes the object type', () => {
      const item = fake(schema).make();

      expect(item.id).to.be.a.number;
      expect(item.id).to.be.equal(0);
      expect(item.href).to.be.a.string;
      expect(item.href).to.be.equal('/a/b/c/0');
      expect(item.data.id).to.be.a.string;
      expect(item.data.id).to.be.equal(0);
      expect(item.data.title).to.be.a.string;
    });

    it('makes many objects of type', () => {
      const items = fake(schema).make(10);

      for (let i = 0; i < 10; i++) {
        expect(items[i].id).to.be.a.number;
        expect(items[i].id).to.be.equal(i);
        expect(items[i].href).to.be.a.string;
        expect(items[i].href).to.be.equal(`/a/b/c/${i}`);
        expect(items[i].data.id).to.be.a.string;
        expect(items[i].data.id).to.be.equal(i);
        expect(items[i].data.title).to.be.a.string;
      }
    });

    it('builds an object from a wierd schema', () => {
      const item = fake(schema2).make();

      expect(item.id).to.be.a.string;
      expect(item.id).to.be.equal('0');
      expect(item.data).to.be.an.object;
    });

    it('builds with an offset', () => {
      const item = fake(schema2).offset(10).make();

      expect(item.id).to.be.a.string;
      expect(item.id).to.be.equal('10');
      expect(item.data).to.be.an.object;
    });

    it('builds sequential loops', () => {
      const items = fake(schema3).make(10);

      expect(items[0].id).to.be.equal('10');
      expect(items[1].id).to.be.equal('9');
      expect(items[2].id).to.be.equal('8');
      expect(items[3].id).to.be.equal('10');
      expect(items[4].id).to.be.equal('9');
      expect(items[5].id).to.be.equal('8');
      expect(items[6].id).to.be.equal('10');
      expect(items[7].id).to.be.equal('9');
      expect(items[8].id).to.be.equal('8');
      expect(items[9].id).to.be.equal('10');
    });
  });
});
