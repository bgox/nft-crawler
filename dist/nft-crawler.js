/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/cash-dom@8.1.0/node_modules/cash-dom/dist/cash.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/cash-dom@8.1.0/node_modules/cash-dom/dist/cash.js ***!
  \******************************************************************************/
/***/ ((module) => {

/* MIT https://github.com/fabiospampinato/cash */
(function(){
"use strict";

var propMap = {
  /* GENERAL */
  "class": 'className',
  contenteditable: 'contentEditable',

  /* LABEL */
  "for": 'htmlFor',

  /* INPUT */
  readonly: 'readOnly',
  maxlength: 'maxLength',
  tabindex: 'tabIndex',

  /* TABLE */
  colspan: 'colSpan',
  rowspan: 'rowSpan',

  /* IMAGE */
  usemap: 'useMap'
};

function attempt(fn, arg) {
  try {
    return fn(arg);
  } catch (_a) {
    return arg;
  }
}

var doc = document,
    win = window,
    docEle = doc.documentElement,
    createElement = doc.createElement.bind(doc),
    div = createElement('div'),
    table = createElement('table'),
    tbody = createElement('tbody'),
    tr = createElement('tr'),
    isArray = Array.isArray,
    ArrayPrototype = Array.prototype,
    concat = ArrayPrototype.concat,
    filter = ArrayPrototype.filter,
    indexOf = ArrayPrototype.indexOf,
    map = ArrayPrototype.map,
    push = ArrayPrototype.push,
    slice = ArrayPrototype.slice,
    some = ArrayPrototype.some,
    splice = ArrayPrototype.splice;
var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.ts

function find(selector, context) {
  return !selector || !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.ts
// @require ./variables.ts


var Cash =
/** @class */
function () {
  function Cash(selector, context) {
    if (!selector) return;
    if (isCash(selector)) return selector;
    var eles = selector;

    if (isString(selector)) {
      var ctx = (isCash(context) ? context[0] : context) || doc;
      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
      if (!eles) return;
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (eles.nodeType || eles === win) eles = [eles];
    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  Cash.prototype.init = function (selector, context) {
    return new Cash(selector, context);
  };

  return Cash;
}();

var fn = Cash.prototype,
    cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if (typeof Symbol === 'function') {
  // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}

fn.map = function (callback) {
  return cash(concat.apply([], map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  })));
};

fn.slice = function (start, end) {
  return cash(slice.call(this, start, end));
}; // @require ./cash.ts


var dashAlphaRe = /-([a-z])/g;

function camelCase(str) {
  return str.replace(dashAlphaRe, function (match, letter) {
    return letter.toUpperCase();
  });
}

cash.guid = 1; // @require ./cash.ts

function matches(ele, selector) {
  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
  return !!matches && !!selector && matches.call(ele, selector);
}

function isCash(x) {
  return x instanceof Cash;
}

function isWindow(x) {
  return !!x && x === x.window;
}

function isDocument(x) {
  return !!x && x.nodeType === 9;
}

function isElement(x) {
  return !!x && x.nodeType === 1;
}

function isBoolean(x) {
  return typeof x === 'boolean';
}

function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}

function isUndefined(x) {
  return x === undefined;
}

function isNull(x) {
  return x === null;
}

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

function isPlainObject(x) {
  if (typeof x !== 'object' || x === null) return false;
  var proto = Object.getPrototypeOf(x);
  return proto === null || proto === Object.prototype;
}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;

fn.get = function (index) {
  if (isUndefined(index)) return slice.call(this);
  index = Number(index);
  return this[index < 0 ? index + this.length : index];
};

fn.eq = function (index) {
  return cash(this.get(index));
};

fn.first = function () {
  return this.eq(0);
};

fn.last = function () {
  return this.eq(-1);
};

function each(arr, callback, _reverse) {
  if (_reverse) {
    var i = arr.length;

    while (i--) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  } else if (isPlainObject(arr)) {
    var keys = Object.keys(arr);

    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (callback.call(arr[key], key, arr[key]) === false) return arr;
    }
  } else {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  }

  return arr;
}

cash.each = each;

fn.each = function (callback) {
  return each(this, callback);
};

fn.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    prop = propMap[prop] || prop;
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
};

fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[propMap[prop] || prop];
  });
};

function extend() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  var deep = isBoolean(sources[0]) ? sources.shift() : false,
      target = sources.shift(),
      length = sources.length;
  if (!target) return {};
  if (!length) return extend(deep, cash, target);

  for (var i = 0; i < length; i++) {
    var source = sources[i];

    for (var key in source) {
      if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
        if (!target[key] || target[key].constructor !== source[key].constructor) target[key] = new source[key].constructor();
        extend(deep, target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}

cash.extend = extend;

fn.extend = function (plugins) {
  return extend(fn, plugins);
}; // @require ./matches.ts
// @require ./type_checking.ts


function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : !comparator ? function () {
    return false;
  } : function (i, ele) {
    return ele === comparator;
  };
}

fn.filter = function (comparator) {
  var compare = getCompareFunction(comparator);
  return cash(filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
}; // @require collection/filter.ts


function filtered(collection, comparator) {
  return !comparator ? collection : collection.filter(comparator);
} // @require ./type_checking.ts


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
}

fn.hasClass = function (cls) {
  return !!cls && some.call(this, function (ele) {
    return isElement(ele) && ele.classList.contains(cls);
  });
};

fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(attrs, function (i, a) {
      ele.removeAttribute(a);
    });
  });
};

function attr(attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0] || !isElement(this[0])) return;
      var value_1 = this[0].getAttribute(attr);
      return isNull(value_1) ? undefined : value_1;
    }

    if (isUndefined(value)) return this;
    if (isNull(value)) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}

fn.attr = attr;

fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = !isUndefined(force);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(classes, function (i, c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

fn.removeClass = function (cls) {
  if (arguments.length) return this.toggleClass(cls, false);
  return this.attr('class', '');
};

function pluck(arr, prop, deep, until) {
  var plucked = [],
      isCallback = isFunction(prop),
      compare = until && getCompareFunction(until);

  for (var i = 0, l = arr.length; i < l; i++) {
    if (isCallback) {
      var val_1 = prop(arr[i]);
      if (val_1.length) push.apply(plucked, val_1);
    } else {
      var val_2 = arr[i][prop];

      while (val_2 != null) {
        if (until && compare(-1, val_2)) break;
        plucked.push(val_2);
        val_2 = deep ? val_2[prop] : null;
      }
    }
  }

  return plucked;
}

function unique(arr) {
  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
    return indexOf.call(self, item) === index;
  }) : arr;
}

cash.unique = unique;

fn.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/type_checking.ts
// @require core/variables.ts


function computeStyle(ele, prop, isVariable) {
  if (!isElement(ele)) return;
  var style = win.getComputedStyle(ele, null);
  return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
} // @require ./compute_style.ts


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.ts

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts


var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC[0].toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

; // @require core/type_checking.ts
// @require ./is_css_variable.ts

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
}

function css(prop, value) {
  if (isString(prop)) {
    var isVariable_1 = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable_1);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable_1);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;

      if (isVariable_1) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

;
fn.css = css; // @optional ./css.ts
// @require core/attempt.ts
// @require core/camel_case.ts

var JSONStringRe = /^\s+|\s+$/;

function getData(ele, key) {
  var value = ele.dataset[key] || ele.dataset[camelCase(key)];
  if (JSONStringRe.test(value)) return value;
  return attempt(JSON.parse, value);
} // @require core/attempt.ts
// @require core/camel_case.ts


function setData(ele, key, value) {
  value = attempt(JSON.stringify, value);
  ele.dataset[camelCase(key)] = value;
}

function data(name, value) {
  if (!name) {
    if (!this[0]) return;
    var datas = {};

    for (var key in this[0].dataset) {
      datas[key] = getData(this[0], key);
    }

    return datas;
  }

  if (isString(name)) {
    if (arguments.length < 2) return this[0] && getData(this[0], name);
    if (isUndefined(value)) return this;
    return this.each(function (i, ele) {
      setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}

fn.data = data; // @optional ./data.ts

function getDocumentDimension(doc, dimension) {
  var docEle = doc.documentElement;
  return Math.max(doc.body["scroll" + dimension], docEle["scroll" + dimension], doc.body["offset" + dimension], docEle["offset" + dimension], docEle["client" + dimension]);
} // @require css/helpers/compute_style_int.ts


function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

each([true, false], function (i, outer) {
  each(['Width', 'Height'], function (i, prop) {
    var name = "" + (outer ? 'outer' : 'inner') + prop;

    fn[name] = function (includeMargins) {
      if (!this[0]) return;
      if (isWindow(this[0])) return outer ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0]["" + (outer ? 'offset' : 'client') + prop] + (includeMargins && outer ? computeStyleInt(this[0], "margin" + (i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin" + (i ? 'Bottom' : 'Right')) : 0);
    };
  });
});
each(['Width', 'Height'], function (index, prop) {
  var propLC = prop.toLowerCase();

  fn[propLC] = function (value) {
    if (!this[0]) return isUndefined(value) ? undefined : this;

    if (!arguments.length) {
      if (isWindow(this[0])) return this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
    }

    var valueNumber = parseInt(value, 10);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
}); // @optional ./inner_outer.ts
// @optional ./normal.ts
// @require css/helpers/compute_style.ts

var defaultDisplay = {};

function getDefaultDisplay(tagName) {
  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
  var ele = createElement(tagName);
  doc.body.insertBefore(ele, null);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
} // @require css/helpers/compute_style.ts


function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

var displayProperty = '___cd';

fn.toggle = function (force) {
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    var show = isUndefined(force) ? isHidden(ele) : force;

    if (show) {
      ele.style.display = ele[displayProperty] || '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele[displayProperty] = computeStyle(ele, 'display');
      ele.style.display = 'none';
    }
  });
};

fn.hide = function () {
  return this.toggle(false);
};

fn.show = function () {
  return this.toggle(true);
}; // @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces(ns1, ns2) {
  return !ns2 || !some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var eventsNamespace = '___ce',
    eventsNamespacesSeparator = '.',
    eventsFocus = {
  focus: 'focusin',
  blur: 'focusout'
},
    eventsHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
},
    eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

function getEventNameBubbling(name) {
  return eventsHover[name] || eventsFocus[name] || name;
} // @require ./variables.ts


function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.ts
// @require events/helpers/get_events_cache.ts


function addEvent(ele, name, namespaces, selector, callback) {
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.ts


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
} // @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts


function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_a) {
      var ns = _a[0],
          sel = _a[1],
          cb = _a[2];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
      ele.removeEventListener(name, cb);
    });
  }
}

fn.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (isUndefined(eventFullName)) {
    this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
      removeEvent(ele);
    });
  } else if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.off(key, eventFullName[key]);
    }
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _a = parseEventName(eventFullName),
          nameOriginal = _a[0],
          namespaces = _a[1],
          name = getEventNameBubbling(nameOriginal);

      _this.each(function (i, ele) {
        if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
        removeEvent(ele, name, namespaces, selector, callback);
      });
    });
  }

  return this;
};

function on(eventFullName, selector, data, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, data, eventFullName[key], _one);
    }

    return this;
  }

  if (!isString(selector)) {
    if (isUndefined(selector) || isNull(selector)) {
      selector = '';
    } else if (isUndefined(data)) {
      data = selector;
      selector = '';
    } else {
      callback = data;
      data = selector;
      selector = '';
    }
  }

  if (!isFunction(callback)) {
    callback = data;
    data = undefined;
  }

  if (!callback) return this;
  each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _a = parseEventName(eventFullName),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name = getEventNameBubbling(nameOriginal),
        isEventHover = nameOriginal in eventsHover,
        isEventFocus = nameOriginal in eventsFocus;

    if (!name) return;

    _this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;

      var finalCallback = function finalCallback(event) {
        if (event.target["___i" + event.type]) return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one

        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        if (!selector && (isEventFocus && (event.target !== ele || event.___ot === name) || isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
          event.___cd = true; // Delegate
        }

        if (event.___cd) {
          Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        Object.defineProperty(event, 'data', {
          configurable: true,
          get: function get() {
            return data;
          }
        });
        var returnValue = callback.call(thisArg, event, event.___td);

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || cash.guid++;
      addEvent(ele, name, namespaces, selector, finalCallback);
    });
  });
  return this;
}

fn.on = on;

function one(eventFullName, selector, data, callback) {
  return this.on(eventFullName, selector, data, callback, true);
}

;
fn.one = one;

fn.ready = function (callback) {
  var cb = function cb() {
    return setTimeout(callback, 0, cash);
  };

  if (doc.readyState !== 'loading') {
    cb();
  } else {
    doc.addEventListener('DOMContentLoaded', cb);
  }

  return this;
};

fn.trigger = function (event, data) {
  if (isString(event)) {
    var _a = parseEventName(event),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name_1 = getEventNameBubbling(nameOriginal);

    if (!name_1) return this;
    var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
    event = doc.createEvent(type);
    event.initEvent(name_1, true, true);
    event.namespace = namespaces.join(eventsNamespacesSeparator);
    event.___ot = nameOriginal;
  }

  event.___td = data;
  var isEventFocus = event.___ot in eventsFocus;
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[event.___ot])) {
      ele["___i" + event.type] = true; // Ensuring the native event is ignored

      ele[event.___ot]();

      ele["___i" + event.type] = false; // Ensuring the custom event is not ignored
    }

    ele.dispatchEvent(event);
  });
}; // @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts


function getValue(ele) {
  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
    return option.selected && !option.disabled && !option.parentNode.disabled;
  }), 'value');
  return ele.value || '';
}

var queryEncodeSpaceRe = /%20/g,
    queryEncodeCRLFRe = /\r?\n/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+');
}

var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

fn.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (i, ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);

      if (!isUndefined(value)) {
        var values = isArray(value) ? value : [value];
        each(values, function (i, value) {
          query += queryEncode(ele.name, value);
        });
      }
    });
  });
  return query.slice(1);
};

function val(value) {
  if (!arguments.length) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    var isSelect = ele.multiple && ele.options;

    if (isSelect || checkableRe.test(ele.type)) {
      var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];

      if (isSelect) {
        each(ele.options, function (i, option) {
          option.selected = eleValue_1.indexOf(option.value) >= 0;
        }, true);
      } else {
        ele.checked = eleValue_1.indexOf(ele.value) >= 0;
      }
    } else {
      ele.value = isUndefined(value) || isNull(value) ? '' : value;
    }
  });
}

fn.val = val;

fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

fn.detach = function (comparator) {
  filtered(this, comparator).each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
  return this;
};

var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
var containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
}; //TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML(html) {
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML;

fn.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

function html(html) {
  if (!arguments.length) return this[0] && this[0].innerHTML;
  if (isUndefined(html)) return this;
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.innerHTML = html;
  });
}

fn.html = html;

fn.remove = function (comparator) {
  filtered(this, comparator).detach().off();
  return this;
};

function text(text) {
  if (isUndefined(text)) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.textContent = text;
  });
}

;
fn.text = text;

fn.unwrap = function () {
  this.parent().each(function (i, ele) {
    if (ele.tagName === 'BODY') return;
    var $ele = cash(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
};

fn.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
};

fn.offsetParent = function () {
  return this.map(function (i, ele) {
    var offsetParent = ele.offsetParent;

    while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docEle;
  });
};

fn.position = function () {
  var ele = this[0];
  if (!ele) return;
  var isFixed = computeStyle(ele, 'position') === 'fixed',
      offset = isFixed ? ele.getBoundingClientRect() : this.offset();

  if (!isFixed) {
    var doc_1 = ele.ownerDocument;
    var offsetParent = ele.offsetParent || doc_1.documentElement;

    while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent !== ele && isElement(offsetParent)) {
      var parentOffset = cash(offsetParent).offset();
      offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
      offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
    }
  }

  return {
    top: offset.top - computeStyleInt(ele, 'marginTop'),
    left: offset.left - computeStyleInt(ele, 'marginLeft')
  };
};

fn.children = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return ele.children;
  }))), comparator);
};

fn.contents = function () {
  return cash(unique(pluck(this, function (ele) {
    return ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes;
  })));
};

fn.find = function (selector) {
  return cash(unique(pluck(this, function (ele) {
    return find(selector, ele);
  })));
}; // @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts


var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
    scriptAttributes = ['type', 'src', 'nonce', 'noModule'];

function evalScripts(node, doc) {
  var collection = cash(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
      // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
      var script_1 = createElement('script');
      script_1.text = ele.textContent.replace(HTMLCDATARe, '');
      each(scriptAttributes, function (i, attr) {
        if (ele[attr]) script_1[attr] = ele[attr];
      });
      doc.head.insertBefore(script_1, null);
      doc.head.removeChild(script_1);
    }
  });
} // @require ./eval_scripts.ts


function insertElement(anchor, target, left, inside, evaluate) {
  if (inside) {
    // prepend/append
    anchor.insertBefore(target, left ? anchor.firstChild : null);
  } else {
    // before/after
    anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
  }

  if (evaluate) {
    evalScripts(target, anchor.ownerDocument);
  }
} // @require ./insert_element.ts


function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
  each(selectors, function (si, selector) {
    each(cash(selector), function (ti, target) {
      each(cash(anchors), function (ai, anchor) {
        var anchorFinal = inverse ? target : anchor,
            targetFinal = inverse ? anchor : target,
            indexFinal = inverse ? ti : ai;
        insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
      }, reverseLoop3);
    }, reverseLoop2);
  }, reverseLoop1);
  return anchors;
}

fn.after = function () {
  return insertSelectors(arguments, this, false, false, false, true, true);
};

fn.append = function () {
  return insertSelectors(arguments, this, false, false, true);
};

fn.appendTo = function (selector) {
  return insertSelectors(arguments, this, true, false, true);
};

fn.before = function () {
  return insertSelectors(arguments, this, false, true);
};

fn.insertAfter = function (selector) {
  return insertSelectors(arguments, this, true, false, false, false, false, true);
};

fn.insertBefore = function (selector) {
  return insertSelectors(arguments, this, true, true);
};

fn.prepend = function () {
  return insertSelectors(arguments, this, false, true, true, true, true);
};

fn.prependTo = function (selector) {
  return insertSelectors(arguments, this, true, true, true, false, false, true);
};

fn.replaceWith = function (selector) {
  return this.before(selector).remove();
};

fn.replaceAll = function (selector) {
  cash(selector).replaceWith(this);
  return this;
};

fn.wrapAll = function (selector) {
  var structure = cash(selector),
      wrapper = structure[0];

  while (wrapper.children.length) {
    wrapper = wrapper.firstElementChild;
  }

  this.first().before(structure);
  return this.appendTo(wrapper);
};

fn.wrap = function (selector) {
  return this.each(function (i, ele) {
    var wrapper = cash(selector)[0];
    cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
  });
};

fn.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = cash(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

fn.is = function (comparator) {
  var compare = getCompareFunction(comparator);
  return some.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  });
};

fn.next = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};

fn.nextAll = function (comparator) {
  return this.next(comparator, true);
};

fn.nextUntil = function (until, comparator) {
  return this.next(comparator, true, until);
};

fn.not = function (comparator) {
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
  });
};

fn.parent = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};

fn.index = function (selector) {
  var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
};

fn.closest = function (comparator) {
  var filtered = this.filter(comparator);
  if (filtered.length) return filtered;
  var $parent = this.parent();
  if (!$parent.length) return filtered;
  return $parent.closest(comparator);
};

fn.parents = function (comparator, _until) {
  return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};

fn.parentsUntil = function (until, comparator) {
  return this.parents(comparator, until);
};

fn.prev = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};

fn.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

fn.prevUntil = function (until, comparator) {
  return this.prev(comparator, true, until);
};

fn.siblings = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return cash(ele).parent().children().not(ele);
  }))), comparator);
}; // @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
// @require ./variables.ts


if (true) {
  // Node.js
  module.exports = cash;
} else {}
})();

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
var cash_dom_1 = __importDefault(__webpack_require__(/*! cash-dom */ "./node_modules/.pnpm/cash-dom@8.1.0/node_modules/cash-dom/dist/cash.js"));
window.__dataverseNftCrawler = {
    getNft: function (platform) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = platform.toLocaleLowerCase();
                    switch (_a) {
                        case "opensea": return [3 /*break*/, 1];
                        case "superrare": return [3 /*break*/, 3];
                        case "zora": return [3 /*break*/, 5];
                        case "foundation": return [3 /*break*/, 7];
                        case "twitter": return [3 /*break*/, 9];
                        case "rarible": return [3 /*break*/, 11];
                        case "niftygateway": return [3 /*break*/, 13];
                        case "asyncart": return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 17];
                case 1: return [4 /*yield*/, window.__dataverseNftCrawler.opensea()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, window.__dataverseNftCrawler.superrare()];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, window.__dataverseNftCrawler.zora()];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, window.__dataverseNftCrawler.foundation()];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, window.__dataverseNftCrawler.twitter()];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [4 /*yield*/, window.__dataverseNftCrawler.rarible()];
                case 12: return [2 /*return*/, _b.sent()];
                case 13: return [4 /*yield*/, window.__dataverseNftCrawler.niftygateway()];
                case 14: return [2 /*return*/, _b.sent()];
                case 15: return [4 /*yield*/, window.__dataverseNftCrawler.asyncart()];
                case 16: return [2 /*return*/, _b.sent()];
                case 17: return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    }); },
    opensea: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response;
        return __generator(this, function (_a) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            if (location.href.startsWith('https://opensea.io/assets/0x')) {
                nftInfo.contract = (0, utils_1.extractHex)(location.href);
                nftInfo.tokenId = location.href.split('?')[0].split(':')[1].split('/')[5];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            else if (location.href.includes('https://opensea.io/assets/matic/0x') ||
                location.href.includes('https://opensea.io/assets/klaytn/0x')) {
                response.code = -1;
                response.data = { msgType: 'notSupportChain', msgContent: '' };
            }
            else {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            return [2 /*return*/, response];
        });
    }); },
    superrare: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, itemLinkSelector, itemLinks, domUrl, redirectUrl, url, handle, promise, data, $html, dl, li, dom_a;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nftInfo = {
                        contract: '',
                        tokenId: '',
                        platformUrl: location.href
                    };
                    response = {
                        code: -1,
                        data: nftInfo
                    };
                    itemLinkSelector = '.collectible-history-section > .collectible-history-item > .collectible-history-item-link';
                    itemLinks = document.querySelectorAll(itemLinkSelector);
                    if (!itemLinks) {
                        response.code = -1;
                        response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
                        return [2 /*return*/, response];
                    }
                    domUrl = (_a = itemLinks[itemLinks.length - 1].href) !== null && _a !== void 0 ? _a : '';
                    redirectUrl = "<a href='" + domUrl + "' target='_blank'>[view tx]</a>";
                    url = domUrl + "#eventlog";
                    promise = new Promise(function (resolve) {
                        handle = function (e) {
                            if (e.data.msgType && e.data.msgType === "fetchSuperrareNftResponse") {
                                return resolve(e.data.data);
                            }
                        };
                        window.addEventListener("message", handle, false);
                        var message = { msgType: "fetchSuperrareNftRequest", url: url };
                        window.postMessage(message, "*");
                    });
                    return [4 /*yield*/, promise];
                case 1:
                    data = _b.sent();
                    $html = (0, cash_dom_1.default)(data);
                    try {
                        dl = (0, cash_dom_1.default)($html).find('#myTabContent #eventlog .card-body .media .media-body dl');
                        if (!dl || dl.length === 0) {
                            response.code = -1;
                            response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
                            return [2 /*return*/, response];
                        }
                        li = (0, cash_dom_1.default)(dl[dl.length - 2]).find('dd ul li');
                        dom_a = (0, cash_dom_1.default)(li[li.length - 1])
                            .find('span')
                            .last()
                            .find('a');
                        li = (0, cash_dom_1.default)(dl[dl.length - ((dom_a && dom_a.length) > 0 ? 1 : 2)]).find('dd ul li');
                        nftInfo.contract = (0, cash_dom_1.default)(dl[0]).find('dd').children('a').text();
                        nftInfo.tokenId = (0, cash_dom_1.default)(li[li.length - 1])
                            .find('span')
                            .last()
                            .text();
                        if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                            response.code = -1;
                            response.data = { msgType: 'notFoundNFT', msgContent: '' };
                            return [2 /*return*/, response];
                        }
                        else {
                            response.code = 0;
                            response.data = nftInfo;
                            return [2 /*return*/, response];
                        }
                    }
                    catch (_c) {
                        response.code = -1;
                        response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
                        return [2 /*return*/, response];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    zora: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, link, url;
        var _a, _b;
        return __generator(this, function (_c) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            link = document.querySelector('.css-rxk9pl a');
            if (!link) {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            else {
                url = (_a = link.href) !== null && _a !== void 0 ? _a : '';
                nftInfo.contract = (_b = (0, utils_1.extractHex)(url)) !== null && _b !== void 0 ? _b : '';
                nftInfo.tokenId = url.split('=')[1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            return [2 /*return*/, response];
        });
    }); },
    foundation: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, link, url;
        var _a;
        return __generator(this, function (_b) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            link = document.querySelector('.css-1hhedd7 a');
            if (!link) {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            else {
                url = (_a = link.href) !== null && _a !== void 0 ? _a : '';
                nftInfo.contract = (0, utils_1.extractHex)(url);
                nftInfo.tokenId = url.split('=')[1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            return [2 /*return*/, response];
        });
    }); },
    twitter: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response;
        return __generator(this, function (_a) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: { msgType: 'notFoundNFT', msgContent: '' }
            };
            return [2 /*return*/, response];
        });
    }); },
    rarible: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, tmpSplitArr;
        return __generator(this, function (_a) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            if (location.href.startsWith('https://rarible.com/token/0x')) {
                try {
                    nftInfo.contract = (0, utils_1.extractHex)(location.href);
                    tmpSplitArr = location.href.split('?')[0].split(':');
                    nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                    if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                        response.code = -1;
                        response.data = { msgType: 'notFoundNFT', msgContent: '' };
                    }
                    else {
                        response.code = 0;
                        response.data = nftInfo;
                    }
                }
                catch (_b) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
            }
            else {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            return [2 /*return*/, response];
        });
    }); },
    niftygateway: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, tmpSplitArr, tokenStr;
        var _a;
        return __generator(this, function (_b) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            if (location.href.startsWith('https://niftygateway.com/itemdetail/secondary/0x')) {
                try {
                    nftInfo.contract = (0, utils_1.extractHex)(location.href);
                    tmpSplitArr = location.href.split('/');
                    nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                    if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                        response.code = -1;
                        response.data = { msgType: 'notFoundNFT', msgContent: '' };
                    }
                    else {
                        response.code = 0;
                        response.data = nftInfo;
                    }
                }
                catch (_c) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
            }
            else if (location.href.startsWith('https://niftygateway.com/marketplace?collection=0x') &&
                location.href.includes("tokenId")) {
                try {
                    nftInfo.contract = (0, utils_1.extractHex)(location.href);
                    tokenStr = (_a = location.href.match(/&tokenId=\d+/)) === null || _a === void 0 ? void 0 : _a[0];
                    nftInfo.tokenId = tokenStr !== undefined ? tokenStr.split('=')[1] : "";
                    if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                        response.code = -1;
                        response.data = { msgType: 'notFoundNFT', msgContent: '' };
                    }
                    else {
                        response.code = 0;
                        response.data = nftInfo;
                    }
                }
                catch (_d) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
            }
            else if (location.href.startsWith('https://niftygateway.com/itemdetail/primary/0x')) {
                response.code = -1;
                response.data = { msgType: 'notSupportAtCurrentPage', msgContent: '' };
            }
            else {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            return [2 /*return*/, response];
        });
    }); },
    asyncart: function () { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, tmpSplitArr;
        return __generator(this, function (_a) {
            nftInfo = {
                contract: '',
                tokenId: '',
                platformUrl: location.href
            };
            response = {
                code: -1,
                data: nftInfo
            };
            try {
                nftInfo.contract = (0, utils_1.extractHex)(location.href);
                tmpSplitArr = location.href.split('/');
                nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1].split('-')[1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            catch (_b) {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            }
            return [2 /*return*/, response];
        });
    }); },
};
var listen = (function () {
    window.addEventListener("message", function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var platFormType, res, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(e.data.msgType && e.data.msgType === "fetchNftRequest")) return [3 /*break*/, 2];
                    platFormType = e.data.platform;
                    return [4 /*yield*/, window.__dataverseNftCrawler.getNft(platFormType)];
                case 1:
                    res = _a.sent();
                    message = { msgType: "fetchNftResponse", platform: platFormType, data: res };
                    window.postMessage(message, "*");
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, false);
})();


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractHex = void 0;
function extractHex(str) {
    var _a;
    return (_a = str.match(/0x[\dA-Za-z]+/)) === null || _a === void 0 ? void 0 : _a[0];
}
exports.extractHex = extractHex;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxHQUFHO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDhFQUE4RTs7QUFFOUU7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RkFBd0Y7O0FBRXhGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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bGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2Nhc2gtZG9tQDguMS4wL25vZGVfbW9kdWxlcy9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIE1JVCBodHRwczovL2dpdGh1Yi5jb20vZmFiaW9zcGFtcGluYXRvL2Nhc2ggKi9cbihmdW5jdGlvbigpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwcm9wTWFwID0ge1xuICAvKiBHRU5FUkFMICovXG4gIFwiY2xhc3NcIjogJ2NsYXNzTmFtZScsXG4gIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG5cbiAgLyogTEFCRUwgKi9cbiAgXCJmb3JcIjogJ2h0bWxGb3InLFxuXG4gIC8qIElOUFVUICovXG4gIHJlYWRvbmx5OiAncmVhZE9ubHknLFxuICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICB0YWJpbmRleDogJ3RhYkluZGV4JyxcblxuICAvKiBUQUJMRSAqL1xuICBjb2xzcGFuOiAnY29sU3BhbicsXG4gIHJvd3NwYW46ICdyb3dTcGFuJyxcblxuICAvKiBJTUFHRSAqL1xuICB1c2VtYXA6ICd1c2VNYXAnXG59O1xuXG5mdW5jdGlvbiBhdHRlbXB0KGZuLCBhcmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZm4oYXJnKTtcbiAgfSBjYXRjaCAoX2EpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9XG59XG5cbnZhciBkb2MgPSBkb2N1bWVudCxcbiAgICB3aW4gPSB3aW5kb3csXG4gICAgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQuYmluZChkb2MpLFxuICAgIGRpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIHRhYmxlID0gY3JlYXRlRWxlbWVudCgndGFibGUnKSxcbiAgICB0Ym9keSA9IGNyZWF0ZUVsZW1lbnQoJ3Rib2R5JyksXG4gICAgdHIgPSBjcmVhdGVFbGVtZW50KCd0cicpLFxuICAgIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5LFxuICAgIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGNvbmNhdCA9IEFycmF5UHJvdG90eXBlLmNvbmNhdCxcbiAgICBmaWx0ZXIgPSBBcnJheVByb3RvdHlwZS5maWx0ZXIsXG4gICAgaW5kZXhPZiA9IEFycmF5UHJvdG90eXBlLmluZGV4T2YsXG4gICAgbWFwID0gQXJyYXlQcm90b3R5cGUubWFwLFxuICAgIHB1c2ggPSBBcnJheVByb3RvdHlwZS5wdXNoLFxuICAgIHNsaWNlID0gQXJyYXlQcm90b3R5cGUuc2xpY2UsXG4gICAgc29tZSA9IEFycmF5UHJvdG90eXBlLnNvbWUsXG4gICAgc3BsaWNlID0gQXJyYXlQcm90b3R5cGUuc3BsaWNlO1xudmFyIGlkUmUgPSAvXiMoPzpbXFx3LV18XFxcXC58W15cXHgwMC1cXHhhMF0pKiQvLFxuICAgIGNsYXNzUmUgPSAvXlxcLig/OltcXHctXXxcXFxcLnxbXlxceDAwLVxceGEwXSkqJC8sXG4gICAgaHRtbFJlID0gLzwuKz4vLFxuICAgIHRhZ1JlID0gL15cXHcrJC87IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cbmZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgcmV0dXJuICFzZWxlY3RvciB8fCAhaXNEb2N1bWVudChjb250ZXh0KSAmJiAhaXNFbGVtZW50KGNvbnRleHQpID8gW10gOiBjbGFzc1JlLnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yLnNsaWNlKDEpKSA6IHRhZ1JlLnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSAvLyBAcmVxdWlyZSAuL2ZpbmQudHNcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cblxudmFyIENhc2ggPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDYXNoKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuICAgIGlmIChpc0Nhc2goc2VsZWN0b3IpKSByZXR1cm4gc2VsZWN0b3I7XG4gICAgdmFyIGVsZXMgPSBzZWxlY3RvcjtcblxuICAgIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgIHZhciBjdHggPSAoaXNDYXNoKGNvbnRleHQpID8gY29udGV4dFswXSA6IGNvbnRleHQpIHx8IGRvYztcbiAgICAgIGVsZXMgPSBpZFJlLnRlc3Qoc2VsZWN0b3IpID8gY3R4LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnNsaWNlKDEpKSA6IGh0bWxSZS50ZXN0KHNlbGVjdG9yKSA/IHBhcnNlSFRNTChzZWxlY3RvcikgOiBmaW5kKHNlbGVjdG9yLCBjdHgpO1xuICAgICAgaWYgKCFlbGVzKSByZXR1cm47XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVhZHkoc2VsZWN0b3IpOyAvL0ZJWE1FOiBgZm4ucmVhZHlgIGlzIG5vdCBpbmNsdWRlZCBpbiBgY29yZWAsIGJ1dCBpdCdzIGFjdHVhbGx5IGEgY29yZSBmdW5jdGlvbmFsaXR5XG4gICAgfVxuXG4gICAgaWYgKGVsZXMubm9kZVR5cGUgfHwgZWxlcyA9PT0gd2luKSBlbGVzID0gW2VsZXNdO1xuICAgIHRoaXMubGVuZ3RoID0gZWxlcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzW2ldID0gZWxlc1tpXTtcbiAgICB9XG4gIH1cblxuICBDYXNoLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBDYXNoKHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgfTtcblxuICByZXR1cm4gQ2FzaDtcbn0oKTtcblxudmFyIGZuID0gQ2FzaC5wcm90b3R5cGUsXG4gICAgY2FzaCA9IGZuLmluaXQ7XG5jYXNoLmZuID0gY2FzaC5wcm90b3R5cGUgPSBmbjsgLy8gRW5zdXJpbmcgdGhhdCBgY2FzaCAoKSBpbnN0YW5jZW9mIGNhc2hgXG5cbmZuLmxlbmd0aCA9IDA7XG5mbi5zcGxpY2UgPSBzcGxpY2U7IC8vIEVuc3VyaW5nIGEgY2FzaCBjb2xsZWN0aW9uIGdldHMgcHJpbnRlZCBhcyBhcnJheS1saWtlIGluIENocm9tZSdzIGRldnRvb2xzXG5cbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIEVuc3VyaW5nIGEgY2FzaCBjb2xsZWN0aW9uIGlzIGl0ZXJhYmxlXG4gIGZuW1N5bWJvbFsnaXRlcmF0b3InXV0gPSBBcnJheVByb3RvdHlwZVtTeW1ib2xbJ2l0ZXJhdG9yJ11dO1xufVxuXG5mbi5tYXAgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhc2goY29uY2F0LmFwcGx5KFtdLCBtYXAuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KSkpO1xufTtcblxuZm4uc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICByZXR1cm4gY2FzaChzbGljZS5jYWxsKHRoaXMsIHN0YXJ0LCBlbmQpKTtcbn07IC8vIEByZXF1aXJlIC4vY2FzaC50c1xuXG5cbnZhciBkYXNoQWxwaGFSZSA9IC8tKFthLXpdKS9nO1xuXG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShkYXNoQWxwaGFSZSwgZnVuY3Rpb24gKG1hdGNoLCBsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG5jYXNoLmd1aWQgPSAxOyAvLyBAcmVxdWlyZSAuL2Nhc2gudHNcblxuZnVuY3Rpb24gbWF0Y2hlcyhlbGUsIHNlbGVjdG9yKSB7XG4gIHZhciBtYXRjaGVzID0gZWxlICYmIChlbGVbJ21hdGNoZXMnXSB8fCBlbGVbJ3dlYmtpdE1hdGNoZXNTZWxlY3RvciddIHx8IGVsZVsnbXNNYXRjaGVzU2VsZWN0b3InXSk7XG4gIHJldHVybiAhIW1hdGNoZXMgJiYgISFzZWxlY3RvciAmJiBtYXRjaGVzLmNhbGwoZWxlLCBzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIGlzQ2FzaCh4KSB7XG4gIHJldHVybiB4IGluc3RhbmNlb2YgQ2FzaDtcbn1cblxuZnVuY3Rpb24gaXNXaW5kb3coeCkge1xuICByZXR1cm4gISF4ICYmIHggPT09IHgud2luZG93O1xufVxuXG5mdW5jdGlvbiBpc0RvY3VtZW50KHgpIHtcbiAgcmV0dXJuICEheCAmJiB4Lm5vZGVUeXBlID09PSA5O1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICByZXR1cm4gISF4ICYmIHgubm9kZVR5cGUgPT09IDE7XG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHgpIHtcbiAgcmV0dXJuIHggPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNOdWxsKHgpIHtcbiAgcmV0dXJuIHggPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyh4KSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh4KSkgJiYgaXNGaW5pdGUoeCk7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QoeCkge1xuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHggPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHgpO1xuICByZXR1cm4gcHJvdG8gPT09IG51bGwgfHwgcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbmNhc2guaXNXaW5kb3cgPSBpc1dpbmRvdztcbmNhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5jYXNoLmlzQXJyYXkgPSBpc0FycmF5O1xuY2FzaC5pc051bWVyaWMgPSBpc051bWVyaWM7XG5jYXNoLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0O1xuXG5mbi5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGluZGV4KSkgcmV0dXJuIHNsaWNlLmNhbGwodGhpcyk7XG4gIGluZGV4ID0gTnVtYmVyKGluZGV4KTtcbiAgcmV0dXJuIHRoaXNbaW5kZXggPCAwID8gaW5kZXggKyB0aGlzLmxlbmd0aCA6IGluZGV4XTtcbn07XG5cbmZuLmVxID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG59O1xuXG5mbi5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXEoMCk7XG59O1xuXG5mbi5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lcSgtMSk7XG59O1xuXG5mdW5jdGlvbiBlYWNoKGFyciwgY2FsbGJhY2ssIF9yZXZlcnNlKSB7XG4gIGlmIChfcmV2ZXJzZSkge1xuICAgIHZhciBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgaSwgYXJyW2ldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJyKSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2tleV0sIGtleSwgYXJyW2tleV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJbaV0sIGksIGFycltpXSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbmNhc2guZWFjaCA9IGVhY2g7XG5cbmZuLmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGVhY2godGhpcywgY2FsbGJhY2spO1xufTtcblxuZm4ucHJvcCA9IGZ1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xuICBpZiAoIXByb3ApIHJldHVybjtcblxuICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICBwcm9wID0gcHJvcE1hcFtwcm9wXSB8fCBwcm9wO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIHRoaXNbMF0gJiYgdGhpc1swXVtwcm9wXTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGVsZVtwcm9wXSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3ApIHtcbiAgICB0aGlzLnByb3Aoa2V5LCBwcm9wW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi5yZW1vdmVQcm9wID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZGVsZXRlIGVsZVtwcm9wTWFwW3Byb3BdIHx8IHByb3BdO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgdmFyIHNvdXJjZXMgPSBbXTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgIHNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgfVxuXG4gIHZhciBkZWVwID0gaXNCb29sZWFuKHNvdXJjZXNbMF0pID8gc291cmNlcy5zaGlmdCgpIDogZmFsc2UsXG4gICAgICB0YXJnZXQgPSBzb3VyY2VzLnNoaWZ0KCksXG4gICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXQpIHJldHVybiB7fTtcbiAgaWYgKCFsZW5ndGgpIHJldHVybiBleHRlbmQoZGVlcCwgY2FzaCwgdGFyZ2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoZGVlcCAmJiAoaXNBcnJheShzb3VyY2Vba2V5XSkgfHwgaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkpKSB7XG4gICAgICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0uY29uc3RydWN0b3IgIT09IHNvdXJjZVtrZXldLmNvbnN0cnVjdG9yKSB0YXJnZXRba2V5XSA9IG5ldyBzb3VyY2Vba2V5XS5jb25zdHJ1Y3RvcigpO1xuICAgICAgICBleHRlbmQoZGVlcCwgdGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY2FzaC5leHRlbmQgPSBleHRlbmQ7XG5cbmZuLmV4dGVuZCA9IGZ1bmN0aW9uIChwbHVnaW5zKSB7XG4gIHJldHVybiBleHRlbmQoZm4sIHBsdWdpbnMpO1xufTsgLy8gQHJlcXVpcmUgLi9tYXRjaGVzLnRzXG4vLyBAcmVxdWlyZSAuL3R5cGVfY2hlY2tpbmcudHNcblxuXG5mdW5jdGlvbiBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcikge1xuICByZXR1cm4gaXNTdHJpbmcoY29tcGFyYXRvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIG1hdGNoZXMoZWxlLCBjb21wYXJhdG9yKTtcbiAgfSA6IGlzRnVuY3Rpb24oY29tcGFyYXRvcikgPyBjb21wYXJhdG9yIDogaXNDYXNoKGNvbXBhcmF0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBjb21wYXJhdG9yLmlzKGVsZSk7XG4gIH0gOiAhY29tcGFyYXRvciA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gOiBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZSA9PT0gY29tcGFyYXRvcjtcbiAgfTtcbn1cblxuZm4uZmlsdGVyID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiBjYXNoKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY29tcGFyZS5jYWxsKGVsZSwgaSwgZWxlKTtcbiAgfSkpO1xufTsgLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9maWx0ZXIudHNcblxuXG5mdW5jdGlvbiBmaWx0ZXJlZChjb2xsZWN0aW9uLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiAhY29tcGFyYXRvciA/IGNvbGxlY3Rpb24gOiBjb2xsZWN0aW9uLmZpbHRlcihjb21wYXJhdG9yKTtcbn0gLy8gQHJlcXVpcmUgLi90eXBlX2NoZWNraW5nLnRzXG5cblxudmFyIHNwbGl0VmFsdWVzUmUgPSAvXFxTKy9nO1xuXG5mdW5jdGlvbiBnZXRTcGxpdFZhbHVlcyhzdHIpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKHN0cikgPyBzdHIubWF0Y2goc3BsaXRWYWx1ZXNSZSkgfHwgW10gOiBbXTtcbn1cblxuZm4uaGFzQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIHJldHVybiAhIWNscyAmJiBzb21lLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoZWxlKSAmJiBlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNscyk7XG4gIH0pO1xufTtcblxuZm4ucmVtb3ZlQXR0ciA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gIHZhciBhdHRycyA9IGdldFNwbGl0VmFsdWVzKGF0dHIpO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWFjaChhdHRycywgZnVuY3Rpb24gKGksIGEpIHtcbiAgICAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoYSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gYXR0cihhdHRyLCB2YWx1ZSkge1xuICBpZiAoIWF0dHIpIHJldHVybjtcblxuICBpZiAoaXNTdHJpbmcoYXR0cikpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIGlmICghdGhpc1swXSB8fCAhaXNFbGVtZW50KHRoaXNbMF0pKSByZXR1cm47XG4gICAgICB2YXIgdmFsdWVfMSA9IHRoaXNbMF0uZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgICAgcmV0dXJuIGlzTnVsbCh2YWx1ZV8xKSA/IHVuZGVmaW5lZCA6IHZhbHVlXzE7XG4gICAgfVxuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuIHRoaXM7XG4gICAgaWYgKGlzTnVsbCh2YWx1ZSkpIHJldHVybiB0aGlzLnJlbW92ZUF0dHIoYXR0cik7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgICBlbGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBhdHRyKSB7XG4gICAgdGhpcy5hdHRyKGtleSwgYXR0cltrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5hdHRyID0gYXR0cjtcblxuZm4udG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiAoY2xzLCBmb3JjZSkge1xuICB2YXIgY2xhc3NlcyA9IGdldFNwbGl0VmFsdWVzKGNscyksXG4gICAgICBpc0ZvcmNlID0gIWlzVW5kZWZpbmVkKGZvcmNlKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVhY2goY2xhc3NlcywgZnVuY3Rpb24gKGksIGMpIHtcbiAgICAgIGlmIChpc0ZvcmNlKSB7XG4gICAgICAgIGZvcmNlID8gZWxlLmNsYXNzTGlzdC5hZGQoYykgOiBlbGUuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZS5jbGFzc0xpc3QudG9nZ2xlKGMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmZuLmFkZENsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICByZXR1cm4gdGhpcy50b2dnbGVDbGFzcyhjbHMsIHRydWUpO1xufTtcblxuZm4ucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy50b2dnbGVDbGFzcyhjbHMsIGZhbHNlKTtcbiAgcmV0dXJuIHRoaXMuYXR0cignY2xhc3MnLCAnJyk7XG59O1xuXG5mdW5jdGlvbiBwbHVjayhhcnIsIHByb3AsIGRlZXAsIHVudGlsKSB7XG4gIHZhciBwbHVja2VkID0gW10sXG4gICAgICBpc0NhbGxiYWNrID0gaXNGdW5jdGlvbihwcm9wKSxcbiAgICAgIGNvbXBhcmUgPSB1bnRpbCAmJiBnZXRDb21wYXJlRnVuY3Rpb24odW50aWwpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChpc0NhbGxiYWNrKSB7XG4gICAgICB2YXIgdmFsXzEgPSBwcm9wKGFycltpXSk7XG4gICAgICBpZiAodmFsXzEubGVuZ3RoKSBwdXNoLmFwcGx5KHBsdWNrZWQsIHZhbF8xKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZhbF8yID0gYXJyW2ldW3Byb3BdO1xuXG4gICAgICB3aGlsZSAodmFsXzIgIT0gbnVsbCkge1xuICAgICAgICBpZiAodW50aWwgJiYgY29tcGFyZSgtMSwgdmFsXzIpKSBicmVhaztcbiAgICAgICAgcGx1Y2tlZC5wdXNoKHZhbF8yKTtcbiAgICAgICAgdmFsXzIgPSBkZWVwID8gdmFsXzJbcHJvcF0gOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwbHVja2VkO1xufVxuXG5mdW5jdGlvbiB1bmlxdWUoYXJyKSB7XG4gIHJldHVybiBhcnIubGVuZ3RoID4gMSA/IGZpbHRlci5jYWxsKGFyciwgZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBzZWxmKSB7XG4gICAgcmV0dXJuIGluZGV4T2YuY2FsbChzZWxmLCBpdGVtKSA9PT0gaW5kZXg7XG4gIH0pIDogYXJyO1xufVxuXG5jYXNoLnVuaXF1ZSA9IHVuaXF1ZTtcblxuZm4uYWRkID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZSh0aGlzLmdldCgpLmNvbmNhdChjYXNoKHNlbGVjdG9yLCBjb250ZXh0KS5nZXQoKSkpKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGUoZWxlLCBwcm9wLCBpc1ZhcmlhYmxlKSB7XG4gIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gd2luLmdldENvbXB1dGVkU3R5bGUoZWxlLCBudWxsKTtcbiAgcmV0dXJuIGlzVmFyaWFibGUgPyBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApIHx8IHVuZGVmaW5lZCA6IHN0eWxlW3Byb3BdIHx8IGVsZS5zdHlsZVtwcm9wXTtcbn0gLy8gQHJlcXVpcmUgLi9jb21wdXRlX3N0eWxlLnRzXG5cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlSW50KGVsZSwgcHJvcCkge1xuICByZXR1cm4gcGFyc2VJbnQoY29tcHV0ZVN0eWxlKGVsZSwgcHJvcCksIDEwKSB8fCAwO1xufVxuXG52YXIgY3NzVmFyaWFibGVSZSA9IC9eLS0vOyAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5mdW5jdGlvbiBpc0NTU1ZhcmlhYmxlKHByb3ApIHtcbiAgcmV0dXJuIGNzc1ZhcmlhYmxlUmUudGVzdChwcm9wKTtcbn0gLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2Nhc2gudHNcbi8vIEByZXF1aXJlIGNvcmUvZWFjaC50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIC4vaXNfY3NzX3ZhcmlhYmxlLnRzXG5cblxudmFyIHByZWZpeGVkUHJvcHMgPSB7fSxcbiAgICBzdHlsZSA9IGRpdi5zdHlsZSxcbiAgICB2ZW5kb3JzUHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnXTtcblxuZnVuY3Rpb24gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGUpIHtcbiAgaWYgKGlzVmFyaWFibGUgPT09IHZvaWQgMCkge1xuICAgIGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICB9XG5cbiAgaWYgKGlzVmFyaWFibGUpIHJldHVybiBwcm9wO1xuXG4gIGlmICghcHJlZml4ZWRQcm9wc1twcm9wXSkge1xuICAgIHZhciBwcm9wQ0MgPSBjYW1lbENhc2UocHJvcCksXG4gICAgICAgIHByb3BVQyA9IFwiXCIgKyBwcm9wQ0NbMF0udG9VcHBlckNhc2UoKSArIHByb3BDQy5zbGljZSgxKSxcbiAgICAgICAgcHJvcHMgPSAocHJvcENDICsgXCIgXCIgKyB2ZW5kb3JzUHJlZml4ZXMuam9pbihwcm9wVUMgKyBcIiBcIikgKyBwcm9wVUMpLnNwbGl0KCcgJyk7XG4gICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKGksIHApIHtcbiAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgIHByZWZpeGVkUHJvcHNbcHJvcF0gPSBwO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcHJlZml4ZWRQcm9wc1twcm9wXTtcbn1cblxuOyAvLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcudHNcbi8vIEByZXF1aXJlIC4vaXNfY3NzX3ZhcmlhYmxlLnRzXG5cbnZhciBudW1lcmljUHJvcHMgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgZmxleEdyb3c6IHRydWUsXG4gIGZsZXhTaHJpbms6IHRydWUsXG4gIGZvbnRXZWlnaHQ6IHRydWUsXG4gIGdyaWRBcmVhOiB0cnVlLFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBncmlkQ29sdW1uRW5kOiB0cnVlLFxuICBncmlkQ29sdW1uU3RhcnQ6IHRydWUsXG4gIGdyaWRSb3c6IHRydWUsXG4gIGdyaWRSb3dFbmQ6IHRydWUsXG4gIGdyaWRSb3dTdGFydDogdHJ1ZSxcbiAgbGluZUhlaWdodDogdHJ1ZSxcbiAgb3BhY2l0eTogdHJ1ZSxcbiAgb3JkZXI6IHRydWUsXG4gIG9ycGhhbnM6IHRydWUsXG4gIHdpZG93czogdHJ1ZSxcbiAgekluZGV4OiB0cnVlXG59O1xuXG5mdW5jdGlvbiBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlLCBpc1ZhcmlhYmxlKSB7XG4gIGlmIChpc1ZhcmlhYmxlID09PSB2b2lkIDApIHtcbiAgICBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgfVxuXG4gIHJldHVybiAhaXNWYXJpYWJsZSAmJiAhbnVtZXJpY1Byb3BzW3Byb3BdICYmIGlzTnVtZXJpYyh2YWx1ZSkgPyB2YWx1ZSArIFwicHhcIiA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjc3MocHJvcCwgdmFsdWUpIHtcbiAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgdmFyIGlzVmFyaWFibGVfMSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gICAgcHJvcCA9IGdldFByZWZpeGVkUHJvcChwcm9wLCBpc1ZhcmlhYmxlXzEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIHRoaXNbMF0gJiYgY29tcHV0ZVN0eWxlKHRoaXNbMF0sIHByb3AsIGlzVmFyaWFibGVfMSk7XG4gICAgaWYgKCFwcm9wKSByZXR1cm4gdGhpcztcbiAgICB2YWx1ZSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGVfMSk7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG5cbiAgICAgIGlmIChpc1ZhcmlhYmxlXzEpIHtcbiAgICAgICAgZWxlLnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZS5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3ApIHtcbiAgICB0aGlzLmNzcyhrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuO1xuZm4uY3NzID0gY3NzOyAvLyBAb3B0aW9uYWwgLi9jc3MudHNcbi8vIEByZXF1aXJlIGNvcmUvYXR0ZW1wdC50c1xuLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLnRzXG5cbnZhciBKU09OU3RyaW5nUmUgPSAvXlxccyt8XFxzKyQvO1xuXG5mdW5jdGlvbiBnZXREYXRhKGVsZSwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGVsZS5kYXRhc2V0W2tleV0gfHwgZWxlLmRhdGFzZXRbY2FtZWxDYXNlKGtleSldO1xuICBpZiAoSlNPTlN0cmluZ1JlLnRlc3QodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBhdHRlbXB0KEpTT04ucGFyc2UsIHZhbHVlKTtcbn0gLy8gQHJlcXVpcmUgY29yZS9hdHRlbXB0LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcblxuXG5mdW5jdGlvbiBzZXREYXRhKGVsZSwga2V5LCB2YWx1ZSkge1xuICB2YWx1ZSA9IGF0dGVtcHQoSlNPTi5zdHJpbmdpZnksIHZhbHVlKTtcbiAgZWxlLmRhdGFzZXRbY2FtZWxDYXNlKGtleSldID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRhdGEobmFtZSwgdmFsdWUpIHtcbiAgaWYgKCFuYW1lKSB7XG4gICAgaWYgKCF0aGlzWzBdKSByZXR1cm47XG4gICAgdmFyIGRhdGFzID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpc1swXS5kYXRhc2V0KSB7XG4gICAgICBkYXRhc1trZXldID0gZ2V0RGF0YSh0aGlzWzBdLCBrZXkpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhcztcbiAgfVxuXG4gIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIHRoaXNbMF0gJiYgZ2V0RGF0YSh0aGlzWzBdLCBuYW1lKTtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm4gdGhpcztcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIHNldERhdGEoZWxlLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZm4uZGF0YSA9IGRhdGE7IC8vIEBvcHRpb25hbCAuL2RhdGEudHNcblxuZnVuY3Rpb24gZ2V0RG9jdW1lbnREaW1lbnNpb24oZG9jLCBkaW1lbnNpb24pIHtcbiAgdmFyIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gIHJldHVybiBNYXRoLm1heChkb2MuYm9keVtcInNjcm9sbFwiICsgZGltZW5zaW9uXSwgZG9jRWxlW1wic2Nyb2xsXCIgKyBkaW1lbnNpb25dLCBkb2MuYm9keVtcIm9mZnNldFwiICsgZGltZW5zaW9uXSwgZG9jRWxlW1wib2Zmc2V0XCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJjbGllbnRcIiArIGRpbWVuc2lvbl0pO1xufSAvLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlX2ludC50c1xuXG5cbmZ1bmN0aW9uIGdldEV4dHJhU3BhY2UoZWxlLCB4QXhpcykge1xuICByZXR1cm4gY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJib3JkZXJcIiArICh4QXhpcyA/ICdMZWZ0JyA6ICdUb3AnKSArIFwiV2lkdGhcIikgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcInBhZGRpbmdcIiArICh4QXhpcyA/ICdMZWZ0JyA6ICdUb3AnKSkgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcInBhZGRpbmdcIiArICh4QXhpcyA/ICdSaWdodCcgOiAnQm90dG9tJykpICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJib3JkZXJcIiArICh4QXhpcyA/ICdSaWdodCcgOiAnQm90dG9tJykgKyBcIldpZHRoXCIpO1xufVxuXG5lYWNoKFt0cnVlLCBmYWxzZV0sIGZ1bmN0aW9uIChpLCBvdXRlcikge1xuICBlYWNoKFsnV2lkdGgnLCAnSGVpZ2h0J10sIGZ1bmN0aW9uIChpLCBwcm9wKSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiICsgKG91dGVyID8gJ291dGVyJyA6ICdpbm5lcicpICsgcHJvcDtcblxuICAgIGZuW25hbWVdID0gZnVuY3Rpb24gKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcbiAgICAgIGlmIChpc1dpbmRvdyh0aGlzWzBdKSkgcmV0dXJuIG91dGVyID8gdGhpc1swXVtcImlubmVyXCIgKyBwcm9wXSA6IHRoaXNbMF0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W1wiY2xpZW50XCIgKyBwcm9wXTtcbiAgICAgIGlmIChpc0RvY3VtZW50KHRoaXNbMF0pKSByZXR1cm4gZ2V0RG9jdW1lbnREaW1lbnNpb24odGhpc1swXSwgcHJvcCk7XG4gICAgICByZXR1cm4gdGhpc1swXVtcIlwiICsgKG91dGVyID8gJ29mZnNldCcgOiAnY2xpZW50JykgKyBwcm9wXSArIChpbmNsdWRlTWFyZ2lucyAmJiBvdXRlciA/IGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBcIm1hcmdpblwiICsgKGkgPyAnVG9wJyA6ICdMZWZ0JykpICsgY29tcHV0ZVN0eWxlSW50KHRoaXNbMF0sIFwibWFyZ2luXCIgKyAoaSA/ICdCb3R0b20nIDogJ1JpZ2h0JykpIDogMCk7XG4gICAgfTtcbiAgfSk7XG59KTtcbmVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgZnVuY3Rpb24gKGluZGV4LCBwcm9wKSB7XG4gIHZhciBwcm9wTEMgPSBwcm9wLnRvTG93ZXJDYXNlKCk7XG5cbiAgZm5bcHJvcExDXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdGhpc1swXSkgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSA/IHVuZGVmaW5lZCA6IHRoaXM7XG5cbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGlmIChpc1dpbmRvdyh0aGlzWzBdKSkgcmV0dXJuIHRoaXNbMF0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W1wiY2xpZW50XCIgKyBwcm9wXTtcbiAgICAgIGlmIChpc0RvY3VtZW50KHRoaXNbMF0pKSByZXR1cm4gZ2V0RG9jdW1lbnREaW1lbnNpb24odGhpc1swXSwgcHJvcCk7XG4gICAgICByZXR1cm4gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtwcm9wTENdIC0gZ2V0RXh0cmFTcGFjZSh0aGlzWzBdLCAhaW5kZXgpO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZU51bWJlciA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgICB2YXIgYm94U2l6aW5nID0gY29tcHV0ZVN0eWxlKGVsZSwgJ2JveFNpemluZycpO1xuICAgICAgZWxlLnN0eWxlW3Byb3BMQ10gPSBnZXRTdWZmaXhlZFZhbHVlKHByb3BMQywgdmFsdWVOdW1iZXIgKyAoYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgPyBnZXRFeHRyYVNwYWNlKGVsZSwgIWluZGV4KSA6IDApKTtcbiAgICB9KTtcbiAgfTtcbn0pOyAvLyBAb3B0aW9uYWwgLi9pbm5lcl9vdXRlci50c1xuLy8gQG9wdGlvbmFsIC4vbm9ybWFsLnRzXG4vLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlLnRzXG5cbnZhciBkZWZhdWx0RGlzcGxheSA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0RGlzcGxheSh0YWdOYW1lKSB7XG4gIGlmIChkZWZhdWx0RGlzcGxheVt0YWdOYW1lXSkgcmV0dXJuIGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdO1xuICB2YXIgZWxlID0gY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgZG9jLmJvZHkuaW5zZXJ0QmVmb3JlKGVsZSwgbnVsbCk7XG4gIHZhciBkaXNwbGF5ID0gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKTtcbiAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgcmV0dXJuIGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdID0gZGlzcGxheSAhPT0gJ25vbmUnID8gZGlzcGxheSA6ICdibG9jayc7XG59IC8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGUudHNcblxuXG5mdW5jdGlvbiBpc0hpZGRlbihlbGUpIHtcbiAgcmV0dXJuIGNvbXB1dGVTdHlsZShlbGUsICdkaXNwbGF5JykgPT09ICdub25lJztcbn1cblxudmFyIGRpc3BsYXlQcm9wZXJ0eSA9ICdfX19jZCc7XG5cbmZuLnRvZ2dsZSA9IGZ1bmN0aW9uIChmb3JjZSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgdmFyIHNob3cgPSBpc1VuZGVmaW5lZChmb3JjZSkgPyBpc0hpZGRlbihlbGUpIDogZm9yY2U7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgZWxlLnN0eWxlLmRpc3BsYXkgPSBlbGVbZGlzcGxheVByb3BlcnR5XSB8fCAnJztcblxuICAgICAgaWYgKGlzSGlkZGVuKGVsZSkpIHtcbiAgICAgICAgZWxlLnN0eWxlLmRpc3BsYXkgPSBnZXREZWZhdWx0RGlzcGxheShlbGUudGFnTmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZVtkaXNwbGF5UHJvcGVydHldID0gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKTtcbiAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mbi5oaWRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xufTtcblxuZm4uc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUpO1xufTsgLy8gQG9wdGlvbmFsIC4vaGlkZS50c1xuLy8gQG9wdGlvbmFsIC4vc2hvdy50c1xuLy8gQG9wdGlvbmFsIC4vdG9nZ2xlLnRzXG5cblxuZnVuY3Rpb24gaGFzTmFtZXNwYWNlcyhuczEsIG5zMikge1xuICByZXR1cm4gIW5zMiB8fCAhc29tZS5jYWxsKG5zMiwgZnVuY3Rpb24gKG5zKSB7XG4gICAgcmV0dXJuIG5zMS5pbmRleE9mKG5zKSA8IDA7XG4gIH0pO1xufVxuXG52YXIgZXZlbnRzTmFtZXNwYWNlID0gJ19fX2NlJyxcbiAgICBldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yID0gJy4nLFxuICAgIGV2ZW50c0ZvY3VzID0ge1xuICBmb2N1czogJ2ZvY3VzaW4nLFxuICBibHVyOiAnZm9jdXNvdXQnXG59LFxuICAgIGV2ZW50c0hvdmVyID0ge1xuICBtb3VzZWVudGVyOiAnbW91c2VvdmVyJyxcbiAgbW91c2VsZWF2ZTogJ21vdXNlb3V0J1xufSxcbiAgICBldmVudHNNb3VzZVJlID0gL14obW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3B8Y2xpY2t8ZGJsY2xpY2spL2k7IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cbmZ1bmN0aW9uIGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWUpIHtcbiAgcmV0dXJuIGV2ZW50c0hvdmVyW25hbWVdIHx8IGV2ZW50c0ZvY3VzW25hbWVdIHx8IG5hbWU7XG59IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cblxuZnVuY3Rpb24gZ2V0RXZlbnRzQ2FjaGUoZWxlKSB7XG4gIHJldHVybiBlbGVbZXZlbnRzTmFtZXNwYWNlXSA9IGVsZVtldmVudHNOYW1lc3BhY2VdIHx8IHt9O1xufSAvLyBAcmVxdWlyZSBjb3JlL2d1aWQudHNcbi8vIEByZXF1aXJlIGV2ZW50cy9oZWxwZXJzL2dldF9ldmVudHNfY2FjaGUudHNcblxuXG5mdW5jdGlvbiBhZGRFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgZXZlbnRDYWNoZSA9IGdldEV2ZW50c0NhY2hlKGVsZSk7XG4gIGV2ZW50Q2FjaGVbbmFtZV0gPSBldmVudENhY2hlW25hbWVdIHx8IFtdO1xuICBldmVudENhY2hlW25hbWVdLnB1c2goW25hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFja10pO1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjayk7XG59IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cblxuZnVuY3Rpb24gcGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSB7XG4gIHZhciBwYXJ0cyA9IGV2ZW50TmFtZS5zcGxpdChldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKTtcbiAgcmV0dXJuIFtwYXJ0c1swXSwgcGFydHMuc2xpY2UoMSkuc29ydCgpXTsgLy8gW25hbWUsIG5hbWVzcGFjZVtdXVxufSAvLyBAcmVxdWlyZSAuL2dldF9ldmVudHNfY2FjaGUudHNcbi8vIEByZXF1aXJlIC4vaGFzX25hbWVzcGFjZXMudHNcbi8vIEByZXF1aXJlIC4vcGFyc2VfZXZlbnRfbmFtZS50c1xuXG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBjYWNoZSA9IGdldEV2ZW50c0NhY2hlKGVsZSk7XG5cbiAgaWYgKCFuYW1lKSB7XG4gICAgZm9yIChuYW1lIGluIGNhY2hlKSB7XG4gICAgICByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNhY2hlW25hbWVdKSB7XG4gICAgY2FjaGVbbmFtZV0gPSBjYWNoZVtuYW1lXS5maWx0ZXIoZnVuY3Rpb24gKF9hKSB7XG4gICAgICB2YXIgbnMgPSBfYVswXSxcbiAgICAgICAgICBzZWwgPSBfYVsxXSxcbiAgICAgICAgICBjYiA9IF9hWzJdO1xuICAgICAgaWYgKGNhbGxiYWNrICYmIGNiLmd1aWQgIT09IGNhbGxiYWNrLmd1aWQgfHwgIWhhc05hbWVzcGFjZXMobnMsIG5hbWVzcGFjZXMpIHx8IHNlbGVjdG9yICYmIHNlbGVjdG9yICE9PSBzZWwpIHJldHVybiB0cnVlO1xuICAgICAgZWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgY2IpO1xuICAgIH0pO1xuICB9XG59XG5cbmZuLm9mZiA9IGZ1bmN0aW9uIChldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoaXNVbmRlZmluZWQoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSAmJiAhaXNEb2N1bWVudChlbGUpICYmICFpc1dpbmRvdyhlbGUpKSByZXR1cm47XG4gICAgICByZW1vdmVFdmVudChlbGUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCFpc1N0cmluZyhldmVudEZ1bGxOYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBldmVudEZ1bGxOYW1lKSB7XG4gICAgICB0aGlzLm9mZihrZXksIGV2ZW50RnVsbE5hbWVba2V5XSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfVxuXG4gICAgZWFjaChnZXRTcGxpdFZhbHVlcyhldmVudEZ1bGxOYW1lKSwgZnVuY3Rpb24gKGksIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHZhciBfYSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50RnVsbE5hbWUpLFxuICAgICAgICAgIG5hbWVPcmlnaW5hbCA9IF9hWzBdLFxuICAgICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgICBuYW1lID0gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZU9yaWdpbmFsKTtcblxuICAgICAgX3RoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICAgIGlmICghaXNFbGVtZW50KGVsZSkgJiYgIWlzRG9jdW1lbnQoZWxlKSAmJiAhaXNXaW5kb3coZWxlKSkgcmV0dXJuO1xuICAgICAgICByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gb24oZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBfb25lKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKCFpc1N0cmluZyhldmVudEZ1bGxOYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBldmVudEZ1bGxOYW1lKSB7XG4gICAgICB0aGlzLm9uKGtleSwgc2VsZWN0b3IsIGRhdGEsIGV2ZW50RnVsbE5hbWVba2V5XSwgX29uZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoIWlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChzZWxlY3RvcikgfHwgaXNOdWxsKHNlbGVjdG9yKSkge1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWZpbmVkKGRhdGEpKSB7XG4gICAgICBkYXRhID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgICBkYXRhID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICBlYWNoKGdldFNwbGl0VmFsdWVzKGV2ZW50RnVsbE5hbWUpLCBmdW5jdGlvbiAoaSwgZXZlbnRGdWxsTmFtZSkge1xuICAgIHZhciBfYSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50RnVsbE5hbWUpLFxuICAgICAgICBuYW1lT3JpZ2luYWwgPSBfYVswXSxcbiAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICBuYW1lID0gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZU9yaWdpbmFsKSxcbiAgICAgICAgaXNFdmVudEhvdmVyID0gbmFtZU9yaWdpbmFsIGluIGV2ZW50c0hvdmVyLFxuICAgICAgICBpc0V2ZW50Rm9jdXMgPSBuYW1lT3JpZ2luYWwgaW4gZXZlbnRzRm9jdXM7XG5cbiAgICBpZiAoIW5hbWUpIHJldHVybjtcblxuICAgIF90aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSAmJiAhaXNEb2N1bWVudChlbGUpICYmICFpc1dpbmRvdyhlbGUpKSByZXR1cm47XG5cbiAgICAgIHZhciBmaW5hbENhbGxiYWNrID0gZnVuY3Rpb24gZmluYWxDYWxsYmFjayhldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0W1wiX19faVwiICsgZXZlbnQudHlwZV0pIHJldHVybiBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgLy8gSWdub3JpbmcgbmF0aXZlIGV2ZW50IGluIGZhdm9yIG9mIHRoZSB1cGNvbWluZyBjdXN0b20gb25lXG5cbiAgICAgICAgaWYgKGV2ZW50Lm5hbWVzcGFjZSAmJiAhaGFzTmFtZXNwYWNlcyhuYW1lc3BhY2VzLCBldmVudC5uYW1lc3BhY2Uuc3BsaXQoZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcikpKSByZXR1cm47XG4gICAgICAgIGlmICghc2VsZWN0b3IgJiYgKGlzRXZlbnRGb2N1cyAmJiAoZXZlbnQudGFyZ2V0ICE9PSBlbGUgfHwgZXZlbnQuX19fb3QgPT09IG5hbWUpIHx8IGlzRXZlbnRIb3ZlciAmJiBldmVudC5yZWxhdGVkVGFyZ2V0ICYmIGVsZS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkpIHJldHVybjtcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBlbGU7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICAgIHdoaWxlICghbWF0Y2hlcyh0YXJnZXQsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlKSByZXR1cm47XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpc0FyZyA9IHRhcmdldDtcbiAgICAgICAgICBldmVudC5fX19jZCA9IHRydWU7IC8vIERlbGVnYXRlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuX19fY2QpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdjdXJyZW50VGFyZ2V0Jywge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnZGF0YScsIHtcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGV2ZW50LCBldmVudC5fX190ZCk7XG5cbiAgICAgICAgaWYgKF9vbmUpIHtcbiAgICAgICAgICByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBmaW5hbENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmaW5hbENhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkID0gY2FsbGJhY2suZ3VpZCB8fCBjYXNoLmd1aWQrKztcbiAgICAgIGFkZEV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGZpbmFsQ2FsbGJhY2spO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLm9uID0gb247XG5cbmZ1bmN0aW9uIG9uZShldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMub24oZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCB0cnVlKTtcbn1cblxuO1xuZm4ub25lID0gb25lO1xuXG5mbi5yZWFkeSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB2YXIgY2IgPSBmdW5jdGlvbiBjYigpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMCwgY2FzaCk7XG4gIH07XG5cbiAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICBjYigpO1xuICB9IGVsc2Uge1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gIGlmIChpc1N0cmluZyhldmVudCkpIHtcbiAgICB2YXIgX2EgPSBwYXJzZUV2ZW50TmFtZShldmVudCksXG4gICAgICAgIG5hbWVPcmlnaW5hbCA9IF9hWzBdLFxuICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgIG5hbWVfMSA9IGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWVPcmlnaW5hbCk7XG5cbiAgICBpZiAoIW5hbWVfMSkgcmV0dXJuIHRoaXM7XG4gICAgdmFyIHR5cGUgPSBldmVudHNNb3VzZVJlLnRlc3QobmFtZV8xKSA/ICdNb3VzZUV2ZW50cycgOiAnSFRNTEV2ZW50cyc7XG4gICAgZXZlbnQgPSBkb2MuY3JlYXRlRXZlbnQodHlwZSk7XG4gICAgZXZlbnQuaW5pdEV2ZW50KG5hbWVfMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpO1xuICAgIGV2ZW50Ll9fX290ID0gbmFtZU9yaWdpbmFsO1xuICB9XG5cbiAgZXZlbnQuX19fdGQgPSBkYXRhO1xuICB2YXIgaXNFdmVudEZvY3VzID0gZXZlbnQuX19fb3QgaW4gZXZlbnRzRm9jdXM7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChpc0V2ZW50Rm9jdXMgJiYgaXNGdW5jdGlvbihlbGVbZXZlbnQuX19fb3RdKSkge1xuICAgICAgZWxlW1wiX19faVwiICsgZXZlbnQudHlwZV0gPSB0cnVlOyAvLyBFbnN1cmluZyB0aGUgbmF0aXZlIGV2ZW50IGlzIGlnbm9yZWRcblxuICAgICAgZWxlW2V2ZW50Ll9fX290XSgpO1xuXG4gICAgICBlbGVbXCJfX19pXCIgKyBldmVudC50eXBlXSA9IGZhbHNlOyAvLyBFbnN1cmluZyB0aGUgY3VzdG9tIGV2ZW50IGlzIG5vdCBpZ25vcmVkXG4gICAgfVxuXG4gICAgZWxlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9KTtcbn07IC8vIEBvcHRpb25hbCAuL29mZi50c1xuLy8gQG9wdGlvbmFsIC4vb24udHNcbi8vIEBvcHRpb25hbCAuL29uZS50c1xuLy8gQG9wdGlvbmFsIC4vcmVhZHkudHNcbi8vIEBvcHRpb25hbCAuL3RyaWdnZXIudHNcbi8vIEByZXF1aXJlIGNvcmUvcGx1Y2sudHNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG5cblxuZnVuY3Rpb24gZ2V0VmFsdWUoZWxlKSB7XG4gIGlmIChlbGUubXVsdGlwbGUgJiYgZWxlLm9wdGlvbnMpIHJldHVybiBwbHVjayhmaWx0ZXIuY2FsbChlbGUub3B0aW9ucywgZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgJiYgIW9wdGlvbi5kaXNhYmxlZCAmJiAhb3B0aW9uLnBhcmVudE5vZGUuZGlzYWJsZWQ7XG4gIH0pLCAndmFsdWUnKTtcbiAgcmV0dXJuIGVsZS52YWx1ZSB8fCAnJztcbn1cblxudmFyIHF1ZXJ5RW5jb2RlU3BhY2VSZSA9IC8lMjAvZyxcbiAgICBxdWVyeUVuY29kZUNSTEZSZSA9IC9cXHI/XFxuL2c7XG5cbmZ1bmN0aW9uIHF1ZXJ5RW5jb2RlKHByb3AsIHZhbHVlKSB7XG4gIHJldHVybiBcIiZcIiArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlLnJlcGxhY2UocXVlcnlFbmNvZGVDUkxGUmUsICdcXHJcXG4nKSkucmVwbGFjZShxdWVyeUVuY29kZVNwYWNlUmUsICcrJyk7XG59XG5cbnZhciBza2lwcGFibGVSZSA9IC9maWxlfHJlc2V0fHN1Ym1pdHxidXR0b258aW1hZ2UvaSxcbiAgICBjaGVja2FibGVSZSA9IC9yYWRpb3xjaGVja2JveC9pO1xuXG5mbi5zZXJpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9ICcnO1xuICB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGVhY2goZWxlLmVsZW1lbnRzIHx8IFtlbGVdLCBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoZWxlLmRpc2FibGVkIHx8ICFlbGUubmFtZSB8fCBlbGUudGFnTmFtZSA9PT0gJ0ZJRUxEU0VUJyB8fCBza2lwcGFibGVSZS50ZXN0KGVsZS50eXBlKSB8fCBjaGVja2FibGVSZS50ZXN0KGVsZS50eXBlKSAmJiAhZWxlLmNoZWNrZWQpIHJldHVybjtcbiAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsZSk7XG5cbiAgICAgIGlmICghaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICAgIHF1ZXJ5ICs9IHF1ZXJ5RW5jb2RlKGVsZS5uYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHF1ZXJ5LnNsaWNlKDEpO1xufTtcblxuZnVuY3Rpb24gdmFsKHZhbHVlKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXNbMF0gJiYgZ2V0VmFsdWUodGhpc1swXSk7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHZhciBpc1NlbGVjdCA9IGVsZS5tdWx0aXBsZSAmJiBlbGUub3B0aW9ucztcblxuICAgIGlmIChpc1NlbGVjdCB8fCBjaGVja2FibGVSZS50ZXN0KGVsZS50eXBlKSkge1xuICAgICAgdmFyIGVsZVZhbHVlXzEgPSBpc0FycmF5KHZhbHVlKSA/IG1hcC5jYWxsKHZhbHVlLCBTdHJpbmcpIDogaXNOdWxsKHZhbHVlKSA/IFtdIDogW1N0cmluZyh2YWx1ZSldO1xuXG4gICAgICBpZiAoaXNTZWxlY3QpIHtcbiAgICAgICAgZWFjaChlbGUub3B0aW9ucywgZnVuY3Rpb24gKGksIG9wdGlvbikge1xuICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGVsZVZhbHVlXzEuaW5kZXhPZihvcHRpb24udmFsdWUpID49IDA7XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLmNoZWNrZWQgPSBlbGVWYWx1ZV8xLmluZGV4T2YoZWxlLnZhbHVlKSA+PSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGUudmFsdWUgPSBpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgaXNOdWxsKHZhbHVlKSA/ICcnIDogdmFsdWU7XG4gICAgfVxuICB9KTtcbn1cblxuZm4udmFsID0gdmFsO1xuXG5mbi5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlLmNsb25lTm9kZSh0cnVlKTtcbiAgfSk7XG59O1xuXG5mbi5kZXRhY2ggPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICBmaWx0ZXJlZCh0aGlzLCBjb21wYXJhdG9yKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoZWxlLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG52YXIgZnJhZ21lbnRSZSA9IC9eXFxzKjwoXFx3KylbXj5dKj4vLFxuICAgIHNpbmdsZVRhZ1JlID0gL148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT4pPyQvO1xudmFyIGNvbnRhaW5lcnMgPSB7XG4gICcqJzogZGl2LFxuICB0cjogdGJvZHksXG4gIHRkOiB0cixcbiAgdGg6IHRyLFxuICB0aGVhZDogdGFibGUsXG4gIHRib2R5OiB0YWJsZSxcbiAgdGZvb3Q6IHRhYmxlXG59OyAvL1RPRE86IENyZWF0ZSBlbGVtZW50cyBpbnNpZGUgYSBkb2N1bWVudCBmcmFnbWVudCwgaW4gb3JkZXIgdG8gcHJldmVudCBpbmxpbmUgZXZlbnQgaGFuZGxlcnMgZnJvbSBmaXJpbmdcbi8vVE9ETzogRW5zdXJlIHRoZSBjcmVhdGVkIGVsZW1lbnRzIGhhdmUgdGhlIGZyYWdtZW50IGFzIHRoZWlyIHBhcmVudCBpbnN0ZWFkIG9mIG51bGwsIHRoaXMgYWxzbyBlbnN1cmVzIHdlIGNhbiBkZWFsIHdpdGggZGV0YXRjaGVkIG5vZGVzIG1vcmUgcmVsaWFibHlcblxuZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcbiAgaWYgKCFpc1N0cmluZyhodG1sKSkgcmV0dXJuIFtdO1xuICBpZiAoc2luZ2xlVGFnUmUudGVzdChodG1sKSkgcmV0dXJuIFtjcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSldO1xuICB2YXIgZnJhZ21lbnQgPSBmcmFnbWVudFJlLnRlc3QoaHRtbCkgJiYgUmVnRXhwLiQxLFxuICAgICAgY29udGFpbmVyID0gY29udGFpbmVyc1tmcmFnbWVudF0gfHwgY29udGFpbmVyc1snKiddO1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgcmV0dXJuIGNhc2goY29udGFpbmVyLmNoaWxkTm9kZXMpLmRldGFjaCgpLmdldCgpO1xufVxuXG5jYXNoLnBhcnNlSFRNTCA9IHBhcnNlSFRNTDtcblxuZm4uZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHdoaWxlIChlbGUuZmlyc3RDaGlsZCkge1xuICAgICAgZWxlLnJlbW92ZUNoaWxkKGVsZS5maXJzdENoaWxkKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gaHRtbChodG1sKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXNbMF0gJiYgdGhpc1swXS5pbm5lckhUTUw7XG4gIGlmIChpc1VuZGVmaW5lZChodG1sKSkgcmV0dXJuIHRoaXM7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlbGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgfSk7XG59XG5cbmZuLmh0bWwgPSBodG1sO1xuXG5mbi5yZW1vdmUgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICBmaWx0ZXJlZCh0aGlzLCBjb21wYXJhdG9yKS5kZXRhY2goKS5vZmYoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB0ZXh0KHRleHQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHRleHQpKSByZXR1cm4gdGhpc1swXSA/IHRoaXNbMF0udGV4dENvbnRlbnQgOiAnJztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH0pO1xufVxuXG47XG5mbi50ZXh0ID0gdGV4dDtcblxuZm4udW53cmFwID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChlbGUudGFnTmFtZSA9PT0gJ0JPRFknKSByZXR1cm47XG4gICAgdmFyICRlbGUgPSBjYXNoKGVsZSk7XG4gICAgJGVsZS5yZXBsYWNlV2l0aCgkZWxlLmNoaWxkcmVuKCkpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBlbGUgPSB0aGlzWzBdO1xuICBpZiAoIWVsZSkgcmV0dXJuO1xuICB2YXIgcmVjdCA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0LFxuICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldFxuICB9O1xufTtcblxuZm4ub2Zmc2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBlbGUub2Zmc2V0UGFyZW50O1xuXG4gICAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBjb21wdXRlU3R5bGUob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2NFbGU7XG4gIH0pO1xufTtcblxuZm4ucG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBlbGUgPSB0aGlzWzBdO1xuICBpZiAoIWVsZSkgcmV0dXJuO1xuICB2YXIgaXNGaXhlZCA9IGNvbXB1dGVTdHlsZShlbGUsICdwb3NpdGlvbicpID09PSAnZml4ZWQnLFxuICAgICAgb2Zmc2V0ID0gaXNGaXhlZCA/IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IHRoaXMub2Zmc2V0KCk7XG5cbiAgaWYgKCFpc0ZpeGVkKSB7XG4gICAgdmFyIGRvY18xID0gZWxlLm93bmVyRG9jdW1lbnQ7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGVsZS5vZmZzZXRQYXJlbnQgfHwgZG9jXzEuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKChvZmZzZXRQYXJlbnQgPT09IGRvY18xLmJvZHkgfHwgb2Zmc2V0UGFyZW50ID09PSBkb2NfMS5kb2N1bWVudEVsZW1lbnQpICYmIGNvbXB1dGVTdHlsZShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG9mZnNldFBhcmVudCAhPT0gZWxlICYmIGlzRWxlbWVudChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gY2FzaChvZmZzZXRQYXJlbnQpLm9mZnNldCgpO1xuICAgICAgb2Zmc2V0LnRvcCAtPSBwYXJlbnRPZmZzZXQudG9wICsgY29tcHV0ZVN0eWxlSW50KG9mZnNldFBhcmVudCwgJ2JvcmRlclRvcFdpZHRoJyk7XG4gICAgICBvZmZzZXQubGVmdCAtPSBwYXJlbnRPZmZzZXQubGVmdCArIGNvbXB1dGVTdHlsZUludChvZmZzZXRQYXJlbnQsICdib3JkZXJMZWZ0V2lkdGgnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb2Zmc2V0LnRvcCAtIGNvbXB1dGVTdHlsZUludChlbGUsICdtYXJnaW5Ub3AnKSxcbiAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIGNvbXB1dGVTdHlsZUludChlbGUsICdtYXJnaW5MZWZ0JylcbiAgfTtcbn07XG5cbmZuLmNoaWxkcmVuID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gZWxlLmNoaWxkcmVuO1xuICB9KSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLmNvbnRlbnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBlbGUudGFnTmFtZSA9PT0gJ0lGUkFNRScgPyBbZWxlLmNvbnRlbnREb2N1bWVudF0gOiBlbGUudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJyA/IGVsZS5jb250ZW50LmNoaWxkTm9kZXMgOiBlbGUuY2hpbGROb2RlcztcbiAgfSkpKTtcbn07XG5cbmZuLmZpbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHBsdWNrKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWxlKTtcbiAgfSkpKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci50c1xuLy8gQHJlcXVpcmUgdHJhdmVyc2FsL2ZpbmQudHNcblxuXG52YXIgSFRNTENEQVRBUmUgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2csXG4gICAgc2NyaXB0VHlwZVJlID0gL14kfF5tb2R1bGUkfFxcLyhqYXZhfGVjbWEpc2NyaXB0L2ksXG4gICAgc2NyaXB0QXR0cmlidXRlcyA9IFsndHlwZScsICdzcmMnLCAnbm9uY2UnLCAnbm9Nb2R1bGUnXTtcblxuZnVuY3Rpb24gZXZhbFNjcmlwdHMobm9kZSwgZG9jKSB7XG4gIHZhciBjb2xsZWN0aW9uID0gY2FzaChub2RlKTtcbiAgY29sbGVjdGlvbi5maWx0ZXIoJ3NjcmlwdCcpLmFkZChjb2xsZWN0aW9uLmZpbmQoJ3NjcmlwdCcpKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoc2NyaXB0VHlwZVJlLnRlc3QoZWxlLnR5cGUpICYmIGRvY0VsZS5jb250YWlucyhlbGUpKSB7XG4gICAgICAvLyBUaGUgc2NyaXB0IHR5cGUgaXMgc3VwcG9ydGVkIC8vIFRoZSBlbGVtZW50IGlzIGF0dGFjaGVkIHRvIHRoZSBET00gLy8gVXNpbmcgYGRvY3VtZW50RWxlbWVudGAgZm9yIGJyb2FkZXIgYnJvd3NlciBzdXBwb3J0XG4gICAgICB2YXIgc2NyaXB0XzEgPSBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdF8xLnRleHQgPSBlbGUudGV4dENvbnRlbnQucmVwbGFjZShIVE1MQ0RBVEFSZSwgJycpO1xuICAgICAgZWFjaChzY3JpcHRBdHRyaWJ1dGVzLCBmdW5jdGlvbiAoaSwgYXR0cikge1xuICAgICAgICBpZiAoZWxlW2F0dHJdKSBzY3JpcHRfMVthdHRyXSA9IGVsZVthdHRyXTtcbiAgICAgIH0pO1xuICAgICAgZG9jLmhlYWQuaW5zZXJ0QmVmb3JlKHNjcmlwdF8xLCBudWxsKTtcbiAgICAgIGRvYy5oZWFkLnJlbW92ZUNoaWxkKHNjcmlwdF8xKTtcbiAgICB9XG4gIH0pO1xufSAvLyBAcmVxdWlyZSAuL2V2YWxfc2NyaXB0cy50c1xuXG5cbmZ1bmN0aW9uIGluc2VydEVsZW1lbnQoYW5jaG9yLCB0YXJnZXQsIGxlZnQsIGluc2lkZSwgZXZhbHVhdGUpIHtcbiAgaWYgKGluc2lkZSkge1xuICAgIC8vIHByZXBlbmQvYXBwZW5kXG4gICAgYW5jaG9yLmluc2VydEJlZm9yZSh0YXJnZXQsIGxlZnQgPyBhbmNob3IuZmlyc3RDaGlsZCA6IG51bGwpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJlZm9yZS9hZnRlclxuICAgIGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YXJnZXQsIGxlZnQgPyBhbmNob3IgOiBhbmNob3IubmV4dFNpYmxpbmcpO1xuICB9XG5cbiAgaWYgKGV2YWx1YXRlKSB7XG4gICAgZXZhbFNjcmlwdHModGFyZ2V0LCBhbmNob3Iub3duZXJEb2N1bWVudCk7XG4gIH1cbn0gLy8gQHJlcXVpcmUgLi9pbnNlcnRfZWxlbWVudC50c1xuXG5cbmZ1bmN0aW9uIGluc2VydFNlbGVjdG9ycyhzZWxlY3RvcnMsIGFuY2hvcnMsIGludmVyc2UsIGxlZnQsIGluc2lkZSwgcmV2ZXJzZUxvb3AxLCByZXZlcnNlTG9vcDIsIHJldmVyc2VMb29wMykge1xuICBlYWNoKHNlbGVjdG9ycywgZnVuY3Rpb24gKHNpLCBzZWxlY3Rvcikge1xuICAgIGVhY2goY2FzaChzZWxlY3RvciksIGZ1bmN0aW9uICh0aSwgdGFyZ2V0KSB7XG4gICAgICBlYWNoKGNhc2goYW5jaG9ycyksIGZ1bmN0aW9uIChhaSwgYW5jaG9yKSB7XG4gICAgICAgIHZhciBhbmNob3JGaW5hbCA9IGludmVyc2UgPyB0YXJnZXQgOiBhbmNob3IsXG4gICAgICAgICAgICB0YXJnZXRGaW5hbCA9IGludmVyc2UgPyBhbmNob3IgOiB0YXJnZXQsXG4gICAgICAgICAgICBpbmRleEZpbmFsID0gaW52ZXJzZSA/IHRpIDogYWk7XG4gICAgICAgIGluc2VydEVsZW1lbnQoYW5jaG9yRmluYWwsICFpbmRleEZpbmFsID8gdGFyZ2V0RmluYWwgOiB0YXJnZXRGaW5hbC5jbG9uZU5vZGUodHJ1ZSksIGxlZnQsIGluc2lkZSwgIWluZGV4RmluYWwpO1xuICAgICAgfSwgcmV2ZXJzZUxvb3AzKTtcbiAgICB9LCByZXZlcnNlTG9vcDIpO1xuICB9LCByZXZlcnNlTG9vcDEpO1xuICByZXR1cm4gYW5jaG9ycztcbn1cblxuZm4uYWZ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLmFwcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5hcHBlbmRUbyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uYmVmb3JlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmluc2VydEJlZm9yZSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5wcmVwZW5kID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIHRydWUsIHRydWUsIHRydWUsIHRydWUpO1xufTtcblxuZm4ucHJlcGVuZFRvID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4ucmVwbGFjZVdpdGggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuYmVmb3JlKHNlbGVjdG9yKS5yZW1vdmUoKTtcbn07XG5cbmZuLnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgY2FzaChzZWxlY3RvcikucmVwbGFjZVdpdGgodGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ud3JhcEFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgc3RydWN0dXJlID0gY2FzaChzZWxlY3RvciksXG4gICAgICB3cmFwcGVyID0gc3RydWN0dXJlWzBdO1xuXG4gIHdoaWxlICh3cmFwcGVyLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgIHdyYXBwZXIgPSB3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICB9XG5cbiAgdGhpcy5maXJzdCgpLmJlZm9yZShzdHJ1Y3R1cmUpO1xuICByZXR1cm4gdGhpcy5hcHBlbmRUbyh3cmFwcGVyKTtcbn07XG5cbmZuLndyYXAgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBjYXNoKHNlbGVjdG9yKVswXTtcbiAgICBjYXNoKGVsZSkud3JhcEFsbCghaSA/IHdyYXBwZXIgOiB3cmFwcGVyLmNsb25lTm9kZSh0cnVlKSk7XG4gIH0pO1xufTtcblxuZm4ud3JhcElubmVyID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHZhciAkZWxlID0gY2FzaChlbGUpLFxuICAgICAgICBjb250ZW50cyA9ICRlbGUuY29udGVudHMoKTtcbiAgICBjb250ZW50cy5sZW5ndGggPyBjb250ZW50cy53cmFwQWxsKHNlbGVjdG9yKSA6ICRlbGUuYXBwZW5kKHNlbGVjdG9yKTtcbiAgfSk7XG59O1xuXG5mbi5oYXMgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIGNvbXBhcmF0b3IgPSBpc1N0cmluZyhzZWxlY3RvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIGVsZSkubGVuZ3RoO1xuICB9IDogZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY29udGFpbnMoc2VsZWN0b3IpO1xuICB9O1xuICByZXR1cm4gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG59O1xuXG5mbi5pcyA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHZhciBjb21wYXJlID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICByZXR1cm4gc29tZS5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY29tcGFyZS5jYWxsKGVsZSwgaSwgZWxlKTtcbiAgfSk7XG59O1xuXG5mbi5uZXh0ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF9hbGwsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ25leHRFbGVtZW50U2libGluZycsIF9hbGwsIF91bnRpbCkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5uZXh0QWxsID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMubmV4dChjb21wYXJhdG9yLCB0cnVlKTtcbn07XG5cbmZuLm5leHRVbnRpbCA9IGZ1bmN0aW9uICh1bnRpbCwgY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5uZXh0KGNvbXBhcmF0b3IsIHRydWUsIHVudGlsKTtcbn07XG5cbmZuLm5vdCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHZhciBjb21wYXJlID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiAoIWlzU3RyaW5nKGNvbXBhcmF0b3IpIHx8IGlzRWxlbWVudChlbGUpKSAmJiAhY29tcGFyZS5jYWxsKGVsZSwgaSwgZWxlKTtcbiAgfSk7XG59O1xuXG5mbi5wYXJlbnQgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3BhcmVudE5vZGUnKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLmluZGV4ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBjaGlsZCA9IHNlbGVjdG9yID8gY2FzaChzZWxlY3RvcilbMF0gOiB0aGlzWzBdLFxuICAgICAgY29sbGVjdGlvbiA9IHNlbGVjdG9yID8gdGhpcyA6IGNhc2goY2hpbGQpLnBhcmVudCgpLmNoaWxkcmVuKCk7XG4gIHJldHVybiBpbmRleE9mLmNhbGwoY29sbGVjdGlvbiwgY2hpbGQpO1xufTtcblxuZm4uY2xvc2VzdCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHZhciBmaWx0ZXJlZCA9IHRoaXMuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICBpZiAoZmlsdGVyZWQubGVuZ3RoKSByZXR1cm4gZmlsdGVyZWQ7XG4gIHZhciAkcGFyZW50ID0gdGhpcy5wYXJlbnQoKTtcbiAgaWYgKCEkcGFyZW50Lmxlbmd0aCkgcmV0dXJuIGZpbHRlcmVkO1xuICByZXR1cm4gJHBhcmVudC5jbG9zZXN0KGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucGFyZW50cyA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwYXJlbnRFbGVtZW50JywgdHJ1ZSwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLnBhcmVudHNVbnRpbCA9IGZ1bmN0aW9uICh1bnRpbCwgY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5wYXJlbnRzKGNvbXBhcmF0b3IsIHVudGlsKTtcbn07XG5cbmZuLnByZXYgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX2FsbCwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncHJldmlvdXNFbGVtZW50U2libGluZycsIF9hbGwsIF91bnRpbCkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5wcmV2QWxsID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMucHJldihjb21wYXJhdG9yLCB0cnVlKTtcbn07XG5cbmZuLnByZXZVbnRpbCA9IGZ1bmN0aW9uICh1bnRpbCwgY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5wcmV2KGNvbXBhcmF0b3IsIHRydWUsIHVudGlsKTtcbn07XG5cbmZuLnNpYmxpbmdzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gY2FzaChlbGUpLnBhcmVudCgpLmNoaWxkcmVuKCkubm90KGVsZSk7XG4gIH0pKSksIGNvbXBhcmF0b3IpO1xufTsgLy8gQG9wdGlvbmFsIC4vY2hpbGRyZW4udHNcbi8vIEBvcHRpb25hbCAuL2Nsb3Nlc3QudHNcbi8vIEBvcHRpb25hbCAuL2NvbnRlbnRzLnRzXG4vLyBAb3B0aW9uYWwgLi9maW5kLnRzXG4vLyBAb3B0aW9uYWwgLi9oYXMudHNcbi8vIEBvcHRpb25hbCAuL2lzLnRzXG4vLyBAb3B0aW9uYWwgLi9uZXh0LnRzXG4vLyBAb3B0aW9uYWwgLi9uZXh0X2FsbC50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dF91bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vbm90LnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnQudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudHMudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudHNfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL3ByZXYudHNcbi8vIEBvcHRpb25hbCAuL3ByZXZfYWxsLnRzXG4vLyBAb3B0aW9uYWwgLi9wcmV2X3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9zaWJsaW5ncy50c1xuLy8gQG9wdGlvbmFsIGF0dHJpYnV0ZXMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBjb2xsZWN0aW9uL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgY3NzL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZGF0YS9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGRpbWVuc2lvbnMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBlZmZlY3RzL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZXZlbnRzL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZm9ybXMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBtYW5pcHVsYXRpb24vaW5kZXgudHNcbi8vIEBvcHRpb25hbCBvZmZzZXQvaW5kZXgudHNcbi8vIEBvcHRpb25hbCB0cmF2ZXJzYWwvaW5kZXgudHNcbi8vIEByZXF1aXJlIGNvcmUvaW5kZXgudHNcbi8vIEBwcmlvcml0eSAtMTAwXG4vLyBAcmVxdWlyZSAuL2Nhc2gudHNcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cblxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBOb2RlLmpzXG4gIG1vZHVsZS5leHBvcnRzID0gY2FzaDtcbn0gZWxzZSB7XG4gIC8vIEJyb3dzZXJcbiAgd2luWydjYXNoJ10gPSB3aW5bJyQnXSA9IGNhc2g7XG59XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG52YXIgY2FzaF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2FzaC1kb21cIikpO1xyXG53aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyID0ge1xyXG4gICAgZ2V0TmZ0OiBmdW5jdGlvbiAocGxhdGZvcm0pIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gcGxhdGZvcm0udG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvcGVuc2VhXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3VwZXJyYXJlXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiem9yYVwiOiByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvdW5kYXRpb25cIjogcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0d2l0dGVyXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFyaWJsZVwiOiByZXR1cm4gWzMgLypicmVhayovLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuaWZ0eWdhdGV3YXlcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXN5bmNhcnRcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgMTVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxN107XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIub3BlbnNlYSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuc3VwZXJyYXJlKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci56b3JhKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5mb3VuZGF0aW9uKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci50d2l0dGVyKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnJhcmlibGUoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTM6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIubmlmdHlnYXRld2F5KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxNDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE1OiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLmFzeW5jYXJ0KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxNjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE3OiByZXR1cm4gWzMgLypicmVhayovLCAxOF07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE4OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgb3BlbnNlYTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbywgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzLzB4JykpIHtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCcvJylbNV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcygnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy9tYXRpYy8weCcpIHx8XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzL2tsYXl0bi8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90U3VwcG9ydENoYWluJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdnZU5GVEZyb21EZXRhaWxQYWdlJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sXHJcbiAgICBzdXBlcnJhcmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBpdGVtTGlua1NlbGVjdG9yLCBpdGVtTGlua3MsIGRvbVVybCwgcmVkaXJlY3RVcmwsIHVybCwgaGFuZGxlLCBwcm9taXNlLCBkYXRhLCAkaHRtbCwgZGwsIGxpLCBkb21fYTtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUxpbmtTZWxlY3RvciA9ICcuY29sbGVjdGlibGUtaGlzdG9yeS1zZWN0aW9uID4gLmNvbGxlY3RpYmxlLWhpc3RvcnktaXRlbSA+IC5jb2xsZWN0aWJsZS1oaXN0b3J5LWl0ZW0tbGluayc7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtTGlua1NlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW1MaW5rcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdnZU5GVEZyb21EZXRhaWxQYWdlJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tVXJsID0gKF9hID0gaXRlbUxpbmtzW2l0ZW1MaW5rcy5sZW5ndGggLSAxXS5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFVybCA9IFwiPGEgaHJlZj0nXCIgKyBkb21VcmwgKyBcIicgdGFyZ2V0PSdfYmxhbmsnPlt2aWV3IHR4XTwvYT5cIjtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBkb21VcmwgKyBcIiNldmVudGxvZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5tc2dUeXBlICYmIGUuZGF0YS5tc2dUeXBlID09PSBcImZldGNoU3VwZXJyYXJlTmZ0UmVzcG9uc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGUuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHsgbXNnVHlwZTogXCJmZXRjaFN1cGVycmFyZU5mdFJlcXVlc3RcIiwgdXJsOiB1cmwgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwcm9taXNlXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGwgPSAoMCwgY2FzaF9kb21fMS5kZWZhdWx0KSgkaHRtbCkuZmluZCgnI215VGFiQ29udGVudCAjZXZlbnRsb2cgLmNhcmQtYm9keSAubWVkaWEgLm1lZGlhLWJvZHkgZGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkbCB8fCBkbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICd2YWxpZFZpZXdUWCcsIG1zZ0NvbnRlbnQ6IHJlZGlyZWN0VXJsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGxbZGwubGVuZ3RoIC0gMl0pLmZpbmQoJ2RkIHVsIGxpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbV9hID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkobGlbbGkubGVuZ3RoIC0gMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnYScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaSA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRsW2RsLmxlbmd0aCAtICgoZG9tX2EgJiYgZG9tX2EubGVuZ3RoKSA+IDAgPyAxIDogMildKS5maW5kKCdkZCB1bCBsaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGxbMF0pLmZpbmQoJ2RkJykuY2hpbGRyZW4oJ2EnKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGxpW2xpLmxlbmd0aCAtIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ3ZhbGlkVmlld1RYJywgbXNnQ29udGVudDogcmVkaXJlY3RVcmwgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHpvcmE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3NzLXJ4azlwbCBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoX2IgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IHVybC5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGZvdW5kYXRpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRva2VuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jc3MtMWhoZWRkNyBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gdXJsLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgdHdpdHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbywgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHJhcmlibGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCB0bXBTcGxpdEFycjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vcmFyaWJsZS5jb20vdG9rZW4vMHgnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0uc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnZ2VORlRGcm9tRGV0YWlsUGFnZScsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgbmlmdHlnYXRld2F5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnIsIHRva2VuU3RyO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vbmlmdHlnYXRld2F5LmNvbS9pdGVtZGV0YWlsL3NlY29uZGFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0bXBTcGxpdEFyciA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL25pZnR5Z2F0ZXdheS5jb20vbWFya2V0cGxhY2U/Y29sbGVjdGlvbj0weCcpICYmXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwidG9rZW5JZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5TdHIgPSAoX2EgPSBsb2NhdGlvbi5ocmVmLm1hdGNoKC8mdG9rZW5JZD1cXGQrLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0b2tlblN0ciAhPT0gdW5kZWZpbmVkID8gdG9rZW5TdHIuc3BsaXQoJz0nKVsxXSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChfZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnaHR0cHM6Ly9uaWZ0eWdhdGV3YXkuY29tL2l0ZW1kZXRhaWwvcHJpbWFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90U3VwcG9ydEF0Q3VycmVudFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGFzeW5jYXJ0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnI7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCB1dGlsc18xLmV4dHJhY3RIZXgpKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChfYikge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxufTtcclxudmFyIGxpc3RlbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBsYXRGb3JtVHlwZSwgcmVzLCBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGUuZGF0YS5tc2dUeXBlICYmIGUuZGF0YS5tc2dUeXBlID09PSBcImZldGNoTmZ0UmVxdWVzdFwiKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdEZvcm1UeXBlID0gZS5kYXRhLnBsYXRmb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuZ2V0TmZ0KHBsYXRGb3JtVHlwZSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0geyBtc2dUeXBlOiBcImZldGNoTmZ0UmVzcG9uc2VcIiwgcGxhdGZvcm06IHBsYXRGb3JtVHlwZSwgZGF0YTogcmVzIH07XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sIGZhbHNlKTtcclxufSkoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5leHRyYWN0SGV4ID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBleHRyYWN0SGV4KHN0cikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgcmV0dXJuIChfYSA9IHN0ci5tYXRjaCgvMHhbXFxkQS1aYS16XSsvKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG59XHJcbmV4cG9ydHMuZXh0cmFjdEhleCA9IGV4dHJhY3RIZXg7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==