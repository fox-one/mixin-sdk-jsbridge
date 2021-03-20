import 'mocha';
import { expect } from 'chai';
import getLogger from '../';

describe("getLogger test", function () {
  it('getLogger is a function', function () {
    expect(getLogger).to.be.a('function');
    expect(getLogger('test')).to.be.a('function');
    expect(getLogger('test')()).to.be.an('object');
    expect(getLogger('test')('suffix').log).to.be.a('function');
    expect(getLogger('test')('suffix').info).to.be.a('function');
    expect(getLogger('test')('suffix').warn).to.be.a('function');
    expect(getLogger('test')('suffix').error).to.be.a('function');
    expect(getLogger('test')('suffix').success).to.be.a('function');
    expect(getLogger('test')('suffix').setLevel('info').info({ msg: 'test msg' })).to.be.undefined;
  })
});
