import 'mocha';
import { expect } from 'chai';
import { uuid } from '../';

// cannot test isAsyncfunction isPromise and isGeneratorfunction because they will be transform to es5
describe("type test", function () {
  it('uuid is a function', function () {
    expect(uuid).to.be.a('function')
  })

  it('call uuid result', function () {
    expect(uuid()).to.be.string;
  })
});
