/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
// import axios, { AxiosResponse } from 'axios';
var cash_dom_1 = __importDefault(__webpack_require__(/*! cash-dom */ "./node_modules/_cash-dom@8.1.0@cash-dom/dist/cash.js"));
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
        var nftInfo, response, itemLinkSelector, itemLinks, domUrl, redirectUrl, url, data, $html, dl, li, dom_a;
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
                    return [4 /*yield*/, fetch(url)];
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
    window.addEventListener("message", function (e) {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            var platFormType = e.data.platform;
            var res = window.__dataverseNftCrawler.getNft(platFormType);
            var message = { msgType: "fetchNftResponse", platform: platFormType, data: res };
            window.postMessage(message, "*");
        }
    }, false);
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


/***/ }),

/***/ "./node_modules/_cash-dom@8.1.0@cash-dom/dist/cash.js":
/*!************************************************************!*\
  !*** ./node_modules/_cash-dom@8.1.0@cash-dom/dist/cash.js ***!
  \************************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LWNyYXdsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxxQ0FBUztBQUMvQixtQkFBbUIsZ0JBQWdCO0FBQ25DLGlDQUFpQyxtQkFBTyxDQUFDLHNFQUFVO0FBQ25EO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxJQUFJO0FBQ1QsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLLElBQUk7QUFDVCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLLElBQUk7QUFDVCx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUssSUFBSTtBQUNULDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxJQUFJO0FBQ1QsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUssSUFBSTtBQUNULDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUssSUFBSTtBQUNULGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxJQUFJO0FBQ1QsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7OztBQzVaWTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDUGxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBOztBQUVBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixZQUFZO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLE9BQU87QUFDekM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsR0FBRztBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw4RUFBOEU7O0FBRTlFO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0ZBQXdGOztBQUV4RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2Qzs7QUFFQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLElBQUksSUFBOEI7QUFDbEM7QUFDQTtBQUNBLEVBQUUsS0FBSyxFQUdOO0FBQ0QsQ0FBQzs7Ozs7O1VDNzFDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmZ0LWNyYXdsZXIvLi9ub2RlX21vZHVsZXMvX2Nhc2gtZG9tQDguMS4wQGNhc2gtZG9tL2Rpc3QvY2FzaC5qcyIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25mdC1jcmF3bGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbi8vIGltcG9ydCBheGlvcywgeyBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xyXG52YXIgY2FzaF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2FzaC1kb21cIikpO1xyXG53aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyID0ge1xyXG4gICAgZ2V0TmZ0OiBmdW5jdGlvbiAocGxhdGZvcm0pIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hID0gcGxhdGZvcm0udG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvcGVuc2VhXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3VwZXJyYXJlXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiem9yYVwiOiByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvdW5kYXRpb25cIjogcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0d2l0dGVyXCI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFyaWJsZVwiOiByZXR1cm4gWzMgLypicmVhayovLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuaWZ0eWdhdGV3YXlcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXN5bmNhcnRcIjogcmV0dXJuIFszIC8qYnJlYWsqLywgMTVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxN107XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIub3BlbnNlYSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuc3VwZXJyYXJlKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci56b3JhKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5mb3VuZGF0aW9uKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFs0IC8qeWllbGQqLywgd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci50d2l0dGVyKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnJhcmlibGUoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Iuc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTM6IHJldHVybiBbNCAvKnlpZWxkKi8sIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIubmlmdHlnYXRld2F5KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxNDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE1OiByZXR1cm4gWzQgLyp5aWVsZCovLCB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLmFzeW5jYXJ0KCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxNjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9iLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE3OiByZXR1cm4gWzMgLypicmVhayovLCAxOF07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE4OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgb3BlbnNlYTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbywgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzLzB4JykpIHtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCcvJylbNV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcygnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy9tYXRpYy8weCcpIHx8XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzL2tsYXl0bi8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90U3VwcG9ydENoYWluJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdnZU5GVEZyb21EZXRhaWxQYWdlJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sXHJcbiAgICBzdXBlcnJhcmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBpdGVtTGlua1NlbGVjdG9yLCBpdGVtTGlua3MsIGRvbVVybCwgcmVkaXJlY3RVcmwsIHVybCwgZGF0YSwgJGh0bWwsIGRsLCBsaSwgZG9tX2E7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1MaW5rU2VsZWN0b3IgPSAnLmNvbGxlY3RpYmxlLWhpc3Rvcnktc2VjdGlvbiA+IC5jb2xsZWN0aWJsZS1oaXN0b3J5LWl0ZW0gPiAuY29sbGVjdGlibGUtaGlzdG9yeS1pdGVtLWxpbmsnO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbUxpbmtTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtTGlua3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnZ2VORlRGcm9tRGV0YWlsUGFnZScsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRvbVVybCA9IChfYSA9IGl0ZW1MaW5rc1tpdGVtTGlua3MubGVuZ3RoIC0gMV0uaHJlZikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RVcmwgPSBcIjxhIGhyZWY9J1wiICsgZG9tVXJsICsgXCInIHRhcmdldD0nX2JsYW5rJz5bdmlldyB0eF08L2E+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gZG9tVXJsICsgXCIjZXZlbnRsb2dcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGwgPSAoMCwgY2FzaF9kb21fMS5kZWZhdWx0KSgkaHRtbCkuZmluZCgnI215VGFiQ29udGVudCAjZXZlbnRsb2cgLmNhcmQtYm9keSAubWVkaWEgLm1lZGlhLWJvZHkgZGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkbCB8fCBkbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICd2YWxpZFZpZXdUWCcsIG1zZ0NvbnRlbnQ6IHJlZGlyZWN0VXJsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGxbZGwubGVuZ3RoIC0gMl0pLmZpbmQoJ2RkIHVsIGxpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbV9hID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkobGlbbGkubGVuZ3RoIC0gMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnYScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaSA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGRsW2RsLmxlbmd0aCAtICgoZG9tX2EgJiYgZG9tX2EubGVuZ3RoKSA+IDAgPyAxIDogMildKS5maW5kKCdkZCB1bCBsaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIGNhc2hfZG9tXzEuZGVmYXVsdCkoZGxbMF0pLmZpbmQoJ2RkJykuY2hpbGRyZW4oJ2EnKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9ICgwLCBjYXNoX2RvbV8xLmRlZmF1bHQpKGxpW2xpLmxlbmd0aCAtIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ3ZhbGlkVmlld1RYJywgbXNnQ29udGVudDogcmVkaXJlY3RVcmwgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHpvcmE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3NzLXJ4azlwbCBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoX2IgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IHVybC5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGZvdW5kYXRpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCBsaW5rLCB1cmw7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgICAgIHRva2VuSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jc3MtMWhoZWRkNyBhJyk7XHJcbiAgICAgICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gKF9hID0gbGluay5ocmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gdXJsLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgdHdpdHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbywgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIHJhcmlibGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8sIHJlc3BvbnNlLCB0bXBTcGxpdEFycjtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vcmFyaWJsZS5jb20vdG9rZW4vMHgnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0uc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnZ2VORlRGcm9tRGV0YWlsUGFnZScsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9LFxyXG4gICAgbmlmdHlnYXRld2F5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnIsIHRva2VuU3RyO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vbmlmdHlnYXRld2F5LmNvbS9pdGVtZGV0YWlsL3NlY29uZGFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0bXBTcGxpdEFyciA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSB7IG1zZ1R5cGU6ICdub3RGb3VuZE5GVCcsIG1zZ0NvbnRlbnQ6ICcnIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL25pZnR5Z2F0ZXdheS5jb20vbWFya2V0cGxhY2U/Y29sbGVjdGlvbj0weCcpICYmXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwidG9rZW5JZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5TdHIgPSAoX2EgPSBsb2NhdGlvbi5ocmVmLm1hdGNoKC8mdG9rZW5JZD1cXGQrLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgICAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0b2tlblN0ciAhPT0gdW5kZWZpbmVkID8gdG9rZW5TdHIuc3BsaXQoJz0nKVsxXSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChfZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90Rm91bmRORlQnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnaHR0cHM6Ly9uaWZ0eWdhdGV3YXkuY29tL2l0ZW1kZXRhaWwvcHJpbWFyeS8weCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0geyBtc2dUeXBlOiAnbm90U3VwcG9ydEF0Q3VycmVudFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIGFzeW5jYXJ0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvLCByZXNwb25zZSwgdG1wU3BsaXRBcnI7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCB1dGlsc18xLmV4dHJhY3RIZXgpKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ25vdEZvdW5kTkZUJywgbXNnQ29udGVudDogJycgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChfYikge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHsgbXNnVHlwZTogJ2dlTkZURnJvbURldGFpbFBhZ2UnLCBtc2dDb250ZW50OiAnJyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxufTtcclxudmFyIGxpc3RlbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5kYXRhLm1zZ1R5cGUgJiYgZS5kYXRhLm1zZ1R5cGUgPT09IFwiZmV0Y2hOZnRSZXF1ZXN0XCIpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXRGb3JtVHlwZSA9IGUuZGF0YS5wbGF0Zm9ybTtcclxuICAgICAgICAgICAgdmFyIHJlcyA9IHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuZ2V0TmZ0KHBsYXRGb3JtVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0geyBtc2dUeXBlOiBcImZldGNoTmZ0UmVzcG9uc2VcIiwgcGxhdGZvcm06IHBsYXRGb3JtVHlwZSwgZGF0YTogcmVzIH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCBcIipcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG59KSgpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmV4dHJhY3RIZXggPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGV4dHJhY3RIZXgoc3RyKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICByZXR1cm4gKF9hID0gc3RyLm1hdGNoKC8weFtcXGRBLVphLXpdKy8pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbn1cclxuZXhwb3J0cy5leHRyYWN0SGV4ID0gZXh0cmFjdEhleDtcclxuIiwiLyogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWJpb3NwYW1waW5hdG8vY2FzaCAqL1xuKGZ1bmN0aW9uKCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BNYXAgPSB7XG4gIC8qIEdFTkVSQUwgKi9cbiAgXCJjbGFzc1wiOiAnY2xhc3NOYW1lJyxcbiAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcblxuICAvKiBMQUJFTCAqL1xuICBcImZvclwiOiAnaHRtbEZvcicsXG5cbiAgLyogSU5QVVQgKi9cbiAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gIG1heGxlbmd0aDogJ21heExlbmd0aCcsXG4gIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuXG4gIC8qIFRBQkxFICovXG4gIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuXG4gIC8qIElNQUdFICovXG4gIHVzZW1hcDogJ3VzZU1hcCdcbn07XG5cbmZ1bmN0aW9uIGF0dGVtcHQoZm4sIGFyZykge1xuICB0cnkge1xuICAgIHJldHVybiBmbihhcmcpO1xuICB9IGNhdGNoIChfYSkge1xuICAgIHJldHVybiBhcmc7XG4gIH1cbn1cblxudmFyIGRvYyA9IGRvY3VtZW50LFxuICAgIHdpbiA9IHdpbmRvdyxcbiAgICBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudC5iaW5kKGRvYyksXG4gICAgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgdGFibGUgPSBjcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRib2R5ID0gY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICB0ciA9IGNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGUsXG4gICAgY29uY2F0ID0gQXJyYXlQcm90b3R5cGUuY29uY2F0LFxuICAgIGZpbHRlciA9IEFycmF5UHJvdG90eXBlLmZpbHRlcixcbiAgICBpbmRleE9mID0gQXJyYXlQcm90b3R5cGUuaW5kZXhPZixcbiAgICBtYXAgPSBBcnJheVByb3RvdHlwZS5tYXAsXG4gICAgcHVzaCA9IEFycmF5UHJvdG90eXBlLnB1c2gsXG4gICAgc2xpY2UgPSBBcnJheVByb3RvdHlwZS5zbGljZSxcbiAgICBzb21lID0gQXJyYXlQcm90b3R5cGUuc29tZSxcbiAgICBzcGxpY2UgPSBBcnJheVByb3RvdHlwZS5zcGxpY2U7XG52YXIgaWRSZSA9IC9eIyg/OltcXHctXXxcXFxcLnxbXlxceDAwLVxceGEwXSkqJC8sXG4gICAgY2xhc3NSZSA9IC9eXFwuKD86W1xcdy1dfFxcXFwufFteXFx4MDAtXFx4YTBdKSokLyxcbiAgICBodG1sUmUgPSAvPC4rPi8sXG4gICAgdGFnUmUgPSAvXlxcdyskLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gIXNlbGVjdG9yIHx8ICFpc0RvY3VtZW50KGNvbnRleHQpICYmICFpc0VsZW1lbnQoY29udGV4dCkgPyBbXSA6IGNsYXNzUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc2xpY2UoMSkpIDogdGFnUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSA6IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59IC8vIEByZXF1aXJlIC4vZmluZC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG52YXIgQ2FzaCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENhc2goc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG4gICAgaWYgKGlzQ2FzaChzZWxlY3RvcikpIHJldHVybiBzZWxlY3RvcjtcbiAgICB2YXIgZWxlcyA9IHNlbGVjdG9yO1xuXG4gICAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgICAgdmFyIGN0eCA9IChpc0Nhc2goY29udGV4dCkgPyBjb250ZXh0WzBdIDogY29udGV4dCkgfHwgZG9jO1xuICAgICAgZWxlcyA9IGlkUmUudGVzdChzZWxlY3RvcikgPyBjdHguZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpIDogaHRtbFJlLnRlc3Qoc2VsZWN0b3IpID8gcGFyc2VIVE1MKHNlbGVjdG9yKSA6IGZpbmQoc2VsZWN0b3IsIGN0eCk7XG4gICAgICBpZiAoIWVsZXMpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFkeShzZWxlY3Rvcik7IC8vRklYTUU6IGBmbi5yZWFkeWAgaXMgbm90IGluY2x1ZGVkIGluIGBjb3JlYCwgYnV0IGl0J3MgYWN0dWFsbHkgYSBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgICB9XG5cbiAgICBpZiAoZWxlcy5ub2RlVHlwZSB8fCBlbGVzID09PSB3aW4pIGVsZXMgPSBbZWxlc107XG4gICAgdGhpcy5sZW5ndGggPSBlbGVzLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSBlbGVzW2ldO1xuICAgIH1cbiAgfVxuXG4gIENhc2gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IENhc2goc2VsZWN0b3IsIGNvbnRleHQpO1xuICB9O1xuXG4gIHJldHVybiBDYXNoO1xufSgpO1xuXG52YXIgZm4gPSBDYXNoLnByb3RvdHlwZSxcbiAgICBjYXNoID0gZm4uaW5pdDtcbmNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IGZuOyAvLyBFbnN1cmluZyB0aGF0IGBjYXNoICgpIGluc3RhbmNlb2YgY2FzaGBcblxuZm4ubGVuZ3RoID0gMDtcbmZuLnNwbGljZSA9IHNwbGljZTsgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gZ2V0cyBwcmludGVkIGFzIGFycmF5LWxpa2UgaW4gQ2hyb21lJ3MgZGV2dG9vbHNcblxuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gaXMgaXRlcmFibGVcbiAgZm5bU3ltYm9sWydpdGVyYXRvciddXSA9IEFycmF5UHJvdG90eXBlW1N5bWJvbFsnaXRlcmF0b3InXV07XG59XG5cbmZuLm1hcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FzaChjb25jYXQuYXBwbHkoW10sIG1hcC5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKSk7XG59O1xuXG5mbi5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHJldHVybiBjYXNoKHNsaWNlLmNhbGwodGhpcywgc3RhcnQsIGVuZCkpO1xufTsgLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG5cblxudmFyIGRhc2hBbHBoYVJlID0gLy0oW2Etel0pL2c7XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGRhc2hBbHBoYVJlLCBmdW5jdGlvbiAobWF0Y2gsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbmNhc2guZ3VpZCA9IDE7IC8vIEByZXF1aXJlIC4vY2FzaC50c1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsZSwgc2VsZWN0b3IpIHtcbiAgdmFyIG1hdGNoZXMgPSBlbGUgJiYgKGVsZVsnbWF0Y2hlcyddIHx8IGVsZVsnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJ10gfHwgZWxlWydtc01hdGNoZXNTZWxlY3RvciddKTtcbiAgcmV0dXJuICEhbWF0Y2hlcyAmJiAhIXNlbGVjdG9yICYmIG1hdGNoZXMuY2FsbChlbGUsIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gaXNDYXNoKHgpIHtcbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBDYXNoO1xufVxuXG5mdW5jdGlvbiBpc1dpbmRvdyh4KSB7XG4gIHJldHVybiAhIXggJiYgeCA9PT0geC53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRG9jdW1lbnQoeCkge1xuICByZXR1cm4gISF4ICYmIHgubm9kZVR5cGUgPT09IDk7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoeCkge1xuICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc051bGwoeCkge1xuICByZXR1cm4geCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKHgpIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHgpKSAmJiBpc0Zpbml0ZSh4KTtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh4KSB7XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgeCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCk7XG4gIHJldHVybiBwcm90byA9PT0gbnVsbCB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuY2FzaC5pc1dpbmRvdyA9IGlzV2luZG93O1xuY2FzaC5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbmNhc2guaXNBcnJheSA9IGlzQXJyYXk7XG5jYXNoLmlzTnVtZXJpYyA9IGlzTnVtZXJpYztcbmNhc2guaXNQbGFpbk9iamVjdCA9IGlzUGxhaW5PYmplY3Q7XG5cbmZuLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAoaXNVbmRlZmluZWQoaW5kZXgpKSByZXR1cm4gc2xpY2UuY2FsbCh0aGlzKTtcbiAgaW5kZXggPSBOdW1iZXIoaW5kZXgpO1xuICByZXR1cm4gdGhpc1tpbmRleCA8IDAgPyBpbmRleCArIHRoaXMubGVuZ3RoIDogaW5kZXhdO1xufTtcblxuZm4uZXEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgcmV0dXJuIGNhc2godGhpcy5nZXQoaW5kZXgpKTtcbn07XG5cbmZuLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lcSgwKTtcbn07XG5cbmZuLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVxKC0xKTtcbn07XG5cbmZ1bmN0aW9uIGVhY2goYXJyLCBjYWxsYmFjaywgX3JldmVyc2UpIHtcbiAgaWYgKF9yZXZlcnNlKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2ldLCBpLCBhcnJbaV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcnIpKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJba2V5XSwga2V5LCBhcnJba2V5XSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgaSwgYXJyW2ldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuY2FzaC5lYWNoID0gZWFjaDtcblxuZm4uZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gZWFjaCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5mbi5wcm9wID0gZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gIGlmICghcHJvcCkgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHByb3AgPSBwcm9wTWFwW3Byb3BdIHx8IHByb3A7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdW3Byb3BdO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgZWxlW3Byb3BdID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMucHJvcChrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnJlbW92ZVByb3AgPSBmdW5jdGlvbiAocHJvcCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBkZWxldGUgZWxlW3Byb3BNYXBbcHJvcF0gfHwgcHJvcF07XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICB2YXIgc291cmNlcyA9IFtdO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICB9XG5cbiAgdmFyIGRlZXAgPSBpc0Jvb2xlYW4oc291cmNlc1swXSkgPyBzb3VyY2VzLnNoaWZ0KCkgOiBmYWxzZSxcbiAgICAgIHRhcmdldCA9IHNvdXJjZXMuc2hpZnQoKSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuIHt9O1xuICBpZiAoIWxlbmd0aCkgcmV0dXJuIGV4dGVuZChkZWVwLCBjYXNoLCB0YXJnZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gc291cmNlc1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChkZWVwICYmIChpc0FycmF5KHNvdXJjZVtrZXldKSB8fCBpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSkpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XS5jb25zdHJ1Y3RvciAhPT0gc291cmNlW2tleV0uY29uc3RydWN0b3IpIHRhcmdldFtrZXldID0gbmV3IHNvdXJjZVtrZXldLmNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGV4dGVuZChkZWVwLCB0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jYXNoLmV4dGVuZCA9IGV4dGVuZDtcblxuZm4uZXh0ZW5kID0gZnVuY3Rpb24gKHBsdWdpbnMpIHtcbiAgcmV0dXJuIGV4dGVuZChmbiwgcGx1Z2lucyk7XG59OyAvLyBAcmVxdWlyZSAuL21hdGNoZXMudHNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuXG5cbmZ1bmN0aW9uIGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gIHJldHVybiBpc1N0cmluZyhjb21wYXJhdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gbWF0Y2hlcyhlbGUsIGNvbXBhcmF0b3IpO1xuICB9IDogaXNGdW5jdGlvbihjb21wYXJhdG9yKSA/IGNvbXBhcmF0b3IgOiBpc0Nhc2goY29tcGFyYXRvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IuaXMoZWxlKTtcbiAgfSA6ICFjb21wYXJhdG9yID8gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSA6IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlID09PSBjb21wYXJhdG9yO1xuICB9O1xufVxuXG5mbi5maWx0ZXIgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIGNhc2goZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KSk7XG59OyAvLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci50c1xuXG5cbmZ1bmN0aW9uIGZpbHRlcmVkKGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuICFjb21wYXJhdG9yID8gY29sbGVjdGlvbiA6IGNvbGxlY3Rpb24uZmlsdGVyKGNvbXBhcmF0b3IpO1xufSAvLyBAcmVxdWlyZSAuL3R5cGVfY2hlY2tpbmcudHNcblxuXG52YXIgc3BsaXRWYWx1ZXNSZSA9IC9cXFMrL2c7XG5cbmZ1bmN0aW9uIGdldFNwbGl0VmFsdWVzKHN0cikge1xuICByZXR1cm4gaXNTdHJpbmcoc3RyKSA/IHN0ci5tYXRjaChzcGxpdFZhbHVlc1JlKSB8fCBbXSA6IFtdO1xufVxuXG5mbi5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgcmV0dXJuICEhY2xzICYmIHNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChlbGUpICYmIGVsZS5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgfSk7XG59O1xuXG5mbi5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgdmFyIGF0dHJzID0gZ2V0U3BsaXRWYWx1ZXMoYXR0cik7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoaSwgYSkge1xuICAgICAgZWxlLnJlbW92ZUF0dHJpYnV0ZShhKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBhdHRyKGF0dHIsIHZhbHVlKSB7XG4gIGlmICghYXR0cikgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhhdHRyKSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKCF0aGlzWzBdIHx8ICFpc0VsZW1lbnQodGhpc1swXSkpIHJldHVybjtcbiAgICAgIHZhciB2YWx1ZV8xID0gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgICByZXR1cm4gaXNOdWxsKHZhbHVlXzEpID8gdW5kZWZpbmVkIDogdmFsdWVfMTtcbiAgICB9XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm4gdGhpcztcbiAgICBpZiAoaXNOdWxsKHZhbHVlKSkgcmV0dXJuIHRoaXMucmVtb3ZlQXR0cihhdHRyKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGF0dHIpIHtcbiAgICB0aGlzLmF0dHIoa2V5LCBhdHRyW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLmF0dHIgPSBhdHRyO1xuXG5mbi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbHMsIGZvcmNlKSB7XG4gIHZhciBjbGFzc2VzID0gZ2V0U3BsaXRWYWx1ZXMoY2xzKSxcbiAgICAgIGlzRm9yY2UgPSAhaXNVbmRlZmluZWQoZm9yY2UpO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoaSwgYykge1xuICAgICAgaWYgKGlzRm9yY2UpIHtcbiAgICAgICAgZm9yY2UgPyBlbGUuY2xhc3NMaXN0LmFkZChjKSA6IGVsZS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZm4uYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgdHJ1ZSk7XG59O1xuXG5mbi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgZmFsc2UpO1xuICByZXR1cm4gdGhpcy5hdHRyKCdjbGFzcycsICcnKTtcbn07XG5cbmZ1bmN0aW9uIHBsdWNrKGFyciwgcHJvcCwgZGVlcCwgdW50aWwpIHtcbiAgdmFyIHBsdWNrZWQgPSBbXSxcbiAgICAgIGlzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKHByb3ApLFxuICAgICAgY29tcGFyZSA9IHVudGlsICYmIGdldENvbXBhcmVGdW5jdGlvbih1bnRpbCk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzQ2FsbGJhY2spIHtcbiAgICAgIHZhciB2YWxfMSA9IHByb3AoYXJyW2ldKTtcbiAgICAgIGlmICh2YWxfMS5sZW5ndGgpIHB1c2guYXBwbHkocGx1Y2tlZCwgdmFsXzEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmFsXzIgPSBhcnJbaV1bcHJvcF07XG5cbiAgICAgIHdoaWxlICh2YWxfMiAhPSBudWxsKSB7XG4gICAgICAgIGlmICh1bnRpbCAmJiBjb21wYXJlKC0xLCB2YWxfMikpIGJyZWFrO1xuICAgICAgICBwbHVja2VkLnB1c2godmFsXzIpO1xuICAgICAgICB2YWxfMiA9IGRlZXAgPyB2YWxfMltwcm9wXSA6IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWNrZWQ7XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgcmV0dXJuIGFyci5sZW5ndGggPiAxID8gZmlsdGVyLmNhbGwoYXJyLCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICByZXR1cm4gaW5kZXhPZi5jYWxsKHNlbGYsIGl0ZW0pID09PSBpbmRleDtcbiAgfSkgOiBhcnI7XG59XG5cbmNhc2gudW5pcXVlID0gdW5pcXVlO1xuXG5mbi5hZGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHRoaXMuZ2V0KCkuY29uY2F0KGNhc2goc2VsZWN0b3IsIGNvbnRleHQpLmdldCgpKSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShlbGUsIHByb3AsIGlzVmFyaWFibGUpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGUsIG51bGwpO1xuICByZXR1cm4gaXNWYXJpYWJsZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgfHwgdW5kZWZpbmVkIDogc3R5bGVbcHJvcF0gfHwgZWxlLnN0eWxlW3Byb3BdO1xufSAvLyBAcmVxdWlyZSAuL2NvbXB1dGVfc3R5bGUudHNcblxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVJbnQoZWxlLCBwcm9wKSB7XG4gIHJldHVybiBwYXJzZUludChjb21wdXRlU3R5bGUoZWxlLCBwcm9wKSwgMTApIHx8IDA7XG59XG5cbnZhciBjc3NWYXJpYWJsZVJlID0gL14tLS87IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cbmZ1bmN0aW9uIGlzQ1NTVmFyaWFibGUocHJvcCkge1xuICByZXR1cm4gY3NzVmFyaWFibGVSZS50ZXN0KHByb3ApO1xufSAvLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC50c1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxuXG52YXIgcHJlZml4ZWRQcm9wcyA9IHt9LFxuICAgIHN0eWxlID0gZGl2LnN0eWxlLFxuICAgIHZlbmRvcnNQcmVmaXhlcyA9IFsnd2Via2l0JywgJ21veicsICdtcyddO1xuXG5mdW5jdGlvbiBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICBpZiAoaXNWYXJpYWJsZSkgcmV0dXJuIHByb3A7XG5cbiAgaWYgKCFwcmVmaXhlZFByb3BzW3Byb3BdKSB7XG4gICAgdmFyIHByb3BDQyA9IGNhbWVsQ2FzZShwcm9wKSxcbiAgICAgICAgcHJvcFVDID0gXCJcIiArIHByb3BDQ1swXS50b1VwcGVyQ2FzZSgpICsgcHJvcENDLnNsaWNlKDEpLFxuICAgICAgICBwcm9wcyA9IChwcm9wQ0MgKyBcIiBcIiArIHZlbmRvcnNQcmVmaXhlcy5qb2luKHByb3BVQyArIFwiIFwiKSArIHByb3BVQykuc3BsaXQoJyAnKTtcbiAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoaSwgcCkge1xuICAgICAgaWYgKHAgaW4gc3R5bGUpIHtcbiAgICAgICAgcHJlZml4ZWRQcm9wc1twcm9wXSA9IHA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwcmVmaXhlZFByb3BzW3Byb3BdO1xufVxuXG47IC8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxudmFyIG51bWVyaWNQcm9wcyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgZ3JpZEFyZWE6IHRydWUsXG4gIGdyaWRDb2x1bW46IHRydWUsXG4gIGdyaWRDb2x1bW5FbmQ6IHRydWUsXG4gIGdyaWRDb2x1bW5TdGFydDogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZFJvd0VuZDogdHJ1ZSxcbiAgZ3JpZFJvd1N0YXJ0OiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGUpIHtcbiAgaWYgKGlzVmFyaWFibGUgPT09IHZvaWQgMCkge1xuICAgIGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICB9XG5cbiAgcmV0dXJuICFpc1ZhcmlhYmxlICYmICFudW1lcmljUHJvcHNbcHJvcF0gJiYgaXNOdW1lcmljKHZhbHVlKSA/IHZhbHVlICsgXCJweFwiIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNzcyhwcm9wLCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICB2YXIgaXNWYXJpYWJsZV8xID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGVfMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBjb21wdXRlU3R5bGUodGhpc1swXSwgcHJvcCwgaXNWYXJpYWJsZV8xKTtcbiAgICBpZiAoIXByb3ApIHJldHVybiB0aGlzO1xuICAgIHZhbHVlID0gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wLCB2YWx1ZSwgaXNWYXJpYWJsZV8xKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcblxuICAgICAgaWYgKGlzVmFyaWFibGVfMSkge1xuICAgICAgICBlbGUuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMuY3NzKGtleSwgcHJvcFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG47XG5mbi5jc3MgPSBjc3M7IC8vIEBvcHRpb25hbCAuL2Nzcy50c1xuLy8gQHJlcXVpcmUgY29yZS9hdHRlbXB0LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcblxudmFyIEpTT05TdHJpbmdSZSA9IC9eXFxzK3xcXHMrJC87XG5cbmZ1bmN0aW9uIGdldERhdGEoZWxlLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZWxlLmRhdGFzZXRba2V5XSB8fCBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV07XG4gIGlmIChKU09OU3RyaW5nUmUudGVzdCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGF0dGVtcHQoSlNPTi5wYXJzZSwgdmFsdWUpO1xufSAvLyBAcmVxdWlyZSBjb3JlL2F0dGVtcHQudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuXG5cbmZ1bmN0aW9uIHNldERhdGEoZWxlLCBrZXksIHZhbHVlKSB7XG4gIHZhbHVlID0gYXR0ZW1wdChKU09OLnN0cmluZ2lmeSwgdmFsdWUpO1xuICBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGF0YShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcbiAgICB2YXIgZGF0YXMgPSB7fTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzWzBdLmRhdGFzZXQpIHtcbiAgICAgIGRhdGFzW2tleV0gPSBnZXREYXRhKHRoaXNbMF0sIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFzO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBnZXREYXRhKHRoaXNbMF0sIG5hbWUpO1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgc2V0RGF0YShlbGUsIG5hbWUsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgdGhpcy5kYXRhKGtleSwgbmFtZVtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5kYXRhID0gZGF0YTsgLy8gQG9wdGlvbmFsIC4vZGF0YS50c1xuXG5mdW5jdGlvbiBnZXREb2N1bWVudERpbWVuc2lvbihkb2MsIGRpbWVuc2lvbikge1xuICB2YXIgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgcmV0dXJuIE1hdGgubWF4KGRvYy5ib2R5W1wic2Nyb2xsXCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJzY3JvbGxcIiArIGRpbWVuc2lvbl0sIGRvYy5ib2R5W1wib2Zmc2V0XCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJvZmZzZXRcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcImNsaWVudFwiICsgZGltZW5zaW9uXSk7XG59IC8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGVfaW50LnRzXG5cblxuZnVuY3Rpb24gZ2V0RXh0cmFTcGFjZShlbGUsIHhBeGlzKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpICsgXCJXaWR0aFwiKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSkgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSArIFwiV2lkdGhcIik7XG59XG5cbmVhY2goW3RydWUsIGZhbHNlXSwgZnVuY3Rpb24gKGksIG91dGVyKSB7XG4gIGVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgZnVuY3Rpb24gKGksIHByb3ApIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIgKyAob3V0ZXIgPyAnb3V0ZXInIDogJ2lubmVyJykgKyBwcm9wO1xuXG4gICAgZm5bbmFtZV0gPSBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gb3V0ZXIgPyB0aGlzWzBdW1wiaW5uZXJcIiArIHByb3BdIDogdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wiXCIgKyAob3V0ZXIgPyAnb2Zmc2V0JyA6ICdjbGllbnQnKSArIHByb3BdICsgKGluY2x1ZGVNYXJnaW5zICYmIG91dGVyID8gY29tcHV0ZVN0eWxlSW50KHRoaXNbMF0sIFwibWFyZ2luXCIgKyAoaSA/ICdUb3AnIDogJ0xlZnQnKSkgKyBjb21wdXRlU3R5bGVJbnQodGhpc1swXSwgXCJtYXJnaW5cIiArIChpID8gJ0JvdHRvbScgOiAnUmlnaHQnKSkgOiAwKTtcbiAgICB9O1xuICB9KTtcbn0pO1xuZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCBmdW5jdGlvbiAoaW5kZXgsIHByb3ApIHtcbiAgdmFyIHByb3BMQyA9IHByb3AudG9Mb3dlckNhc2UoKTtcblxuICBmbltwcm9wTENdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzWzBdKSByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpID8gdW5kZWZpbmVkIDogdGhpcztcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3Byb3BMQ10gLSBnZXRFeHRyYVNwYWNlKHRoaXNbMF0sICFpbmRleCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIHZhciBib3hTaXppbmcgPSBjb21wdXRlU3R5bGUoZWxlLCAnYm94U2l6aW5nJyk7XG4gICAgICBlbGUuc3R5bGVbcHJvcExDXSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcExDLCB2YWx1ZU51bWJlciArIChib3hTaXppbmcgPT09ICdib3JkZXItYm94JyA/IGdldEV4dHJhU3BhY2UoZWxlLCAhaW5kZXgpIDogMCkpO1xuICAgIH0pO1xuICB9O1xufSk7IC8vIEBvcHRpb25hbCAuL2lubmVyX291dGVyLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3JtYWwudHNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGUudHNcblxudmFyIGRlZmF1bHREaXNwbGF5ID0ge307XG5cbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KHRhZ05hbWUpIHtcbiAgaWYgKGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdKSByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV07XG4gIHZhciBlbGUgPSBjcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBkb2MuYm9keS5pbnNlcnRCZWZvcmUoZWxlLCBudWxsKTtcbiAgdmFyIGRpc3BsYXkgPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICBkb2MuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0gPSBkaXNwbGF5ICE9PSAnbm9uZScgPyBkaXNwbGF5IDogJ2Jsb2NrJztcbn0gLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuXG5cbmZ1bmN0aW9uIGlzSGlkZGVuKGVsZSkge1xuICByZXR1cm4gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnO1xufVxuXG52YXIgZGlzcGxheVByb3BlcnR5ID0gJ19fX2NkJztcblxuZm4udG9nZ2xlID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICB2YXIgc2hvdyA9IGlzVW5kZWZpbmVkKGZvcmNlKSA/IGlzSGlkZGVuKGVsZSkgOiBmb3JjZTtcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGVsZVtkaXNwbGF5UHJvcGVydHldIHx8ICcnO1xuXG4gICAgICBpZiAoaXNIaWRkZW4oZWxlKSkge1xuICAgICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGdldERlZmF1bHREaXNwbGF5KGVsZS50YWdOYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlW2Rpc3BsYXlQcm9wZXJ0eV0gPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICAgICAgZWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmZuLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG59O1xuXG5mbi5zaG93ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG59OyAvLyBAb3B0aW9uYWwgLi9oaWRlLnRzXG4vLyBAb3B0aW9uYWwgLi9zaG93LnRzXG4vLyBAb3B0aW9uYWwgLi90b2dnbGUudHNcblxuXG5mdW5jdGlvbiBoYXNOYW1lc3BhY2VzKG5zMSwgbnMyKSB7XG4gIHJldHVybiAhbnMyIHx8ICFzb21lLmNhbGwobnMyLCBmdW5jdGlvbiAobnMpIHtcbiAgICByZXR1cm4gbnMxLmluZGV4T2YobnMpIDwgMDtcbiAgfSk7XG59XG5cbnZhciBldmVudHNOYW1lc3BhY2UgPSAnX19fY2UnLFxuICAgIGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IgPSAnLicsXG4gICAgZXZlbnRzRm9jdXMgPSB7XG4gIGZvY3VzOiAnZm9jdXNpbicsXG4gIGJsdXI6ICdmb2N1c291dCdcbn0sXG4gICAgZXZlbnRzSG92ZXIgPSB7XG4gIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG59LFxuICAgIGV2ZW50c01vdXNlUmUgPSAvXihtb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcHxjbGlja3xkYmxjbGljaykvaTsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZSkge1xuICByZXR1cm4gZXZlbnRzSG92ZXJbbmFtZV0gfHwgZXZlbnRzRm9jdXNbbmFtZV0gfHwgbmFtZTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRFdmVudHNDYWNoZShlbGUpIHtcbiAgcmV0dXJuIGVsZVtldmVudHNOYW1lc3BhY2VdID0gZWxlW2V2ZW50c05hbWVzcGFjZV0gfHwge307XG59IC8vIEByZXF1aXJlIGNvcmUvZ3VpZC50c1xuLy8gQHJlcXVpcmUgZXZlbnRzL2hlbHBlcnMvZ2V0X2V2ZW50c19jYWNoZS50c1xuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBldmVudENhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcbiAgZXZlbnRDYWNoZVtuYW1lXSA9IGV2ZW50Q2FjaGVbbmFtZV0gfHwgW107XG4gIGV2ZW50Q2FjaGVbbmFtZV0ucHVzaChbbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrXSk7XG4gIGVsZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBwYXJzZUV2ZW50TmFtZShldmVudE5hbWUpIHtcbiAgdmFyIHBhcnRzID0gZXZlbnROYW1lLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpO1xuICByZXR1cm4gW3BhcnRzWzBdLCBwYXJ0cy5zbGljZSgxKS5zb3J0KCldOyAvLyBbbmFtZSwgbmFtZXNwYWNlW11dXG59IC8vIEByZXF1aXJlIC4vZ2V0X2V2ZW50c19jYWNoZS50c1xuLy8gQHJlcXVpcmUgLi9oYXNfbmFtZXNwYWNlcy50c1xuLy8gQHJlcXVpcmUgLi9wYXJzZV9ldmVudF9uYW1lLnRzXG5cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGNhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICBmb3IgKG5hbWUgaW4gY2FjaGUpIHtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY2FjaGVbbmFtZV0pIHtcbiAgICBjYWNoZVtuYW1lXSA9IGNhY2hlW25hbWVdLmZpbHRlcihmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBucyA9IF9hWzBdLFxuICAgICAgICAgIHNlbCA9IF9hWzFdLFxuICAgICAgICAgIGNiID0gX2FbMl07XG4gICAgICBpZiAoY2FsbGJhY2sgJiYgY2IuZ3VpZCAhPT0gY2FsbGJhY2suZ3VpZCB8fCAhaGFzTmFtZXNwYWNlcyhucywgbmFtZXNwYWNlcykgfHwgc2VsZWN0b3IgJiYgc2VsZWN0b3IgIT09IHNlbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBjYik7XG4gICAgfSk7XG4gIH1cbn1cblxuZm4ub2ZmID0gZnVuY3Rpb24gKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmIChpc1VuZGVmaW5lZChldmVudEZ1bGxOYW1lKSkge1xuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub2ZmKGtleSwgZXZlbnRGdWxsTmFtZVtrZXldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG5cbiAgICBlYWNoKGdldFNwbGl0VmFsdWVzKGV2ZW50RnVsbE5hbWUpLCBmdW5jdGlvbiAoaSwgZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpO1xuXG4gICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSAmJiAhaXNEb2N1bWVudChlbGUpICYmICFpc1dpbmRvdyhlbGUpKSByZXR1cm47XG4gICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBvbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIF9vbmUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub24oa2V5LCBzZWxlY3RvciwgZGF0YSwgZXZlbnRGdWxsTmFtZVtrZXldLCBfb25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHNlbGVjdG9yKSB8fCBpc051bGwoc2VsZWN0b3IpKSB7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQoZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChpLCBldmVudEZ1bGxOYW1lKSB7XG4gICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgIG5hbWVPcmlnaW5hbCA9IF9hWzBdLFxuICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpLFxuICAgICAgICBpc0V2ZW50SG92ZXIgPSBuYW1lT3JpZ2luYWwgaW4gZXZlbnRzSG92ZXIsXG4gICAgICAgIGlzRXZlbnRGb2N1cyA9IG5hbWVPcmlnaW5hbCBpbiBldmVudHNGb2N1cztcblxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xuXG4gICAgX3RoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcblxuICAgICAgdmFyIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiBmaW5hbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXRbXCJfX19pXCIgKyBldmVudC50eXBlXSkgcmV0dXJuIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpOyAvLyBJZ25vcmluZyBuYXRpdmUgZXZlbnQgaW4gZmF2b3Igb2YgdGhlIHVwY29taW5nIGN1c3RvbSBvbmVcblxuICAgICAgICBpZiAoZXZlbnQubmFtZXNwYWNlICYmICFoYXNOYW1lc3BhY2VzKG5hbWVzcGFjZXMsIGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKSkpIHJldHVybjtcbiAgICAgICAgaWYgKCFzZWxlY3RvciAmJiAoaXNFdmVudEZvY3VzICYmIChldmVudC50YXJnZXQgIT09IGVsZSB8fCBldmVudC5fX19vdCA9PT0gbmFtZSkgfHwgaXNFdmVudEhvdmVyICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZWxlLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSkgcmV0dXJuO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGVsZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHRhcmdldCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzQXJnID0gdGFyZ2V0O1xuICAgICAgICAgIGV2ZW50Ll9fX2NkID0gdHJ1ZTsgLy8gRGVsZWdhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5fX19jZCkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2N1cnJlbnRUYXJnZXQnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdkYXRhJywge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZXZlbnQsIGV2ZW50Ll9fX3RkKTtcblxuICAgICAgICBpZiAoX29uZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldHVyblZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbmFsQ2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkIHx8IGNhc2guZ3VpZCsrO1xuICAgICAgYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn1cblxuZm4ub24gPSBvbjtcblxuZnVuY3Rpb24gb25lKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5vbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIHRydWUpO1xufVxuXG47XG5mbi5vbmUgPSBvbmU7XG5cbmZuLnJlYWR5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHZhciBjYiA9IGZ1bmN0aW9uIGNiKCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwLCBjYXNoKTtcbiAgfTtcblxuICBpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIGNiKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgaWYgKGlzU3RyaW5nKGV2ZW50KSkge1xuICAgIHZhciBfYSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50KSxcbiAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgbmFtZV8xID0gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZU9yaWdpbmFsKTtcblxuICAgIGlmICghbmFtZV8xKSByZXR1cm4gdGhpcztcbiAgICB2YXIgdHlwZSA9IGV2ZW50c01vdXNlUmUudGVzdChuYW1lXzEpID8gJ01vdXNlRXZlbnRzJyA6ICdIVE1MRXZlbnRzJztcbiAgICBldmVudCA9IGRvYy5jcmVhdGVFdmVudCh0eXBlKTtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZV8xLCB0cnVlLCB0cnVlKTtcbiAgICBldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gICAgZXZlbnQuX19fb3QgPSBuYW1lT3JpZ2luYWw7XG4gIH1cblxuICBldmVudC5fX190ZCA9IGRhdGE7XG4gIHZhciBpc0V2ZW50Rm9jdXMgPSBldmVudC5fX19vdCBpbiBldmVudHNGb2N1cztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGlzRXZlbnRGb2N1cyAmJiBpc0Z1bmN0aW9uKGVsZVtldmVudC5fX19vdF0pKSB7XG4gICAgICBlbGVbXCJfX19pXCIgKyBldmVudC50eXBlXSA9IHRydWU7IC8vIEVuc3VyaW5nIHRoZSBuYXRpdmUgZXZlbnQgaXMgaWdub3JlZFxuXG4gICAgICBlbGVbZXZlbnQuX19fb3RdKCk7XG5cbiAgICAgIGVsZVtcIl9fX2lcIiArIGV2ZW50LnR5cGVdID0gZmFsc2U7IC8vIEVuc3VyaW5nIHRoZSBjdXN0b20gZXZlbnQgaXMgbm90IGlnbm9yZWRcbiAgICB9XG5cbiAgICBlbGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vb2ZmLnRzXG4vLyBAb3B0aW9uYWwgLi9vbi50c1xuLy8gQG9wdGlvbmFsIC4vb25lLnRzXG4vLyBAb3B0aW9uYWwgLi9yZWFkeS50c1xuLy8gQG9wdGlvbmFsIC4vdHJpZ2dlci50c1xuLy8gQHJlcXVpcmUgY29yZS9wbHVjay50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRWYWx1ZShlbGUpIHtcbiAgaWYgKGVsZS5tdWx0aXBsZSAmJiBlbGUub3B0aW9ucykgcmV0dXJuIHBsdWNrKGZpbHRlci5jYWxsKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZDtcbiAgfSksICd2YWx1ZScpO1xuICByZXR1cm4gZWxlLnZhbHVlIHx8ICcnO1xufVxuXG52YXIgcXVlcnlFbmNvZGVTcGFjZVJlID0gLyUyMC9nLFxuICAgIHF1ZXJ5RW5jb2RlQ1JMRlJlID0gL1xccj9cXG4vZztcblxuZnVuY3Rpb24gcXVlcnlFbmNvZGUocHJvcCwgdmFsdWUpIHtcbiAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZShxdWVyeUVuY29kZUNSTEZSZSwgJ1xcclxcbicpKS5yZXBsYWNlKHF1ZXJ5RW5jb2RlU3BhY2VSZSwgJysnKTtcbn1cblxudmFyIHNraXBwYWJsZVJlID0gL2ZpbGV8cmVzZXR8c3VibWl0fGJ1dHRvbnxpbWFnZS9pLFxuICAgIGNoZWNrYWJsZVJlID0gL3JhZGlvfGNoZWNrYm94L2k7XG5cbmZuLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gJyc7XG4gIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChlbGUuZWxlbWVudHMgfHwgW2VsZV0sIGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmIChlbGUuZGlzYWJsZWQgfHwgIWVsZS5uYW1lIHx8IGVsZS50YWdOYW1lID09PSAnRklFTERTRVQnIHx8IHNraXBwYWJsZVJlLnRlc3QoZWxlLnR5cGUpIHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpICYmICFlbGUuY2hlY2tlZCkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoZWxlKTtcblxuICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICBlYWNoKHZhbHVlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgICAgcXVlcnkgKz0gcXVlcnlFbmNvZGUoZWxlLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcXVlcnkuc2xpY2UoMSk7XG59O1xuXG5mdW5jdGlvbiB2YWwodmFsdWUpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIGlzU2VsZWN0ID0gZWxlLm11bHRpcGxlICYmIGVsZS5vcHRpb25zO1xuXG4gICAgaWYgKGlzU2VsZWN0IHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpKSB7XG4gICAgICB2YXIgZWxlVmFsdWVfMSA9IGlzQXJyYXkodmFsdWUpID8gbWFwLmNhbGwodmFsdWUsIFN0cmluZykgOiBpc051bGwodmFsdWUpID8gW10gOiBbU3RyaW5nKHZhbHVlKV07XG5cbiAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICBlYWNoKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAoaSwgb3B0aW9uKSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZWxlVmFsdWVfMS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMDtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuY2hlY2tlZCA9IGVsZVZhbHVlXzEuaW5kZXhPZihlbGUudmFsdWUpID49IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZS52YWx1ZSA9IGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBpc051bGwodmFsdWUpID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG5mbi52YWwgPSB2YWw7XG5cbmZuLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY2xvbmVOb2RlKHRydWUpO1xuICB9KTtcbn07XG5cbmZuLmRldGFjaCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChlbGUucGFyZW50Tm9kZSkge1xuICAgICAgZWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBmcmFnbWVudFJlID0gL15cXHMqPChcXHcrKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUmUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XG52YXIgY29udGFpbmVycyA9IHtcbiAgJyonOiBkaXYsXG4gIHRyOiB0Ym9keSxcbiAgdGQ6IHRyLFxuICB0aDogdHIsXG4gIHRoZWFkOiB0YWJsZSxcbiAgdGJvZHk6IHRhYmxlLFxuICB0Zm9vdDogdGFibGVcbn07IC8vVE9ETzogQ3JlYXRlIGVsZW1lbnRzIGluc2lkZSBhIGRvY3VtZW50IGZyYWdtZW50LCBpbiBvcmRlciB0byBwcmV2ZW50IGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGZpcmluZ1xuLy9UT0RPOiBFbnN1cmUgdGhlIGNyZWF0ZWQgZWxlbWVudHMgaGF2ZSB0aGUgZnJhZ21lbnQgYXMgdGhlaXIgcGFyZW50IGluc3RlYWQgb2YgbnVsbCwgdGhpcyBhbHNvIGVuc3VyZXMgd2UgY2FuIGRlYWwgd2l0aCBkZXRhdGNoZWQgbm9kZXMgbW9yZSByZWxpYWJseVxuXG5mdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICBpZiAoIWlzU3RyaW5nKGh0bWwpKSByZXR1cm4gW107XG4gIGlmIChzaW5nbGVUYWdSZS50ZXN0KGh0bWwpKSByZXR1cm4gW2NyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKV07XG4gIHZhciBmcmFnbWVudCA9IGZyYWdtZW50UmUudGVzdChodG1sKSAmJiBSZWdFeHAuJDEsXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW2ZyYWdtZW50XSB8fCBjb250YWluZXJzWycqJ107XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gY2FzaChjb250YWluZXIuY2hpbGROb2RlcykuZGV0YWNoKCkuZ2V0KCk7XG59XG5cbmNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuXG5mbi5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgd2hpbGUgKGVsZS5maXJzdENoaWxkKSB7XG4gICAgICBlbGUucmVtb3ZlQ2hpbGQoZWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBodG1sKGh0bWwpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdLmlubmVySFRNTDtcbiAgaWYgKGlzVW5kZWZpbmVkKGh0bWwpKSByZXR1cm4gdGhpcztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVsZS5pbm5lckhUTUwgPSBodG1sO1xuICB9KTtcbn1cblxuZm4uaHRtbCA9IGh0bWw7XG5cbmZuLnJlbW92ZSA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmRldGFjaCgpLm9mZigpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHRleHQodGV4dCkge1xuICBpZiAoaXNVbmRlZmluZWQodGV4dCkpIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS50ZXh0Q29udGVudCA6ICcnO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfSk7XG59XG5cbjtcbmZuLnRleHQgPSB0ZXh0O1xuXG5mbi51bndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGFyZW50KCkuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGVsZS50YWdOYW1lID09PSAnQk9EWScpIHJldHVybjtcbiAgICB2YXIgJGVsZSA9IGNhc2goZWxlKTtcbiAgICAkZWxlLnJlcGxhY2VXaXRoKCRlbGUuY2hpbGRyZW4oKSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciByZWN0ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG4gIH07XG59O1xuXG5mbi5vZmZzZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGVsZS5vZmZzZXRQYXJlbnQ7XG5cbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGNvbXB1dGVTdHlsZShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY0VsZTtcbiAgfSk7XG59O1xuXG5mbi5wb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciBpc0ZpeGVkID0gY29tcHV0ZVN0eWxlKGVsZSwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcsXG4gICAgICBvZmZzZXQgPSBpc0ZpeGVkID8gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogdGhpcy5vZmZzZXQoKTtcblxuICBpZiAoIWlzRml4ZWQpIHtcbiAgICB2YXIgZG9jXzEgPSBlbGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlLm9mZnNldFBhcmVudCB8fCBkb2NfMS5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB3aGlsZSAoKG9mZnNldFBhcmVudCA9PT0gZG9jXzEuYm9keSB8fCBvZmZzZXRQYXJlbnQgPT09IGRvY18xLmRvY3VtZW50RWxlbWVudCkgJiYgY29tcHV0ZVN0eWxlKG9mZnNldFBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ICE9PSBlbGUgJiYgaXNFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSBjYXNoKG9mZnNldFBhcmVudCkub2Zmc2V0KCk7XG4gICAgICBvZmZzZXQudG9wIC09IHBhcmVudE9mZnNldC50b3AgKyBjb21wdXRlU3R5bGVJbnQob2Zmc2V0UGFyZW50LCAnYm9yZGVyVG9wV2lkdGgnKTtcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0ICsgY29tcHV0ZVN0eWxlSW50KG9mZnNldFBhcmVudCwgJ2JvcmRlckxlZnRXaWR0aCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvZmZzZXQudG9wIC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpblRvcCcpLFxuICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpbkxlZnQnKVxuICB9O1xufTtcblxuZm4uY2hpbGRyZW4gPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBlbGUuY2hpbGRyZW47XG4gIH0pKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uY29udGVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGVsZS50YWdOYW1lID09PSAnSUZSQU1FJyA/IFtlbGUuY29udGVudERvY3VtZW50XSA6IGVsZS50YWdOYW1lID09PSAnVEVNUExBVEUnID8gZWxlLmNvbnRlbnQuY2hpbGROb2RlcyA6IGVsZS5jaGlsZE5vZGVzO1xuICB9KSkpO1xufTtcblxuZm4uZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbGUpO1xuICB9KSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG4vLyBAcmVxdWlyZSB0cmF2ZXJzYWwvZmluZC50c1xuXG5cbnZhciBIVE1MQ0RBVEFSZSA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxcbiAgICBzY3JpcHRUeXBlUmUgPSAvXiR8Xm1vZHVsZSR8XFwvKGphdmF8ZWNtYSlzY3JpcHQvaSxcbiAgICBzY3JpcHRBdHRyaWJ1dGVzID0gWyd0eXBlJywgJ3NyYycsICdub25jZScsICdub01vZHVsZSddO1xuXG5mdW5jdGlvbiBldmFsU2NyaXB0cyhub2RlLCBkb2MpIHtcbiAgdmFyIGNvbGxlY3Rpb24gPSBjYXNoKG5vZGUpO1xuICBjb2xsZWN0aW9uLmZpbHRlcignc2NyaXB0JykuYWRkKGNvbGxlY3Rpb24uZmluZCgnc2NyaXB0JykpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChzY3JpcHRUeXBlUmUudGVzdChlbGUudHlwZSkgJiYgZG9jRWxlLmNvbnRhaW5zKGVsZSkpIHtcbiAgICAgIC8vIFRoZSBzY3JpcHQgdHlwZSBpcyBzdXBwb3J0ZWQgLy8gVGhlIGVsZW1lbnQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSAvLyBVc2luZyBgZG9jdW1lbnRFbGVtZW50YCBmb3IgYnJvYWRlciBicm93c2VyIHN1cHBvcnRcbiAgICAgIHZhciBzY3JpcHRfMSA9IGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0XzEudGV4dCA9IGVsZS50ZXh0Q29udGVudC5yZXBsYWNlKEhUTUxDREFUQVJlLCAnJyk7XG4gICAgICBlYWNoKHNjcmlwdEF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gICAgICAgIGlmIChlbGVbYXR0cl0pIHNjcmlwdF8xW2F0dHJdID0gZWxlW2F0dHJdO1xuICAgICAgfSk7XG4gICAgICBkb2MuaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0XzEsIG51bGwpO1xuICAgICAgZG9jLmhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0XzEpO1xuICAgIH1cbiAgfSk7XG59IC8vIEByZXF1aXJlIC4vZXZhbF9zY3JpcHRzLnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChhbmNob3IsIHRhcmdldCwgbGVmdCwgaW5zaWRlLCBldmFsdWF0ZSkge1xuICBpZiAoaW5zaWRlKSB7XG4gICAgLy8gcHJlcGVuZC9hcHBlbmRcbiAgICBhbmNob3IuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvci5maXJzdENoaWxkIDogbnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYmVmb3JlL2FmdGVyXG4gICAgYW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvciA6IGFuY2hvci5uZXh0U2libGluZyk7XG4gIH1cblxuICBpZiAoZXZhbHVhdGUpIHtcbiAgICBldmFsU2NyaXB0cyh0YXJnZXQsIGFuY2hvci5vd25lckRvY3VtZW50KTtcbiAgfVxufSAvLyBAcmVxdWlyZSAuL2luc2VydF9lbGVtZW50LnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0U2VsZWN0b3JzKHNlbGVjdG9ycywgYW5jaG9ycywgaW52ZXJzZSwgbGVmdCwgaW5zaWRlLCByZXZlcnNlTG9vcDEsIHJldmVyc2VMb29wMiwgcmV2ZXJzZUxvb3AzKSB7XG4gIGVhY2goc2VsZWN0b3JzLCBmdW5jdGlvbiAoc2ksIHNlbGVjdG9yKSB7XG4gICAgZWFjaChjYXNoKHNlbGVjdG9yKSwgZnVuY3Rpb24gKHRpLCB0YXJnZXQpIHtcbiAgICAgIGVhY2goY2FzaChhbmNob3JzKSwgZnVuY3Rpb24gKGFpLCBhbmNob3IpIHtcbiAgICAgICAgdmFyIGFuY2hvckZpbmFsID0gaW52ZXJzZSA/IHRhcmdldCA6IGFuY2hvcixcbiAgICAgICAgICAgIHRhcmdldEZpbmFsID0gaW52ZXJzZSA/IGFuY2hvciA6IHRhcmdldCxcbiAgICAgICAgICAgIGluZGV4RmluYWwgPSBpbnZlcnNlID8gdGkgOiBhaTtcbiAgICAgICAgaW5zZXJ0RWxlbWVudChhbmNob3JGaW5hbCwgIWluZGV4RmluYWwgPyB0YXJnZXRGaW5hbCA6IHRhcmdldEZpbmFsLmNsb25lTm9kZSh0cnVlKSwgbGVmdCwgaW5zaWRlLCAhaW5kZXhGaW5hbCk7XG4gICAgICB9LCByZXZlcnNlTG9vcDMpO1xuICAgIH0sIHJldmVyc2VMb29wMik7XG4gIH0sIHJldmVyc2VMb29wMSk7XG4gIHJldHVybiBhbmNob3JzO1xufVxuXG5mbi5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRydWUpO1xufTtcblxuZm4uYXBwZW5kID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmFwcGVuZFRvID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5iZWZvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLnByZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5wcmVwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5iZWZvcmUoc2VsZWN0b3IpLnJlbW92ZSgpO1xufTtcblxuZm4ucmVwbGFjZUFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBjYXNoKHNlbGVjdG9yKS5yZXBsYWNlV2l0aCh0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi53cmFwQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBzdHJ1Y3R1cmUgPSBjYXNoKHNlbGVjdG9yKSxcbiAgICAgIHdyYXBwZXIgPSBzdHJ1Y3R1cmVbMF07XG5cbiAgd2hpbGUgKHdyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgd3JhcHBlciA9IHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIH1cblxuICB0aGlzLmZpcnN0KCkuYmVmb3JlKHN0cnVjdHVyZSk7XG4gIHJldHVybiB0aGlzLmFwcGVuZFRvKHdyYXBwZXIpO1xufTtcblxuZm4ud3JhcCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgd3JhcHBlciA9IGNhc2goc2VsZWN0b3IpWzBdO1xuICAgIGNhc2goZWxlKS53cmFwQWxsKCFpID8gd3JhcHBlciA6IHdyYXBwZXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgfSk7XG59O1xuXG5mbi53cmFwSW5uZXIgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyICRlbGUgPSBjYXNoKGVsZSksXG4gICAgICAgIGNvbnRlbnRzID0gJGVsZS5jb250ZW50cygpO1xuICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoc2VsZWN0b3IpIDogJGVsZS5hcHBlbmQoc2VsZWN0b3IpO1xuICB9KTtcbn07XG5cbmZuLmhhcyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgY29tcGFyYXRvciA9IGlzU3RyaW5nKHNlbGVjdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWxlKS5sZW5ndGg7XG4gIH0gOiBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jb250YWlucyhzZWxlY3Rvcik7XG4gIH07XG4gIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbn07XG5cbmZuLmlzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiBzb21lLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLm5leHQgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX2FsbCwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAnbmV4dEVsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLm5leHRBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5uZXh0KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ubmV4dFVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLm5leHQoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4ubm90ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuICghaXNTdHJpbmcoY29tcGFyYXRvcikgfHwgaXNFbGVtZW50KGVsZSkpICYmICFjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLnBhcmVudCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncGFyZW50Tm9kZScpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uaW5kZXggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIGNoaWxkID0gc2VsZWN0b3IgPyBjYXNoKHNlbGVjdG9yKVswXSA6IHRoaXNbMF0sXG4gICAgICBjb2xsZWN0aW9uID0gc2VsZWN0b3IgPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgcmV0dXJuIGluZGV4T2YuY2FsbChjb2xsZWN0aW9uLCBjaGlsZCk7XG59O1xuXG5mbi5jbG9zZXN0ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGZpbHRlcmVkID0gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG4gIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHJldHVybiBmaWx0ZXJlZDtcbiAgdmFyICRwYXJlbnQgPSB0aGlzLnBhcmVudCgpO1xuICBpZiAoISRwYXJlbnQubGVuZ3RoKSByZXR1cm4gZmlsdGVyZWQ7XG4gIHJldHVybiAkcGFyZW50LmNsb3Nlc3QoY29tcGFyYXRvcik7XG59O1xuXG5mbi5wYXJlbnRzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3BhcmVudEVsZW1lbnQnLCB0cnVlLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucGFyZW50c1VudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnBhcmVudHMoY29tcGFyYXRvciwgdW50aWwpO1xufTtcblxuZm4ucHJldiA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfYWxsLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLnByZXZBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5wcmV2KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ucHJldlVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnByZXYoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4uc2libGluZ3MgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBjYXNoKGVsZSkucGFyZW50KCkuY2hpbGRyZW4oKS5ub3QoZWxlKTtcbiAgfSkpKSwgY29tcGFyYXRvcik7XG59OyAvLyBAb3B0aW9uYWwgLi9jaGlsZHJlbi50c1xuLy8gQG9wdGlvbmFsIC4vY2xvc2VzdC50c1xuLy8gQG9wdGlvbmFsIC4vY29udGVudHMudHNcbi8vIEBvcHRpb25hbCAuL2ZpbmQudHNcbi8vIEBvcHRpb25hbCAuL2hhcy50c1xuLy8gQG9wdGlvbmFsIC4vaXMudHNcbi8vIEBvcHRpb25hbCAuL25leHQudHNcbi8vIEBvcHRpb25hbCAuL25leHRfYWxsLnRzXG4vLyBAb3B0aW9uYWwgLi9uZXh0X3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3QudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudC50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50c191bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vcHJldi50c1xuLy8gQG9wdGlvbmFsIC4vcHJldl9hbGwudHNcbi8vIEBvcHRpb25hbCAuL3ByZXZfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL3NpYmxpbmdzLnRzXG4vLyBAb3B0aW9uYWwgYXR0cmlidXRlcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNvbGxlY3Rpb24vaW5kZXgudHNcbi8vIEBvcHRpb25hbCBjc3MvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkYXRhL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZGltZW5zaW9ucy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGVmZmVjdHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBldmVudHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBmb3Jtcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG1hbmlwdWxhdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG9mZnNldC9pbmRleC50c1xuLy8gQG9wdGlvbmFsIHRyYXZlcnNhbC9pbmRleC50c1xuLy8gQHJlcXVpcmUgY29yZS9pbmRleC50c1xuLy8gQHByaW9yaXR5IC0xMDBcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIE5vZGUuanNcbiAgbW9kdWxlLmV4cG9ydHMgPSBjYXNoO1xufSBlbHNlIHtcbiAgLy8gQnJvd3NlclxuICB3aW5bJ2Nhc2gnXSA9IHdpblsnJCddID0gY2FzaDtcbn1cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9