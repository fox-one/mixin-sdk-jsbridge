import 'mocha';
import { expect } from 'chai';
import binArrayToStr from '../';

describe("binArrayToStr test", function () {
  it('binArrayToStr is a function', function () {
    expect(binArrayToStr).to.be.a('function')
  })
});
