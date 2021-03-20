import 'mocha';
import { expect } from 'chai';
import {
  isArray,
  isAsyncfunction,
  isBool,
  isDate,
  isFunction,
  isGeneratorfunction,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isRegexp,
  isString,
  isSymbol,
  isUndefined
} from '../';

// cannot test isAsyncfunction isPromise and isGeneratorfunction because they will be transform to es5
describe("type test", function () {
  it('is* is a function', function () {
    expect(isArray).to.be.a('function')
    expect(isAsyncfunction).to.be.a('function')
    expect(isBool).to.be.a('function')
    expect(isDate).to.be.a('function')
    expect(isFunction).to.be.a('function')
    expect(isGeneratorfunction).to.be.a('function')
    expect(isNull).to.be.a('function')
    expect(isNumber).to.be.a('function')
    expect(isObject).to.be.a('function')
    expect(isPromise).to.be.a('function')
    expect(isRegexp).to.be.a('function')
    expect(isString).to.be.a('function')
    expect(isSymbol).to.be.a('function')
    expect(isUndefined).to.be.a('function')
  })

  it('call isArray result', function () {
    expect(isArray([])).to.be.true;
    expect(isArray(new Array())).to.be.true;
    expect(isArray(123)).to.be.false;
  })

  it('call isDate result', function () {
    expect(isDate(new Date())).to.be.true
    expect(isDate(Date.now())).to.be.false
  })

  it('call isFunction result', function () {
    expect(isFunction(function () { })).to.be.true;
    expect(isFunction(() => { })).to.be.true;
    expect(isFunction(123)).to.be.false;
  })

  it('call isNull result', function () {
    expect(isNull(null)).to.be.true
    expect(isNull({})).to.be.false
  })

  it('call isNumber result', function () {
    expect(isNumber(123)).to.be.true
    expect(isNumber('123')).to.be.false
  })

  it('call isObject result', function () {
    expect(isObject({})).to.be.true
    expect(isObject([])).to.be.false
  })

  it('call isRegexp result', function () {
    expect(isRegexp(/test/)).to.be.true
    expect(isRegexp(new RegExp('s'))).to.be.true
    expect(isRegexp(123)).to.be.false
    expect(isString).to.be.a('function')
    expect(isSymbol).to.be.a('function')
    expect(isUndefined).to.be.a('function')
  })

  it('call isString result', function () {
    expect(isString(123)).to.be.false
    expect(isString('')).to.be.true
    expect(isSymbol).to.be.a('function')
    expect(isUndefined).to.be.a('function')
  })

  it('call isSymbol result', function () {
    expect(isSymbol(Symbol(123))).to.be.true
    expect(isSymbol(123)).to.be.false
  })

  it('call isUndefined result', function () {
    expect(isUndefined(void 0)).to.be.true
  })
});
