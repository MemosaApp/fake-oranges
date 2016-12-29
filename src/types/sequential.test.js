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

  it('picks sequentially from an array', () => {
    const sa = sequential(['1', '4', '10', '20']);
    expect(sa(0)).to.be.equal('1');
    expect(sa(1)).to.be.equal('4');
    expect(sa(2)).to.be.equal('10');
    expect(sa(3)).to.be.equal('20');
    expect(sa(4)).to.be.equal(null);
  });

  it('loops sequentially from an array', () => {
    const sa = sequential.loop(['1', '4', '10', '20']);
    expect(sa(0)).to.be.equal('1');
    expect(sa(1)).to.be.equal('4');
    expect(sa(2)).to.be.equal('10');
    expect(sa(3)).to.be.equal('20');
    expect(sa(4)).to.be.equal('1');
  });
});
