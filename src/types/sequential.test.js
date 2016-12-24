import { expect } from 'chai';
import sequential from './sequential';

describe('sequential type', () => {
  it('returns the number given to it', () => {
    expect(sequential(1337)).to.be.equal(1337);
  });

  it('has a string version', () => {
    expect(sequential.string).to.be.a.function;
  });

  it('returns a string when using the string version', () => {
    expect(sequential.string(1337)).to.be.equal('1337');
  });

  it('allows offsets', () => {
    expect(sequential.offset(10)(1337)).to.be.equal(1347);
    expect(sequential.offset(10).string(1337)).to.be.equal('1347');
  });
});
