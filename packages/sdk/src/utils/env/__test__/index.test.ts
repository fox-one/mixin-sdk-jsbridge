import 'mocha';
import { expect } from 'chai';
import env from '../';

describe("env test", function () {
  it('env is a function', function () {
    expect(env).to.be.a('function')
  })
});
