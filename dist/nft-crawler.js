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
    // getNft: async (platform: string) => {
    //     switch (platform.toLocaleLowerCase()) {
    //         case "opensea":
    //             return await (window as any).__dataverseNftCrawler.opensea();
    //             break;
    //         case "superrare":
    //             return await (window as any).__dataverseNftCrawler.superrare();
    //             break;
    //         case "zora":
    //             return await (window as any).__dataverseNftCrawler.zora();
    //             break;
    //         case "foundation":
    //             return await (window as any).__dataverseNftCrawler.foundation();
    //             break;
    //         case "twitter":
    //             return await (window as any).__dataverseNftCrawler.twitter();
    //             break;
    //         case "rarible":
    //             return await (window as any).__dataverseNftCrawler.rarible();
    //             break;
    //         case "niftygateway":
    //             return await (window as any).__dataverseNftCrawler.niftygateway();
    //             break;
    //         case "asyncart":
    //             return await (window as any).__dataverseNftCrawler.asyncart();
    //             break;
    //         default:
    //             break;
    //     }
    // },
    getNft: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = data.platform.toLocaleLowerCase();
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
                case 3: return [4 /*yield*/, window.__dataverseNftCrawler.superrare(data.data)];
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
    superrare: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var nftInfo, response, redirectUrl, $html, dl, li, dom_a;
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
            redirectUrl = "<a href='" + data.url + "' target='_blank'>[view tx]</a>";
            $html = (0, cash_dom_1.default)(data.dom);
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
            catch (_b) {
                response.code = -1;
                response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
                return [2 /*return*/, response];
            }
            return [2 /*return*/];
        });
    }); },
    superrareEtherscanUrl: function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, itemLinkSelector, itemLinks, domUrl, url;
        var _a;
        return __generator(this, function (_b) {
            response = {
                code: -1,
                data: ""
            };
            itemLinkSelector = '.collectible-history-section > .collectible-history-item > .collectible-history-item-link';
            itemLinks = document.querySelectorAll(itemLinkSelector);
            if (!itemLinks) {
                response.code = -1;
                response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
                return [2 /*return*/, response];
            }
            domUrl = (_a = itemLinks[itemLinks.length - 1].href) !== null && _a !== void 0 ? _a : '';
            url = domUrl + "#eventlog";
            response.code = 0;
            response.data = url;
            return [2 /*return*/, response];
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
        var platFormType, res, message, res, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(e.data.msgType && e.data.msgType === "fetchNftRequest")) return [3 /*break*/, 2];
                    platFormType = e.data.platform;
                    return [4 /*yield*/, window.__dataverseNftCrawler.getNft(e.data)];
                case 1:
                    res = _a.sent();
                    message = { msgType: "fetchNftResponse", platform: platFormType, data: res };
                    window.postMessage(message, "*");
                    _a.label = 2;
                case 2:
                    if (!(e.data.msgType && e.data.msgType === "fetchSuperrareEtherscanUrlRequest")) return [3 /*break*/, 4];
                    return [4 /*yield*/, window.__dataverseNftCrawler.superrareEtherscanUrl()];
                case 3:
                    res = _a.sent();
                    message = { msgType: "fetchSuperrareEtherscanUrlResponse", data: res };
                    window.postMessage(message, "*");
                    _a.label = 4;
                case 4: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxHQUFHO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDhFQUE4RTs7QUFFOUU7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RkFBd0Y7O0FBRXhGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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Q0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7O1VDUGxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9jYXNoLWRvbUA4LjEuMC9ub2RlX21vZHVsZXMvY2FzaC1kb20vZGlzdC9jYXNoLmpzIiwid2VicGFjazovL25mdC1jcmF3bGVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL25mdC1jcmF3bGVyLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL25mdC1jcmF3bGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25mdC1jcmF3bGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25mdC1jcmF3bGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2ZhYmlvc3BhbXBpbmF0by9jYXNoICovXG4oZnVuY3Rpb24oKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgcHJvcE1hcCA9IHtcbiAgLyogR0VORVJBTCAqL1xuICBcImNsYXNzXCI6ICdjbGFzc05hbWUnLFxuICBjb250ZW50ZWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuXG4gIC8qIExBQkVMICovXG4gIFwiZm9yXCI6ICdodG1sRm9yJyxcblxuICAvKiBJTlBVVCAqL1xuICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgdGFiaW5kZXg6ICd0YWJJbmRleCcsXG5cbiAgLyogVEFCTEUgKi9cbiAgY29sc3BhbjogJ2NvbFNwYW4nLFxuICByb3dzcGFuOiAncm93U3BhbicsXG5cbiAgLyogSU1BR0UgKi9cbiAgdXNlbWFwOiAndXNlTWFwJ1xufTtcblxuZnVuY3Rpb24gYXR0ZW1wdChmbiwgYXJnKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZuKGFyZyk7XG4gIH0gY2F0Y2ggKF9hKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfVxufVxuXG52YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgd2luID0gd2luZG93LFxuICAgIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50LmJpbmQoZG9jKSxcbiAgICBkaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICB0YWJsZSA9IGNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyksXG4gICAgdGJvZHkgPSBjcmVhdGVFbGVtZW50KCd0Ym9keScpLFxuICAgIHRyID0gY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcbiAgICBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBjb25jYXQgPSBBcnJheVByb3RvdHlwZS5jb25jYXQsXG4gICAgZmlsdGVyID0gQXJyYXlQcm90b3R5cGUuZmlsdGVyLFxuICAgIGluZGV4T2YgPSBBcnJheVByb3RvdHlwZS5pbmRleE9mLFxuICAgIG1hcCA9IEFycmF5UHJvdG90eXBlLm1hcCxcbiAgICBwdXNoID0gQXJyYXlQcm90b3R5cGUucHVzaCxcbiAgICBzbGljZSA9IEFycmF5UHJvdG90eXBlLnNsaWNlLFxuICAgIHNvbWUgPSBBcnJheVByb3RvdHlwZS5zb21lLFxuICAgIHNwbGljZSA9IEFycmF5UHJvdG90eXBlLnNwbGljZTtcbnZhciBpZFJlID0gL14jKD86W1xcdy1dfFxcXFwufFteXFx4MDAtXFx4YTBdKSokLyxcbiAgICBjbGFzc1JlID0gL15cXC4oPzpbXFx3LV18XFxcXC58W15cXHgwMC1cXHhhMF0pKiQvLFxuICAgIGh0bWxSZSA9IC88Lis+LyxcbiAgICB0YWdSZSA9IC9eXFx3KyQvOyAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5mdW5jdGlvbiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHJldHVybiAhc2VsZWN0b3IgfHwgIWlzRG9jdW1lbnQoY29udGV4dCkgJiYgIWlzRWxlbWVudChjb250ZXh0KSA/IFtdIDogY2xhc3NSZS50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiB0YWdSZS50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIDogY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn0gLy8gQHJlcXVpcmUgLi9maW5kLnRzXG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbnZhciBDYXNoID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICghc2VsZWN0b3IpIHJldHVybjtcbiAgICBpZiAoaXNDYXNoKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yO1xuICAgIHZhciBlbGVzID0gc2VsZWN0b3I7XG5cbiAgICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgICB2YXIgY3R4ID0gKGlzQ2FzaChjb250ZXh0KSA/IGNvbnRleHRbMF0gOiBjb250ZXh0KSB8fCBkb2M7XG4gICAgICBlbGVzID0gaWRSZS50ZXN0KHNlbGVjdG9yKSA/IGN0eC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sUmUudGVzdChzZWxlY3RvcikgPyBwYXJzZUhUTUwoc2VsZWN0b3IpIDogZmluZChzZWxlY3RvciwgY3R4KTtcbiAgICAgIGlmICghZWxlcykgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWR5KHNlbGVjdG9yKTsgLy9GSVhNRTogYGZuLnJlYWR5YCBpcyBub3QgaW5jbHVkZWQgaW4gYGNvcmVgLCBidXQgaXQncyBhY3R1YWxseSBhIGNvcmUgZnVuY3Rpb25hbGl0eVxuICAgIH1cblxuICAgIGlmIChlbGVzLm5vZGVUeXBlIHx8IGVsZXMgPT09IHdpbikgZWxlcyA9IFtlbGVzXTtcbiAgICB0aGlzLmxlbmd0aCA9IGVsZXMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpc1tpXSA9IGVsZXNbaV07XG4gICAgfVxuICB9XG5cbiAgQ2FzaC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQ2FzaChzZWxlY3RvciwgY29udGV4dCk7XG4gIH07XG5cbiAgcmV0dXJuIENhc2g7XG59KCk7XG5cbnZhciBmbiA9IENhc2gucHJvdG90eXBlLFxuICAgIGNhc2ggPSBmbi5pbml0O1xuY2FzaC5mbiA9IGNhc2gucHJvdG90eXBlID0gZm47IC8vIEVuc3VyaW5nIHRoYXQgYGNhc2ggKCkgaW5zdGFuY2VvZiBjYXNoYFxuXG5mbi5sZW5ndGggPSAwO1xuZm4uc3BsaWNlID0gc3BsaWNlOyAvLyBFbnN1cmluZyBhIGNhc2ggY29sbGVjdGlvbiBnZXRzIHByaW50ZWQgYXMgYXJyYXktbGlrZSBpbiBDaHJvbWUncyBkZXZ0b29sc1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBFbnN1cmluZyBhIGNhc2ggY29sbGVjdGlvbiBpcyBpdGVyYWJsZVxuICBmbltTeW1ib2xbJ2l0ZXJhdG9yJ11dID0gQXJyYXlQcm90b3R5cGVbU3ltYm9sWydpdGVyYXRvciddXTtcbn1cblxuZm4ubWFwID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYXNoKGNvbmNhdC5hcHBseShbXSwgbWFwLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGVsZSwgaSwgZWxlKTtcbiAgfSkpKTtcbn07XG5cbmZuLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGNhc2goc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgZW5kKSk7XG59OyAvLyBAcmVxdWlyZSAuL2Nhc2gudHNcblxuXG52YXIgZGFzaEFscGhhUmUgPSAvLShbYS16XSkvZztcblxuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoZGFzaEFscGhhUmUsIGZ1bmN0aW9uIChtYXRjaCwgbGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbn1cblxuY2FzaC5ndWlkID0gMTsgLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxlLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlcyA9IGVsZSAmJiAoZWxlWydtYXRjaGVzJ10gfHwgZWxlWyd3ZWJraXRNYXRjaGVzU2VsZWN0b3InXSB8fCBlbGVbJ21zTWF0Y2hlc1NlbGVjdG9yJ10pO1xuICByZXR1cm4gISFtYXRjaGVzICYmICEhc2VsZWN0b3IgJiYgbWF0Y2hlcy5jYWxsKGVsZSwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBpc0Nhc2goeCkge1xuICByZXR1cm4geCBpbnN0YW5jZW9mIENhc2g7XG59XG5cbmZ1bmN0aW9uIGlzV2luZG93KHgpIHtcbiAgcmV0dXJuICEheCAmJiB4ID09PSB4LndpbmRvdztcbn1cblxuZnVuY3Rpb24gaXNEb2N1bWVudCh4KSB7XG4gIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gOTtcbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50KHgpIHtcbiAgcmV0dXJuICEheCAmJiB4Lm5vZGVUeXBlID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdib29sZWFuJztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh4KSB7XG4gIHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbCh4KSB7XG4gIHJldHVybiB4ID09PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWMoeCkge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoeCkpICYmIGlzRmluaXRlKHgpO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHgpIHtcbiAgaWYgKHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB4ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih4KTtcbiAgcmV0dXJuIHByb3RvID09PSBudWxsIHx8IHByb3RvID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG5jYXNoLmlzV2luZG93ID0gaXNXaW5kb3c7XG5jYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuY2FzaC5pc0FycmF5ID0gaXNBcnJheTtcbmNhc2guaXNOdW1lcmljID0gaXNOdW1lcmljO1xuY2FzaC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdDtcblxuZm4uZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpc1VuZGVmaW5lZChpbmRleCkpIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xuICBpbmRleCA9IE51bWJlcihpbmRleCk7XG4gIHJldHVybiB0aGlzW2luZGV4IDwgMCA/IGluZGV4ICsgdGhpcy5sZW5ndGggOiBpbmRleF07XG59O1xuXG5mbi5lcSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICByZXR1cm4gY2FzaCh0aGlzLmdldChpbmRleCkpO1xufTtcblxuZm4uZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVxKDApO1xufTtcblxuZm4ubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXEoLTEpO1xufTtcblxuZnVuY3Rpb24gZWFjaChhcnIsIGNhbGxiYWNrLCBfcmV2ZXJzZSkge1xuICBpZiAoX3JldmVyc2UpIHtcbiAgICB2YXIgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJbaV0sIGksIGFycltpXSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFycikpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltrZXldLCBrZXksIGFycltrZXldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2ldLCBpLCBhcnJbaV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG5jYXNoLmVhY2ggPSBlYWNoO1xuXG5mbi5lYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBlYWNoKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cbmZuLnByb3AgPSBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgaWYgKCFwcm9wKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgcHJvcCA9IHByb3BNYXBbcHJvcF0gfHwgcHJvcDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIHRoaXNbMF1bcHJvcF07XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBlbGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wKSB7XG4gICAgdGhpcy5wcm9wKGtleSwgcHJvcFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ucmVtb3ZlUHJvcCA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGRlbGV0ZSBlbGVbcHJvcE1hcFtwcm9wXSB8fCBwcm9wXTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBzb3VyY2VzID0gW107XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gIH1cblxuICB2YXIgZGVlcCA9IGlzQm9vbGVhbihzb3VyY2VzWzBdKSA/IHNvdXJjZXMuc2hpZnQoKSA6IGZhbHNlLFxuICAgICAgdGFyZ2V0ID0gc291cmNlcy5zaGlmdCgpLFxuICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0KSByZXR1cm4ge307XG4gIGlmICghbGVuZ3RoKSByZXR1cm4gZXh0ZW5kKGRlZXAsIGNhc2gsIHRhcmdldCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKGRlZXAgJiYgKGlzQXJyYXkoc291cmNlW2tleV0pIHx8IGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pKSkge1xuICAgICAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldLmNvbnN0cnVjdG9yICE9PSBzb3VyY2Vba2V5XS5jb25zdHJ1Y3RvcikgdGFyZ2V0W2tleV0gPSBuZXcgc291cmNlW2tleV0uY29uc3RydWN0b3IoKTtcbiAgICAgICAgZXh0ZW5kKGRlZXAsIHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNhc2guZXh0ZW5kID0gZXh0ZW5kO1xuXG5mbi5leHRlbmQgPSBmdW5jdGlvbiAocGx1Z2lucykge1xuICByZXR1cm4gZXh0ZW5kKGZuLCBwbHVnaW5zKTtcbn07IC8vIEByZXF1aXJlIC4vbWF0Y2hlcy50c1xuLy8gQHJlcXVpcmUgLi90eXBlX2NoZWNraW5nLnRzXG5cblxuZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKGNvbXBhcmF0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBtYXRjaGVzKGVsZSwgY29tcGFyYXRvcik7XG4gIH0gOiBpc0Z1bmN0aW9uKGNvbXBhcmF0b3IpID8gY29tcGFyYXRvciA6IGlzQ2FzaChjb21wYXJhdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gY29tcGFyYXRvci5pcyhlbGUpO1xuICB9IDogIWNvbXBhcmF0b3IgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IDogZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUgPT09IGNvbXBhcmF0b3I7XG4gIH07XG59XG5cbmZuLmZpbHRlciA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHZhciBjb21wYXJlID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICByZXR1cm4gY2FzaChmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKTtcbn07IC8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG5cblxuZnVuY3Rpb24gZmlsdGVyZWQoY29sbGVjdGlvbiwgY29tcGFyYXRvcikge1xuICByZXR1cm4gIWNvbXBhcmF0b3IgPyBjb2xsZWN0aW9uIDogY29sbGVjdGlvbi5maWx0ZXIoY29tcGFyYXRvcik7XG59IC8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuXG5cbnZhciBzcGxpdFZhbHVlc1JlID0gL1xcUysvZztcblxuZnVuY3Rpb24gZ2V0U3BsaXRWYWx1ZXMoc3RyKSB7XG4gIHJldHVybiBpc1N0cmluZyhzdHIpID8gc3RyLm1hdGNoKHNwbGl0VmFsdWVzUmUpIHx8IFtdIDogW107XG59XG5cbmZuLmhhc0NsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICByZXR1cm4gISFjbHMgJiYgc29tZS5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gaXNFbGVtZW50KGVsZSkgJiYgZWxlLmNsYXNzTGlzdC5jb250YWlucyhjbHMpO1xuICB9KTtcbn07XG5cbmZuLnJlbW92ZUF0dHIgPSBmdW5jdGlvbiAoYXR0cikge1xuICB2YXIgYXR0cnMgPSBnZXRTcGxpdFZhbHVlcyhhdHRyKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVhY2goYXR0cnMsIGZ1bmN0aW9uIChpLCBhKSB7XG4gICAgICBlbGUucmVtb3ZlQXR0cmlidXRlKGEpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGF0dHIoYXR0ciwgdmFsdWUpIHtcbiAgaWYgKCFhdHRyKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKGF0dHIpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBpZiAoIXRoaXNbMF0gfHwgIWlzRWxlbWVudCh0aGlzWzBdKSkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlXzEgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICAgIHJldHVybiBpc051bGwodmFsdWVfMSkgPyB1bmRlZmluZWQgOiB2YWx1ZV8xO1xuICAgIH1cblxuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiB0aGlzO1xuICAgIGlmIChpc051bGwodmFsdWUpKSByZXR1cm4gdGhpcy5yZW1vdmVBdHRyKGF0dHIpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYXR0cikge1xuICAgIHRoaXMuYXR0cihrZXksIGF0dHJba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZm4uYXR0ciA9IGF0dHI7XG5cbmZuLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gKGNscywgZm9yY2UpIHtcbiAgdmFyIGNsYXNzZXMgPSBnZXRTcGxpdFZhbHVlcyhjbHMpLFxuICAgICAgaXNGb3JjZSA9ICFpc1VuZGVmaW5lZChmb3JjZSk7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChpLCBjKSB7XG4gICAgICBpZiAoaXNGb3JjZSkge1xuICAgICAgICBmb3JjZSA/IGVsZS5jbGFzc0xpc3QuYWRkKGMpIDogZWxlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuY2xhc3NMaXN0LnRvZ2dsZShjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mbi5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlQ2xhc3MoY2xzLCB0cnVlKTtcbn07XG5cbmZuLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9nZ2xlQ2xhc3MoY2xzLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzLmF0dHIoJ2NsYXNzJywgJycpO1xufTtcblxuZnVuY3Rpb24gcGx1Y2soYXJyLCBwcm9wLCBkZWVwLCB1bnRpbCkge1xuICB2YXIgcGx1Y2tlZCA9IFtdLFxuICAgICAgaXNDYWxsYmFjayA9IGlzRnVuY3Rpb24ocHJvcCksXG4gICAgICBjb21wYXJlID0gdW50aWwgJiYgZ2V0Q29tcGFyZUZ1bmN0aW9uKHVudGlsKTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoaXNDYWxsYmFjaykge1xuICAgICAgdmFyIHZhbF8xID0gcHJvcChhcnJbaV0pO1xuICAgICAgaWYgKHZhbF8xLmxlbmd0aCkgcHVzaC5hcHBseShwbHVja2VkLCB2YWxfMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWxfMiA9IGFycltpXVtwcm9wXTtcblxuICAgICAgd2hpbGUgKHZhbF8yICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHVudGlsICYmIGNvbXBhcmUoLTEsIHZhbF8yKSkgYnJlYWs7XG4gICAgICAgIHBsdWNrZWQucHVzaCh2YWxfMik7XG4gICAgICAgIHZhbF8yID0gZGVlcCA/IHZhbF8yW3Byb3BdIDogbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGx1Y2tlZDtcbn1cblxuZnVuY3Rpb24gdW5pcXVlKGFycikge1xuICByZXR1cm4gYXJyLmxlbmd0aCA+IDEgPyBmaWx0ZXIuY2FsbChhcnIsIGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBpbmRleE9mLmNhbGwoc2VsZiwgaXRlbSkgPT09IGluZGV4O1xuICB9KSA6IGFycjtcbn1cblxuY2FzaC51bmlxdWUgPSB1bmlxdWU7XG5cbmZuLmFkZCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gY2FzaCh1bmlxdWUodGhpcy5nZXQoKS5jb25jYXQoY2FzaChzZWxlY3RvciwgY29udGV4dCkuZ2V0KCkpKSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcudHNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG5cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlKGVsZSwgcHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsZSwgbnVsbCk7XG4gIHJldHVybiBpc1ZhcmlhYmxlID8gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSB8fCB1bmRlZmluZWQgOiBzdHlsZVtwcm9wXSB8fCBlbGUuc3R5bGVbcHJvcF07XG59IC8vIEByZXF1aXJlIC4vY29tcHV0ZV9zdHlsZS50c1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZUludChlbGUsIHByb3ApIHtcbiAgcmV0dXJuIHBhcnNlSW50KGNvbXB1dGVTdHlsZShlbGUsIHByb3ApLCAxMCkgfHwgMDtcbn1cblxudmFyIGNzc1ZhcmlhYmxlUmUgPSAvXi0tLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gaXNDU1NWYXJpYWJsZShwcm9wKSB7XG4gIHJldHVybiBjc3NWYXJpYWJsZVJlLnRlc3QocHJvcCk7XG59IC8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2gudHNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG4vLyBAcmVxdWlyZSAuL2lzX2Nzc192YXJpYWJsZS50c1xuXG5cbnZhciBwcmVmaXhlZFByb3BzID0ge30sXG4gICAgc3R5bGUgPSBkaXYuc3R5bGUsXG4gICAgdmVuZG9yc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJ107XG5cbmZ1bmN0aW9uIGdldFByZWZpeGVkUHJvcChwcm9wLCBpc1ZhcmlhYmxlKSB7XG4gIGlmIChpc1ZhcmlhYmxlID09PSB2b2lkIDApIHtcbiAgICBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgfVxuXG4gIGlmIChpc1ZhcmlhYmxlKSByZXR1cm4gcHJvcDtcblxuICBpZiAoIXByZWZpeGVkUHJvcHNbcHJvcF0pIHtcbiAgICB2YXIgcHJvcENDID0gY2FtZWxDYXNlKHByb3ApLFxuICAgICAgICBwcm9wVUMgPSBcIlwiICsgcHJvcENDWzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wQ0Muc2xpY2UoMSksXG4gICAgICAgIHByb3BzID0gKHByb3BDQyArIFwiIFwiICsgdmVuZG9yc1ByZWZpeGVzLmpvaW4ocHJvcFVDICsgXCIgXCIpICsgcHJvcFVDKS5zcGxpdCgnICcpO1xuICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChpLCBwKSB7XG4gICAgICBpZiAocCBpbiBzdHlsZSkge1xuICAgICAgICBwcmVmaXhlZFByb3BzW3Byb3BdID0gcDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHByZWZpeGVkUHJvcHNbcHJvcF07XG59XG5cbjsgLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSAuL2lzX2Nzc192YXJpYWJsZS50c1xuXG52YXIgbnVtZXJpY1Byb3BzID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgY29sdW1uQ291bnQ6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBncmlkQXJlYTogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZ3JpZENvbHVtbkVuZDogdHJ1ZSxcbiAgZ3JpZENvbHVtblN0YXJ0OiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkUm93RW5kOiB0cnVlLFxuICBncmlkUm93U3RhcnQ6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wLCB2YWx1ZSwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICByZXR1cm4gIWlzVmFyaWFibGUgJiYgIW51bWVyaWNQcm9wc1twcm9wXSAmJiBpc051bWVyaWModmFsdWUpID8gdmFsdWUgKyBcInB4XCIgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY3NzKHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHZhciBpc1ZhcmlhYmxlXzEgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICAgIHByb3AgPSBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZV8xKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIGNvbXB1dGVTdHlsZSh0aGlzWzBdLCBwcm9wLCBpc1ZhcmlhYmxlXzEpO1xuICAgIGlmICghcHJvcCkgcmV0dXJuIHRoaXM7XG4gICAgdmFsdWUgPSBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlLCBpc1ZhcmlhYmxlXzEpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuXG4gICAgICBpZiAoaXNWYXJpYWJsZV8xKSB7XG4gICAgICAgIGVsZS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wKSB7XG4gICAgdGhpcy5jc3Moa2V5LCBwcm9wW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbjtcbmZuLmNzcyA9IGNzczsgLy8gQG9wdGlvbmFsIC4vY3NzLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2F0dGVtcHQudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuXG52YXIgSlNPTlN0cmluZ1JlID0gL15cXHMrfFxccyskLztcblxuZnVuY3Rpb24gZ2V0RGF0YShlbGUsIGtleSkge1xuICB2YXIgdmFsdWUgPSBlbGUuZGF0YXNldFtrZXldIHx8IGVsZS5kYXRhc2V0W2NhbWVsQ2FzZShrZXkpXTtcbiAgaWYgKEpTT05TdHJpbmdSZS50ZXN0KHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gYXR0ZW1wdChKU09OLnBhcnNlLCB2YWx1ZSk7XG59IC8vIEByZXF1aXJlIGNvcmUvYXR0ZW1wdC50c1xuLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLnRzXG5cblxuZnVuY3Rpb24gc2V0RGF0YShlbGUsIGtleSwgdmFsdWUpIHtcbiAgdmFsdWUgPSBhdHRlbXB0KEpTT04uc3RyaW5naWZ5LCB2YWx1ZSk7XG4gIGVsZS5kYXRhc2V0W2NhbWVsQ2FzZShrZXkpXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkYXRhKG5hbWUsIHZhbHVlKSB7XG4gIGlmICghbmFtZSkge1xuICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgIHZhciBkYXRhcyA9IHt9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXNbMF0uZGF0YXNldCkge1xuICAgICAgZGF0YXNba2V5XSA9IGdldERhdGEodGhpc1swXSwga2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YXM7XG4gIH1cblxuICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIGdldERhdGEodGhpc1swXSwgbmFtZSk7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuIHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBzZXREYXRhKGVsZSwgbmFtZSwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICB0aGlzLmRhdGEoa2V5LCBuYW1lW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLmRhdGEgPSBkYXRhOyAvLyBAb3B0aW9uYWwgLi9kYXRhLnRzXG5cbmZ1bmN0aW9uIGdldERvY3VtZW50RGltZW5zaW9uKGRvYywgZGltZW5zaW9uKSB7XG4gIHZhciBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICByZXR1cm4gTWF0aC5tYXgoZG9jLmJvZHlbXCJzY3JvbGxcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcInNjcm9sbFwiICsgZGltZW5zaW9uXSwgZG9jLmJvZHlbXCJvZmZzZXRcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcIm9mZnNldFwiICsgZGltZW5zaW9uXSwgZG9jRWxlW1wiY2xpZW50XCIgKyBkaW1lbnNpb25dKTtcbn0gLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZV9pbnQudHNcblxuXG5mdW5jdGlvbiBnZXRFeHRyYVNwYWNlKGVsZSwgeEF4aXMpIHtcbiAgcmV0dXJuIGNvbXB1dGVTdHlsZUludChlbGUsIFwiYm9yZGVyXCIgKyAoeEF4aXMgPyAnTGVmdCcgOiAnVG9wJykgKyBcIldpZHRoXCIpICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJwYWRkaW5nXCIgKyAoeEF4aXMgPyAnTGVmdCcgOiAnVG9wJykpICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJwYWRkaW5nXCIgKyAoeEF4aXMgPyAnUmlnaHQnIDogJ0JvdHRvbScpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwiYm9yZGVyXCIgKyAoeEF4aXMgPyAnUmlnaHQnIDogJ0JvdHRvbScpICsgXCJXaWR0aFwiKTtcbn1cblxuZWFjaChbdHJ1ZSwgZmFsc2VdLCBmdW5jdGlvbiAoaSwgb3V0ZXIpIHtcbiAgZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCBmdW5jdGlvbiAoaSwgcHJvcCkge1xuICAgIHZhciBuYW1lID0gXCJcIiArIChvdXRlciA/ICdvdXRlcicgOiAnaW5uZXInKSArIHByb3A7XG5cbiAgICBmbltuYW1lXSA9IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgaWYgKCF0aGlzWzBdKSByZXR1cm47XG4gICAgICBpZiAoaXNXaW5kb3codGhpc1swXSkpIHJldHVybiBvdXRlciA/IHRoaXNbMF1bXCJpbm5lclwiICsgcHJvcF0gOiB0aGlzWzBdLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtcImNsaWVudFwiICsgcHJvcF07XG4gICAgICBpZiAoaXNEb2N1bWVudCh0aGlzWzBdKSkgcmV0dXJuIGdldERvY3VtZW50RGltZW5zaW9uKHRoaXNbMF0sIHByb3ApO1xuICAgICAgcmV0dXJuIHRoaXNbMF1bXCJcIiArIChvdXRlciA/ICdvZmZzZXQnIDogJ2NsaWVudCcpICsgcHJvcF0gKyAoaW5jbHVkZU1hcmdpbnMgJiYgb3V0ZXIgPyBjb21wdXRlU3R5bGVJbnQodGhpc1swXSwgXCJtYXJnaW5cIiArIChpID8gJ1RvcCcgOiAnTGVmdCcpKSArIGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBcIm1hcmdpblwiICsgKGkgPyAnQm90dG9tJyA6ICdSaWdodCcpKSA6IDApO1xuICAgIH07XG4gIH0pO1xufSk7XG5lYWNoKFsnV2lkdGgnLCAnSGVpZ2h0J10sIGZ1bmN0aW9uIChpbmRleCwgcHJvcCkge1xuICB2YXIgcHJvcExDID0gcHJvcC50b0xvd2VyQ2FzZSgpO1xuXG4gIGZuW3Byb3BMQ10gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyB1bmRlZmluZWQgOiB0aGlzO1xuXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBpZiAoaXNXaW5kb3codGhpc1swXSkpIHJldHVybiB0aGlzWzBdLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtcImNsaWVudFwiICsgcHJvcF07XG4gICAgICBpZiAoaXNEb2N1bWVudCh0aGlzWzBdKSkgcmV0dXJuIGdldERvY3VtZW50RGltZW5zaW9uKHRoaXNbMF0sIHByb3ApO1xuICAgICAgcmV0dXJuIHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbcHJvcExDXSAtIGdldEV4dHJhU3BhY2UodGhpc1swXSwgIWluZGV4KTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgICAgdmFyIGJveFNpemluZyA9IGNvbXB1dGVTdHlsZShlbGUsICdib3hTaXppbmcnKTtcbiAgICAgIGVsZS5zdHlsZVtwcm9wTENdID0gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wTEMsIHZhbHVlTnVtYmVyICsgKGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnID8gZ2V0RXh0cmFTcGFjZShlbGUsICFpbmRleCkgOiAwKSk7XG4gICAgfSk7XG4gIH07XG59KTsgLy8gQG9wdGlvbmFsIC4vaW5uZXJfb3V0ZXIudHNcbi8vIEBvcHRpb25hbCAuL25vcm1hbC50c1xuLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuXG52YXIgZGVmYXVsdERpc3BsYXkgPSB7fTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdERpc3BsYXkodGFnTmFtZSkge1xuICBpZiAoZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0pIHJldHVybiBkZWZhdWx0RGlzcGxheVt0YWdOYW1lXTtcbiAgdmFyIGVsZSA9IGNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIGRvYy5ib2R5Lmluc2VydEJlZm9yZShlbGUsIG51bGwpO1xuICB2YXIgZGlzcGxheSA9IGNvbXB1dGVTdHlsZShlbGUsICdkaXNwbGF5Jyk7XG4gIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG4gIHJldHVybiBkZWZhdWx0RGlzcGxheVt0YWdOYW1lXSA9IGRpc3BsYXkgIT09ICdub25lJyA/IGRpc3BsYXkgOiAnYmxvY2snO1xufSAvLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlLnRzXG5cblxuZnVuY3Rpb24gaXNIaWRkZW4oZWxlKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpID09PSAnbm9uZSc7XG59XG5cbnZhciBkaXNwbGF5UHJvcGVydHkgPSAnX19fY2QnO1xuXG5mbi50b2dnbGUgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIHZhciBzaG93ID0gaXNVbmRlZmluZWQoZm9yY2UpID8gaXNIaWRkZW4oZWxlKSA6IGZvcmNlO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gZWxlW2Rpc3BsYXlQcm9wZXJ0eV0gfHwgJyc7XG5cbiAgICAgIGlmIChpc0hpZGRlbihlbGUpKSB7XG4gICAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gZ2V0RGVmYXVsdERpc3BsYXkoZWxlLnRhZ05hbWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVbZGlzcGxheVByb3BlcnR5XSA9IGNvbXB1dGVTdHlsZShlbGUsICdkaXNwbGF5Jyk7XG4gICAgICBlbGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0pO1xufTtcblxuZm4uaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbn07XG5cbmZuLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZSh0cnVlKTtcbn07IC8vIEBvcHRpb25hbCAuL2hpZGUudHNcbi8vIEBvcHRpb25hbCAuL3Nob3cudHNcbi8vIEBvcHRpb25hbCAuL3RvZ2dsZS50c1xuXG5cbmZ1bmN0aW9uIGhhc05hbWVzcGFjZXMobnMxLCBuczIpIHtcbiAgcmV0dXJuICFuczIgfHwgIXNvbWUuY2FsbChuczIsIGZ1bmN0aW9uIChucykge1xuICAgIHJldHVybiBuczEuaW5kZXhPZihucykgPCAwO1xuICB9KTtcbn1cblxudmFyIGV2ZW50c05hbWVzcGFjZSA9ICdfX19jZScsXG4gICAgZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvciA9ICcuJyxcbiAgICBldmVudHNGb2N1cyA9IHtcbiAgZm9jdXM6ICdmb2N1c2luJyxcbiAgYmx1cjogJ2ZvY3Vzb3V0J1xufSxcbiAgICBldmVudHNIb3ZlciA9IHtcbiAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG4gIG1vdXNlbGVhdmU6ICdtb3VzZW91dCdcbn0sXG4gICAgZXZlbnRzTW91c2VSZSA9IC9eKG1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wfGNsaWNrfGRibGNsaWNrKS9pOyAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5mdW5jdGlvbiBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lKSB7XG4gIHJldHVybiBldmVudHNIb3ZlcltuYW1lXSB8fCBldmVudHNGb2N1c1tuYW1lXSB8fCBuYW1lO1xufSAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGdldEV2ZW50c0NhY2hlKGVsZSkge1xuICByZXR1cm4gZWxlW2V2ZW50c05hbWVzcGFjZV0gPSBlbGVbZXZlbnRzTmFtZXNwYWNlXSB8fCB7fTtcbn0gLy8gQHJlcXVpcmUgY29yZS9ndWlkLnRzXG4vLyBAcmVxdWlyZSBldmVudHMvaGVscGVycy9nZXRfZXZlbnRzX2NhY2hlLnRzXG5cblxuZnVuY3Rpb24gYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGV2ZW50Q2FjaGUgPSBnZXRFdmVudHNDYWNoZShlbGUpO1xuICBldmVudENhY2hlW25hbWVdID0gZXZlbnRDYWNoZVtuYW1lXSB8fCBbXTtcbiAgZXZlbnRDYWNoZVtuYW1lXS5wdXNoKFtuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2tdKTtcbiAgZWxlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xufSAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkge1xuICB2YXIgcGFydHMgPSBldmVudE5hbWUuc3BsaXQoZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gIHJldHVybiBbcGFydHNbMF0sIHBhcnRzLnNsaWNlKDEpLnNvcnQoKV07IC8vIFtuYW1lLCBuYW1lc3BhY2VbXV1cbn0gLy8gQHJlcXVpcmUgLi9nZXRfZXZlbnRzX2NhY2hlLnRzXG4vLyBAcmVxdWlyZSAuL2hhc19uYW1lc3BhY2VzLnRzXG4vLyBAcmVxdWlyZSAuL3BhcnNlX2V2ZW50X25hbWUudHNcblxuXG5mdW5jdGlvbiByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgY2FjaGUgPSBnZXRFdmVudHNDYWNoZShlbGUpO1xuXG4gIGlmICghbmFtZSkge1xuICAgIGZvciAobmFtZSBpbiBjYWNoZSkge1xuICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjYWNoZVtuYW1lXSkge1xuICAgIGNhY2hlW25hbWVdID0gY2FjaGVbbmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChfYSkge1xuICAgICAgdmFyIG5zID0gX2FbMF0sXG4gICAgICAgICAgc2VsID0gX2FbMV0sXG4gICAgICAgICAgY2IgPSBfYVsyXTtcbiAgICAgIGlmIChjYWxsYmFjayAmJiBjYi5ndWlkICE9PSBjYWxsYmFjay5ndWlkIHx8ICFoYXNOYW1lc3BhY2VzKG5zLCBuYW1lc3BhY2VzKSB8fCBzZWxlY3RvciAmJiBzZWxlY3RvciAhPT0gc2VsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGVsZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mbi5vZmYgPSBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkgJiYgIWlzRG9jdW1lbnQoZWxlKSAmJiAhaXNXaW5kb3coZWxlKSkgcmV0dXJuO1xuICAgICAgcmVtb3ZlRXZlbnQoZWxlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdGhpcy5vZmYoa2V5LCBldmVudEZ1bGxOYW1lW2tleV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH1cblxuICAgIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChpLCBldmVudEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgX2EgPSBwYXJzZUV2ZW50TmFtZShldmVudEZ1bGxOYW1lKSxcbiAgICAgICAgICBuYW1lT3JpZ2luYWwgPSBfYVswXSxcbiAgICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgICAgbmFtZSA9IGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWVPcmlnaW5hbCk7XG5cbiAgICAgIF90aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcbiAgICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIG9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgX29uZSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmICghaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdGhpcy5vbihrZXksIHNlbGVjdG9yLCBkYXRhLCBldmVudEZ1bGxOYW1lW2tleV0sIF9vbmUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoc2VsZWN0b3IpIHx8IGlzTnVsbChzZWxlY3RvcikpIHtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfSBlbHNlIGlmIChpc1VuZGVmaW5lZChkYXRhKSkge1xuICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgZWFjaChnZXRTcGxpdFZhbHVlcyhldmVudEZ1bGxOYW1lKSwgZnVuY3Rpb24gKGksIGV2ZW50RnVsbE5hbWUpIHtcbiAgICB2YXIgX2EgPSBwYXJzZUV2ZW50TmFtZShldmVudEZ1bGxOYW1lKSxcbiAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgbmFtZSA9IGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWVPcmlnaW5hbCksXG4gICAgICAgIGlzRXZlbnRIb3ZlciA9IG5hbWVPcmlnaW5hbCBpbiBldmVudHNIb3ZlcixcbiAgICAgICAgaXNFdmVudEZvY3VzID0gbmFtZU9yaWdpbmFsIGluIGV2ZW50c0ZvY3VzO1xuXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XG5cbiAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkgJiYgIWlzRG9jdW1lbnQoZWxlKSAmJiAhaXNXaW5kb3coZWxlKSkgcmV0dXJuO1xuXG4gICAgICB2YXIgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uIGZpbmFsQ2FsbGJhY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldFtcIl9fX2lcIiArIGV2ZW50LnR5cGVdKSByZXR1cm4gZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7IC8vIElnbm9yaW5nIG5hdGl2ZSBldmVudCBpbiBmYXZvciBvZiB0aGUgdXBjb21pbmcgY3VzdG9tIG9uZVxuXG4gICAgICAgIGlmIChldmVudC5uYW1lc3BhY2UgJiYgIWhhc05hbWVzcGFjZXMobmFtZXNwYWNlcywgZXZlbnQubmFtZXNwYWNlLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXNlbGVjdG9yICYmIChpc0V2ZW50Rm9jdXMgJiYgKGV2ZW50LnRhcmdldCAhPT0gZWxlIHx8IGV2ZW50Ll9fX290ID09PSBuYW1lKSB8fCBpc0V2ZW50SG92ZXIgJiYgZXZlbnQucmVsYXRlZFRhcmdldCAmJiBlbGUuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpKSByZXR1cm47XG4gICAgICAgIHZhciB0aGlzQXJnID0gZWxlO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModGFyZ2V0LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXNBcmcgPSB0YXJnZXQ7XG4gICAgICAgICAgZXZlbnQuX19fY2QgPSB0cnVlOyAvLyBEZWxlZ2F0ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50Ll9fX2NkKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnY3VycmVudFRhcmdldCcsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2RhdGEnLCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBldmVudCwgZXZlbnQuX19fdGQpO1xuXG4gICAgICAgIGlmIChfb25lKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmluYWxDYWxsYmFjay5ndWlkID0gY2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgfHwgY2FzaC5ndWlkKys7XG4gICAgICBhZGRFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBmaW5hbENhbGxiYWNrKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5vbiA9IG9uO1xuXG5mdW5jdGlvbiBvbmUoZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLm9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgdHJ1ZSk7XG59XG5cbjtcbmZuLm9uZSA9IG9uZTtcblxuZm4ucmVhZHkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIGNiID0gZnVuY3Rpb24gY2IoKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDAsIGNhc2gpO1xuICB9O1xuXG4gIGlmIChkb2MucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgY2IoKTtcbiAgfSBlbHNlIHtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4udHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICBpZiAoaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnQpLFxuICAgICAgICBuYW1lT3JpZ2luYWwgPSBfYVswXSxcbiAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICBuYW1lXzEgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpO1xuXG4gICAgaWYgKCFuYW1lXzEpIHJldHVybiB0aGlzO1xuICAgIHZhciB0eXBlID0gZXZlbnRzTW91c2VSZS50ZXN0KG5hbWVfMSkgPyAnTW91c2VFdmVudHMnIDogJ0hUTUxFdmVudHMnO1xuICAgIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KHR5cGUpO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lXzEsIHRydWUsIHRydWUpO1xuICAgIGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKTtcbiAgICBldmVudC5fX19vdCA9IG5hbWVPcmlnaW5hbDtcbiAgfVxuXG4gIGV2ZW50Ll9fX3RkID0gZGF0YTtcbiAgdmFyIGlzRXZlbnRGb2N1cyA9IGV2ZW50Ll9fX290IGluIGV2ZW50c0ZvY3VzO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoaXNFdmVudEZvY3VzICYmIGlzRnVuY3Rpb24oZWxlW2V2ZW50Ll9fX290XSkpIHtcbiAgICAgIGVsZVtcIl9fX2lcIiArIGV2ZW50LnR5cGVdID0gdHJ1ZTsgLy8gRW5zdXJpbmcgdGhlIG5hdGl2ZSBldmVudCBpcyBpZ25vcmVkXG5cbiAgICAgIGVsZVtldmVudC5fX19vdF0oKTtcblxuICAgICAgZWxlW1wiX19faVwiICsgZXZlbnQudHlwZV0gPSBmYWxzZTsgLy8gRW5zdXJpbmcgdGhlIGN1c3RvbSBldmVudCBpcyBub3QgaWdub3JlZFxuICAgIH1cblxuICAgIGVsZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfSk7XG59OyAvLyBAb3B0aW9uYWwgLi9vZmYudHNcbi8vIEBvcHRpb25hbCAuL29uLnRzXG4vLyBAb3B0aW9uYWwgLi9vbmUudHNcbi8vIEBvcHRpb25hbCAuL3JlYWR5LnRzXG4vLyBAb3B0aW9uYWwgLi90cmlnZ2VyLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3BsdWNrLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGdldFZhbHVlKGVsZSkge1xuICBpZiAoZWxlLm11bHRpcGxlICYmIGVsZS5vcHRpb25zKSByZXR1cm4gcGx1Y2soZmlsdGVyLmNhbGwoZWxlLm9wdGlvbnMsIGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkICYmICFvcHRpb24uZGlzYWJsZWQgJiYgIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkO1xuICB9KSwgJ3ZhbHVlJyk7XG4gIHJldHVybiBlbGUudmFsdWUgfHwgJyc7XG59XG5cbnZhciBxdWVyeUVuY29kZVNwYWNlUmUgPSAvJTIwL2csXG4gICAgcXVlcnlFbmNvZGVDUkxGUmUgPSAvXFxyP1xcbi9nO1xuXG5mdW5jdGlvbiBxdWVyeUVuY29kZShwcm9wLCB2YWx1ZSkge1xuICByZXR1cm4gXCImXCIgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZS5yZXBsYWNlKHF1ZXJ5RW5jb2RlQ1JMRlJlLCAnXFxyXFxuJykpLnJlcGxhY2UocXVlcnlFbmNvZGVTcGFjZVJlLCAnKycpO1xufVxuXG52YXIgc2tpcHBhYmxlUmUgPSAvZmlsZXxyZXNldHxzdWJtaXR8YnV0dG9ufGltYWdlL2ksXG4gICAgY2hlY2thYmxlUmUgPSAvcmFkaW98Y2hlY2tib3gvaTtcblxuZm4uc2VyaWFsaXplID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSAnJztcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBlYWNoKGVsZS5lbGVtZW50cyB8fCBbZWxlXSwgZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKGVsZS5kaXNhYmxlZCB8fCAhZWxlLm5hbWUgfHwgZWxlLnRhZ05hbWUgPT09ICdGSUVMRFNFVCcgfHwgc2tpcHBhYmxlUmUudGVzdChlbGUudHlwZSkgfHwgY2hlY2thYmxlUmUudGVzdChlbGUudHlwZSkgJiYgIWVsZS5jaGVja2VkKSByZXR1cm47XG4gICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShlbGUpO1xuXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB2YXIgdmFsdWVzID0gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgICAgIGVhY2godmFsdWVzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgICAgICBxdWVyeSArPSBxdWVyeUVuY29kZShlbGUubmFtZSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBxdWVyeS5zbGljZSgxKTtcbn07XG5cbmZ1bmN0aW9uIHZhbCh2YWx1ZSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzWzBdICYmIGdldFZhbHVlKHRoaXNbMF0pO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgaXNTZWxlY3QgPSBlbGUubXVsdGlwbGUgJiYgZWxlLm9wdGlvbnM7XG5cbiAgICBpZiAoaXNTZWxlY3QgfHwgY2hlY2thYmxlUmUudGVzdChlbGUudHlwZSkpIHtcbiAgICAgIHZhciBlbGVWYWx1ZV8xID0gaXNBcnJheSh2YWx1ZSkgPyBtYXAuY2FsbCh2YWx1ZSwgU3RyaW5nKSA6IGlzTnVsbCh2YWx1ZSkgPyBbXSA6IFtTdHJpbmcodmFsdWUpXTtcblxuICAgICAgaWYgKGlzU2VsZWN0KSB7XG4gICAgICAgIGVhY2goZWxlLm9wdGlvbnMsIGZ1bmN0aW9uIChpLCBvcHRpb24pIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBlbGVWYWx1ZV8xLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZS5jaGVja2VkID0gZWxlVmFsdWVfMS5pbmRleE9mKGVsZS52YWx1ZSkgPj0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlLnZhbHVlID0gaXNVbmRlZmluZWQodmFsdWUpIHx8IGlzTnVsbCh2YWx1ZSkgPyAnJyA6IHZhbHVlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZuLnZhbCA9IHZhbDtcblxuZm4uY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIH0pO1xufTtcblxuZm4uZGV0YWNoID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgZmlsdGVyZWQodGhpcywgY29tcGFyYXRvcikuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGVsZS5wYXJlbnROb2RlKSB7XG4gICAgICBlbGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIGZyYWdtZW50UmUgPSAvXlxccyo8KFxcdyspW14+XSo+LyxcbiAgICBzaW5nbGVUYWdSZSA9IC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+KT8kLztcbnZhciBjb250YWluZXJzID0ge1xuICAnKic6IGRpdixcbiAgdHI6IHRib2R5LFxuICB0ZDogdHIsXG4gIHRoOiB0cixcbiAgdGhlYWQ6IHRhYmxlLFxuICB0Ym9keTogdGFibGUsXG4gIHRmb290OiB0YWJsZVxufTsgLy9UT0RPOiBDcmVhdGUgZWxlbWVudHMgaW5zaWRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIGluIG9yZGVyIHRvIHByZXZlbnQgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gZmlyaW5nXG4vL1RPRE86IEVuc3VyZSB0aGUgY3JlYXRlZCBlbGVtZW50cyBoYXZlIHRoZSBmcmFnbWVudCBhcyB0aGVpciBwYXJlbnQgaW5zdGVhZCBvZiBudWxsLCB0aGlzIGFsc28gZW5zdXJlcyB3ZSBjYW4gZGVhbCB3aXRoIGRldGF0Y2hlZCBub2RlcyBtb3JlIHJlbGlhYmx5XG5cbmZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG4gIGlmICghaXNTdHJpbmcoaHRtbCkpIHJldHVybiBbXTtcbiAgaWYgKHNpbmdsZVRhZ1JlLnRlc3QoaHRtbCkpIHJldHVybiBbY3JlYXRlRWxlbWVudChSZWdFeHAuJDEpXTtcbiAgdmFyIGZyYWdtZW50ID0gZnJhZ21lbnRSZS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMSxcbiAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcnNbZnJhZ21lbnRdIHx8IGNvbnRhaW5lcnNbJyonXTtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gIHJldHVybiBjYXNoKGNvbnRhaW5lci5jaGlsZE5vZGVzKS5kZXRhY2goKS5nZXQoKTtcbn1cblxuY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG5cbmZuLmVtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB3aGlsZSAoZWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsZS5yZW1vdmVDaGlsZChlbGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGh0bWwoaHRtbCkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzWzBdICYmIHRoaXNbMF0uaW5uZXJIVE1MO1xuICBpZiAoaXNVbmRlZmluZWQoaHRtbCkpIHJldHVybiB0aGlzO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWxlLmlubmVySFRNTCA9IGh0bWw7XG4gIH0pO1xufVxuXG5mbi5odG1sID0gaHRtbDtcblxuZm4ucmVtb3ZlID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgZmlsdGVyZWQodGhpcywgY29tcGFyYXRvcikuZGV0YWNoKCkub2ZmKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gIGlmIChpc1VuZGVmaW5lZCh0ZXh0KSkgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLnRleHRDb250ZW50IDogJyc7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlbGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9KTtcbn1cblxuO1xuZm4udGV4dCA9IHRleHQ7XG5cbmZuLnVud3JhcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoZWxlLnRhZ05hbWUgPT09ICdCT0RZJykgcmV0dXJuO1xuICAgIHZhciAkZWxlID0gY2FzaChlbGUpO1xuICAgICRlbGUucmVwbGFjZVdpdGgoJGVsZS5jaGlsZHJlbigpKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ub2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWxlID0gdGhpc1swXTtcbiAgaWYgKCFlbGUpIHJldHVybjtcbiAgdmFyIHJlY3QgPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgdG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCxcbiAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXRcbiAgfTtcbn07XG5cbmZuLm9mZnNldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlLm9mZnNldFBhcmVudDtcblxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgY29tcHV0ZVN0eWxlKG9mZnNldFBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlO1xuICB9KTtcbn07XG5cbmZuLnBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWxlID0gdGhpc1swXTtcbiAgaWYgKCFlbGUpIHJldHVybjtcbiAgdmFyIGlzRml4ZWQgPSBjb21wdXRlU3R5bGUoZWxlLCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyxcbiAgICAgIG9mZnNldCA9IGlzRml4ZWQgPyBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiB0aGlzLm9mZnNldCgpO1xuXG4gIGlmICghaXNGaXhlZCkge1xuICAgIHZhciBkb2NfMSA9IGVsZS5vd25lckRvY3VtZW50O1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBlbGUub2Zmc2V0UGFyZW50IHx8IGRvY18xLmRvY3VtZW50RWxlbWVudDtcblxuICAgIHdoaWxlICgob2Zmc2V0UGFyZW50ID09PSBkb2NfMS5ib2R5IHx8IG9mZnNldFBhcmVudCA9PT0gZG9jXzEuZG9jdW1lbnRFbGVtZW50KSAmJiBjb21wdXRlU3R5bGUob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXRQYXJlbnQgIT09IGVsZSAmJiBpc0VsZW1lbnQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgdmFyIHBhcmVudE9mZnNldCA9IGNhc2gob2Zmc2V0UGFyZW50KS5vZmZzZXQoKTtcbiAgICAgIG9mZnNldC50b3AgLT0gcGFyZW50T2Zmc2V0LnRvcCArIGNvbXB1dGVTdHlsZUludChvZmZzZXRQYXJlbnQsICdib3JkZXJUb3BXaWR0aCcpO1xuICAgICAgb2Zmc2V0LmxlZnQgLT0gcGFyZW50T2Zmc2V0LmxlZnQgKyBjb21wdXRlU3R5bGVJbnQob2Zmc2V0UGFyZW50LCAnYm9yZGVyTGVmdFdpZHRoJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9mZnNldC50b3AgLSBjb21wdXRlU3R5bGVJbnQoZWxlLCAnbWFyZ2luVG9wJyksXG4gICAgbGVmdDogb2Zmc2V0LmxlZnQgLSBjb21wdXRlU3R5bGVJbnQoZWxlLCAnbWFyZ2luTGVmdCcpXG4gIH07XG59O1xuXG5mbi5jaGlsZHJlbiA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jaGlsZHJlbjtcbiAgfSkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5jb250ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHBsdWNrKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gZWxlLnRhZ05hbWUgPT09ICdJRlJBTUUnID8gW2VsZS5jb250ZW50RG9jdW1lbnRdIDogZWxlLnRhZ05hbWUgPT09ICdURU1QTEFURScgPyBlbGUuY29udGVudC5jaGlsZE5vZGVzIDogZWxlLmNoaWxkTm9kZXM7XG4gIH0pKSk7XG59O1xuXG5mbi5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIGVsZSk7XG4gIH0pKSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9maWx0ZXIudHNcbi8vIEByZXF1aXJlIHRyYXZlcnNhbC9maW5kLnRzXG5cblxudmFyIEhUTUxDREFUQVJlID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nLFxuICAgIHNjcmlwdFR5cGVSZSA9IC9eJHxebW9kdWxlJHxcXC8oamF2YXxlY21hKXNjcmlwdC9pLFxuICAgIHNjcmlwdEF0dHJpYnV0ZXMgPSBbJ3R5cGUnLCAnc3JjJywgJ25vbmNlJywgJ25vTW9kdWxlJ107XG5cbmZ1bmN0aW9uIGV2YWxTY3JpcHRzKG5vZGUsIGRvYykge1xuICB2YXIgY29sbGVjdGlvbiA9IGNhc2gobm9kZSk7XG4gIGNvbGxlY3Rpb24uZmlsdGVyKCdzY3JpcHQnKS5hZGQoY29sbGVjdGlvbi5maW5kKCdzY3JpcHQnKSkuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKHNjcmlwdFR5cGVSZS50ZXN0KGVsZS50eXBlKSAmJiBkb2NFbGUuY29udGFpbnMoZWxlKSkge1xuICAgICAgLy8gVGhlIHNjcmlwdCB0eXBlIGlzIHN1cHBvcnRlZCAvLyBUaGUgZWxlbWVudCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NIC8vIFVzaW5nIGBkb2N1bWVudEVsZW1lbnRgIGZvciBicm9hZGVyIGJyb3dzZXIgc3VwcG9ydFxuICAgICAgdmFyIHNjcmlwdF8xID0gY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHRfMS50ZXh0ID0gZWxlLnRleHRDb250ZW50LnJlcGxhY2UoSFRNTENEQVRBUmUsICcnKTtcbiAgICAgIGVhY2goc2NyaXB0QXR0cmlidXRlcywgZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAgICAgICAgaWYgKGVsZVthdHRyXSkgc2NyaXB0XzFbYXR0cl0gPSBlbGVbYXR0cl07XG4gICAgICB9KTtcbiAgICAgIGRvYy5oZWFkLmluc2VydEJlZm9yZShzY3JpcHRfMSwgbnVsbCk7XG4gICAgICBkb2MuaGVhZC5yZW1vdmVDaGlsZChzY3JpcHRfMSk7XG4gICAgfVxuICB9KTtcbn0gLy8gQHJlcXVpcmUgLi9ldmFsX3NjcmlwdHMudHNcblxuXG5mdW5jdGlvbiBpbnNlcnRFbGVtZW50KGFuY2hvciwgdGFyZ2V0LCBsZWZ0LCBpbnNpZGUsIGV2YWx1YXRlKSB7XG4gIGlmIChpbnNpZGUpIHtcbiAgICAvLyBwcmVwZW5kL2FwcGVuZFxuICAgIGFuY2hvci5pbnNlcnRCZWZvcmUodGFyZ2V0LCBsZWZ0ID8gYW5jaG9yLmZpcnN0Q2hpbGQgOiBudWxsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBiZWZvcmUvYWZ0ZXJcbiAgICBhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFyZ2V0LCBsZWZ0ID8gYW5jaG9yIDogYW5jaG9yLm5leHRTaWJsaW5nKTtcbiAgfVxuXG4gIGlmIChldmFsdWF0ZSkge1xuICAgIGV2YWxTY3JpcHRzKHRhcmdldCwgYW5jaG9yLm93bmVyRG9jdW1lbnQpO1xuICB9XG59IC8vIEByZXF1aXJlIC4vaW5zZXJ0X2VsZW1lbnQudHNcblxuXG5mdW5jdGlvbiBpbnNlcnRTZWxlY3RvcnMoc2VsZWN0b3JzLCBhbmNob3JzLCBpbnZlcnNlLCBsZWZ0LCBpbnNpZGUsIHJldmVyc2VMb29wMSwgcmV2ZXJzZUxvb3AyLCByZXZlcnNlTG9vcDMpIHtcbiAgZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChzaSwgc2VsZWN0b3IpIHtcbiAgICBlYWNoKGNhc2goc2VsZWN0b3IpLCBmdW5jdGlvbiAodGksIHRhcmdldCkge1xuICAgICAgZWFjaChjYXNoKGFuY2hvcnMpLCBmdW5jdGlvbiAoYWksIGFuY2hvcikge1xuICAgICAgICB2YXIgYW5jaG9yRmluYWwgPSBpbnZlcnNlID8gdGFyZ2V0IDogYW5jaG9yLFxuICAgICAgICAgICAgdGFyZ2V0RmluYWwgPSBpbnZlcnNlID8gYW5jaG9yIDogdGFyZ2V0LFxuICAgICAgICAgICAgaW5kZXhGaW5hbCA9IGludmVyc2UgPyB0aSA6IGFpO1xuICAgICAgICBpbnNlcnRFbGVtZW50KGFuY2hvckZpbmFsLCAhaW5kZXhGaW5hbCA/IHRhcmdldEZpbmFsIDogdGFyZ2V0RmluYWwuY2xvbmVOb2RlKHRydWUpLCBsZWZ0LCBpbnNpZGUsICFpbmRleEZpbmFsKTtcbiAgICAgIH0sIHJldmVyc2VMb29wMyk7XG4gICAgfSwgcmV2ZXJzZUxvb3AyKTtcbiAgfSwgcmV2ZXJzZUxvb3AxKTtcbiAgcmV0dXJuIGFuY2hvcnM7XG59XG5cbmZuLmFmdGVyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5hcHBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uYXBwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmJlZm9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIHRydWUpO1xufTtcblxuZm4ucHJlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLnByZXBlbmRUbyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLnJlcGxhY2VXaXRoID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmJlZm9yZShzZWxlY3RvcikucmVtb3ZlKCk7XG59O1xuXG5mbi5yZXBsYWNlQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGNhc2goc2VsZWN0b3IpLnJlcGxhY2VXaXRoKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLndyYXBBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIHN0cnVjdHVyZSA9IGNhc2goc2VsZWN0b3IpLFxuICAgICAgd3JhcHBlciA9IHN0cnVjdHVyZVswXTtcblxuICB3aGlsZSAod3JhcHBlci5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICB3cmFwcGVyID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgfVxuXG4gIHRoaXMuZmlyc3QoKS5iZWZvcmUoc3RydWN0dXJlKTtcbiAgcmV0dXJuIHRoaXMuYXBwZW5kVG8od3JhcHBlcik7XG59O1xuXG5mbi53cmFwID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHZhciB3cmFwcGVyID0gY2FzaChzZWxlY3RvcilbMF07XG4gICAgY2FzaChlbGUpLndyYXBBbGwoIWkgPyB3cmFwcGVyIDogd3JhcHBlci5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9KTtcbn07XG5cbmZuLndyYXBJbm5lciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgJGVsZSA9IGNhc2goZWxlKSxcbiAgICAgICAgY29udGVudHMgPSAkZWxlLmNvbnRlbnRzKCk7XG4gICAgY29udGVudHMubGVuZ3RoID8gY29udGVudHMud3JhcEFsbChzZWxlY3RvcikgOiAkZWxlLmFwcGVuZChzZWxlY3Rvcik7XG4gIH0pO1xufTtcblxuZm4uaGFzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBjb21wYXJhdG9yID0gaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbGUpLmxlbmd0aDtcbiAgfSA6IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlLmNvbnRhaW5zKHNlbGVjdG9yKTtcbiAgfTtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGNvbXBhcmF0b3IpO1xufTtcblxuZm4uaXMgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIHNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pO1xufTtcblxuZm4ubmV4dCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfYWxsLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICduZXh0RWxlbWVudFNpYmxpbmcnLCBfYWxsLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ubmV4dEFsbCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLm5leHQoY29tcGFyYXRvciwgdHJ1ZSk7XG59O1xuXG5mbi5uZXh0VW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMubmV4dChjb21wYXJhdG9yLCB0cnVlLCB1bnRpbCk7XG59O1xuXG5mbi5ub3QgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gKCFpc1N0cmluZyhjb21wYXJhdG9yKSB8fCBpc0VsZW1lbnQoZWxlKSkgJiYgIWNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pO1xufTtcblxuZm4ucGFyZW50ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwYXJlbnROb2RlJykpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5pbmRleCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgY2hpbGQgPSBzZWxlY3RvciA/IGNhc2goc2VsZWN0b3IpWzBdIDogdGhpc1swXSxcbiAgICAgIGNvbGxlY3Rpb24gPSBzZWxlY3RvciA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICByZXR1cm4gaW5kZXhPZi5jYWxsKGNvbGxlY3Rpb24sIGNoaWxkKTtcbn07XG5cbmZuLmNsb3Nlc3QgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgZmlsdGVyZWQgPSB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgcmV0dXJuIGZpbHRlcmVkO1xuICB2YXIgJHBhcmVudCA9IHRoaXMucGFyZW50KCk7XG4gIGlmICghJHBhcmVudC5sZW5ndGgpIHJldHVybiBmaWx0ZXJlZDtcbiAgcmV0dXJuICRwYXJlbnQuY2xvc2VzdChjb21wYXJhdG9yKTtcbn07XG5cbmZuLnBhcmVudHMgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncGFyZW50RWxlbWVudCcsIHRydWUsIF91bnRpbCkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5wYXJlbnRzVW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50cyhjb21wYXJhdG9yLCB1bnRpbCk7XG59O1xuXG5mbi5wcmV2ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF9hbGwsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLCBfYWxsLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucHJldkFsbCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnByZXYoY29tcGFyYXRvciwgdHJ1ZSk7XG59O1xuXG5mbi5wcmV2VW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMucHJldihjb21wYXJhdG9yLCB0cnVlLCB1bnRpbCk7XG59O1xuXG5mbi5zaWJsaW5ncyA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGNhc2goZWxlKS5wYXJlbnQoKS5jaGlsZHJlbigpLm5vdChlbGUpO1xuICB9KSkpLCBjb21wYXJhdG9yKTtcbn07IC8vIEBvcHRpb25hbCAuL2NoaWxkcmVuLnRzXG4vLyBAb3B0aW9uYWwgLi9jbG9zZXN0LnRzXG4vLyBAb3B0aW9uYWwgLi9jb250ZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vZmluZC50c1xuLy8gQG9wdGlvbmFsIC4vaGFzLnRzXG4vLyBAb3B0aW9uYWwgLi9pcy50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dC50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dF9hbGwudHNcbi8vIEBvcHRpb25hbCAuL25leHRfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL25vdC50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50LnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnRzLnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnRzX3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9wcmV2LnRzXG4vLyBAb3B0aW9uYWwgLi9wcmV2X2FsbC50c1xuLy8gQG9wdGlvbmFsIC4vcHJldl91bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vc2libGluZ3MudHNcbi8vIEBvcHRpb25hbCBhdHRyaWJ1dGVzL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgY29sbGVjdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNzcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGRhdGEvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkaW1lbnNpb25zL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZWZmZWN0cy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGV2ZW50cy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGZvcm1zL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgbWFuaXB1bGF0aW9uL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgb2Zmc2V0L2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgdHJhdmVyc2FsL2luZGV4LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2luZGV4LnRzXG4vLyBAcHJpb3JpdHkgLTEwMFxuLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gTm9kZS5qc1xuICBtb2R1bGUuZXhwb3J0cyA9IGNhc2g7XG59IGVsc2Uge1xuICAvLyBCcm93c2VyXG4gIHdpblsnY2FzaCddID0gd2luWyckJ10gPSBjYXNoO1xufVxufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxudmFyIGNhc2hfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNhc2gtZG9tXCIpKTtcclxud2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlciA9IHtcclxuICAgIC8vIGdldE5mdDogYXN5bmMgKHBsYXRmb3JtOiBzdHJpbmcpID0+IHtcclxuICAgIC8vICAgICBzd2l0Y2ggKHBsYXRmb3JtLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcclxuICAgIC8vICAgICAgICAgY2FzZSBcIm9wZW5zZWFcIjpcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCAod2luZG93IGFzIGFueSkuX19kYXRhdmVyc2VOZnRDcmF3bGVyLm9wZW5zZWEoKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIFwic3VwZXJyYXJlXCI6XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKHdpbmRvdyBhcyBhbnkpLl9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5zdXBlcnJhcmUoKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIFwiem9yYVwiOlxyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICh3aW5kb3cgYXMgYW55KS5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuem9yYSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgXCJmb3VuZGF0aW9uXCI6XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKHdpbmRvdyBhcyBhbnkpLl9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5mb3VuZGF0aW9uKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBcInR3aXR0ZXJcIjpcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCAod2luZG93IGFzIGFueSkuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnR3aXR0ZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIFwicmFyaWJsZVwiOlxyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICh3aW5kb3cgYXMgYW55KS5fX2RhdGF2ZXJzZU5mdENyYXdsZXIucmFyaWJsZSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgXCJuaWZ0eWdhdGV3YXlcIjpcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCAod2luZG93IGFzIGFueSkuX19kYXRhdmVyc2VOZnRDcmF3bGVyLm5pZnR5Z2F0ZXdheSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgXCJhc3luY2FydFwiOlxyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICh3aW5kb3cgYXMgYW55KS5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuYXN5bmNhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBkZWZhdWx0OlxyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuICAgIGdldE5mdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gZGF0YS5wbGF0Zm9ybS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5zZWFcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdXBlcnJhcmVcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ6b3JhXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm91bmRhdGlvblwiOiByZXR1cm4gWzMgLypicmVhayovLCA3XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInR3aXR0ZXJcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyYXJpYmxlXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5pZnR5Z2F0ZXdheVwiOiByZXR1cm4gWzMgLypicmVhayovLCAxM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhc3luY2FydFwiOiByZXR1cm4gWzMgLypicmVhayovLCAxNV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDE3XTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5vcGVuc2VhKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5zdXBlcnJhcmUoZGF0YS5kYXRhKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnpvcmEoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLmZvdW5kYXRpb24oKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnR3aXR0ZXIoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTE6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIucmFyaWJsZSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTI6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMzogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5uaWZ0eWdhdGV3YXkoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTU6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuYXN5bmNhcnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE2OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTc6IHJldHVybiBbMyAvKmJyZWFrKi8sIDE4XTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTg6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sXHJcbiAgICBvcGVuc2VhOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMvMHgnKSkge1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCB1dGlsc18xLmV4dHJhY3RIZXgpKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gbG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJy8nKVs1XTtcclxuICAgICAgICAgICAgICAgIGlmIChuZnRJbmZvLmNvbnRyYWN0Lmxlbmd0aCA9PT0gMCB8fCBuZnRJbmZvLnRva2VuSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzL21hdGljLzB4JykgfHxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMva2xheXRuLzB4JykpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RTdXBwb3J0Q2hhaW4nLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHN1cGVycmFyZTogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCByZWRpcmVjdFVybCwgJGh0bWwsIGRsLCBsaSwgZG9tX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCA9IFwiPGEgaHJlZj0nXCIgKyBkYXRhLnVybCArIFwiJyB0YXJnZXQ9J19ibGFuayc+W3ZpZXcgdHhdPC9hPlwiO1xyXG4gICAgICAgICAgICAkaHRtbCA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRhdGEuZG9tKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGRsID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoJGh0bWwpLmZpbmQoJyNteVRhYkNvbnRlbnQgI2V2ZW50bG9nIC5jYXJkLWJvZHkgLm1lZGlhIC5tZWRpYS1ib2R5IGRsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRsIHx8IGRsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAndmFsaWRWaWV3VFgnLCBtc2dDb250ZW50OiByZWRpcmVjdFVybCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaSA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRsW2RsLmxlbmd0aCAtIDJdKS5maW5kKCdkZCB1bCBsaScpO1xyXG4gICAgICAgICAgICAgICAgZG9tX2EgPSAoMCwgY2FzaF9kb21fMS5kZWZhdWx0KShsaVtsaS5sZW5ndGggLSAxXSlcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdhJyk7XHJcbiAgICAgICAgICAgICAgICBsaSA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRsW2RsLmxlbmd0aCAtICgoZG9tX2EgJiYgZG9tX2EubGVuZ3RoKSA+IDAgPyAxIDogMildKS5maW5kKCdkZCB1bCBsaScpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRsWzBdKS5maW5kKCdkZCcpLmNoaWxkcmVuKCdhJykudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkobGlbbGkubGVuZ3RoIC0gMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5sYXN0KClcclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICd2YWxpZFZpZXdUWCcsIG1zZ0NvbnRlbnQ6IHJlZGlyZWN0VXJsIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgc3VwZXJyYXJlRXRoZXJzY2FuVXJsOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZSwgaXRlbUxpbmtTZWxlY3RvciwgaXRlbUxpbmtzLCBkb21VcmwsIHVybDtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpdGVtTGlua1NlbGVjdG9yID0gJy5jb2xsZWN0aWJsZS1oaXN0b3J5LXNlY3Rpb24gPiAuY29sbGVjdGlibGUtaGlzdG9yeS1pdGVtID4gLmNvbGxlY3RpYmxlLWhpc3RvcnktaXRlbS1saW5rJztcclxuICAgICAgICAgICAgaXRlbUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtTGlua1NlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtTGlua3MpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdnZU5GVEZyb21EZXRhaWxQYWdlJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9tVXJsID0gKF9hID0gaXRlbUxpbmtzW2l0ZW1MaW5rcy5sZW5ndGggLSAxXS5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgdXJsID0gZG9tVXJsICsgXCIjZXZlbnRsb2dcIjtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB1cmw7XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHpvcmE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3NzLXJ4azlwbCBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoX2IgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IHVybC5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGZvdW5kYXRpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRva2VuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jc3MtMWhoZWRkNyBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gdXJsLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgdHdpdHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbywgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHJhcmlibGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCB0bXBTcGxpdEFycjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vcmFyaWJsZS5jb20vdG9rZW4vMHgnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0uc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnZ2VORlRGcm9tRGV0YWlsUGFnZScsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgbmlmdHlnYXRld2F5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnIsIHRva2VuU3RyO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vbmlmdHlnYXRld2F5LmNvbS9pdGVtZGV0YWlsL3NlY29uZGFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0bXBTcGxpdEFyciA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL25pZnR5Z2F0ZXdheS5jb20vbWFya2V0cGxhY2U/Y29sbGVjdGlvbj0weCcpICYmXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwidG9rZW5JZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5TdHIgPSAoX2EgPSBsb2NhdGlvbi5ocmVmLm1hdGNoKC8mdG9rZW5JZD1cXGQrLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0b2tlblN0ciAhPT0gdW5kZWZpbmVkID8gdG9rZW5TdHIuc3BsaXQoJz0nKVsxXSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChfZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnaHR0cHM6Ly9uaWZ0eWdhdGV3YXkuY29tL2l0ZW1kZXRhaWwvcHJpbWFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90U3VwcG9ydEF0Q3VycmVudFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGFzeW5jYXJ0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnI7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCB1dGlsc18xLmV4dHJhY3RIZXgpKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChfYikge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxufTtcclxudmFyIGxpc3RlbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBsYXRGb3JtVHlwZSwgcmVzLCBtZXNzYWdlLCByZXMsIG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZS5kYXRhLm1zZ1R5cGUgJiYgZS5kYXRhLm1zZ1R5cGUgPT09IFwiZmV0Y2hOZnRSZXF1ZXN0XCIpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0Rm9ybVR5cGUgPSBlLmRhdGEucGxhdGZvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5nZXROZnQoZS5kYXRhKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB7IG1zZ1R5cGU6IFwiZmV0Y2hOZnRSZXNwb25zZVwiLCBwbGF0Zm9ybTogcGxhdEZvcm1UeXBlLCBkYXRhOiByZXMgfTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgXCIqXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShlLmRhdGEubXNnVHlwZSAmJiBlLmRhdGEubXNnVHlwZSA9PT0gXCJmZXRjaFN1cGVycmFyZUV0aGVyc2NhblVybFJlcXVlc3RcIikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuc3VwZXJyYXJlRXRoZXJzY2FuVXJsKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0geyBtc2dUeXBlOiBcImZldGNoU3VwZXJyYXJlRXRoZXJzY2FuVXJsUmVzcG9uc2VcIiwgZGF0YTogcmVzIH07XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sIGZhbHNlKTtcclxufSkoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5leHRyYWN0SGV4ID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBleHRyYWN0SGV4KHN0cikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgcmV0dXJuIChfYSA9IHN0ci5tYXRjaCgvMHhbXFxkQS1aYS16XSsvKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xyXG59XHJcbmV4cG9ydHMuZXh0cmFjdEhleCA9IGV4dHJhY3RIZXg7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==