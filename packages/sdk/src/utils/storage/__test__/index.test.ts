import 'mocha';
import { expect } from 'chai';
import storage, { setStorageType } from '../';

describe("storage test", function () {
  it('storage methods is function', function () {
    expect(storage).to.be.an('object');
    expect(storage.get).to.be.a('function');
    expect(storage.set).to.be.a('function');
    expect(storage.clear).to.be.a('function');
  });

  it('setStorageType is a function', function () {
    expect(setStorageType).to.be.a('function');
  });
});
