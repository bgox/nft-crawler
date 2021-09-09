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
    foundation: function () {
    },
    twitter: function () {
    },
    rarible: function () {
    },
    niftygateway: function () {
    },
    asyncart: function () {
    },
};
var listen = (function () {
    window.addEventListener("message", function (e) {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            // console.log("recived message", e);
            // const nft = (window as any).__dataverseNftCrawler.opensea();
            // const message = { msgType: "fetchNftResponse", platform: "opensea", data: nft };
            // window.postMessage(message, "*");
            console.log("recived message", e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LWNyYXdsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQ1BsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxxQ0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZnQtY3Jhd2xlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmV4dHJhY3RIZXggPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGV4dHJhY3RIZXgoc3RyKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICByZXR1cm4gKF9hID0gc3RyLm1hdGNoKC8weFtcXGRBLVphLXpdKy8pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XHJcbn1cclxuZXhwb3J0cy5leHRyYWN0SGV4ID0gZXh0cmFjdEhleDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbndpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIgPSB7XHJcbiAgICBnZXROZnQ6IGZ1bmN0aW9uIChwbGF0Zm9ybSkge1xyXG4gICAgICAgIHN3aXRjaCAocGxhdGZvcm0udG9Mb2NhbGVMb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwib3BlbnNlYVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIub3BlbnNlYSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlcnJhcmVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnN1cGVycmFyZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmb3VuZGF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5mb3VuZGF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInR3aXR0ZXJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLnR3aXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmFyaWJsZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIucmFyaWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJuaWZ0eWdhdGV3YXlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX19kYXRhdmVyc2VOZnRDcmF3bGVyLm5pZnR5Z2F0ZXdheSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhc3luY2FydFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuYXN5bmNhcnQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9wZW5zZWE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMvMHgnKSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCcvJylbNV07XHJcbiAgICAgICAgICAgIGlmIChuZnRJbmZvLmNvbnRyYWN0Lmxlbmd0aCA9PT0gMCB8fCBuZnRJbmZvLnRva2VuSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdEZvdW5kTkZUJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcygnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy9tYXRpYy8weCcpIHx8XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMva2xheXRuLzB4JykpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdFN1cHBvcnRDaGFpbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnZ2VORlRGcm9tRGV0YWlsUGFnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZnRJbmZvO1xyXG4gICAgfSxcclxuICAgIHN1cGVycmFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBcInN1cGVycmFyZVwiO1xyXG4gICAgfSxcclxuICAgIGZvdW5kYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIH0sXHJcbiAgICB0d2l0dGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgcmFyaWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIG5pZnR5Z2F0ZXdheTogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIGFzeW5jYXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG59O1xyXG52YXIgbGlzdGVuID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEubXNnVHlwZSAmJiBlLmRhdGEubXNnVHlwZSA9PT0gXCJmZXRjaE5mdFJlcXVlc3RcIikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlY2l2ZWQgbWVzc2FnZVwiLCBlKTtcclxuICAgICAgICAgICAgLy8gY29uc3QgbmZ0ID0gKHdpbmRvdyBhcyBhbnkpLl9fZGF0YXZlcnNlTmZ0Q3Jhd2xlci5vcGVuc2VhKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IG1lc3NhZ2UgPSB7IG1zZ1R5cGU6IFwiZmV0Y2hOZnRSZXNwb25zZVwiLCBwbGF0Zm9ybTogXCJvcGVuc2VhXCIsIGRhdGE6IG5mdCB9O1xyXG4gICAgICAgICAgICAvLyB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgXCIqXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2l2ZWQgbWVzc2FnZVwiLCBlKTtcclxuICAgICAgICAgICAgdmFyIHBsYXRGb3JtVHlwZSA9IGUuZGF0YS5wbGF0Zm9ybTtcclxuICAgICAgICAgICAgdmFyIG5mdCA9IHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIuZ2V0TmZ0KHBsYXRGb3JtVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0geyBtc2dUeXBlOiBcImZldGNoTmZ0UmVzcG9uc2VcIiwgcGxhdGZvcm06IHBsYXRGb3JtVHlwZSwgZGF0YTogbmZ0IH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCBcIipcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=