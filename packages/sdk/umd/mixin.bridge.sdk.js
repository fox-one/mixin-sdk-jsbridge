(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('crypto')):typeof define==='function'&&define.amd?define(['exports','crypto'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.$MixinBridge={},g.require$$0));}(this,(function(exports, require$$0){'use strict';function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var require$$0__default=/*#__PURE__*/_interopDefaultLegacy(require$$0);var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
}var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$1 =
  /* global globalThis -- safe */
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};var document$1 = global$1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;var path = {};var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$1);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global$1[namespace])
    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
};var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  _export({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}if (!path.JSON) path.JSON = { stringify: JSON.stringify };

// eslint-disable-next-line no-unused-vars -- required for `.length`
var stringify = function stringify(it, replacer, space) {
  return path.JSON.stringify.apply(null, arguments);
};var stringify$1 = stringify;var stringify$2 = stringify$1;// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};var isPure = true;var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global$1, key, value);
  } catch (error) {
    global$1[key] = value;
  } return value;
};var SHARED = '__core-js_shared__';
var store = global$1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.9.1',
  mode:  'pure' ,
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});
});var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};/* eslint-disable no-proto -- safe */

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};var hiddenKeys = {};var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};var html = getBuiltIn('document', 'documentElement');var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};var engineIsNode = classofRaw(global$1.process) == 'process';var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';var process$1 = global$1.process;
var versions = process$1 && process$1.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  /* global Symbol -- required for testing */
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
});var useSymbolAsUid = nativeSymbol
  /* global Symbol -- safe */
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global$1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (nativeSymbol && has(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};var iterators = {};var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};var iteratorClose = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (objectSetPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = objectCreate(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
_export({ global: true }, {
  AggregateError: $AggregateError
});var nativePromiseConstructor = global$1.Promise;var redefine = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};var redefineAll = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};var defineProperty = objectDefineProperty.f;





var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG$2)) {
      defineProperty(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};var SPECIES = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};var SPECIES$1 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction(S);
};var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);var location$1 = global$1.location;
var set = global$1.setImmediate;
var clear = global$1.clearImmediate;
var process$2 = global$1.process;
var MessageChannel = global$1.MessageChannel;
var Dispatch = global$1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$1.postMessage(id + '', location$1.protocol + '//' + location$1.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (engineIsNode) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$1.addEventListener &&
    typeof postMessage == 'function' &&
    !global$1.importScripts &&
    location$1 && location$1.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global$1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set,
  clear: clear
};var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var macrotask = task.set;




var MutationObserver = global$1.MutationObserver || global$1.WebKitMutationObserver;
var document$2 = global$1.document;
var process$3 = global$1.process;
var Promise$1 = global$1.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global$1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (engineIsNode && (parent = process$3.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (engineIsNode) {
    notify = function () {
      process$3.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$3 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$3
};var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};var hostReportErrors = function (a, b) {
  var console = global$1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};var WeakMap = global$1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));var WeakMap$1 = global$1.WeakMap;
var set$1, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set$1 = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set$1 = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};var task$1 = task.set;











var SPECIES$2 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = internalState.get;
var setInternalState = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global$1.TypeError;
var document$3 = global$1.document;
var process$4 = global$1.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global$1.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED$1 = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if ( !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$2] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$3.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task$1.call(global$1, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (engineIsNode) {
          process$4.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task$1.call(global$1, function () {
    var promise = state.facade;
    if (engineIsNode) {
      process$4.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$1) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = engineIsNode ? process$4.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export({ global: true, wrap: true, forced: FORCED$1 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced: isPure  }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
_export({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapability.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
_export({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapability.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};var ITERATOR$3 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR$3].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (( NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR$3)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis$2;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if (( FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
  }
  iterators[COLLECTION_NAME] = iterators.Array;
}var promise$1 = path.Promise;var promise$2 = promise$1;var promise$3 = promise$2;var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};var nativeAssign = Object.assign;
var defineProperty$1 = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  /* global Symbol -- required for testing */
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});var assign = path.Object.assign;var assign$1 = assign;var assign$2 = assign$1;var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
_export({ target: 'Function', proto: true }, {
  bind: functionBind
});var entryVirtual = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};var bind$1 = entryVirtual('Function').bind;var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind$1 : own;
};var bind$2 = bind_1;var bind$3 = bind$2;function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperty: objectDefineProperty.f
});var defineProperty_1 = createCommonjsModule(function (module) {
var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;
});var defineProperty$2 = defineProperty_1;var defineProperty$3 = defineProperty$2;function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$3(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
var gen = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var args;
(function () { args = arguments; })();
var typeMap = {
    string: '',
    number: 1,
    boolean: true,
    null: null,
    undefined: undefined,
    symbol: Symbol(1),
    array: [],
    arguments: args,
    object: {},
    regexp: /regexp/,
    date: new Date(),
    function: function () { },
    promise: Promise.resolve(void (0)),
    generatorfunction: gen,
    generator: gen(),
    asyncfunction: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }
};
var logLevelSet;
(function (logLevelSet) {
    logLevelSet[logLevelSet["detail"] = 0] = "detail";
    logLevelSet[logLevelSet["info"] = 1] = "info";
    logLevelSet[logLevelSet["warn"] = 2] = "warn";
    logLevelSet[logLevelSet["error"] = 3] = "error";
    logLevelSet[logLevelSet["success"] = 4] = "success";
    logLevelSet[logLevelSet["silent"] = 5] = "silent";
})(logLevelSet || (logLevelSet = {}));
var parseUrl = (function () {
    if (typeof window === 'undefined')
        return function (url) { return url; };
    var HTTP_PORT = '80';
    var HTTPS_PORT = '443';
    var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');
    var a = document.createElement('a');
    var cache = {};
    /**
     * Parses the given url and returns an object mimicing a `Location` object.
     * @param {string} url The url to parse.
     * @return {!Object} An object with the same properties as a `Location`.
     */
    return function parse_url(url) {
        // All falsy values (as well as ".") should map to the current URL.
        url = (!url || url === '.') ? location.href : url;
        if (cache[url])
            return cache[url];
        a.href = url;
        // When parsing file relative paths (e.g. `../index.html`), IE will correctly
        // resolve the `href` property but will keep the `..` in the `path` property.
        // It will also not include the `host` or `hostname` properties. Furthermore,
        // IE will sometimes return no protocol or just a colon, especially for things
        // like relative protocol URLs (e.g. "//google.com").
        // To workaround all of these issues, we reparse with the full URL from the
        // `href` property.
        if (url.charAt(0) === '.' || url.charAt(0) === '/')
            return parse_url(a.href);
        // Don't include default ports.
        var port = (a.port == HTTP_PORT || a.port == HTTPS_PORT) ? '' : a.port;
        // PhantomJS sets the port to "0" when using the file: protocol.
        port = port === '0' ? '' : port;
        // Sometimes IE incorrectly includes a port for default ports
        // (e.g. `:80` or `:443`) even when no port is specified in the URL.
        // http://bit.ly/1rQNoMg
        var host = a.host.replace(DEFAULT_PORT, '');
        // Not all browser support `origin` so we have to build it.
        var origin = a.origin ? a.origin : a.protocol + '//' + host;
        // Sometimes IE doesn't include the leading slash for pathname.
        // http://bit.ly/1rQNoMg
        var pathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname;
        return cache[url] = {
            hash: a.hash,
            host: host,
            hostname: a.hostname,
            href: a.href,
            origin: origin,
            pathname: pathname,
            port: port,
            protocol: a.protocol,
            search: a.search,
        };
    };
})();/**
 * @param {event} event event object
 */// a string of all valid unicode whitespaces
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};var trim = stringTrim.trim;


var $parseInt = global$1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$2 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
_export({ global: true, forced: parseInt != numberParseInt }, {
  parseInt: numberParseInt
});// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};var SPECIES$3 = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES$3];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};var SPECIES$4 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$3 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});var concat = entryVirtual('Array').concat;var ArrayPrototype$1 = Array.prototype;

var concat_1 = function (it) {
  var own = it.concat;
  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.concat) ? concat : own;
};var concat$1 = concat_1;var concat$2 = concat$1;var logger = createCommonjsModule(function (module, exports) {
function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}function getCjsExportFromNamespace(e){return e&&e.default||e}Object.defineProperty(exports,"__esModule",{value:!0});var _core=createCommonjsModule(function(e){var t=e.exports={version:"2.6.9"};"number"==typeof __e&&(__e=t);}),_core_1=_core.version,$JSON=_core.JSON||(_core.JSON={stringify:JSON.stringify}),stringify=function(e){return $JSON.stringify.apply($JSON,arguments)},stringify$1=stringify;function __awaiter(i,s,a,c){return new(a=a||Promise)(function(e,t){function r(e){try{n(c.next(e));}catch(e){t(e);}}function o(e){try{n(c.throw(e));}catch(e){t(e);}}function n(t){t.done?e(t.value):new a(function(e){e(t.value);}).then(r,o);}n((c=c.apply(i,s||[])).next());})}function __generator(r,o){var n,i,s,e,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(s=2&t[0]?i.return:t[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[2&t[0],s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=o.call(r,a);}catch(e){t=[6,e],i=0;}finally{n=s=0;}if(5&t[0])throw t[1];return {value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function __spreadArrays(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var o=Array(e),n=0;for(t=0;t<r;t++)for(var i=arguments[t],s=0,a=i.length;s<a;s++,n++)o[n]=i[s];return o}var es6_object_toString=Object.freeze({}),ceil=Math.ceil,floor=Math.floor,_toInteger=function(e){return isNaN(e=+e)?0:(0<e?floor:ceil)(e)},_defined=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e},_stringAt=function(a){return function(e,t){var r,o,n=String(_defined(e)),i=_toInteger(t),s=n.length;return i<0||s<=i?a?"":void 0:(r=n.charCodeAt(i))<55296||56319<r||i+1===s||(o=n.charCodeAt(i+1))<56320||57343<o?a?n.charAt(i):r:a?n.slice(i,i+2):o-56320+(r-55296<<10)+65536}},_library=!0,_global=createCommonjsModule(function(e){var t=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t);}),_aFunction=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e},_ctx=function(o,n,e){if(_aFunction(o),void 0===n)return o;switch(e){case 1:return function(e){return o.call(n,e)};case 2:return function(e,t){return o.call(n,e,t)};case 3:return function(e,t,r){return o.call(n,e,t,r)}}return function(){return o.apply(n,arguments)}},_isObject=function(e){return "object"==typeof e?null!==e:"function"==typeof e},_anObject=function(e){if(!_isObject(e))throw TypeError(e+" is not an object!");return e},_fails=function(e){try{return !!e()}catch(e){return !0}},_descriptors=!_fails(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),document$1=_global.document,is=_isObject(document$1)&&_isObject(document$1.createElement),_domCreate=function(e){return is?document$1.createElement(e):{}},_ie8DomDefine=!_descriptors&&!_fails(function(){return 7!=Object.defineProperty(_domCreate("div"),"a",{get:function(){return 7}}).a}),_toPrimitive=function(e,t){if(!_isObject(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!_isObject(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!_isObject(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!_isObject(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")},dP=Object.defineProperty,f=_descriptors?Object.defineProperty:function(e,t,r){if(_anObject(e),t=_toPrimitive(t,!0),_anObject(r),_ie8DomDefine)try{return dP(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return "value"in r&&(e[t]=r.value),e},_objectDp={f:f},_propertyDesc=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},_hide=_descriptors?function(e,t,r){return _objectDp.f(e,t,_propertyDesc(1,r))}:function(e,t,r){return e[t]=r,e},hasOwnProperty={}.hasOwnProperty,_has=function(e,t){return hasOwnProperty.call(e,t)},PROTOTYPE="prototype",$export=function(e,t,r){var o,n,i,s=e&$export.F,a=e&$export.G,c=e&$export.S,l=e&$export.P,u=e&$export.B,_=e&$export.W,f=a?_core:_core[t]||(_core[t]={}),p=f[PROTOTYPE],y=a?_global:c?_global[t]:(_global[t]||{})[PROTOTYPE];for(o in a&&(r=t),r)(n=!s&&y&&void 0!==y[o])&&_has(f,o)||(i=n?y[o]:r[o],f[o]=a&&"function"!=typeof y[o]?r[o]:u&&n?_ctx(i,_global):_&&y[o]==i?function(o){function e(e,t,r){if(this instanceof o){switch(arguments.length){case 0:return new o;case 1:return new o(e);case 2:return new o(e,t)}return new o(e,t,r)}return o.apply(this,arguments)}return e[PROTOTYPE]=o[PROTOTYPE],e}(i):l&&"function"==typeof i?_ctx(Function.call,i):i,l&&((f.virtual||(f.virtual={}))[o]=i,e&$export.R&&p&&!p[o]&&_hide(p,o,i)));};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128;var _export=$export,_redefine=_hide,_iterators={},toString={}.toString,_cof=function(e){return toString.call(e).slice(8,-1)},_iobject=Object("z").propertyIsEnumerable(0)?Object:function(e){return "String"==_cof(e)?e.split(""):Object(e)},_toIobject=function(e){return _iobject(_defined(e))},min=Math.min,_toLength=function(e){return 0<e?min(_toInteger(e),9007199254740991):0},max=Math.max,min$1=Math.min,_toAbsoluteIndex=function(e,t){return (e=_toInteger(e))<0?max(e+t,0):min$1(e,t)},_arrayIncludes=function(a){return function(e,t,r){var o,n=_toIobject(e),i=_toLength(n.length),s=_toAbsoluteIndex(r,i);if(a&&t!=t){for(;s<i;)if((o=n[s++])!=o)return !0}else for(;s<i;s++)if((a||s in n)&&n[s]===t)return a||s||0;return !a&&-1}},_shared=createCommonjsModule(function(e){var t="__core-js_shared__",r=_global[t]||(_global[t]={});(e.exports=function(e,t){return r[e]||(r[e]=void 0!==t?t:{})})("versions",[]).push({version:_core.version,mode:"pure",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"});}),id=0,px=Math.random(),_uid=function(e){return "Symbol(".concat(void 0===e?"":e,")_",(++id+px).toString(36))},shared=_shared("keys"),_sharedKey=function(e){return shared[e]||(shared[e]=_uid(e))},arrayIndexOf=_arrayIncludes(!1),IE_PROTO=_sharedKey("IE_PROTO"),_objectKeysInternal=function(e,t){var r,o=_toIobject(e),n=0,i=[];for(r in o)r!=IE_PROTO&&_has(o,r)&&i.push(r);for(;t.length>n;)_has(o,r=t[n++])&&(~arrayIndexOf(i,r)||i.push(r));return i},_enumBugKeys="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),_objectKeys=Object.keys||function(e){return _objectKeysInternal(e,_enumBugKeys)},_objectDps=_descriptors?Object.defineProperties:function(e,t){_anObject(e);for(var r,o=_objectKeys(t),n=o.length,i=0;i<n;)_objectDp.f(e,r=o[i++],t[r]);return e},document$2=_global.document,_html=document$2&&document$2.documentElement,IE_PROTO$1=_sharedKey("IE_PROTO"),Empty=function(){},PROTOTYPE$1="prototype",createDict=function(){var e,t=_domCreate("iframe"),r=_enumBugKeys.length;for(t.style.display="none",_html.appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),createDict=e.F;r--;)delete createDict[PROTOTYPE$1][_enumBugKeys[r]];return createDict()},_objectCreate=Object.create||function(e,t){var r;return null!==e?(Empty[PROTOTYPE$1]=_anObject(e),r=new Empty,Empty[PROTOTYPE$1]=null,r[IE_PROTO$1]=e):r=createDict(),void 0===t?r:_objectDps(r,t)},_wks=createCommonjsModule(function(e){var t=_shared("wks"),r=_global.Symbol,o="function"==typeof r;(e.exports=function(e){return t[e]||(t[e]=o&&r[e]||(o?r:_uid)("Symbol."+e))}).store=t;}),def=_objectDp.f,TAG=_wks("toStringTag"),_setToStringTag=function(e,t,r){e&&!_has(e=r?e:e.prototype,TAG)&&def(e,TAG,{configurable:!0,value:t});},IteratorPrototype={};_hide(IteratorPrototype,_wks("iterator"),function(){return this});var _iterCreate=function(e,t,r){e.prototype=_objectCreate(IteratorPrototype,{next:_propertyDesc(1,r)}),_setToStringTag(e,t+" Iterator");},_toObject=function(e){return Object(_defined(e))},IE_PROTO$2=_sharedKey("IE_PROTO"),ObjectProto=Object.prototype,_objectGpo=Object.getPrototypeOf||function(e){return e=_toObject(e),_has(e,IE_PROTO$2)?e[IE_PROTO$2]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?ObjectProto:null},ITERATOR=_wks("iterator"),BUGGY=!([].keys&&"next"in[].keys()),FF_ITERATOR="@@iterator",KEYS="keys",VALUES="values",returnThis=function(){return this},_iterDefine=function(e,t,r,o,n,i,s){_iterCreate(r,t,o);function a(e){if(!BUGGY&&e in y)return y[e];switch(e){case KEYS:case VALUES:return function(){return new r(this,e)}}return function(){return new r(this,e)}}var c,l,u,_=t+" Iterator",f=n==VALUES,p=!1,y=e.prototype,h=y[ITERATOR]||y[FF_ITERATOR]||n&&y[n],b=h||a(n),g=n?f?a("entries"):b:void 0,m="Array"==t&&y.entries||h;if(m&&(u=_objectGpo(m.call(new e)))!==Object.prototype&&u.next&&_setToStringTag(u,_,!0),f&&h&&h.name!==VALUES&&(p=!0,b=function(){return h.call(this)}),s&&(BUGGY||p||!y[ITERATOR])&&_hide(y,ITERATOR,b),_iterators[t]=b,_iterators[_]=returnThis,n)if(c={values:f?b:a(VALUES),keys:i?b:a(KEYS),entries:g},s)for(l in c)l in y||_redefine(y,l,c[l]);else _export(_export.P+_export.F*(BUGGY||p),t,c);return c},$at=_stringAt(!0);_iterDefine(String,"String",function(e){this._t=String(e),this._i=0;},function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=$at(t,r),this._i+=e.length,{value:e,done:!1})});var _iterStep=function(e,t){return {value:t,done:!!e}},es6_array_iterator=_iterDefine(Array,"Array",function(e,t){this._t=_toIobject(e),this._i=0,this._k=t;},function(){var e=this._t,t=this._k,r=this._i++;return !e||r>=e.length?(this._t=void 0,_iterStep(1)):_iterStep(0,"keys"==t?r:"values"==t?e[r]:[r,e[r]])},"values");_iterators.Arguments=_iterators.Array;for(var TO_STRING_TAG=_wks("toStringTag"),DOMIterables="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),i=0;i<DOMIterables.length;i++){var NAME=DOMIterables[i],Collection=_global[NAME],proto=Collection&&Collection.prototype;proto&&!proto[TO_STRING_TAG]&&_hide(proto,TO_STRING_TAG,NAME),_iterators[NAME]=_iterators.Array;}var defer,channel,port,TAG$1=_wks("toStringTag"),ARG="Arguments"==_cof(function(){return arguments}()),tryGet=function(e,t){try{return e[t]}catch(e){}},_classof=function(e){var t,r,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=tryGet(t=Object(e),TAG$1))?r:ARG?_cof(t):"Object"==(o=_cof(t))&&"function"==typeof t.callee?"Arguments":o},_anInstance=function(e,t,r,o){if(!(e instanceof t)||void 0!==o&&o in e)throw TypeError(r+": incorrect invocation!");return e},_iterCall=function(t,e,r,o){try{return o?e(_anObject(r)[0],r[1]):e(r)}catch(e){var n=t.return;throw void 0!==n&&_anObject(n.call(t)),e}},ITERATOR$1=_wks("iterator"),ArrayProto=Array.prototype,_isArrayIter=function(e){return void 0!==e&&(_iterators.Array===e||ArrayProto[ITERATOR$1]===e)},ITERATOR$2=_wks("iterator"),core_getIteratorMethod=_core.getIteratorMethod=function(e){if(null!=e)return e[ITERATOR$2]||e["@@iterator"]||_iterators[_classof(e)]},_forOf=createCommonjsModule(function(e){var f={},p={},t=e.exports=function(e,t,r,o,n){var i,s,a,c,l=n?function(){return e}:core_getIteratorMethod(e),u=_ctx(r,o,t?2:1),_=0;if("function"!=typeof l)throw TypeError(e+" is not iterable!");if(_isArrayIter(l)){for(i=_toLength(e.length);_<i;_++)if((c=t?u(_anObject(s=e[_])[0],s[1]):u(e[_]))===f||c===p)return c}else for(a=l.call(e);!(s=a.next()).done;)if((c=_iterCall(a,u,s.value,t))===f||c===p)return c};t.BREAK=f,t.RETURN=p;}),SPECIES=_wks("species"),_speciesConstructor=function(e,t){var r,o=_anObject(e).constructor;return void 0===o||null==(r=_anObject(o)[SPECIES])?t:_aFunction(r)},_invoke=function(e,t,r){var o=void 0===r;switch(t.length){case 0:return o?e():e.call(r);case 1:return o?e(t[0]):e.call(r,t[0]);case 2:return o?e(t[0],t[1]):e.call(r,t[0],t[1]);case 3:return o?e(t[0],t[1],t[2]):e.call(r,t[0],t[1],t[2]);case 4:return o?e(t[0],t[1],t[2],t[3]):e.call(r,t[0],t[1],t[2],t[3])}return e.apply(r,t)},process=_global.process,setTask=_global.setImmediate,clearTask=_global.clearImmediate,MessageChannel=_global.MessageChannel,Dispatch=_global.Dispatch,counter=0,queue={},ONREADYSTATECHANGE="onreadystatechange",run=function(){var e=+this;if(queue.hasOwnProperty(e)){var t=queue[e];delete queue[e],t();}},listener=function(e){run.call(e.data);};setTask&&clearTask||(setTask=function(e){for(var t=[],r=1;r<arguments.length;)t.push(arguments[r++]);return queue[++counter]=function(){_invoke("function"==typeof e?e:Function(e),t);},defer(counter),counter},clearTask=function(e){delete queue[e];},"process"==_cof(process)?defer=function(e){process.nextTick(_ctx(run,e,1));}:Dispatch&&Dispatch.now?defer=function(e){Dispatch.now(_ctx(run,e,1));}:MessageChannel?(port=(channel=new MessageChannel).port2,channel.port1.onmessage=listener,defer=_ctx(port.postMessage,port,1)):_global.addEventListener&&"function"==typeof postMessage&&!_global.importScripts?(defer=function(e){_global.postMessage(e+"","*");},_global.addEventListener("message",listener,!1)):defer=ONREADYSTATECHANGE in _domCreate("script")?function(e){_html.appendChild(_domCreate("script"))[ONREADYSTATECHANGE]=function(){_html.removeChild(this),run.call(e);};}:function(e){setTimeout(_ctx(run,e,1),0);});var _task={set:setTask,clear:clearTask},macrotask=_task.set,Observer=_global.MutationObserver||_global.WebKitMutationObserver,process$1=_global.process,Promise$1=_global.Promise,isNode="process"==_cof(process$1),_microtask=function(){function e(){var e,t;for(isNode&&(e=process$1.domain)&&e.exit();r;){t=r.fn,r=r.next;try{t();}catch(e){throw r?n():o=void 0,e}}o=void 0,e&&e.enter();}var r,o,n;if(isNode)n=function(){process$1.nextTick(e);};else if(!Observer||_global.navigator&&_global.navigator.standalone)if(Promise$1&&Promise$1.resolve){var t=Promise$1.resolve(void 0);n=function(){t.then(e);};}else n=function(){macrotask.call(_global,e);};else {var i=!0,s=document.createTextNode("");new Observer(e).observe(s,{characterData:!0}),n=function(){s.data=i=!i;};}return function(e){var t={fn:e,next:void 0};o&&(o.next=t),r||(r=t,n()),o=t;}};function PromiseCapability(e){var r,o;this.promise=new e(function(e,t){if(void 0!==r||void 0!==o)throw TypeError("Bad Promise constructor");r=e,o=t;}),this.resolve=_aFunction(r),this.reject=_aFunction(o);}var f$1=function(e){return new PromiseCapability(e)},_newPromiseCapability={f:f$1},_perform=function(e){try{return {e:!1,v:e()}}catch(e){return {e:!0,v:e}}},navigator=_global.navigator,_userAgent=navigator&&navigator.userAgent||"",_promiseResolve=function(e,t){if(_anObject(e),_isObject(t)&&t.constructor===e)return t;var r=_newPromiseCapability.f(e);return (0, r.resolve)(t),r.promise},_redefineAll=function(e,t,r){for(var o in t)r&&e[o]?e[o]=t[o]:_hide(e,o,t[o]);return e},SPECIES$1=_wks("species"),_setSpecies=function(e){var t="function"==typeof _core[e]?_core[e]:_global[e];_descriptors&&t&&!t[SPECIES$1]&&_objectDp.f(t,SPECIES$1,{configurable:!0,get:function(){return this}});},ITERATOR$3=_wks("iterator"),SAFE_CLOSING=!1;try{var riter=[7][ITERATOR$3]();riter.return=function(){SAFE_CLOSING=!0;},Array.from(riter,function(){throw 2});}catch(e){}var Internal,newGenericPromiseCapability,OwnPromiseCapability,Wrapper,_iterDetect=function(e,t){if(!t&&!SAFE_CLOSING)return !1;var r=!1;try{var o=[7],n=o[ITERATOR$3]();n.next=function(){return {done:r=!0}},o[ITERATOR$3]=function(){return n},e(o);}catch(e){}return r},task=_task.set,microtask=_microtask(),PROMISE="Promise",TypeError$1=_global.TypeError,process$2=_global.process,versions=process$2&&process$2.versions,v8=versions&&versions.v8||"",$Promise=_global[PROMISE],isNode$1="process"==_classof(process$2),empty=function(){},newPromiseCapability=newGenericPromiseCapability=_newPromiseCapability.f,USE_NATIVE=!!function(){try{var e=$Promise.resolve(1),t=(e.constructor={})[_wks("species")]=function(e){e(empty,empty);};return (isNode$1||"function"==typeof PromiseRejectionEvent)&&e.then(empty)instanceof t&&0!==v8.indexOf("6.6")&&-1===_userAgent.indexOf("Chrome/66")}catch(e){}}(),isThenable=function(e){var t;return !(!_isObject(e)||"function"!=typeof(t=e.then))&&t},notify=function(u,r){if(!u._n){u._n=!0;var o=u._c;microtask(function(){for(var c=u._v,l=1==u._s,e=0,t=function(e){var t,r,o,n=l?e.ok:e.fail,i=e.resolve,s=e.reject,a=e.domain;try{n?(l||(2==u._h&&onHandleUnhandled(u),u._h=1),!0===n?t=c:(a&&a.enter(),t=n(c),a&&(a.exit(),o=!0)),t===e.promise?s(TypeError$1("Promise-chain cycle")):(r=isThenable(t))?r.call(t,i,s):i(t)):s(c);}catch(e){a&&!o&&a.exit(),s(e);}};o.length>e;)t(o[e++]);u._c=[],u._n=!1,r&&!u._h&&onUnhandled(u);});}},onUnhandled=function(i){task.call(_global,function(){var e,t,r,o=i._v,n=isUnhandled(i);if(n&&(e=_perform(function(){isNode$1?process$2.emit("unhandledRejection",o,i):(t=_global.onunhandledrejection)?t({promise:i,reason:o}):(r=_global.console)&&r.error&&r.error("Unhandled promise rejection",o);}),i._h=isNode$1||isUnhandled(i)?2:1),i._a=void 0,n&&e.e)throw e.v});},isUnhandled=function(e){return 1!==e._h&&0===(e._a||e._c).length},onHandleUnhandled=function(t){task.call(_global,function(){var e;isNode$1?process$2.emit("rejectionHandled",t):(e=_global.onrejectionhandled)&&e({promise:t,reason:t._v});});},$reject=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),notify(t,!0));},$resolve=function(e){var r,o=this;if(!o._d){o._d=!0,o=o._w||o;try{if(o===e)throw TypeError$1("Promise can't be resolved itself");(r=isThenable(e))?microtask(function(){var t={_w:o,_d:!1};try{r.call(e,_ctx($resolve,t,1),_ctx($reject,t,1));}catch(e){$reject.call(t,e);}}):(o._v=e,o._s=1,notify(o,!1));}catch(e){$reject.call({_w:o,_d:!1},e);}}};USE_NATIVE||($Promise=function(e){_anInstance(this,$Promise,PROMISE,"_h"),_aFunction(e),Internal.call(this);try{e(_ctx($resolve,this,1),_ctx($reject,this,1));}catch(e){$reject.call(this,e);}},(Internal=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1;}).prototype=_redefineAll($Promise.prototype,{then:function(e,t){var r=newPromiseCapability(_speciesConstructor(this,$Promise));return r.ok="function"!=typeof e||e,r.fail="function"==typeof t&&t,r.domain=isNode$1?process$2.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&notify(this,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),OwnPromiseCapability=function(){var e=new Internal;this.promise=e,this.resolve=_ctx($resolve,e,1),this.reject=_ctx($reject,e,1);},_newPromiseCapability.f=newPromiseCapability=function(e){return e===$Promise||e===Wrapper?new OwnPromiseCapability(e):newGenericPromiseCapability(e)}),_export(_export.G+_export.W+_export.F*!USE_NATIVE,{Promise:$Promise}),_setToStringTag($Promise,PROMISE),_setSpecies(PROMISE),Wrapper=_core[PROMISE],_export(_export.S+_export.F*!USE_NATIVE,PROMISE,{reject:function(e){var t=newPromiseCapability(this);return (0, t.reject)(e),t.promise}}),_export(_export.S+_export.F*_library,PROMISE,{resolve:function(e){return _promiseResolve(this===Wrapper?$Promise:this,e)}}),_export(_export.S+_export.F*!(USE_NATIVE&&_iterDetect(function(e){$Promise.all(e).catch(empty);})),PROMISE,{all:function(e){var s=this,t=newPromiseCapability(s),a=t.resolve,c=t.reject,r=_perform(function(){var o=[],n=0,i=1;_forOf(e,!1,function(e){var t=n++,r=!1;o.push(void 0),i++,s.resolve(e).then(function(e){r||(r=!0,o[t]=e,--i||a(o));},c);}),--i||a(o);});return r.e&&c(r.v),t.promise},race:function(e){var t=this,r=newPromiseCapability(t),o=r.reject,n=_perform(function(){_forOf(e,!1,function(e){t.resolve(e).then(r.resolve,o);});});return n.e&&o(n.v),r.promise}}),_export(_export.P+_export.R,"Promise",{finally:function(t){var r=_speciesConstructor(this,_core.Promise||_global.Promise),e="function"==typeof t;return this.then(e?function(e){return _promiseResolve(r,t()).then(function(){return e})}:t,e?function(e){return _promiseResolve(r,t()).then(function(){throw e})}:t)}}),_export(_export.S,"Promise",{try:function(e){var t=_newPromiseCapability.f(this),r=_perform(e);return (r.e?t.reject:t.resolve)(r.v),t.promise}}),getCjsExportFromNamespace(es6_object_toString);var promise=_core.Promise,promise$1=promise,_meta=createCommonjsModule(function(e){function r(e){t(e,o,{value:{i:"O"+ ++n,w:{}}});}var o=_uid("meta"),t=_objectDp.f,n=0,i=Object.isExtensible||function(){return !0},s=!_fails(function(){return i(Object.preventExtensions({}))}),a=e.exports={KEY:o,NEED:!1,fastKey:function(e,t){if(!_isObject(e))return "symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!_has(e,o)){if(!i(e))return "F";if(!t)return "E";r(e);}return e[o].i},getWeak:function(e,t){if(!_has(e,o)){if(!i(e))return !0;if(!t)return !1;r(e);}return e[o].w},onFreeze:function(e){return s&&a.NEED&&i(e)&&!_has(e,o)&&r(e),e}};}),_meta_1=_meta.KEY,_meta_2=_meta.NEED,_meta_3=_meta.fastKey,_meta_4=_meta.getWeak,_meta_5=_meta.onFreeze,f$2=_wks,_wksExt={f:f$2},defineProperty=_objectDp.f,_wksDefine=function(e){var t=_core.Symbol||(_core.Symbol={});"_"==e.charAt(0)||e in t||defineProperty(t,e,{value:_wksExt.f(e)});},f$3=Object.getOwnPropertySymbols,_objectGops={f:f$3},f$4={}.propertyIsEnumerable,_objectPie={f:f$4},_enumKeys=function(e){var t=_objectKeys(e),r=_objectGops.f;if(r)for(var o,n=r(e),i=_objectPie.f,s=0;n.length>s;)i.call(e,o=n[s++])&&t.push(o);return t},_isArray=Array.isArray||function(e){return "Array"==_cof(e)},hiddenKeys=_enumBugKeys.concat("length","prototype"),f$5=Object.getOwnPropertyNames||function(e){return _objectKeysInternal(e,hiddenKeys)},_objectGopn={f:f$5},gOPN=_objectGopn.f,toString$1={}.toString,windowNames="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],getWindowNames=function(e){try{return gOPN(e)}catch(e){return windowNames.slice()}},f$6=function(e){return windowNames&&"[object Window]"==toString$1.call(e)?getWindowNames(e):gOPN(_toIobject(e))},_objectGopnExt={f:f$6},gOPD=Object.getOwnPropertyDescriptor,f$7=_descriptors?gOPD:function(e,t){if(e=_toIobject(e),t=_toPrimitive(t,!0),_ie8DomDefine)try{return gOPD(e,t)}catch(e){}if(_has(e,t))return _propertyDesc(!_objectPie.f.call(e,t),e[t])},_objectGopd={f:f$7},META=_meta.KEY,gOPD$1=_objectGopd.f,dP$1=_objectDp.f,gOPN$1=_objectGopnExt.f,$Symbol=_global.Symbol,$JSON$1=_global.JSON,_stringify=$JSON$1&&$JSON$1.stringify,PROTOTYPE$2="prototype",HIDDEN=_wks("_hidden"),TO_PRIMITIVE=_wks("toPrimitive"),isEnum={}.propertyIsEnumerable,SymbolRegistry=_shared("symbol-registry"),AllSymbols=_shared("symbols"),OPSymbols=_shared("op-symbols"),ObjectProto$1=Object[PROTOTYPE$2],USE_NATIVE$1="function"==typeof $Symbol&&!!_objectGops.f,QObject=_global.QObject,setter=!QObject||!QObject[PROTOTYPE$2]||!QObject[PROTOTYPE$2].findChild,setSymbolDesc=_descriptors&&_fails(function(){return 7!=_objectCreate(dP$1({},"a",{get:function(){return dP$1(this,"a",{value:7}).a}})).a})?function(e,t,r){var o=gOPD$1(ObjectProto$1,t);o&&delete ObjectProto$1[t],dP$1(e,t,r),o&&e!==ObjectProto$1&&dP$1(ObjectProto$1,t,o);}:dP$1,wrap=function(e){var t=AllSymbols[e]=_objectCreate($Symbol[PROTOTYPE$2]);return t._k=e,t},isSymbol=USE_NATIVE$1&&"symbol"==typeof $Symbol.iterator?function(e){return "symbol"==typeof e}:function(e){return e instanceof $Symbol},$defineProperty=function(e,t,r){return e===ObjectProto$1&&$defineProperty(OPSymbols,t,r),_anObject(e),t=_toPrimitive(t,!0),_anObject(r),_has(AllSymbols,t)?(r.enumerable?(_has(e,HIDDEN)&&e[HIDDEN][t]&&(e[HIDDEN][t]=!1),r=_objectCreate(r,{enumerable:_propertyDesc(0,!1)})):(_has(e,HIDDEN)||dP$1(e,HIDDEN,_propertyDesc(1,{})),e[HIDDEN][t]=!0),setSymbolDesc(e,t,r)):dP$1(e,t,r)},$defineProperties=function(e,t){_anObject(e);for(var r,o=_enumKeys(t=_toIobject(t)),n=0,i=o.length;n<i;)$defineProperty(e,r=o[n++],t[r]);return e},$create=function(e,t){return void 0===t?_objectCreate(e):$defineProperties(_objectCreate(e),t)},$propertyIsEnumerable=function(e){var t=isEnum.call(this,e=_toPrimitive(e,!0));return !(this===ObjectProto$1&&_has(AllSymbols,e)&&!_has(OPSymbols,e))&&(!(t||!_has(this,e)||!_has(AllSymbols,e)||_has(this,HIDDEN)&&this[HIDDEN][e])||t)},$getOwnPropertyDescriptor=function(e,t){if(e=_toIobject(e),t=_toPrimitive(t,!0),e!==ObjectProto$1||!_has(AllSymbols,t)||_has(OPSymbols,t)){var r=gOPD$1(e,t);return !r||!_has(AllSymbols,t)||_has(e,HIDDEN)&&e[HIDDEN][t]||(r.enumerable=!0),r}},$getOwnPropertyNames=function(e){for(var t,r=gOPN$1(_toIobject(e)),o=[],n=0;r.length>n;)_has(AllSymbols,t=r[n++])||t==HIDDEN||t==META||o.push(t);return o},$getOwnPropertySymbols=function(e){for(var t,r=e===ObjectProto$1,o=gOPN$1(r?OPSymbols:_toIobject(e)),n=[],i=0;o.length>i;)!_has(AllSymbols,t=o[i++])||r&&!_has(ObjectProto$1,t)||n.push(AllSymbols[t]);return n};USE_NATIVE$1||(_redefine(($Symbol=function(e){if(this instanceof $Symbol)throw TypeError("Symbol is not a constructor!");var t=_uid(0<arguments.length?e:void 0),r=function(e){this===ObjectProto$1&&r.call(OPSymbols,e),_has(this,HIDDEN)&&_has(this[HIDDEN],t)&&(this[HIDDEN][t]=!1),setSymbolDesc(this,t,_propertyDesc(1,e));};return _descriptors&&setter&&setSymbolDesc(ObjectProto$1,t,{configurable:!0,set:r}),wrap(t)})[PROTOTYPE$2],"toString",function(){return this._k}),_objectGopd.f=$getOwnPropertyDescriptor,_objectDp.f=$defineProperty,_objectGopn.f=_objectGopnExt.f=$getOwnPropertyNames,_objectPie.f=$propertyIsEnumerable,_objectGops.f=$getOwnPropertySymbols,_descriptors&&!_library&&_redefine(ObjectProto$1,"propertyIsEnumerable",$propertyIsEnumerable),_wksExt.f=function(e){return wrap(_wks(e))}),_export(_export.G+_export.W+_export.F*!USE_NATIVE$1,{Symbol:$Symbol});for(var es6Symbols="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),j=0;es6Symbols.length>j;)_wks(es6Symbols[j++]);for(var wellKnownSymbols=_objectKeys(_wks.store),k=0;wellKnownSymbols.length>k;)_wksDefine(wellKnownSymbols[k++]);_export(_export.S+_export.F*!USE_NATIVE$1,"Symbol",{for:function(e){return _has(SymbolRegistry,e+="")?SymbolRegistry[e]:SymbolRegistry[e]=$Symbol(e)},keyFor:function(e){if(!isSymbol(e))throw TypeError(e+" is not a symbol!");for(var t in SymbolRegistry)if(SymbolRegistry[t]===e)return t},useSetter:function(){setter=!0;},useSimple:function(){setter=!1;}}),_export(_export.S+_export.F*!USE_NATIVE$1,"Object",{create:$create,defineProperty:$defineProperty,defineProperties:$defineProperties,getOwnPropertyDescriptor:$getOwnPropertyDescriptor,getOwnPropertyNames:$getOwnPropertyNames,getOwnPropertySymbols:$getOwnPropertySymbols});var FAILS_ON_PRIMITIVES=_fails(function(){_objectGops.f(1);});_export(_export.S+_export.F*FAILS_ON_PRIMITIVES,"Object",{getOwnPropertySymbols:function(e){return _objectGops.f(_toObject(e))}}),$JSON$1&&_export(_export.S+_export.F*(!USE_NATIVE$1||_fails(function(){var e=$Symbol();return "[null]"!=_stringify([e])||"{}"!=_stringify({a:e})||"{}"!=_stringify(Object(e))})),"JSON",{stringify:function(e){for(var t,r,o=[e],n=1;n<arguments.length;)o.push(arguments[n++]);if(r=t=o[1],(_isObject(t)||void 0!==e)&&!isSymbol(e))return _isArray(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!isSymbol(t))return t}),o[1]=t,_stringify.apply($JSON$1,o)}}),$Symbol[PROTOTYPE$2][TO_PRIMITIVE]||_hide($Symbol[PROTOTYPE$2],TO_PRIMITIVE,$Symbol[PROTOTYPE$2].valueOf),_setToStringTag($Symbol,"Symbol"),_setToStringTag(Math,"Math",!0),_setToStringTag(_global.JSON,"JSON",!0),_wksDefine("asyncIterator"),_wksDefine("observable");var args,symbol=_core.Symbol,symbol$1=symbol,gen=function(){return __generator(this,function(e){switch(e.label){case 0:return [4];case 1:return e.sent(),[2]}})};!function(){args=arguments;}();var typeMap={string:"",number:1,boolean:!0,null:null,undefined:void 0,symbol:symbol$1(1),array:[],arguments:args,object:{},regexp:/regexp/,date:new Date,function:function(){},promise:promise$1.resolve(void 0),generatorfunction:gen,generator:gen(),asyncfunction:function(){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(e){return [2]})})}};function isType(r){return function(e){if("object"!=typeof e)return typeof e===r.toLowerCase();var t=Object.prototype.toString.call(e).length-1;return Object.prototype.toString.call(e).slice(8,t).toLowerCase()===r.toLowerCase()}}_export(_export.S,"Date",{now:function(){return (new Date).getTime()}});var logLevelSet,now=_core.Date.now,now$1=now;function getTs(){return now$1&&+now$1()||(new Date).getTime()}function getLocalDate(e){void 0===e&&(e=getTs());var t=new Date(e),r=t.getTimezoneOffset(),o={year:t.getFullYear()+"",month:t.getMonth()+1+"",day:t.getDate()+"",hour:t.getHours()+"",minute:t.getMinutes()+"",second:t.getSeconds()+"",timezone:Math.abs(r)/60+""};for(var n in o)if(Object.prototype.hasOwnProperty.call(o,n)){var i=o[n];i.length<=1&&(o[n]="0"+i);}return o.month+"/"+o.day+"/"+o.year+" "+o.hour+":"+o.minute+":"+o.second+" GMT"+(0<r?"-":"+")+o.timezone+"00"}!function(e){e[e.detail=0]="detail",e[e.info=1]="info",e[e.warn=2]="warn",e[e.error=3]="error",e[e.success=4]="success",e[e.silent=5]="silent";}(logLevelSet=logLevelSet||{});var colorPlates={log:"color: #1f132b; background-color: #f0f0f0",info:"color: white; background-color: #2274A5",warn:"color: #494008; background-color: #e7c60c",error:"color: white; background-color: #D33F49",success:"color: white; background-color: #95B46A"},nodeColorPlates={font:{log:"[30m",info:"[37m",warn:"[30m",error:"[37m",success:"[37m"},bg:{log:"[47m",info:"[44m",warn:"[43m",error:"[41m",success:"[42m"}},Logger=function(){function e(e){void 0===e&&(e={}),this.debug=e.debug||!1,this.logLevel=+(e.logLevel&&""+logLevelSet[e.logLevel]||logLevelSet.warn),this.logPrefix=e.logPrefix||"Peeler-Js",this._logOptimize=this._logOptimize.bind(this);}return e.prototype.setPrefix=function(e){return e&&"string"==typeof e&&(this.logPrefix=e),this},e.prototype.setLevel=function(e){return e&&void 0!==logLevelSet[e]&&(this.logLevel=logLevelSet[e]),this},e.prototype.setDebug=function(e){return "boolean"==typeof e&&(this.debug=e),this},e.prototype.detail=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.logLevel!==logLevelSet.silent&&this.logLevel===logLevelSet.detail;this.debug&&r&&this._logOptimize.apply(this,__spreadArrays(["log"],e));},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.detail.apply(this,e);},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.logLevel!==logLevelSet.silent&&this.logLevel!==logLevelSet.error&&this.logLevel!==logLevelSet.warn;this.debug&&r&&this._logOptimize.apply(this,__spreadArrays(["info"],e));},e.prototype.logInfo=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.info.apply(this,e);},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.logLevel!==logLevelSet.silent&&this.logLevel!==logLevelSet.error;this.debug&&r&&this._logOptimize.apply(this,__spreadArrays(["warn"],e));},e.prototype.logWarn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.warn.apply(this,e);},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.logLevel!==logLevelSet.silent;this.debug&&r&&this._logOptimize.apply(this,__spreadArrays(["error"],e));},e.prototype.logErr=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.error.apply(this,e);},e.prototype.success=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.logLevel!==logLevelSet.silent;this.debug&&r&&this._logOptimize.apply(this,__spreadArrays(["success"],e));},e.prototype._logOptimize=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var o="undefined"!=typeof window,n="success"===e?console.log.bind(console):console[e].bind(console),i=o?["%c "+e.charAt(0).toUpperCase()+e.slice(1)+" ",colorPlates[e]]:[""+nodeColorPlates.font[e]+nodeColorPlates.bg[e]+"%s[0m"," "+e.charAt(0).toUpperCase()+e.slice(1)+" "],s=t.every(function(e){return isType("object")(e)||isType("array")(e)});try{if(console.table&&s)return n.apply(void 0,__spreadArrays(i,["["+this.logPrefix+"] ("+getLocalDate()+"):"])),void console.table(t)}catch(e){}t=t.map(function(e){if(isType("object")(e)||isType("array")(e))try{return stringify$1(e)}catch(e){}return e}),n.apply(void 0,__spreadArrays(i,["["+this.logPrefix+"]:"],t,["("+getLocalDate()+")"]));},e}();exports.Logger=Logger,exports.default=Logger;
});var logger$1 = new logger.Logger({
  debug: true,
  logLevel: 'detail',
  logPrefix: getPrefix()
});

function getPrefix(scope, suffix) {
  var str = 'Mixin-JSBridge';

  if (scope && suffix) {
    var _context, _context2;

    str = concat$2(_context = concat$2(_context2 = "".concat(str, " ")).call(_context2, scope, "-")).call(_context, suffix);
  } else if (scope) {
    var _context3;

    str = concat$2(_context3 = "".concat(str, " ")).call(_context3, scope);
  } else if (suffix) {
    var _context4;

    str = concat$2(_context4 = "".concat(str, " ")).call(_context4, suffix);
  }

  return str;
}

function getLogger(scope) {
  return function (suffix) {
    return logger$1.setPrefix(getPrefix(scope, suffix));
  };
}var getUA_1 = createCommonjsModule(function (module, exports) {
function getUA(e){if(!e)return null;function i(i){return i.test(e)}function o(i){var e="";if(/(iPhone\/)?iPhone\s?X/.test(i))e="iPhoneX";else if(/iPhone/.test(i)&&"undefined"!=typeof screen){var o=screen.height,r=screen.width;812===o||812===r?e="iPhoneX":896!==o&&896!==r||(e="iPhoneXR",devicePixelRatio&&3===devicePixelRatio&&(e="iPhoneXSMax"));}return e}return {isAndroid:i(/android|linux|adr/i),isIOS:i(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),isWindows:i(/window/i),isMac:i(/mac os x/i),isIPad:i(/iPad/i),isMobile:i(/AppleWebKit.*Mobile.*|Mobile/i),isWebKit:i(/webkit\W/i),isChrome:i(/webkit\W.*(chrome|chromium)\W/i),isFirefox:i(/mozilla.*\Wfirefox\W/i),isGecko:i(/mozilla(?!.*webkit).*\Wgecko\W/i),is360se:i(/360/i),isIE:"undefined"!=typeof window&&"Microsoft Internet Explorer"===navigator.appName||!!i(/\bTrident\b/),isEdge:i(/\bEdge\b/i),isOpera:i(/opera.*\Wpresto\W|OPR/i),isSafari:i(/webkit\W(?!.*chrome).*safari\W/i),isUCBrowser:i(/ucbrowser/i),isBaiduBrowser:i(/bidubrowser/i),isSougouBrowser:i(/metasr/i),isLiebaoBrowser:i(/lbbrowser/i),isWeixin:i(/micromessenger/i),isSinaWeibo:i(/weibo/i),isQQ:i(/qq/i),isQQWeibo:i(/tencentmicroblog/i),isFacebook:i(/fban/i),isTwitter:i(/twitter/i),isInstagram:i(/instagram/i),isIphoneX:"iPhoneX"==o(e),isIPhoneXR:"iPhoneXR"==o(e),isIPhoneXSMax:"iPhoneXSMax"==o(e)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=getUA,exports.getUA=getUA;
});function env() {
  var _a;

  var ua = (_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent;
  return assign$2({}, getUA_1.getUA(ua));
}var logger$2 = getLogger('strToUnitArray');
function strToUnitArray(str) {
  if (typeof Uint8Array === 'undefined') {
    logger$2().warn('Your browser not support Unit8Array!');
    return null;
  }

  try {
    var ret = new Uint8Array(str.length);

    for (var i = 0; i < ret.length; i++) {
      ret[i] = str.charCodeAt(i);
    }

    return ret;
  } catch (err) {
    logger$2().warn(err);
    return null;
  }
}function parseError(err) {
  var _a, _b, _c;

  var name = err === null || err === void 0 ? void 0 : err.name;
  var message = (_c = (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : (_b = err === null || err === void 0 ? void 0 : err.toString) === null || _b === void 0 ? void 0 : _b.call(err)) !== null && _c !== void 0 ? _c : err;
  var stack = err === null || err === void 0 ? void 0 : err.stack;
  return {
    name: name,
    message: message,
    stack: stack
  };
}var bind$4 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString$1 = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray$1(val) {
  return toString$1.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString$1.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject$1(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString$1.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString$1.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString$1.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString$1.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString$1.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject$1(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim$1(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray$1(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray$1(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind$4(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray$1,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject$1,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim$1,
  stripBOM: stripBOM
};function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind$4(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var _default = axios;
axios_1.default = _default;var axios$1 = axios_1;/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
var addListener = (function () {
    if (typeof window === 'undefined')
        return function () { };
    if (!window.addEventListener) {
        return function (event, fn, dom) {
            var eventDOM = dom || window;
            eventDOM.attachEvent("on" + event, fn);
        };
    }
    return function (event, fn, dom, option) {
        if (option === void 0) { option = {}; }
        var eventDOM = dom || window;
        var _a = option.capture, capture = _a === void 0 ? false : _a, _b = option.passive, passive = _b === void 0 ? false : _b, _c = option.once, once = _c === void 0 ? false : _c;
        eventDOM.addEventListener(event, fn, {
            capture: capture,
            passive: passive,
            once: once
        });
    };
})();/**
 * copy text to clipboard method
 * @param {string} text the content for copy
 * @param {function} cb the callback for copy result
 * @return {void}
 */
var clipboard = function (text, cb) {
    if (typeof window === 'undefined' || typeof text === 'undefined' || ('' + text) === 'null')
        return;
    var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    var fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt';
    // Reset box model
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute';
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = yPosition + "px";
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = '' + text;
    document.body.appendChild(fakeElem);
    // make selection
    fakeElem.select();
    fakeElem.setSelectionRange(0, fakeElem.value.length);
    var succeeded;
    try {
        succeeded = document.execCommand('copy');
    }
    catch (error) {
        succeeded = false;
    }
    cb && cb(succeeded);
    // remove the selection
    var getSelection = window.getSelection();
    getSelection && getSelection.removeAllRanges();
    document.body.removeChild(fakeElem);
    fakeElem = null;
};/**
 *
 * @param {any} x The object which will compare with another(y)
 * @param {any} y The object which will compare with another(x)
 * @return {boolean} whether or not x and y is equal
 */
function compare(x, y) {
    var p;
    // NaN eq NaN
    if (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y)) {
        return true;
    }
    // strict equal
    if (x === y) {
        return true;
    }
    // both function / regExp / either String or Number compare with toString
    if ((typeof x === 'function' && typeof y === 'function') || (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String || y instanceof String) ||
        (x instanceof Number || y instanceof Number)) {
        return x.toString() === y.toString();
    }
    // Date instance compare with millisecond
    if (x instanceof Date && y instanceof Date) {
        return x.getTime() === y.getTime();
    }
    // In this process, the two element must be Object instance
    if (!(x instanceof Object && y instanceof Object)) {
        return false;
    }
    // prototype must eq
    if (x.prototype !== y.prototype) {
        return false;
    }
    // constructor must eq
    if (x.constructor !== y.constructor) {
        return false;
    }
    // reference must eq
    for (p in y) {
        if (!x.hasOwnProperty(p)) {
            return false;
        }
    }
    for (p in x) {
        // reference must eq
        if (!y.hasOwnProperty(p)) {
            return false;
        }
        // reference type must eq
        if (typeof y[p] !== typeof x[p]) {
            return false;
        }
        // recursion compare
        if (!compare(x[p], y[p])) {
            return false;
        }
    }
    return true;
}/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$1(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}function compatCheck(type) {
    var res = true;
    try {
        switch (type) {
            case 'generator':
                var genFn = function () {
                    return __generator$1(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, true];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                var gen = genFn();
                gen.next();
                break;
            case 'promise':
                Promise.resolve(true);
                break;
            case 'async':
                var asyncFn = function () {
                    return __awaiter$1(this, void 0, void 0, function () {
                        var res;
                        return __generator$1(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.resolve(true).then(function (res) { return res; })];
                                case 1:
                                    res = _a.sent();
                                    return [2 /*return*/, res];
                            }
                        });
                    });
                };
                asyncFn();
                break;
        }
    }
    catch (error) {
        res = false;
    }
    return res;
}/**
 * get cookie by appoint name and cookie str
 * @param {string} name
 * @param {string} cookie
 * @return {string | null}
 */
function handleCookie(name, cookie) {
    if (cookie) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        var cookArr = cookie.match(reg);
        if (cookArr && cookArr[2]) {
            return unescape(cookArr[2]);
        }
    }
    return null;
}
/**
 * get cookie
 * @param {string} name
 * @param {string} cookie
 * @return {string | null}
 */
function getCookie(name, cookie) {
    return handleCookie(name, cookie || (typeof window !== 'undefined' ? document.cookie : ''));
}/**
 * polyfill ES5 character - Date.now
 */
function getTs() {
    return (Date.now && +Date.now()) || new Date().getTime();
}function getLocalDate(ts) {
    if (ts === void 0) { ts = getTs(); }
    var date = new Date(ts);
    var tz = date.getTimezoneOffset();
    var dateMap = {
        year: date.getFullYear() + '',
        month: date.getMonth() + 1 + '',
        day: date.getDate() + '',
        hour: date.getHours() + '',
        minute: date.getMinutes() + '',
        second: date.getSeconds() + '',
        timezone: Math.abs(tz) / 60 + ''
    };
    for (var k in dateMap) {
        if (Object.prototype.hasOwnProperty.call(dateMap, k)) {
            var item = dateMap[k];
            if (item.length <= 1) {
                dateMap[k] = "0" + item;
            }
        }
    }
    return dateMap.month + "/" + dateMap.day + "/" + dateMap.year + " " + dateMap.hour + ":" + dateMap.minute + ":" + dateMap.second + " GMT" + (tz > 0 ? '-' : '+') + dateMap.timezone + "00";
}/**
 * get element type
 * @param {any} ele the target element
 * @return {string} the element type
 */
var getType = function (ele) {
    if (typeof ele !== 'object')
        return typeof ele;
    if (!ele)
        return 'null'; // fix typeof null === 'object' problem
    var len = Object.prototype.toString.call(ele).length - 1;
    return Object.prototype.toString.call(ele).slice(8, len).toLowerCase();
};function getUA(u) {
    if (!u)
        return null;
    function check(pattern) {
        return (pattern).test(u);
    }
    function parseIPhoneX(u) {
        var model = '';
        if (/(iPhone\/)?iPhone\s?X/.test(u)) { // 通过UA判断
            model = 'iPhoneX';
        }
        else { // 浏览器中无法通过UA检测出iphonex系列
            if (/iPhone/.test(u)) { // 通过ua加屏幕宽高判断
                // https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/
                // iPhone X      @3x 1125px × 2436px => 375px x 812px
                // iPhone XS     @3x 1125px × 2436px => 375px x 812px
                // iPhone XS Max @3x 1242px × 2688px => 414px x 896px
                // iPhone XR     @2x 828px × 1792px  => 414px x 896px
                // Portrait/Landscape
                if (typeof screen !== 'undefined') {
                    var screenHeight = screen.height;
                    var screenWidth = screen.width;
                    if (screenHeight === 812 || screenWidth === 812) { // iPhoneX/iPhoneXS
                        model = 'iPhoneX';
                    }
                    else if (screenHeight === 896 || screenWidth === 896) { // iPhoneXR/iPhoneXSMax
                        model = 'iPhoneXR';
                        if (devicePixelRatio) {
                            if (devicePixelRatio === 3) {
                                model = 'iPhoneXSMax';
                            }
                        }
                    }
                }
            }
        }
        return model;
    }
    var UA = {
        isAndroid: check(/android|linux|adr/i),
        isIOS: check(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
        isWindows: check(/window/i),
        isMac: check(/mac os x/i),
        isIPad: check(/iPad/i),
        isMobile: check(/AppleWebKit.*Mobile.*|Mobile/i),
        isWebKit: check(/webkit\W/i),
        isChrome: check(/webkit\W.*(chrome|chromium)\W/i),
        isFirefox: check(/mozilla.*\Wfirefox\W/i),
        isGecko: check(/mozilla(?!.*webkit).*\Wgecko\W/i),
        is360se: check(/360/i),
        isIE: (function () {
            if (typeof window !== 'undefined' && navigator.appName === 'Microsoft Internet Explorer') {
                return true;
            }
            else if (check(/\bTrident\b/)) {
                return true;
            }
            else {
                return false;
            }
        })(),
        isEdge: check(/\bEdge\b/i),
        isOpera: check(/opera.*\Wpresto\W|OPR/i),
        isSafari: check(/webkit\W(?!.*chrome).*safari\W/i),
        isUCBrowser: check(/ucbrowser/i),
        isBaiduBrowser: check(/bidubrowser/i),
        isSougouBrowser: check(/metasr/i),
        isLiebaoBrowser: check(/lbbrowser/i),
        isWeixin: check(/micromessenger/i),
        isSinaWeibo: check(/weibo/i),
        isQQ: check(/qq/i),
        isQQWeibo: check(/tencentmicroblog/i),
        isFacebook: check(/fban/i),
        isTwitter: check(/twitter/i),
        isInstagram: check(/instagram/i),
        isIphoneX: parseIPhoneX(u) == 'iPhoneX' ? true : false,
        isIPhoneXR: parseIPhoneX(u) == 'iPhoneXR' ? true : false,
        isIPhoneXSMax: parseIPhoneX(u) == 'iPhoneXSMax' ? true : false,
    };
    return UA;
}function firstLetter(str, option) {
    if (!str)
        return str;
    var _a = str.split(''), first = _a[0], rest = _a.slice(1);
    if (!option || option.include === true)
        return first;
    if (option.include === false)
        return rest.join('');
    return first[option.case === 'upper' ? 'toUpperCase' : 'toLowerCase']() + rest.join('');
}
function lastLetter(str, option) {
    if (!str)
        return str;
    var _a = str.split('').reverse(), last = _a[0], rest = _a.slice(1);
    if (!option || option.include === true)
        return last;
    if (option.include === false)
        return rest.join('');
    return rest.reverse().join('') + last[option.case === 'upper' ? 'toUpperCase' : 'toLowerCase']();
}var _this = undefined;
var gen$1 = function () {
    return __generator$1(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var args$1;
(function () { args$1 = arguments; })();
var typeMap$1 = {
    string: '',
    number: 1,
    boolean: true,
    null: null,
    undefined: undefined,
    symbol: Symbol(1),
    array: [],
    arguments: args$1,
    object: {},
    regexp: /regexp/,
    date: new Date(),
    function: function () { },
    promise: Promise.resolve(void (0)),
    generatorfunction: gen$1,
    generator: gen$1(),
    asyncfunction: function () { return __awaiter$1(_this, void 0, void 0, function () { return __generator$1(this, function (_a) {
        return [2 /*return*/];
    }); }); }
};
/**
 * judgement ele type
 * @param {string} type the string of ele type for judgement
 * @param {any} ele the target element
 * @return {boolean} whether or not ele pair with type
 */
function isType(type) {
    return function (ele) {
        if (typeof ele !== 'object')
            return typeof ele === type.toLowerCase();
        var len = Object.prototype.toString.call(ele).length - 1;
        return Object.prototype.toString.call(ele).slice(8, len).toLowerCase() === type.toLowerCase();
    };
}/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
var removeListener = (function () {
    if (typeof window === 'undefined')
        return function () { };
    if (!window.removeEventListener) {
        return function (event, fn, dom) {
            var eventDOM = dom || window;
            eventDOM.detachEvent("on" + event, fn);
        };
    }
    return function (event, fn, dom, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var eventDOM = dom || window;
        eventDOM.removeEventListener(event, fn, useCapture);
    };
})();var listener_resize, listener_focus, listener_blur = null;
function listenKeyboard(node, onRise, onFold) {
    if (typeof window === 'undefined')
        return;
    var _a = getUA(window.navigator.userAgent), isAndroid = _a.isAndroid, isIOS = _a.isIOS;
    var env = {
        isIOS: isIOS,
        isAndroid: isAndroid
    };
    if (isAndroid) {
        var originHeight_1 = document.documentElement.clientHeight || document.body.clientHeight;
        listener_resize = function () {
            var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (originHeight_1 < resizeHeight) {
                // Android 键盘收起
                onFold && onFold(env);
            }
            else {
                // Android 键盘弹起
                onRise && onRise(env);
            }
            originHeight_1 = resizeHeight;
        };
        addListener('resize', listener_resize, window);
    }
    if (isIOS) {
        listener_focus = function () {
            // IOS 键盘弹起
            onRise && onRise(env);
        };
        addListener('focus', listener_focus, node);
        listener_blur = function () {
            // IOS 键盘收起
            onFold && onFold(env);
        };
        addListener('blur', listener_blur, node);
    }
}
function clearKeyboardListener(node) {
    if (typeof window === 'undefined')
        return;
    var _a = getUA(window.navigator.userAgent), isAndroid = _a.isAndroid, isIOS = _a.isIOS;
    if (isAndroid && listener_resize) {
        removeListener('resize', listener_resize, window);
    }
    if (isIOS && listener_focus && listener_blur) {
        removeListener('focus', listener_focus, node);
        removeListener('blur', listener_blur, node);
    }
}var logLevelSet$1;
(function (logLevelSet) {
    logLevelSet[logLevelSet["detail"] = 0] = "detail";
    logLevelSet[logLevelSet["info"] = 1] = "info";
    logLevelSet[logLevelSet["warn"] = 2] = "warn";
    logLevelSet[logLevelSet["error"] = 3] = "error";
    logLevelSet[logLevelSet["success"] = 4] = "success";
    logLevelSet[logLevelSet["silent"] = 5] = "silent";
})(logLevelSet$1 || (logLevelSet$1 = {}));
var colorPlates = {
    log: 'color: #1f132b; background-color: #f0f0f0',
    info: 'color: white; background-color: #2274A5',
    warn: 'color: #494008; background-color: #e7c60c',
    error: 'color: white; background-color: #D33F49',
    success: 'color: white; background-color: #95B46A'
};
var nodeColorPlates = {
    font: {
        log: '\x1b[30m',
        info: '\x1b[37m',
        warn: '\x1b[30m',
        error: '\x1b[37m',
        success: '\x1b[37m'
    },
    bg: {
        log: '\x1b[47m',
        info: '\x1b[44m',
        warn: '\x1b[43m',
        error: '\x1b[41m',
        success: '\x1b[42m'
    }
};
var Logger = /** @class */ (function () {
    function Logger(config) {
        if (config === void 0) { config = {}; }
        this.debug = config.debug || false;
        this.logLevel = +(config.logLevel && '' + logLevelSet$1[config.logLevel] || logLevelSet$1['warn']);
        this.logPrefix = config.logPrefix || 'Peeler-Js';
        this._logOptimize = this._logOptimize.bind(this);
    }
    Logger.prototype.setPrefix = function (prefix) {
        if (prefix && typeof prefix === 'string') {
            this.logPrefix = prefix;
        }
        return this;
    };
    Logger.prototype.setLevel = function (level) {
        if (level && logLevelSet$1[level] !== void 0) {
            this.logLevel = logLevelSet$1[level];
        }
        return this;
    };
    Logger.prototype.setDebug = function (isDebug) {
        if (typeof isDebug === 'boolean') {
            this.debug = isDebug;
        }
        return this;
    };
    /**
     * detail logger
     * @param {string | Record<string, any> | Array<any>} detail the log message
     *
     * @return {void}
     */
    Logger.prototype.detail = function () {
        var detail = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            detail[_i] = arguments[_i];
        }
        var canLog = this.logLevel !== logLevelSet$1['silent'] && this.logLevel === logLevelSet$1['detail'];
        this.debug && canLog && this._logOptimize.apply(this, ['log'].concat(detail));
    };
    Logger.prototype.log = function () {
        var detail = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            detail[_i] = arguments[_i];
        }
        this.detail.apply(this, detail);
    };
    /**
     * info logger
     * @param {string | Record<string, any> | Array<any>} info the log message
     *
     * @return {void}
     */
    Logger.prototype.info = function () {
        var info = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            info[_i] = arguments[_i];
        }
        var canLog = this.logLevel !== logLevelSet$1['silent'] && this.logLevel !== logLevelSet$1['error'] && this.logLevel !== logLevelSet$1['warn'];
        this.debug && canLog && this._logOptimize.apply(this, ['info'].concat(info));
    };
    Logger.prototype.logInfo = function () {
        var info = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            info[_i] = arguments[_i];
        }
        this.info.apply(this, info);
    };
    /**
     * warn logger
     * @param {string | Record<string, any> | Array<any>} warn the warn log message
     *
     * @return {void}
     */
    Logger.prototype.warn = function () {
        var warn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            warn[_i] = arguments[_i];
        }
        var canLog = this.logLevel !== logLevelSet$1['silent'] && this.logLevel !== logLevelSet$1['error'];
        this.debug && canLog && this._logOptimize.apply(this, ['warn'].concat(warn));
    };
    Logger.prototype.logWarn = function () {
        var warn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            warn[_i] = arguments[_i];
        }
        this.warn.apply(this, warn);
    };
    /**
     * error logger
     * @param {string | Record<string, any> | Array<any>} error the error log message
     *
     * @return {void}
     */
    Logger.prototype.error = function () {
        var error = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            error[_i] = arguments[_i];
        }
        var canLog = this.logLevel !== logLevelSet$1['silent'];
        this.debug && canLog && this._logOptimize.apply(this, ['error'].concat(error));
    };
    Logger.prototype.logErr = function () {
        var error = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            error[_i] = arguments[_i];
        }
        this.error.apply(this, error);
    };
    /**
     * success logger
     * @param {string | Record<string, any> | Array<any>} error the error log message
     *
     * @return {void}
     */
    Logger.prototype.success = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        var canLog = this.logLevel !== logLevelSet$1['silent'];
        this.debug && canLog && this._logOptimize.apply(this, ['success'].concat(msg));
    };
    /**
     * console logger optimize
     * @param {string | Record<string, any> | Array<any>} msg the log message
     * @param {string} method the logger method in console Object
     *
     * @return {void}
     */
    Logger.prototype._logOptimize = function (method) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        var inBrowser = typeof window !== 'undefined';
        // eslint-disable-next-line no-console
        var logger = method === 'success' ? console.log.bind(console) : console[method].bind(console);
        var prefix = inBrowser ? ["%c " + method.charAt(0).toUpperCase() + method.slice(1) + " ", colorPlates[method]] : ["" + nodeColorPlates.font[method] + nodeColorPlates.bg[method] + "%s\u001B[0m", " " + method.charAt(0).toUpperCase() + method.slice(1) + " "];
        var canTable = msg.every(function (v) { return isType('object')(v) || isType('array')(v); });
        try {
            if (console.table && canTable) {
                logger.apply(void 0, prefix.concat(["[" + this.logPrefix + "] (" + getLocalDate() + "):"]));
                console.table(msg);
                return;
            }
        }
        catch (e) { }
        msg = msg.map(function (m) {
            if (isType('object')(m) || isType('array')(m)) {
                try {
                    return JSON.stringify(m);
                }
                catch (e) { }
            }
            return m;
        });
        logger.apply(void 0, prefix.concat(["[" + this.logPrefix + "]:"], msg, ["(" + getLocalDate() + ")"]));
    };
    return Logger;
}());function isNumLike(value) {
    // exclude empty string
    if (typeof value === 'string' && value !== '0' && +value === 0)
        return false;
    return !isNaN('' + value);
}
function numLikeToNum(value) {
    // exclude empty string
    if (typeof value === 'string' && value !== '0' && +value === 0)
        return value;
    return !isNaN('' + value) ? +value : value;
}var parseUrl$1 = (function () {
    if (typeof window === 'undefined')
        return function (url) { return url; };
    var HTTP_PORT = '80';
    var HTTPS_PORT = '443';
    var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');
    var a = document.createElement('a');
    var cache = {};
    /**
     * Parses the given url and returns an object mimicing a `Location` object.
     * @param {string} url The url to parse.
     * @return {!Object} An object with the same properties as a `Location`.
     */
    return function parse_url(url) {
        // All falsy values (as well as ".") should map to the current URL.
        url = (!url || url === '.') ? location.href : url;
        if (cache[url])
            return cache[url];
        a.href = url;
        // When parsing file relative paths (e.g. `../index.html`), IE will correctly
        // resolve the `href` property but will keep the `..` in the `path` property.
        // It will also not include the `host` or `hostname` properties. Furthermore,
        // IE will sometimes return no protocol or just a colon, especially for things
        // like relative protocol URLs (e.g. "//google.com").
        // To workaround all of these issues, we reparse with the full URL from the
        // `href` property.
        if (url.charAt(0) === '.' || url.charAt(0) === '/')
            return parse_url(a.href);
        // Don't include default ports.
        var port = (a.port == HTTP_PORT || a.port == HTTPS_PORT) ? '' : a.port;
        // PhantomJS sets the port to "0" when using the file: protocol.
        port = port === '0' ? '' : port;
        // Sometimes IE incorrectly includes a port for default ports
        // (e.g. `:80` or `:443`) even when no port is specified in the URL.
        // http://bit.ly/1rQNoMg
        var host = a.host.replace(DEFAULT_PORT, '');
        // Not all browser support `origin` so we have to build it.
        var origin = a.origin ? a.origin : a.protocol + '//' + host;
        // Sometimes IE doesn't include the leading slash for pathname.
        // http://bit.ly/1rQNoMg
        var pathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname;
        return cache[url] = {
            hash: a.hash,
            host: host,
            hostname: a.hostname,
            href: a.href,
            origin: origin,
            pathname: pathname,
            port: port,
            protocol: a.protocol,
            search: a.search,
        };
    };
})();/**
 * @param {event} event event object
 */
var preventEvent = function (event) {
    var e = event || (typeof window !== 'undefined' && window.event);
    if (!e)
        return;
    if (e.preventDefault) {
        e.cancelable && !e.defaultPrevented && e.preventDefault();
    }
    else {
        e.returnValue = false;
    }
    return false;
};/**
 * @param {event} event event object
 */
var stopEvent = function (event) {
    var e = event || (typeof window !== 'undefined' && window.event);
    if (!e)
        return;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
};var storage = (function () {
    if (typeof window === 'undefined')
        return {
            get: function () { return null; },
            set: function () { return false; },
            clear: function () { return false; }
        };
    var handleStorage = {
        sessionStorage: {
            set: function (key, val) {
                var res;
                try {
                    if (!window.sessionStorage)
                        throw false;
                    window.sessionStorage.setItem(key, val);
                    res = true;
                }
                catch (err) {
                    res = false;
                }
                return res;
            },
            get: function (key) {
                var res;
                try {
                    if (!window.sessionStorage)
                        throw false;
                    res = window.sessionStorage.getItem(key);
                }
                catch (err) {
                    res = null;
                }
                return res;
            },
            clear: function (key) {
                var res;
                try {
                    if (!window.sessionStorage)
                        throw false;
                    window.sessionStorage.removeItem(key);
                    res = true;
                }
                catch (err) {
                    res = false;
                }
                return res;
            }
        },
        localStorage: {
            set: function (key, val) {
                var res;
                try {
                    if (!window.localStorage)
                        throw false;
                    window.localStorage.setItem(key, val);
                    res = true;
                }
                catch (err) {
                    res = false;
                }
                return res;
            },
            get: function (key) {
                var res;
                try {
                    if (!window.localStorage)
                        throw false;
                    res = window.localStorage.getItem(key);
                }
                catch (err) {
                    res = null;
                }
                return res;
            },
            clear: function (key) {
                var res;
                try {
                    if (!window.localStorage)
                        throw false;
                    window.localStorage.removeItem(key);
                    res = true;
                }
                catch (err) {
                    res = false;
                }
                return res;
            }
        },
        cookie: {
            set: function (key, val, option) {
                var res;
                try {
                    var _a = option || {}, _b = _a.domain, domain = _b === void 0 ? '' : _b, _c = _a.path, path = _c === void 0 ? '/' : _c, _d = _a.expires, expires = _d === void 0 ? 0 : _d, _e = _a.secure, secure = _e === void 0 ? false : _e;
                    var ts = void 0;
                    if (expires >= 0) {
                        ts = new Date();
                        ts.setTime(ts.getTime() + expires * 1000);
                    }
                    document.cookie = key + "=" + val + ";" + (domain ? "domain=" + domain + ";" : '') + (path ? "path=" + path + ";" : '') + (expires ? "expires=" + (ts ? ts.toUTCString() : '') + ";" : '') + (secure ? 'secure' : '');
                    res = true;
                }
                catch (err) {
                    res = false;
                }
                return res;
            },
            get: function (key) {
                var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
                var cookArr = document.cookie.match(reg);
                if (cookArr && cookArr[2]) {
                    return unescape(cookArr[2]);
                }
                return null;
            },
            clear: function (key, domain) {
                document.cookie = key + "=\"\";" + (domain ? "domain=" + domain + ";" : '') + "max-age=-1";
                var res = handleStorage.cookie.get(key);
                return !res;
            }
        },
        get: function (key, storeType) {
            try {
                if (typeof storeType === 'string' && handleStorage[storeType]) {
                    return handleStorage[storeType].get(key);
                }
                return this.cookie.get(key) || this.localStorage.get(key) || this.sessionStorage.get(key);
            }
            catch (e) {
                return null;
            }
        },
        set: function (key, val, storeType, option) {
            var res;
            try {
                if (typeof storeType === 'string' && handleStorage[storeType]) {
                    res = handleStorage[storeType].set(key, val, option);
                }
                else if (option) {
                    res = handleStorage.cookie.set(key, val, option);
                }
                else {
                    res = handleStorage.localStorage.set(key, val);
                }
            }
            catch (e) {
                res = false;
            }
            return res;
        },
        clear: function (key, storeType, domain) {
            var res;
            try {
                if (typeof storeType === 'string' && handleStorage[storeType]) {
                    res = handleStorage[storeType].clear(key, domain);
                }
                else if (domain) {
                    res = handleStorage.cookie.clear(key, domain);
                }
                else {
                    res = handleStorage.localStorage.clear(key) && handleStorage.sessionStorage.clear(key);
                }
            }
            catch (e) {
                res = false;
            }
            return res;
        }
    };
    return handleStorage;
})();var regExpCollection = {
    /* eslint-disable no-useless-escape */
    phone_cn: /^(1([3|4|5|6|7|8|9][0-9]))[0-9]{8}$/,
    mail: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    numeral: function (digit) { return new RegExp("^\\d{" + digit + "}$"); },
    integer: /^-?[1-9]\d*$/,
    integerP: /^[1-9]\d*$/,
    integerN: /^-[1-9]\d*$/,
    num: /^([+-]?)\d*\.?\d+$/,
    numP: /^[1-9]\d*|0$/,
    numN: /^-[1-9]\d*|0$/,
    decimal: /^([+-]?)\d*\.\d+$/,
    decimal1: /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
    decimal2: /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/,
    decimal3: /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/,
    decimal4: /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/,
    decimal5: /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/,
    color_hex: /^\#[a-fA-F0-9]{6}$/,
    url: /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w\-.\/\?\%\&\=\#]*)?$/,
    chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
    include_chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]+/g,
    ascii: /^[\x00-\xFF]+$/,
    zipcode: /^\d{6}$/,
    ip4: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,
    notempty: /^\S+$/,
    picture: /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,
    rar: /(.*)\.(rar|zip|7zip|tgz)$/,
    date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
    letter: /^[A-Za-z]+$/,
    letter_u: /^[A-Z]+$/,
    letter_l: /^[a-z]+$/ // lowercase
    /* eslint-enable no-useless-escape */
};
function validate(regName) {
    return function (str) {
        if (regName === 'include_chinese') {
            return /[\u4E00-\u9FA5\uF900-\uFA2D]+/g.test('' + str);
        }
        return regExpCollection[regName].test('' + str);
    };
}
var rules = {
    phone_cn: validate('phone_cn'),
    numeral: function (str, digit) {
        return regExpCollection.numeral(digit).test('' + str);
    },
    number: function (str, sign) {
        if (sign) {
            return sign === 'n' ? validate('numN')(str) : validate('numP')(str);
        }
        return validate('num')(str);
    },
    integer: function (str, sign) {
        if (sign) {
            return sign === 'n' ? validate('integerN')(str) : validate('integerP')(str);
        }
        return validate('integer')(str);
    },
    decimal: function (str, sign) {
        if (sign) {
            return sign === 'n' ? validate('decimal2')(str) : validate('decimal1')(str);
        }
        return validate('decimal')(str);
    },
    color_hex: validate('color_hex'),
    url: validate('url'),
    chinese: validate('chinese'),
    include_chinese: validate('include_chinese'),
    ascii: validate('ascii'),
    zipcode: validate('zipcode'),
    ip4: validate('ip4'),
    notempty: validate('notempty'),
    picture: validate('picture'),
    rar: validate('rar'),
    date: validate('date'),
    letter: function (str, capital) {
        if (capital) {
            return capital === 'l' ? validate('letter_l')(str) : validate('letter_u')(str);
        }
        return validate('letter')(str);
    }
};var longTaskThreshold = 50;
var singleTaskThreshold = longTaskThreshold / 2;
var notGF = function () {
    console.warn('Please pass the [Generator Function]');
    return false;
};
var timeslice = (function () {
    var supportAPI = typeof window !== 'undefined' && window.performance;
    return function (genF) {
        if (!genF || typeof genF !== 'function')
            return notGF;
        var gen = genF();
        if (typeof gen.next !== 'function')
            return notGF;
        return new Promise(function (resolve, reject) {
            function next() {
                try {
                    var start = (supportAPI && performance.now()) || getTs();
                    var res = null;
                    do {
                        res = gen.next();
                    } while (!res.done && ((supportAPI && performance.now()) || getTs()) - start < singleTaskThreshold);
                    if (res.done) {
                        resolve(res.value);
                        return;
                    }
                    setTimeout(next);
                }
                catch (err) {
                    reject(err);
                }
            }
            next();
        });
    };
})();function uuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}var es=/*#__PURE__*/Object.freeze({__proto__:null,Logger: Logger,addListener: addListener,clearKeyboardListener: clearKeyboardListener,clipboard: clipboard,compare: compare,compatCheck: compatCheck,firstLetter: firstLetter,getCookie: getCookie,getLocalDate: getLocalDate,getTs: getTs,getType: getType,getUA: getUA,isNumLike: isNumLike,isType: isType,lastLetter: lastLetter,listenKeyboard: listenKeyboard,numLikeToNum: numLikeToNum,parseUrl: parseUrl$1,preventEvent: preventEvent,removeListener: removeListener,rules: rules,stopEvent: stopEvent,storage: storage,timeslice: timeslice,uuid: uuid});var peeler_js_1 = /*@__PURE__*/getAugmentedNamespace(es);function handleRes(config) {
    var _a = config || {}, codeMap = _a.codeMap, _b = _a.codeField, codeField = _b === void 0 ? 'code' : _b, _c = _a.debug, debug = _c === void 0 ? false : _c, _d = _a.logLevel, logLevel = _d === void 0 ? 'warn' : _d;
    var _e = codeMap || {}, _f = _e.suc_code, suc_code = _f === void 0 ? 0 : _f, _g = _e.err_code, err_code = _g === void 0 ? -1 : _g, _h = _e.login_code, login_code = _h === void 0 ? 50 : _h;
    var logger = new peeler_js_1.Logger({
        logPrefix: 'Ajax-Maker-handleRes',
        debug: debug,
        logLevel: logLevel
    });
    /**
     * handle api response
     * @param {object} params reference Params interface
     * @return {any}
     */
    return function (params) {
        var res = params.res, success = params.success, fail = params.fail, error = params.error, _a = params.login, login = _a === void 0 ? function () { return typeof window !== 'undefined' && window.location.reload(true); } : _a, thenable = params.thenable;
        if (typeof res === 'string') {
            try {
                res = JSON.parse(res);
            }
            catch (err) {
                // it's a string, indeed
                logger.logInfo(err);
                return success ? success({ res: res }) : { res: res };
            }
        }
        var ret = iterationObj(res, codeField);
        if (ret === null)
            return thenable ? thenable(res) : (error ? error(res) : res);
        switch (ret) {
            case suc_code:
                return success ? success(res) : res;
            case login_code:
                return login ? login(res) : res;
            case err_code:
                return error ? error(res) : res;
            default:
                return fail ? fail(res) : res;
        }
    };
}
function iterationObj(obj, key) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && k === key) {
            return obj[k];
        }
        else if (peeler_js_1.isType('object')(obj[k])) {
            iterationObj(obj[k], key);
        }
    }
    return null;
}
var _default$1 = handleRes;

var handleRes_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$1
}, '__esModule', {value: true});var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var axios_1$1 = __importDefault(axios$1);

var handleRes_1$1 = __importDefault(handleRes_1);
var Request = /** @class */ (function () {
    function Request(config) {
        var _a = config || {}, _b = _a.debug, debug = _b === void 0 ? false : _b, _c = _a.logLevel, logLevel = _c === void 0 ? 'warn' : _c;
        this._logger = new peeler_js_1.Logger({
            logPrefix: 'Ajax-Maker',
            debug: debug,
            logLevel: logLevel
        });
        this._config = config || {};
        this._handleRes = handleRes_1$1.default(this._config);
        this.axios = axios_1$1.default;
        this.setting = this.setting.bind(this);
        this.request = this.request.bind(this);
    }
    Request.prototype._handleError = function (params) {
        var status = params.status, netWorkError = params.netWorkError, data = params.data;
        if (netWorkError) {
            return {
                message: 'Network exception, please try again later',
                data: __assign(__assign({}, data), { status: status })
            };
        }
        else if (status >= 500) {
            return {
                message: 'The server is not stable. Please try again later.',
                data: __assign(__assign({}, data), { status: status })
            };
        }
        else if (status) {
            return {
                message: 'The network is unstable. Please try again later.',
                data: __assign(__assign({}, data), { status: status })
            };
        }
        else {
            return {
                message: 'Client network connection abnormal, please try again',
                data: __assign(__assign({}, data), { status: -1 })
            };
        }
    };
    Request.prototype._constructPromise = function () {
        var promiseRes;
        var promiseRej;
        var promiseWrapper = new Promise(function (resolve, reject) {
            promiseRes = resolve;
            promiseRej = reject;
        });
        var factory = function (type, presetCb) {
            if (type === 'error') {
                // error reload function defination
                promiseWrapper[type] = function (cb) {
                    this[type + "_cb"] = cb;
                    return promiseWrapper;
                };
            }
            else {
                promiseWrapper[type] = function (cb) {
                    this[type + "_cb"] = cb;
                    return promiseWrapper;
                };
            }
            promiseWrapper[type] = promiseWrapper[type].bind(promiseWrapper);
            return function (res) {
                if (type === 'error' && !promiseWrapper[type + "_cb"])
                    return promiseRej(res);
                return promiseRes(promiseWrapper[type + "_cb"]
                    ? promiseWrapper[type + "_cb"](res)
                    : presetCb
                        ? presetCb(res)
                        : res);
            };
        };
        var defaultCallbacks = (this._config || {}).defaultCallbacks;
        var _a = defaultCallbacks || {}, presetSuccess = _a.success, presetFail = _a.fail, presetError = _a.error, presetLogin = _a.login;
        var callbacks = {
            success: factory('success', presetSuccess),
            fail: factory('fail', presetFail),
            error: factory('error', presetError),
            login: factory('login', presetLogin),
            thenable: function (res) { return promiseRes(res); }
        };
        return {
            promiseWrapper: promiseWrapper,
            callbacks: callbacks
        };
    };
    Request.prototype.setting = function (config) {
        if (!config)
            return this._logger.logWarn('setting method required correct parameters!');
        this._config = __assign(__assign({}, this._config), config);
        this._handleRes = handleRes_1$1.default(this._config);
    };
    Request.prototype.request = function (options) {
        var _this = this;
        options.withCredentials = typeof options.withCredentials === 'boolean' ? options.withCredentials : true;
        options.headers = options.headers || {};
        options.headers['Accept'] = '*/*';
        var success = options.success, fail = options.fail, login = options.login, error = options.error;
        var _a = this._constructPromise(), promiseWrapper = _a.promiseWrapper, cb = _a.callbacks;
        this.axios(options).then(function (response) {
            var status = response.status, data = response.data, request = response.request;
            var url = request.responseURL;
            if (+status === 200) {
                return _this._handleRes({
                    res: data,
                    success: function (res) {
                        _this._logger.logInfo("Success - " + url);
                        return success ? success(res) : cb.success(res);
                    },
                    fail: function (res) {
                        _this._logger.logWarn("Failed - " + url);
                        return fail ? fail(res) : cb.fail(res);
                    },
                    error: function (err) {
                        var errRes = _this._handleError({
                            status: status,
                            netWorkError: false,
                            data: {
                                options: options,
                                res: err,
                                stack: (err && err.stack) || '',
                                message: (err && err.message) || ''
                            }
                        });
                        return error ? error(errRes) : cb.error(errRes);
                    },
                    login: function (res) { return login ? login(res) : cb.login(res); },
                    thenable: cb.thenable
                });
            }
            else {
                return cb.error(_this._handleError({
                    status: status,
                    netWorkError: false,
                    data: {
                        options: options
                    }
                }));
            }
        }).catch(function (err) {
            _this._logger.logErr("Error - " + err);
            var errRes = _this._handleError({
                status: err && +err.status === 200 ? 200 : 500,
                netWorkError: err.status >= 400 && err.status < 500,
                data: {
                    options: options,
                    err: err,
                    stack: (err && err.stack) || '',
                    message: (err && err.message) || ''
                }
            });
            return error ? error(errRes) : cb.error(errRes);
        });
        return promiseWrapper;
    };
    return Request;
}());
var _default$2 = Request;var _Request = new _default$2({
  codeMap: {
    suc_code: 200,
    err_code: -1
  },
  codeField: 'code'
}),
    request = _Request.request;var storage_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var storage=function(){if("undefined"==typeof window)return {sessionStorage:null,localStorage:null,cookie:null,get:function(){return null},set:function(){return !1},clear:function(){return !1}};var d={sessionStorage:{set:function(o,e){var t;try{if(!window.sessionStorage)throw !1;window.sessionStorage.setItem(o,e),t=!0;}catch(o){t=!1;}return t},get:function(o){var e;try{if(!window.sessionStorage)throw !1;e=window.sessionStorage.getItem(o);}catch(o){e=null;}return e},clear:function(o){var e;try{if(!window.sessionStorage)throw !1;window.sessionStorage.removeItem(o),e=!0;}catch(o){e=!1;}return e}},localStorage:{set:function(o,e){var t;try{if(!window.localStorage)throw !1;window.localStorage.setItem(o,e),t=!0;}catch(o){t=!1;}return t},get:function(o){var e;try{if(!window.localStorage)throw !1;e=window.localStorage.getItem(o);}catch(o){e=null;}return e},clear:function(o){var e;try{if(!window.localStorage)throw !1;window.localStorage.removeItem(o),e=!0;}catch(o){e=!1;}return e}},cookie:{set:function(o,e,t){var r;try{var n=t||{},i=n.domain,l=void 0===i?"":i,a=n.path,c=void 0===a?"/":a,u=n.expires,s=void 0===u?0:u,d=n.secure,v=void 0!==d&&d,g=void 0;0<=s&&(g=new Date).setTime(g.getTime()+1e3*s),document.cookie=o+"="+e+";"+(l?"domain="+l+";":"")+(c?"path="+c+";":"")+(s?"expires="+(g?g.toUTCString():"")+";":"")+(v?"secure":""),r=!0;}catch(o){r=!1;}return r},get:function(o){var e=new RegExp("(^| )"+o+"=([^;]*)(;|$)"),t=document.cookie.match(e);return t&&t[2]?unescape(t[2]):null},clear:function(o,e){var t;return document.cookie=o+'="";'+(e?"domain="+e+";":"")+"max-age=-1",!(null===(t=d.cookie)||void 0===t?void 0:t.get(o))}},get:function(o,e){var t,r,n,i,l,a;try{return "string"==typeof e&&d[e]?null===(t=d[e])||void 0===t?void 0:t.get(o):null!==(l=null!==(n=null===(r=this.cookie)||void 0===r?void 0:r.get(o))&&void 0!==n?n:null===(i=this.localStorage)||void 0===i?void 0:i.get(o))&&void 0!==l?l:null===(a=this.sessionStorage)||void 0===a?void 0:a.get(o)}catch(o){return null}},set:function(o,e,t,r){var n,i,l,a,c,u,s;try{s="string"==typeof t&&d[t]?null!==(i=null===(n=d[t])||void 0===n?void 0:n.set(o,e,r))&&void 0!==i&&i:r?null!==(a=null===(l=d.cookie)||void 0===l?void 0:l.set(o,e,r))&&void 0!==a&&a:null!==(u=null===(c=d.localStorage)||void 0===c?void 0:c.set(o,e))&&void 0!==u&&u;}catch(o){s=!1;}return s},clear:function(o,e,t){var r,n,i,l,a,c,u;try{u="string"==typeof e&&d[e]?null!==(n=null===(r=d[e])||void 0===r?void 0:r.clear(o,t))&&void 0!==n&&n:t?null!==(l=null===(i=d.cookie)||void 0===i?void 0:i.clear(o,t))&&void 0!==l&&l:(null===(a=d.localStorage)||void 0===a?void 0:a.clear(o))&&(null===(c=d.sessionStorage)||void 0===c?void 0:c.clear(o))||!1;}catch(o){u=!1;}return u}};return d}();exports.default=storage,exports.storage=storage;
});var storageType = 'localStorage';
var logger$3 = getLogger('storage');
var store$2 = {
  get: function get(key) {
    return storage_1.storage.get(key, storageType);
  },
  set: function set(key, val) {
    try {
      if (typeof val !== 'string') {
        val = stringify$2(val);
      }

      return storage_1.storage.set(key, val, storageType);
    } catch (err) {
      logger$3().warn('set storage error', err);
      return false;
    }
  },
  clear: function clear(key) {
    return storage_1.storage.clear(key, storageType);
  }
};var isType_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var es6_object_toString=Object.freeze({}),ceil=Math.ceil,floor=Math.floor,_toInteger=function(e){return isNaN(e=+e)?0:(0<e?floor:ceil)(e)},_defined=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e},_stringAt=function(c){return function(e,t){var r,o,n=String(_defined(e)),i=_toInteger(t),s=n.length;return i<0||s<=i?c?"":void 0:(r=n.charCodeAt(i))<55296||56319<r||i+1===s||(o=n.charCodeAt(i+1))<56320||57343<o?c?n.charAt(i):r:c?n.slice(i,i+2):o-56320+(r-55296<<10)+65536}},_library=!0;function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}function getCjsExportFromNamespace(e){return e&&e.default||e}var _global=createCommonjsModule(function(e){var t=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t);}),_core=createCommonjsModule(function(e){var t=e.exports={version:"2.6.9"};"number"==typeof __e&&(__e=t);}),_core_1=_core.version,_aFunction=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e},_ctx=function(o,n,e){if(_aFunction(o),void 0===n)return o;switch(e){case 1:return function(e){return o.call(n,e)};case 2:return function(e,t){return o.call(n,e,t)};case 3:return function(e,t,r){return o.call(n,e,t,r)}}return function(){return o.apply(n,arguments)}},_isObject=function(e){return "object"==typeof e?null!==e:"function"==typeof e},_anObject=function(e){if(!_isObject(e))throw TypeError(e+" is not an object!");return e},_fails=function(e){try{return !!e()}catch(e){return !0}},_descriptors=!_fails(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),document$1=_global.document,is=_isObject(document$1)&&_isObject(document$1.createElement),_domCreate=function(e){return is?document$1.createElement(e):{}},_ie8DomDefine=!_descriptors&&!_fails(function(){return 7!=Object.defineProperty(_domCreate("div"),"a",{get:function(){return 7}}).a}),_toPrimitive=function(e,t){if(!_isObject(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!_isObject(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!_isObject(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!_isObject(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")},dP=Object.defineProperty,f=_descriptors?Object.defineProperty:function(e,t,r){if(_anObject(e),t=_toPrimitive(t,!0),_anObject(r),_ie8DomDefine)try{return dP(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return "value"in r&&(e[t]=r.value),e},_objectDp={f:f},_propertyDesc=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},_hide=_descriptors?function(e,t,r){return _objectDp.f(e,t,_propertyDesc(1,r))}:function(e,t,r){return e[t]=r,e},hasOwnProperty={}.hasOwnProperty,_has=function(e,t){return hasOwnProperty.call(e,t)},PROTOTYPE="prototype",$export=function(e,t,r){var o,n,i,s=e&$export.F,c=e&$export.G,a=e&$export.S,u=e&$export.P,l=e&$export.B,_=e&$export.W,f=c?_core:_core[t]||(_core[t]={}),p=f[PROTOTYPE],y=c?_global:a?_global[t]:(_global[t]||{})[PROTOTYPE];for(o in c&&(r=t),r)(n=!s&&y&&void 0!==y[o])&&_has(f,o)||(i=n?y[o]:r[o],f[o]=c&&"function"!=typeof y[o]?r[o]:l&&n?_ctx(i,_global):_&&y[o]==i?function(o){function e(e,t,r){if(this instanceof o){switch(arguments.length){case 0:return new o;case 1:return new o(e);case 2:return new o(e,t)}return new o(e,t,r)}return o.apply(this,arguments)}return e[PROTOTYPE]=o[PROTOTYPE],e}(i):u&&"function"==typeof i?_ctx(Function.call,i):i,u&&((f.virtual||(f.virtual={}))[o]=i,e&$export.R&&p&&!p[o]&&_hide(p,o,i)));};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128;var _export=$export,_redefine=_hide,_iterators={},toString={}.toString,_cof=function(e){return toString.call(e).slice(8,-1)},_iobject=Object("z").propertyIsEnumerable(0)?Object:function(e){return "String"==_cof(e)?e.split(""):Object(e)},_toIobject=function(e){return _iobject(_defined(e))},min=Math.min,_toLength=function(e){return 0<e?min(_toInteger(e),9007199254740991):0},max=Math.max,min$1=Math.min,_toAbsoluteIndex=function(e,t){return (e=_toInteger(e))<0?max(e+t,0):min$1(e,t)},_arrayIncludes=function(c){return function(e,t,r){var o,n=_toIobject(e),i=_toLength(n.length),s=_toAbsoluteIndex(r,i);if(c&&t!=t){for(;s<i;)if((o=n[s++])!=o)return !0}else for(;s<i;s++)if((c||s in n)&&n[s]===t)return c||s||0;return !c&&-1}},_shared=createCommonjsModule(function(e){var t="__core-js_shared__",r=_global[t]||(_global[t]={});(e.exports=function(e,t){return r[e]||(r[e]=void 0!==t?t:{})})("versions",[]).push({version:_core.version,mode:"pure",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"});}),id=0,px=Math.random(),_uid=function(e){return "Symbol(".concat(void 0===e?"":e,")_",(++id+px).toString(36))},shared=_shared("keys"),_sharedKey=function(e){return shared[e]||(shared[e]=_uid(e))},arrayIndexOf=_arrayIncludes(!1),IE_PROTO=_sharedKey("IE_PROTO"),_objectKeysInternal=function(e,t){var r,o=_toIobject(e),n=0,i=[];for(r in o)r!=IE_PROTO&&_has(o,r)&&i.push(r);for(;t.length>n;)_has(o,r=t[n++])&&(~arrayIndexOf(i,r)||i.push(r));return i},_enumBugKeys="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),_objectKeys=Object.keys||function(e){return _objectKeysInternal(e,_enumBugKeys)},_objectDps=_descriptors?Object.defineProperties:function(e,t){_anObject(e);for(var r,o=_objectKeys(t),n=o.length,i=0;i<n;)_objectDp.f(e,r=o[i++],t[r]);return e},document$2=_global.document,_html=document$2&&document$2.documentElement,IE_PROTO$1=_sharedKey("IE_PROTO"),Empty=function(){},PROTOTYPE$1="prototype",createDict=function(){var e,t=_domCreate("iframe"),r=_enumBugKeys.length;for(t.style.display="none",_html.appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),createDict=e.F;r--;)delete createDict[PROTOTYPE$1][_enumBugKeys[r]];return createDict()},_objectCreate=Object.create||function(e,t){var r;return null!==e?(Empty[PROTOTYPE$1]=_anObject(e),r=new Empty,Empty[PROTOTYPE$1]=null,r[IE_PROTO$1]=e):r=createDict(),void 0===t?r:_objectDps(r,t)},_wks=createCommonjsModule(function(e){var t=_shared("wks"),r=_global.Symbol,o="function"==typeof r;(e.exports=function(e){return t[e]||(t[e]=o&&r[e]||(o?r:_uid)("Symbol."+e))}).store=t;}),def=_objectDp.f,TAG=_wks("toStringTag"),_setToStringTag=function(e,t,r){e&&!_has(e=r?e:e.prototype,TAG)&&def(e,TAG,{configurable:!0,value:t});},IteratorPrototype={};_hide(IteratorPrototype,_wks("iterator"),function(){return this});var _iterCreate=function(e,t,r){e.prototype=_objectCreate(IteratorPrototype,{next:_propertyDesc(1,r)}),_setToStringTag(e,t+" Iterator");},_toObject=function(e){return Object(_defined(e))},IE_PROTO$2=_sharedKey("IE_PROTO"),ObjectProto=Object.prototype,_objectGpo=Object.getPrototypeOf||function(e){return e=_toObject(e),_has(e,IE_PROTO$2)?e[IE_PROTO$2]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?ObjectProto:null},ITERATOR=_wks("iterator"),BUGGY=!([].keys&&"next"in[].keys()),FF_ITERATOR="@@iterator",KEYS="keys",VALUES="values",returnThis=function(){return this},_iterDefine=function(e,t,r,o,n,i,s){_iterCreate(r,t,o);function c(e){if(!BUGGY&&e in y)return y[e];switch(e){case KEYS:case VALUES:return function(){return new r(this,e)}}return function(){return new r(this,e)}}var a,u,l,_=t+" Iterator",f=n==VALUES,p=!1,y=e.prototype,b=y[ITERATOR]||y[FF_ITERATOR]||n&&y[n],m=b||c(n),h=n?f?c("entries"):m:void 0,d="Array"==t&&y.entries||b;if(d&&(l=_objectGpo(d.call(new e)))!==Object.prototype&&l.next&&_setToStringTag(l,_,!0),f&&b&&b.name!==VALUES&&(p=!0,m=function(){return b.call(this)}),s&&(BUGGY||p||!y[ITERATOR])&&_hide(y,ITERATOR,m),_iterators[t]=m,_iterators[_]=returnThis,n)if(a={values:f?m:c(VALUES),keys:i?m:c(KEYS),entries:h},s)for(u in a)u in y||_redefine(y,u,a[u]);else _export(_export.P+_export.F*(BUGGY||p),t,a);return a},$at=_stringAt(!0);_iterDefine(String,"String",function(e){this._t=String(e),this._i=0;},function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=$at(t,r),this._i+=e.length,{value:e,done:!1})});var _iterStep=function(e,t){return {value:t,done:!!e}},es6_array_iterator=_iterDefine(Array,"Array",function(e,t){this._t=_toIobject(e),this._i=0,this._k=t;},function(){var e=this._t,t=this._k,r=this._i++;return !e||r>=e.length?(this._t=void 0,_iterStep(1)):_iterStep(0,"keys"==t?r:"values"==t?e[r]:[r,e[r]])},"values");_iterators.Arguments=_iterators.Array;for(var TO_STRING_TAG=_wks("toStringTag"),DOMIterables="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),i=0;i<DOMIterables.length;i++){var NAME=DOMIterables[i],Collection=_global[NAME],proto=Collection&&Collection.prototype;proto&&!proto[TO_STRING_TAG]&&_hide(proto,TO_STRING_TAG,NAME),_iterators[NAME]=_iterators.Array;}var defer,channel,port,TAG$1=_wks("toStringTag"),ARG="Arguments"==_cof(function(){return arguments}()),tryGet=function(e,t){try{return e[t]}catch(e){}},_classof=function(e){var t,r,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=tryGet(t=Object(e),TAG$1))?r:ARG?_cof(t):"Object"==(o=_cof(t))&&"function"==typeof t.callee?"Arguments":o},_anInstance=function(e,t,r,o){if(!(e instanceof t)||void 0!==o&&o in e)throw TypeError(r+": incorrect invocation!");return e},_iterCall=function(t,e,r,o){try{return o?e(_anObject(r)[0],r[1]):e(r)}catch(e){var n=t.return;throw void 0!==n&&_anObject(n.call(t)),e}},ITERATOR$1=_wks("iterator"),ArrayProto=Array.prototype,_isArrayIter=function(e){return void 0!==e&&(_iterators.Array===e||ArrayProto[ITERATOR$1]===e)},ITERATOR$2=_wks("iterator"),core_getIteratorMethod=_core.getIteratorMethod=function(e){if(null!=e)return e[ITERATOR$2]||e["@@iterator"]||_iterators[_classof(e)]},_forOf=createCommonjsModule(function(e){var f={},p={},t=e.exports=function(e,t,r,o,n){var i,s,c,a,u=n?function(){return e}:core_getIteratorMethod(e),l=_ctx(r,o,t?2:1),_=0;if("function"!=typeof u)throw TypeError(e+" is not iterable!");if(_isArrayIter(u)){for(i=_toLength(e.length);_<i;_++)if((a=t?l(_anObject(s=e[_])[0],s[1]):l(e[_]))===f||a===p)return a}else for(c=u.call(e);!(s=c.next()).done;)if((a=_iterCall(c,l,s.value,t))===f||a===p)return a};t.BREAK=f,t.RETURN=p;}),SPECIES=_wks("species"),_speciesConstructor=function(e,t){var r,o=_anObject(e).constructor;return void 0===o||null==(r=_anObject(o)[SPECIES])?t:_aFunction(r)},_invoke=function(e,t,r){var o=void 0===r;switch(t.length){case 0:return o?e():e.call(r);case 1:return o?e(t[0]):e.call(r,t[0]);case 2:return o?e(t[0],t[1]):e.call(r,t[0],t[1]);case 3:return o?e(t[0],t[1],t[2]):e.call(r,t[0],t[1],t[2]);case 4:return o?e(t[0],t[1],t[2],t[3]):e.call(r,t[0],t[1],t[2],t[3])}return e.apply(r,t)},process=_global.process,setTask=_global.setImmediate,clearTask=_global.clearImmediate,MessageChannel=_global.MessageChannel,Dispatch=_global.Dispatch,counter=0,queue={},ONREADYSTATECHANGE="onreadystatechange",run=function(){var e=+this;if(queue.hasOwnProperty(e)){var t=queue[e];delete queue[e],t();}},listener=function(e){run.call(e.data);};setTask&&clearTask||(setTask=function(e){for(var t=[],r=1;r<arguments.length;)t.push(arguments[r++]);return queue[++counter]=function(){_invoke("function"==typeof e?e:Function(e),t);},defer(counter),counter},clearTask=function(e){delete queue[e];},"process"==_cof(process)?defer=function(e){process.nextTick(_ctx(run,e,1));}:Dispatch&&Dispatch.now?defer=function(e){Dispatch.now(_ctx(run,e,1));}:MessageChannel?(port=(channel=new MessageChannel).port2,channel.port1.onmessage=listener,defer=_ctx(port.postMessage,port,1)):_global.addEventListener&&"function"==typeof postMessage&&!_global.importScripts?(defer=function(e){_global.postMessage(e+"","*");},_global.addEventListener("message",listener,!1)):defer=ONREADYSTATECHANGE in _domCreate("script")?function(e){_html.appendChild(_domCreate("script"))[ONREADYSTATECHANGE]=function(){_html.removeChild(this),run.call(e);};}:function(e){setTimeout(_ctx(run,e,1),0);});var _task={set:setTask,clear:clearTask},macrotask=_task.set,Observer=_global.MutationObserver||_global.WebKitMutationObserver,process$1=_global.process,Promise$1=_global.Promise,isNode="process"==_cof(process$1),_microtask=function(){function e(){var e,t;for(isNode&&(e=process$1.domain)&&e.exit();r;){t=r.fn,r=r.next;try{t();}catch(e){throw r?n():o=void 0,e}}o=void 0,e&&e.enter();}var r,o,n;if(isNode)n=function(){process$1.nextTick(e);};else if(!Observer||_global.navigator&&_global.navigator.standalone)if(Promise$1&&Promise$1.resolve){var t=Promise$1.resolve(void 0);n=function(){t.then(e);};}else n=function(){macrotask.call(_global,e);};else {var i=!0,s=document.createTextNode("");new Observer(e).observe(s,{characterData:!0}),n=function(){s.data=i=!i;};}return function(e){var t={fn:e,next:void 0};o&&(o.next=t),r||(r=t,n()),o=t;}};function PromiseCapability(e){var r,o;this.promise=new e(function(e,t){if(void 0!==r||void 0!==o)throw TypeError("Bad Promise constructor");r=e,o=t;}),this.resolve=_aFunction(r),this.reject=_aFunction(o);}var f$1=function(e){return new PromiseCapability(e)},_newPromiseCapability={f:f$1},_perform=function(e){try{return {e:!1,v:e()}}catch(e){return {e:!0,v:e}}},navigator=_global.navigator,_userAgent=navigator&&navigator.userAgent||"",_promiseResolve=function(e,t){if(_anObject(e),_isObject(t)&&t.constructor===e)return t;var r=_newPromiseCapability.f(e);return (0, r.resolve)(t),r.promise},_redefineAll=function(e,t,r){for(var o in t)r&&e[o]?e[o]=t[o]:_hide(e,o,t[o]);return e},SPECIES$1=_wks("species"),_setSpecies=function(e){var t="function"==typeof _core[e]?_core[e]:_global[e];_descriptors&&t&&!t[SPECIES$1]&&_objectDp.f(t,SPECIES$1,{configurable:!0,get:function(){return this}});},ITERATOR$3=_wks("iterator"),SAFE_CLOSING=!1;try{var riter=[7][ITERATOR$3]();riter.return=function(){SAFE_CLOSING=!0;},Array.from(riter,function(){throw 2});}catch(e){}var Internal,newGenericPromiseCapability,OwnPromiseCapability,Wrapper,_iterDetect=function(e,t){if(!t&&!SAFE_CLOSING)return !1;var r=!1;try{var o=[7],n=o[ITERATOR$3]();n.next=function(){return {done:r=!0}},o[ITERATOR$3]=function(){return n},e(o);}catch(e){}return r},task=_task.set,microtask=_microtask(),PROMISE="Promise",TypeError$1=_global.TypeError,process$2=_global.process,versions=process$2&&process$2.versions,v8=versions&&versions.v8||"",$Promise=_global[PROMISE],isNode$1="process"==_classof(process$2),empty=function(){},newPromiseCapability=newGenericPromiseCapability=_newPromiseCapability.f,USE_NATIVE=!!function(){try{var e=$Promise.resolve(1),t=(e.constructor={})[_wks("species")]=function(e){e(empty,empty);};return (isNode$1||"function"==typeof PromiseRejectionEvent)&&e.then(empty)instanceof t&&0!==v8.indexOf("6.6")&&-1===_userAgent.indexOf("Chrome/66")}catch(e){}}(),isThenable=function(e){var t;return !(!_isObject(e)||"function"!=typeof(t=e.then))&&t},notify=function(l,r){if(!l._n){l._n=!0;var o=l._c;microtask(function(){for(var a=l._v,u=1==l._s,e=0,t=function(e){var t,r,o,n=u?e.ok:e.fail,i=e.resolve,s=e.reject,c=e.domain;try{n?(u||(2==l._h&&onHandleUnhandled(l),l._h=1),!0===n?t=a:(c&&c.enter(),t=n(a),c&&(c.exit(),o=!0)),t===e.promise?s(TypeError$1("Promise-chain cycle")):(r=isThenable(t))?r.call(t,i,s):i(t)):s(a);}catch(e){c&&!o&&c.exit(),s(e);}};o.length>e;)t(o[e++]);l._c=[],l._n=!1,r&&!l._h&&onUnhandled(l);});}},onUnhandled=function(i){task.call(_global,function(){var e,t,r,o=i._v,n=isUnhandled(i);if(n&&(e=_perform(function(){isNode$1?process$2.emit("unhandledRejection",o,i):(t=_global.onunhandledrejection)?t({promise:i,reason:o}):(r=_global.console)&&r.error&&r.error("Unhandled promise rejection",o);}),i._h=isNode$1||isUnhandled(i)?2:1),i._a=void 0,n&&e.e)throw e.v});},isUnhandled=function(e){return 1!==e._h&&0===(e._a||e._c).length},onHandleUnhandled=function(t){task.call(_global,function(){var e;isNode$1?process$2.emit("rejectionHandled",t):(e=_global.onrejectionhandled)&&e({promise:t,reason:t._v});});},$reject=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),notify(t,!0));},$resolve=function(e){var r,o=this;if(!o._d){o._d=!0,o=o._w||o;try{if(o===e)throw TypeError$1("Promise can't be resolved itself");(r=isThenable(e))?microtask(function(){var t={_w:o,_d:!1};try{r.call(e,_ctx($resolve,t,1),_ctx($reject,t,1));}catch(e){$reject.call(t,e);}}):(o._v=e,o._s=1,notify(o,!1));}catch(e){$reject.call({_w:o,_d:!1},e);}}};USE_NATIVE||($Promise=function(e){_anInstance(this,$Promise,PROMISE,"_h"),_aFunction(e),Internal.call(this);try{e(_ctx($resolve,this,1),_ctx($reject,this,1));}catch(e){$reject.call(this,e);}},(Internal=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1;}).prototype=_redefineAll($Promise.prototype,{then:function(e,t){var r=newPromiseCapability(_speciesConstructor(this,$Promise));return r.ok="function"!=typeof e||e,r.fail="function"==typeof t&&t,r.domain=isNode$1?process$2.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&notify(this,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),OwnPromiseCapability=function(){var e=new Internal;this.promise=e,this.resolve=_ctx($resolve,e,1),this.reject=_ctx($reject,e,1);},_newPromiseCapability.f=newPromiseCapability=function(e){return e===$Promise||e===Wrapper?new OwnPromiseCapability(e):newGenericPromiseCapability(e)}),_export(_export.G+_export.W+_export.F*!USE_NATIVE,{Promise:$Promise}),_setToStringTag($Promise,PROMISE),_setSpecies(PROMISE),Wrapper=_core[PROMISE],_export(_export.S+_export.F*!USE_NATIVE,PROMISE,{reject:function(e){var t=newPromiseCapability(this);return (0, t.reject)(e),t.promise}}),_export(_export.S+_export.F*_library,PROMISE,{resolve:function(e){return _promiseResolve(this===Wrapper?$Promise:this,e)}}),_export(_export.S+_export.F*!(USE_NATIVE&&_iterDetect(function(e){$Promise.all(e).catch(empty);})),PROMISE,{all:function(e){var s=this,t=newPromiseCapability(s),c=t.resolve,a=t.reject,r=_perform(function(){var o=[],n=0,i=1;_forOf(e,!1,function(e){var t=n++,r=!1;o.push(void 0),i++,s.resolve(e).then(function(e){r||(r=!0,o[t]=e,--i||c(o));},a);}),--i||c(o);});return r.e&&a(r.v),t.promise},race:function(e){var t=this,r=newPromiseCapability(t),o=r.reject,n=_perform(function(){_forOf(e,!1,function(e){t.resolve(e).then(r.resolve,o);});});return n.e&&o(n.v),r.promise}}),_export(_export.P+_export.R,"Promise",{finally:function(t){var r=_speciesConstructor(this,_core.Promise||_global.Promise),e="function"==typeof t;return this.then(e?function(e){return _promiseResolve(r,t()).then(function(){return e})}:t,e?function(e){return _promiseResolve(r,t()).then(function(){throw e})}:t)}}),_export(_export.S,"Promise",{try:function(e){var t=_newPromiseCapability.f(this),r=_perform(e);return (r.e?t.reject:t.resolve)(r.v),t.promise}}),getCjsExportFromNamespace(es6_object_toString);var promise=_core.Promise,promise$1=promise,_meta=createCommonjsModule(function(e){function r(e){t(e,o,{value:{i:"O"+ ++n,w:{}}});}var o=_uid("meta"),t=_objectDp.f,n=0,i=Object.isExtensible||function(){return !0},s=!_fails(function(){return i(Object.preventExtensions({}))}),c=e.exports={KEY:o,NEED:!1,fastKey:function(e,t){if(!_isObject(e))return "symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!_has(e,o)){if(!i(e))return "F";if(!t)return "E";r(e);}return e[o].i},getWeak:function(e,t){if(!_has(e,o)){if(!i(e))return !0;if(!t)return !1;r(e);}return e[o].w},onFreeze:function(e){return s&&c.NEED&&i(e)&&!_has(e,o)&&r(e),e}};}),_meta_1=_meta.KEY,_meta_2=_meta.NEED,_meta_3=_meta.fastKey,_meta_4=_meta.getWeak,_meta_5=_meta.onFreeze,f$2=_wks,_wksExt={f:f$2},defineProperty=_objectDp.f,_wksDefine=function(e){var t=_core.Symbol||(_core.Symbol={});"_"==e.charAt(0)||e in t||defineProperty(t,e,{value:_wksExt.f(e)});},f$3=Object.getOwnPropertySymbols,_objectGops={f:f$3},f$4={}.propertyIsEnumerable,_objectPie={f:f$4},_enumKeys=function(e){var t=_objectKeys(e),r=_objectGops.f;if(r)for(var o,n=r(e),i=_objectPie.f,s=0;n.length>s;)i.call(e,o=n[s++])&&t.push(o);return t},_isArray=Array.isArray||function(e){return "Array"==_cof(e)},hiddenKeys=_enumBugKeys.concat("length","prototype"),f$5=Object.getOwnPropertyNames||function(e){return _objectKeysInternal(e,hiddenKeys)},_objectGopn={f:f$5},gOPN=_objectGopn.f,toString$1={}.toString,windowNames="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],getWindowNames=function(e){try{return gOPN(e)}catch(e){return windowNames.slice()}},f$6=function(e){return windowNames&&"[object Window]"==toString$1.call(e)?getWindowNames(e):gOPN(_toIobject(e))},_objectGopnExt={f:f$6},gOPD=Object.getOwnPropertyDescriptor,f$7=_descriptors?gOPD:function(e,t){if(e=_toIobject(e),t=_toPrimitive(t,!0),_ie8DomDefine)try{return gOPD(e,t)}catch(e){}if(_has(e,t))return _propertyDesc(!_objectPie.f.call(e,t),e[t])},_objectGopd={f:f$7},META=_meta.KEY,gOPD$1=_objectGopd.f,dP$1=_objectDp.f,gOPN$1=_objectGopnExt.f,$Symbol=_global.Symbol,$JSON=_global.JSON,_stringify=$JSON&&$JSON.stringify,PROTOTYPE$2="prototype",HIDDEN=_wks("_hidden"),TO_PRIMITIVE=_wks("toPrimitive"),isEnum={}.propertyIsEnumerable,SymbolRegistry=_shared("symbol-registry"),AllSymbols=_shared("symbols"),OPSymbols=_shared("op-symbols"),ObjectProto$1=Object[PROTOTYPE$2],USE_NATIVE$1="function"==typeof $Symbol&&!!_objectGops.f,QObject=_global.QObject,setter=!QObject||!QObject[PROTOTYPE$2]||!QObject[PROTOTYPE$2].findChild,setSymbolDesc=_descriptors&&_fails(function(){return 7!=_objectCreate(dP$1({},"a",{get:function(){return dP$1(this,"a",{value:7}).a}})).a})?function(e,t,r){var o=gOPD$1(ObjectProto$1,t);o&&delete ObjectProto$1[t],dP$1(e,t,r),o&&e!==ObjectProto$1&&dP$1(ObjectProto$1,t,o);}:dP$1,wrap=function(e){var t=AllSymbols[e]=_objectCreate($Symbol[PROTOTYPE$2]);return t._k=e,t},isSymbol=USE_NATIVE$1&&"symbol"==typeof $Symbol.iterator?function(e){return "symbol"==typeof e}:function(e){return e instanceof $Symbol},$defineProperty=function(e,t,r){return e===ObjectProto$1&&$defineProperty(OPSymbols,t,r),_anObject(e),t=_toPrimitive(t,!0),_anObject(r),_has(AllSymbols,t)?(r.enumerable?(_has(e,HIDDEN)&&e[HIDDEN][t]&&(e[HIDDEN][t]=!1),r=_objectCreate(r,{enumerable:_propertyDesc(0,!1)})):(_has(e,HIDDEN)||dP$1(e,HIDDEN,_propertyDesc(1,{})),e[HIDDEN][t]=!0),setSymbolDesc(e,t,r)):dP$1(e,t,r)},$defineProperties=function(e,t){_anObject(e);for(var r,o=_enumKeys(t=_toIobject(t)),n=0,i=o.length;n<i;)$defineProperty(e,r=o[n++],t[r]);return e},$create=function(e,t){return void 0===t?_objectCreate(e):$defineProperties(_objectCreate(e),t)},$propertyIsEnumerable=function(e){var t=isEnum.call(this,e=_toPrimitive(e,!0));return !(this===ObjectProto$1&&_has(AllSymbols,e)&&!_has(OPSymbols,e))&&(!(t||!_has(this,e)||!_has(AllSymbols,e)||_has(this,HIDDEN)&&this[HIDDEN][e])||t)},$getOwnPropertyDescriptor=function(e,t){if(e=_toIobject(e),t=_toPrimitive(t,!0),e!==ObjectProto$1||!_has(AllSymbols,t)||_has(OPSymbols,t)){var r=gOPD$1(e,t);return !r||!_has(AllSymbols,t)||_has(e,HIDDEN)&&e[HIDDEN][t]||(r.enumerable=!0),r}},$getOwnPropertyNames=function(e){for(var t,r=gOPN$1(_toIobject(e)),o=[],n=0;r.length>n;)_has(AllSymbols,t=r[n++])||t==HIDDEN||t==META||o.push(t);return o},$getOwnPropertySymbols=function(e){for(var t,r=e===ObjectProto$1,o=gOPN$1(r?OPSymbols:_toIobject(e)),n=[],i=0;o.length>i;)!_has(AllSymbols,t=o[i++])||r&&!_has(ObjectProto$1,t)||n.push(AllSymbols[t]);return n};USE_NATIVE$1||(_redefine(($Symbol=function(e){if(this instanceof $Symbol)throw TypeError("Symbol is not a constructor!");var t=_uid(0<arguments.length?e:void 0),r=function(e){this===ObjectProto$1&&r.call(OPSymbols,e),_has(this,HIDDEN)&&_has(this[HIDDEN],t)&&(this[HIDDEN][t]=!1),setSymbolDesc(this,t,_propertyDesc(1,e));};return _descriptors&&setter&&setSymbolDesc(ObjectProto$1,t,{configurable:!0,set:r}),wrap(t)})[PROTOTYPE$2],"toString",function(){return this._k}),_objectGopd.f=$getOwnPropertyDescriptor,_objectDp.f=$defineProperty,_objectGopn.f=_objectGopnExt.f=$getOwnPropertyNames,_objectPie.f=$propertyIsEnumerable,_objectGops.f=$getOwnPropertySymbols,_descriptors&&!_library&&_redefine(ObjectProto$1,"propertyIsEnumerable",$propertyIsEnumerable),_wksExt.f=function(e){return wrap(_wks(e))}),_export(_export.G+_export.W+_export.F*!USE_NATIVE$1,{Symbol:$Symbol});for(var es6Symbols="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),j=0;es6Symbols.length>j;)_wks(es6Symbols[j++]);for(var wellKnownSymbols=_objectKeys(_wks.store),k=0;wellKnownSymbols.length>k;)_wksDefine(wellKnownSymbols[k++]);_export(_export.S+_export.F*!USE_NATIVE$1,"Symbol",{for:function(e){return _has(SymbolRegistry,e+="")?SymbolRegistry[e]:SymbolRegistry[e]=$Symbol(e)},keyFor:function(e){if(!isSymbol(e))throw TypeError(e+" is not a symbol!");for(var t in SymbolRegistry)if(SymbolRegistry[t]===e)return t},useSetter:function(){setter=!0;},useSimple:function(){setter=!1;}}),_export(_export.S+_export.F*!USE_NATIVE$1,"Object",{create:$create,defineProperty:$defineProperty,defineProperties:$defineProperties,getOwnPropertyDescriptor:$getOwnPropertyDescriptor,getOwnPropertyNames:$getOwnPropertyNames,getOwnPropertySymbols:$getOwnPropertySymbols});var FAILS_ON_PRIMITIVES=_fails(function(){_objectGops.f(1);});_export(_export.S+_export.F*FAILS_ON_PRIMITIVES,"Object",{getOwnPropertySymbols:function(e){return _objectGops.f(_toObject(e))}}),$JSON&&_export(_export.S+_export.F*(!USE_NATIVE$1||_fails(function(){var e=$Symbol();return "[null]"!=_stringify([e])||"{}"!=_stringify({a:e})||"{}"!=_stringify(Object(e))})),"JSON",{stringify:function(e){for(var t,r,o=[e],n=1;n<arguments.length;)o.push(arguments[n++]);if(r=t=o[1],(_isObject(t)||void 0!==e)&&!isSymbol(e))return _isArray(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!isSymbol(t))return t}),o[1]=t,_stringify.apply($JSON,o)}}),$Symbol[PROTOTYPE$2][TO_PRIMITIVE]||_hide($Symbol[PROTOTYPE$2],TO_PRIMITIVE,$Symbol[PROTOTYPE$2].valueOf),_setToStringTag($Symbol,"Symbol"),_setToStringTag(Math,"Math",!0),_setToStringTag(_global.JSON,"JSON",!0),_wksDefine("asyncIterator"),_wksDefine("observable");var symbol=_core.Symbol,symbol$1=symbol;function __awaiter(i,s,c,a){return new(c=c||Promise)(function(e,t){function r(e){try{n(a.next(e));}catch(e){t(e);}}function o(e){try{n(a.throw(e));}catch(e){t(e);}}function n(t){t.done?e(t.value):new c(function(e){e(t.value);}).then(r,o);}n((a=a.apply(i,s||[])).next());})}function __generator(r,o){var n,i,s,e,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,i&&(s=2&t[0]?i.return:t[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[2&t[0],s.value]),t[0]){case 0:case 1:s=t;break;case 4:return c.label++,{value:t[1],done:!1};case 5:c.label++,i=t[1],t=[0];continue;case 7:t=c.ops.pop(),c.trys.pop();continue;default:if(!(s=0<(s=c.trys).length&&s[s.length-1])&&(6===t[0]||2===t[0])){c=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){c.label=t[1];break}if(6===t[0]&&c.label<s[1]){c.label=s[1],s=t;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(t);break}s[2]&&c.ops.pop(),c.trys.pop();continue}t=o.call(r,c);}catch(e){t=[6,e],i=0;}finally{n=s=0;}if(5&t[0])throw t[1];return {value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}var args,gen=function(){return __generator(this,function(e){switch(e.label){case 0:return [4];case 1:return e.sent(),[2]}})};!function(){args=arguments;}();var typeMap={string:"",number:1,boolean:!0,null:null,undefined:void 0,symbol:symbol$1(1),array:[],arguments:args,object:{},regexp:/regexp/,date:new Date,function:function(){},promise:promise$1.resolve(void 0),generatorfunction:gen,generator:gen(),asyncfunction:function(){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(e){return [2]})})}};function isType(r){return function(e){if("object"!=typeof e)return typeof e===r.toLowerCase();var t=Object.prototype.toString.call(e).length-1;return Object.prototype.toString.call(e).slice(8,t).toLowerCase()===r.toLowerCase()}}exports.default=isType,exports.isType=isType;
});function isObject$2(val) {
  return isType_1.isType('object')(val);
}function uuid$1() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-yyyy-yyyy-yyyy-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}var logger$4 = getLogger('messager');
function messager(type) {
  var _context;

  var _a, _b, _c, _d, _e, _f, _g;

  var envInfo = env();
  var handler = envInfo.isIOS ? type === 'getContext' ? function () {
    return JSON.parse(prompt('MixinContext.getContext()'));
  } : (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b[type]) === null || _c === void 0 ? void 0 : bind$3(_context = _c.postMessage).call(_context, (_e = (_d = window === null || window === void 0 ? void 0 : window.webkit) === null || _d === void 0 ? void 0 : _d.messageHandlers) === null || _e === void 0 ? void 0 : _e[type]) : (_g = (_f = window === null || window === void 0 ? void 0 : window.MixinContext) === null || _f === void 0 ? void 0 : _f[type]) === null || _g === void 0 ? void 0 : bind$3(_g).call(_g, window === null || window === void 0 ? void 0 : window.MixinContext);
  return handler !== null && handler !== void 0 ? handler : function () {
    return logger$4().warn("The messager \"".concat(type, "\" is not support yet!"));
  };
}var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});var keys$1 = path.Object.keys;var keys$2 = keys$1;var keys$3 = keys$2;var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$3(7)
};var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};var $forEach = arrayIteration.forEach;


var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});var forEach$1 = entryVirtual('Array').forEach;var forEach$2 = forEach$1;var ArrayPrototype$2 = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.forEach)
    // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$2 : own;
};var forEach$3 = forEach_1;var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens (b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4);

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen;

  var i;
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = (tmp >> 16) & 0xFF;
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    );
  }

  return parts.join('')
}

var base64Js = {
	byteLength: byteLength_1,
	toByteArray: toByteArray_1,
	fromByteArray: fromByteArray_1
};var core = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory();
	}
}(commonjsGlobal, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined$1) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
	        crypto = commonjsGlobal.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && typeof commonjsRequire === 'function') {
	        try {
	            crypto = require$$0__default['default'];
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined$1) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
});var encBase64 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));
});var sha256 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
});var AUTHSCOPE = {
  phone: 'PHONE:READ',
  profile: 'PROFILE:READ',
  contacts: 'CONTACTS:READ',
  assets: 'ASSETS:READ',
  snapshots: 'SNAPSHOTS:READ',
  messages: 'MESSAGES:REPRESENT'
};

function base64URLEncode(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateRandomString(len) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function getAccessCode(params) {
  var _context, _context2, _context3, _context4, _context5;

  // eslint-disable-next-line prefer-const
  var client_id = params.client_id,
      _params$oauth_url = params.oauth_url,
      oauth_url = _params$oauth_url === void 0 ? 'https://mixin-oauth.firesbox.com' : _params$oauth_url,
      _params$redirect_url = params.redirect_url,
      redirect_url = _params$redirect_url === void 0 ? window.location.href : _params$redirect_url,
      state = params.state,
      _params$auth = params.auth,
      auth = _params$auth === void 0 ? {} : _params$auth;
  var randomCode = generateRandomString(32);
  var randomArr = strToUnitArray(randomCode);
  var challenge;

  if (randomArr) {
    var verifier = base64URLEncode(base64Js.fromByteArray(randomArr));
    challenge = base64URLEncode(sha256(randomCode).toString(encBase64));
    verifier && store$2.set('$_mixin-code-verifier', verifier);
  }

  var SCOPESTR = '';

  forEach$3(_context = keys$3(auth)).call(_context, function (scope) {
    if (!auth[scope]) return;
    var scopeValue = AUTHSCOPE[scope];
    if (!SCOPESTR) SCOPESTR = scopeValue;else SCOPESTR += "+".concat(scopeValue);
  });

  client_id = client_id ? "&client_id=".concat(client_id) : '';
  redirect_url = redirect_url ? "&redirect_url=".concat(encodeURIComponent(redirect_url)) : '';
  SCOPESTR = SCOPESTR ? "&scope=".concat(SCOPESTR) : '';
  challenge = challenge ? "&code_challenge=".concat(challenge) : '';

  var url = concat$2(_context2 = concat$2(_context3 = concat$2(_context4 = concat$2(_context5 = "".concat(oauth_url, "/?response_type=code")).call(_context5, client_id)).call(_context4, redirect_url)).call(_context3, SCOPESTR)).call(_context2, challenge);

  if (state) {
    var str = encodeURIComponent(stringify$2(state));
    url += "&state=".concat(str);
  }

  window.location.href = url;
}
function getAccessToken(params) {
  var data = assign$2({}, params);

  return request({
    url: 'https://mixin-api.zeromesh.net/oauth/token',
    method: 'POST',
    data: data,
    withCredentials: false
  }).then(function (res) {
    return res.data.access_token;
  });
}var logger$5 = getLogger('scheme');
var SCHEME = {
  prefix: 'mixin',
  loadScheme: function loadScheme(url) {
    if (!url) {
      logger$5('loadScheme').error('The URL cannot be a falsy value!');
      return;
    }

    window.location.href = url;
    return url;
  },
  getQuery: function getQuery(query) {
    if (!query) {
      return '';
    }

    var res = '';

    for (var k in query) {
      var _context;

      res += concat$2(_context = "&".concat(k, "=")).call(_context, query[k]);
    }

    return res.replace(/^&?/, '?');
  },
  pay: function pay(params) {
    var _context2;

    var _params = this.getQuery(params);

    var _url = concat$2(_context2 = "".concat(this.prefix, "://pay")).call(_context2, _params);

    logger$5('pay').log(_url);
    return this.loadScheme(_url);
  },
  transfer: function transfer(recipient) {
    var _context3;

    var _url = concat$2(_context3 = "".concat(this.prefix, "://transfer/")).call(_context3, recipient);

    logger$5('transfer').log(_url);
    return this.loadScheme(_url);
  }
};
var scheme = {
  prefix: SCHEME.prefix,
  pay: function pay(params) {
    if (!params.recipient || !params.asset || !params.amount) {
      logger$5('pay').error('The "recipient", "asset" and "amount" is required!');
      return;
    }

    try {
      if (!params.trace) params.trace = uuid$1();

      if (params.memo) {
        if (isObject$2(params.memo)) {
          stringify$2(params.memo);
        }

        params.memo = base64Js.fromByteArray(strToUnitArray(params.memo));

        if (params.memo.length > 140) {
          logger$5('pay').warn('The memo max length is 140!');
        }
      }

      return SCHEME.pay(params);
    } catch (err) {
      logger$5('pay').error(err);
    }
  },
  transfer: function transfer(recipient) {
    if (!recipient) {
      logger$5('transfer').error('The "recipient" is required!');
      return;
    }

    try {
      return SCHEME.transfer(recipient);
    } catch (err) {
      logger$5('transfer').error(err);
    }
  }
};var Bridge = /*#__PURE__*/function () {
  function Bridge(config) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9;

    classCallCheck(this, Bridge);

    this.config = config;
    this._token = void 0;
    this._userInfo = void 0;
    this.logger = getLogger(); // public

    this.getContext = bind$3(_context = this.getContext).call(_context, this);
    this.reloadTheme = bind$3(_context2 = this.reloadTheme).call(_context2, this);
    this.playlist = bind$3(_context3 = this.playlist).call(_context3, this);
    this.login = bind$3(_context4 = this.login).call(_context4, this);
    this.logout = bind$3(_context5 = this.logout).call(_context5, this);
    this.requestToken = bind$3(_context6 = this.requestToken).call(_context6, this);
    this.getUserInfo = bind$3(_context7 = this.getUserInfo).call(_context7, this); // private

    this.getCode = bind$3(_context8 = this.getCode).call(_context8, this);
    this.handlerError = bind$3(_context9 = this.handlerError).call(_context9, this);
  }
  /**
   * 获取当前 jsbridge 版本号
   */


  createClass(Bridge, [{
    key: "version",
    get: function get() {
      var _a;

      var pkj;

      try {
        pkj = require('../package.json');
      } catch (err) {
        this.logger('version').info(err);
      }

      return (_a = pkj === null || pkj === void 0 ? void 0 : pkj.version) !== null && _a !== void 0 ? _a : 'unknown';
    }
    /**
     * 获取 conversation id
     */

  }, {
    key: "conversationId",
    get: function get() {
      var _a, _b;

      return (_b = (_a = this.getContext()) === null || _a === void 0 ? void 0 : _a.conversation_id) !== null && _b !== void 0 ? _b : void 0;
    }
    /**
     * 判断 Mixin 环境
     */

  }, {
    key: "isMixin",
    get: function get() {
      var _a, _b, _c;

      var isIOS = env().isIOS;
      return !!(isIOS ? (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.MixinContext : (window === null || window === void 0 ? void 0 : window.MixinContext) && typeof ((_c = window === null || window === void 0 ? void 0 : window.MixinContext) === null || _c === void 0 ? void 0 : _c.getContext) === 'function');
    }
    /**
     * 获取 app 上下文
     * @returns
     */

  }, {
    key: "getContext",
    value: function getContext() {
      if (!this.isMixin) {
        this.logger('getContext').log('Please call in reborn or mixin app!');
        return;
      }

      try {
        var ctx = messager('getContext')();

        if (typeof ctx === 'string') {
          try {
            ctx = JSON.parse(ctx);
          } catch (e) {
            this.logger('getContext').info(e);
          }
        }

        if (ctx) ctx.platform = (ctx === null || ctx === void 0 ? void 0 : ctx.platform) || (env().isIOS ? 'iOS' : 'Android');
        return ctx;
      } catch (err) {
        this.handlerError(err, 'getContext');
        return;
      }
    }
    /**
     * 重载
     */

  }, {
    key: "reloadTheme",
    value: function reloadTheme() {
      if (!this.isMixin) {
        this.logger('reloadTheme').log('Please call in reborn or mixin app!');
        return;
      }

      try {
        messager('reloadTheme')();
      } catch (err) {
        this.handlerError(err, 'reloadTheme');
      }
    }
    /**
     * 打开播放列表
     * @param src
     * @returns
     */

  }, {
    key: "playlist",
    value: function playlist(src) {
      if (!this.isMixin) {
        this.logger('playlist').log('Please call in reborn or mixin app!');
        return;
      }

      try {
        messager('playlist')(src);
      } catch (err) {
        this.handlerError(err, 'playlist');
      }
    }
    /**
     * 获取 access token
     */

  }, {
    key: "token",
    get: function get() {
      var _a;

      return (_a = this._token) !== null && _a !== void 0 ? _a : store$2.get('$_mixin-token');
    }
    /**
     * 跳转到授权登陆页
     * @param auth
     * @param params
     * @returns
     */

  }, {
    key: "login",
    value: function login(auth, params) {
      var _ref = this.config || {},
          client_id = _ref.client_id;

      var cid = (params === null || params === void 0 ? void 0 : params.client_id) || client_id;

      if (!cid) {
        this.logger('login').warn('Please pass client_id first!');
        return;
      }

      getAccessCode(assign$2(assign$2({}, params), {
        client_id: cid,
        auth: auth
      }));
    }
    /**
     * 登出
     * @param reload 是否重载页面
     */

  }, {
    key: "logout",
    value: function logout() {
      var reload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      store$2.clear('$_mixin-token');
      store$2.clear('$_mixin-code-verifier');
      store$2.clear('$_mixin-user-info');
      if (reload) window.location.reload();
    }
    /**
     * 根据 code 换取 access token
     * @param params
     * @param persistence
     * @returns
     */

  }, {
    key: "requestToken",
    value: function requestToken(params) {
      var _this = this;

      var persistence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _ref2 = this.config || {},
          client_id_config = _ref2.client_id;

      var _ref3 = params || {},
          code_params = _ref3.code,
          code_verifier_params = _ref3.code_verifier,
          client_id_params = _ref3.client_id;

      var code_url = this.getCode();
      var client_id = client_id_params || client_id_config;
      var code = code_params || code_url;
      var code_verifier = code_verifier_params || store$2.get('$_mixin-code-verifier');

      if (!client_id || !code_verifier || !code) {
        this.logger('getToken').warn('The request parameters which contain client_id, access_code and code_verifier is not correct!');
        return promise$3.resolve(null);
      }

      return new promise$3(function (resolve, reject) {
        getAccessToken({
          code: code,
          code_verifier: code_verifier,
          client_id: client_id
        }).then(function (token) {
          _this._token = token;
          if (persistence) store$2.set('$_mixin-token', token);
          resolve(token);
        })["catch"](function (err) {
          return _this.handlerError(err, 'getToken', 'get token failed!');
        });
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(token) {
      var _this2 = this;

      var _a, _b;

      if (token === void 0) {
        token = (_a = this.token) !== null && _a !== void 0 ? _a : '';
      }

      if (!token) {
        this.logger('getUserInfo').warn('The access_token is invalid!');
        return promise$3.resolve(null);
      }

      try {
        var cache = store$2.get('$_mixin-user-info');
        var userInfo = ((_b = this._userInfo) !== null && _b !== void 0 ? _b : cache) ? JSON.parse(cache) : '';

        if (userInfo) {
          this.logger('getUserInfo').log('through cache!');
          return promise$3.resolve(userInfo);
        }
      } catch (err) {
        this.logger('getUserInfo').info(err);
      }

      this.logger('getUserInfo').log('http request!');
      return request({
        url: 'https://api.mixin.one/me',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(token)
        },
        withCredentials: false
      }).then(function (res) {
        var data = res.data;

        if (data) {
          _this2._userInfo = data;
          store$2.set('$_mixin-user-info', stringify$2(data));
        }

        return data;
      });
    }
  }, {
    key: "payment",
    value: function payment(params) {
      if (!this.isMixin) {
        this.logger('payment').log('Please call in reborn or mixin app!');
        return false;
      }

      var url = scheme.pay(params);
      return !!url;
    }
  }, {
    key: "transfer",
    value: function transfer(recipient) {
      if (!this.isMixin) {
        this.logger('transfer').log('Please call in reborn or mixin app!');
        return false;
      }

      var url = scheme.transfer(recipient);
      return !!url;
    }
  }, {
    key: "getCode",
    value: function getCode() {
      var _a, _b, _c;

      var parseData = parseUrl(window.location.href);

      if (typeof parseData !== 'string') {
        var hash = parseData.hash,
            search = parseData.search;
        var regExp = /code=([^&#]*)/g;
        var code = (_b = (_a = regExp.exec(search)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : (_c = regExp.exec(hash)) === null || _c === void 0 ? void 0 : _c[1];
        return code;
      }
    }
  }, {
    key: "handlerError",
    value: function handlerError(err) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'oops! some error has ocurred!';

      var _parseError = parseError(err),
          _parseError$message = _parseError.message,
          message = _parseError$message === void 0 ? '' : _parseError$message,
          _parseError$stack = _parseError.stack,
          stack = _parseError$stack === void 0 ? '' : _parseError$stack,
          _parseError$name = _parseError.name,
          name = _parseError$name === void 0 ? '' : _parseError$name;

      if (name) name = "(".concat(name, "): ");
      if (stack) stack = " at ".concat(stack);
      this.logger(prefix).error("\uD83D\uDC47 ".concat(msg, " \u274C"), '\n', name, message, stack);
    }
  }]);

  return Bridge;
}();exports.Bridge=Bridge;exports.default=Bridge;Object.defineProperty(exports,'__esModule',{value:true});})));