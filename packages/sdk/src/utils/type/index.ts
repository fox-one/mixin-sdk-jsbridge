import { isType } from 'peeler-js/es/isType';

export function isArray(val: any): val is any[] {
  return isType('array')(val);
}

export function isObject(val: any): val is Record<string | number, any> {
  return isType('object')(val);
}

export function isPromise(val: any): val is Promise<any> {
  return isType('promise')(val);
}

export function isSymbol(val: any): val is Symbol {
  return isType('symbol')(val);
}

export function isUndefined(val: any): val is undefined | void {
  return isType('undefined')(val);
}

export function isNull(val: any): val is null {
  return isType('null')(val);
}

export function isRegexp(val: any): val is RegExp {
  return isType('regexp')(val);
}

export function isDate(val: any): val is Date {
  return isType('date')(val);
}

export function isFunction(val: any): val is Function {
  return isType('function')(val);
}

export function isGeneratorfunction(val: any): val is GeneratorFunction {
  return isType('generatorfunction')(val);
}

export function isAsyncfunction(val: any): val is () => Promise<void> {
  return isType('asyncfunction')(val);
}

export function isString(val: any): val is string {
  return isType('string')(val);
}

export function isNumber(val: any): val is number {
  return isType('number')(val);
}

export function isBool(val: any): val is boolean {
  return isType('boolean')(val);
}

export default isType;