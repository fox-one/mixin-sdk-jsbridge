import 'mocha';
import { expect } from 'chai';
import parseError from '../';

describe("parseError test", function () {
  it('parseError is a function', function () {
    expect(parseError).to.be.a('function')
  })
});
