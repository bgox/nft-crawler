/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
window.__dataverseNftCrawler = {
    getNft: function (platform) {
        switch (platform.toLocaleLowerCase()) {
            case "opensea":
                return window.__dataverseNftCrawler.opensea();
                break;
            case "superrare":
                return window.__dataverseNftCrawler.superrare();
                break;
            case "zora":
                return window.__dataverseNftCrawler.zora();
                break;
            case "foundation":
                return window.__dataverseNftCrawler.foundation();
                break;
            case "twitter":
                return window.__dataverseNftCrawler.twitter();
                break;
            case "rarible":
                return window.__dataverseNftCrawler.rarible();
                break;
            case "niftygateway":
                return window.__dataverseNftCrawler.niftygateway();
                break;
            case "asyncart":
                return window.__dataverseNftCrawler.asyncart();
                break;
            default:
                break;
        }
    },
    opensea: function () {
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://opensea.io/assets/0x')) {
            nftInfo.contract = (0, utils_1.extractHex)(location.href);
            nftInfo.tokenId = location.href.split('?')[0].split(':')[1].split('/')[5];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
            else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        else if (location.href.includes('https://opensea.io/assets/matic/0x') ||
            location.href.includes('https://opensea.io/assets/klaytn/0x')) {
            response.code = -1;
            response.data = 'notSupportChain';
        }
        else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return nftInfo;
    },
    superrare: function () {
        return "superrare";
    },
    zora: function () {
        var _a, _b;
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        var link = document.querySelector('.css-rxk9pl a');
        if (!link) {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        else {
            var url = (_a = link.href) !== null && _a !== void 0 ? _a : '';
            nftInfo.contract = (_b = (0, utils_1.extractHex)(url)) !== null && _b !== void 0 ? _b : '';
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
            else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return nftInfo;
    },
    foundation: function () {
        var _a;
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        var link = document.querySelector('.css-1hhedd7 a');
        if (!link) {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        else {
            var url = (_a = link.href) !== null && _a !== void 0 ? _a : '';
            nftInfo.contract = (0, utils_1.extractHex)(url);
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
            else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return nftInfo;
    },
    twitter: function () {
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: 'notFoundNFT'
        };
        return response;
    },
    rarible: function () {
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://rarible.com/token/0x')) {
            try {
                nftInfo.contract = (0, utils_1.extractHex)(location.href);
                var tmpSplitArr = location.href.split('?')[0].split(':');
                nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            catch (_a) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        }
        else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
    niftygateway: function () {
        var _a;
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://niftygateway.com/itemdetail/secondary/0x')) {
            try {
                nftInfo.contract = (0, utils_1.extractHex)(location.href);
                var tmpSplitArr = location.href.split('/');
                nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            catch (_b) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        }
        else if (location.href.startsWith('https://niftygateway.com/marketplace?collection=0x') &&
            location.href.includes("tokenId")) {
            try {
                nftInfo.contract = (0, utils_1.extractHex)(location.href);
                var tokenStr = (_a = location.href.match(/&tokenId=\d+/)) === null || _a === void 0 ? void 0 : _a[0];
                nftInfo.tokenId = tokenStr !== undefined ? tokenStr.split('=')[1] : "";
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                }
                else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            }
            catch (_c) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        }
        else if (location.href.startsWith('https://niftygateway.com/itemdetail/primary/0x')) {
            response.code = -1;
            response.data = 'notSupportAtCurrentPage';
        }
        else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
    asyncart: function () {
        var nftInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        var response = {
            code: -1,
            data: nftInfo
        };
        try {
            nftInfo.contract = (0, utils_1.extractHex)(location.href);
            var tmpSplitArr = location.href.split('/');
            nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1].split('-')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
            else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        catch (_a) {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
};
var listen = (function () {
    window.addEventListener("message", function (e) {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            var platFormType = e.data.platform;
            var nft = window.__dataverseNftCrawler.getNft(platFormType);
            var message = { msgType: "fetchNftResponse", platform: platFormType, data: nft };
            window.postMessage(message, "*");
        }
    }, false);
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LWNyYXdsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQ1BsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxxQ0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmV4dHJhY3RIZXggPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGV4dHJhY3RIZXgoc3RyKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICByZXR1cm4gKF9hID0gc3RyLm1hdGNoKC8weFtcXGRBLVphLXpdKy8pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbn1cclxuZXhwb3J0cy5leHRyYWN0SGV4ID0gZXh0cmFjdEhleDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbndpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIgPSB7XHJcbiAgICBnZXROZnQ6IGZ1bmN0aW9uIChwbGF0Zm9ybSkge1xyXG4gICAgICAgIHN3aXRjaCAocGxhdGZvcm0udG9Mb2NhbGVMb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwib3BlbnNlYVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIub3BlbnNlYSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlcnJhcmVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnN1cGVycmFyZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6b3JhXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci56b3JhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZvdW5kYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLmZvdW5kYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidHdpdHRlclwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIudHdpdHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyYXJpYmxlXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5yYXJpYmxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5pZnR5Z2F0ZXdheVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIubmlmdHlnYXRld2F5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFzeW5jYXJ0XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5hc3luY2FydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb3BlbnNlYTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgIHRva2VuSWQ6ICcnLFxyXG4gICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy8weCcpKSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gbG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJy8nKVs1XTtcclxuICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90Rm91bmRORlQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdodHRwczovL29wZW5zZWEuaW8vYXNzZXRzL21hdGljLzB4JykgfHxcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZi5pbmNsdWRlcygnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy9rbGF5dG4vMHgnKSkge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90U3VwcG9ydENoYWluJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9ICdnZU5GVEZyb21EZXRhaWxQYWdlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5mdEluZm87XHJcbiAgICB9LFxyXG4gICAgc3VwZXJyYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwic3VwZXJyYXJlXCI7XHJcbiAgICB9LFxyXG4gICAgem9yYTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgdmFyIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jc3MtcnhrOXBsIGEnKTtcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ2dlTkZURnJvbURldGFpbFBhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IChfYSA9IGxpbmsuaHJlZikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XHJcbiAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoX2IgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcclxuICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gdXJsLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgIGlmIChuZnRJbmZvLmNvbnRyYWN0Lmxlbmd0aCA9PT0gMCB8fCBuZnRJbmZvLnRva2VuSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdEZvdW5kTkZUJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5mdEluZm87XHJcbiAgICB9LFxyXG4gICAgZm91bmRhdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNzcy0xaGhlZGQ3IGEnKTtcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ2dlTkZURnJvbURldGFpbFBhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IChfYSA9IGxpbmsuaHJlZikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XHJcbiAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KSh1cmwpO1xyXG4gICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB1cmwuc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90Rm91bmRORlQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmZ0SW5mbztcclxuICAgIH0sXHJcbiAgICB0d2l0dGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBkYXRhOiAnbm90Rm91bmRORlQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9LFxyXG4gICAgcmFyaWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZnRJbmZvID0ge1xyXG4gICAgICAgICAgICBjb250cmFjdDogJycsXHJcbiAgICAgICAgICAgIHRva2VuSWQ6ICcnLFxyXG4gICAgICAgICAgICBwbGF0Zm9ybVVybDogbG9jYXRpb24uaHJlZlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBjb2RlOiAtMSxcclxuICAgICAgICAgICAgZGF0YTogbmZ0SW5mb1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnaHR0cHM6Ly9yYXJpYmxlLmNvbS90b2tlbi8weCcpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG1wU3BsaXRBcnIgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0uc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IHRtcFNwbGl0QXJyW3RtcFNwbGl0QXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5mdEluZm8uY29udHJhY3QubGVuZ3RoID09PSAwIHx8IG5mdEluZm8udG9rZW5JZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9ICdub3RGb3VuZE5GVCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbmZ0SW5mbztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90Rm91bmRORlQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnZ2VORlRGcm9tRGV0YWlsUGFnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0sXHJcbiAgICBuaWZ0eWdhdGV3YXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdmFyIG5mdEluZm8gPSB7XHJcbiAgICAgICAgICAgIGNvbnRyYWN0OiAnJyxcclxuICAgICAgICAgICAgdG9rZW5JZDogJycsXHJcbiAgICAgICAgICAgIHBsYXRmb3JtVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICBkYXRhOiBuZnRJbmZvXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL25pZnR5Z2F0ZXdheS5jb20vaXRlbWRldGFpbC9zZWNvbmRhcnkvMHgnKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby5jb250cmFjdCA9ICgwLCB1dGlsc18xLmV4dHJhY3RIZXgpKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtcFNwbGl0QXJyID0gbG9jYXRpb24uaHJlZi5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgbmZ0SW5mby50b2tlbklkID0gdG1wU3BsaXRBcnJbdG1wU3BsaXRBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdEZvdW5kTkZUJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChfYikge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9ICdub3RGb3VuZE5GVCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCdodHRwczovL25pZnR5Z2F0ZXdheS5jb20vbWFya2V0cGxhY2U/Y29sbGVjdGlvbj0weCcpICYmXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJ0b2tlbklkXCIpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5TdHIgPSAoX2EgPSBsb2NhdGlvbi5ocmVmLm1hdGNoKC8mdG9rZW5JZD1cXGQrLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxuICAgICAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IHRva2VuU3RyICE9PSB1bmRlZmluZWQgPyB0b2tlblN0ci5zcGxpdCgnPScpWzFdIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmIChuZnRJbmZvLmNvbnRyYWN0Lmxlbmd0aCA9PT0gMCB8fCBuZnRJbmZvLnRva2VuSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90Rm91bmRORlQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdEZvdW5kTkZUJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vbmlmdHlnYXRld2F5LmNvbS9pdGVtZGV0YWlsL3ByaW1hcnkvMHgnKSkge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnbm90U3VwcG9ydEF0Q3VycmVudFBhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ2dlTkZURnJvbURldGFpbFBhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9LFxyXG4gICAgYXN5bmNhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5mdEluZm8uY29udHJhY3QgPSAoMCwgdXRpbHNfMS5leHRyYWN0SGV4KShsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgdmFyIHRtcFNwbGl0QXJyID0gbG9jYXRpb24uaHJlZi5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBuZnRJbmZvLnRva2VuSWQgPSB0bXBTcGxpdEFyclt0bXBTcGxpdEFyci5sZW5ndGggLSAxXS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICBpZiAobmZ0SW5mby5jb250cmFjdC5sZW5ndGggPT09IDAgfHwgbmZ0SW5mby50b2tlbklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9ICdub3RGb3VuZE5GVCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gMDtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBuZnRJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnZ2VORlRGcm9tRGV0YWlsUGFnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0sXHJcbn07XHJcbnZhciBsaXN0ZW4gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUuZGF0YS5tc2dUeXBlICYmIGUuZGF0YS5tc2dUeXBlID09PSBcImZldGNoTmZ0UmVxdWVzdFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF0Rm9ybVR5cGUgPSBlLmRhdGEucGxhdGZvcm07XHJcbiAgICAgICAgICAgIHZhciBuZnQgPSB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLmdldE5mdChwbGF0Rm9ybVR5cGUpO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHsgbXNnVHlwZTogXCJmZXRjaE5mdFJlc3BvbnNlXCIsIHBsYXRmb3JtOiBwbGF0Rm9ybVR5cGUsIGRhdGE6IG5mdCB9O1xyXG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgXCIqXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9