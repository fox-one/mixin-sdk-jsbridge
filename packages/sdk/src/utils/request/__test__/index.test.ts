import 'mocha';
import { expect } from 'chai';
import { request, setting } from '../';

describe("request test", function () {
  it('setting is a function', function () {
    expect(request).to.be.a('function')
  })
});

describe("setting test", function () {
  it('setting is a function', function () {
    expect(setting).to.be.a('function')
  })
});
