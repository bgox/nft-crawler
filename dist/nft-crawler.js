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
    }
};
var listen = (function () {
    window.addEventListener("message", function (e) {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            console.log("recived message", e);
            var nft = window.__dataverseNftCrawler.opensea();
            var message = { msgType: "fetchNftResponse", platform: "opensea", data: nft };
            window.postMessage(message, "*");
        }
    }, false);
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LWNyYXdsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQ1BsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxxQ0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25mdC1jcmF3bGVyLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL25mdC1jcmF3bGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25mdC1jcmF3bGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZXh0cmFjdEhleCA9IHZvaWQgMDtcclxuZnVuY3Rpb24gZXh0cmFjdEhleChzdHIpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHJldHVybiAoX2EgPSBzdHIubWF0Y2goLzB4W1xcZEEtWmEtel0rLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcclxufVxyXG5leHBvcnRzLmV4dHJhY3RIZXggPSBleHRyYWN0SGV4O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxud2luZG93Ll9fZGF0YXZlcnNlTmZ0Q3Jhd2xlciA9IHtcclxuICAgIG9wZW5zZWE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmZ0SW5mbyA9IHtcclxuICAgICAgICAgICAgY29udHJhY3Q6ICcnLFxyXG4gICAgICAgICAgICB0b2tlbklkOiAnJyxcclxuICAgICAgICAgICAgcGxhdGZvcm1Vcmw6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgY29kZTogLTEsXHJcbiAgICAgICAgICAgIGRhdGE6IG5mdEluZm9cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMvMHgnKSkge1xyXG4gICAgICAgICAgICBuZnRJbmZvLmNvbnRyYWN0ID0gKDAsIHV0aWxzXzEuZXh0cmFjdEhleCkobG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgIG5mdEluZm8udG9rZW5JZCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCcvJylbNV07XHJcbiAgICAgICAgICAgIGlmIChuZnRJbmZvLmNvbnRyYWN0Lmxlbmd0aCA9PT0gMCB8fCBuZnRJbmZvLnRva2VuSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdEZvdW5kTkZUJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG5mdEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcygnaHR0cHM6Ly9vcGVuc2VhLmlvL2Fzc2V0cy9tYXRpYy8weCcpIHx8XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoJ2h0dHBzOi8vb3BlbnNlYS5pby9hc3NldHMva2xheXRuLzB4JykpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY29kZSA9IC0xO1xyXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gJ25vdFN1cHBvcnRDaGFpbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXNwb25zZS5jb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSAnZ2VORlRGcm9tRGV0YWlsUGFnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZnRJbmZvO1xyXG4gICAgfSxcclxuICAgIHN1cGVycmFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBcInN1cGVycmFyZVwiO1xyXG4gICAgfVxyXG59O1xyXG52YXIgbGlzdGVuID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLmRhdGEubXNnVHlwZSAmJiBlLmRhdGEubXNnVHlwZSA9PT0gXCJmZXRjaE5mdFJlcXVlc3RcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2l2ZWQgbWVzc2FnZVwiLCBlKTtcclxuICAgICAgICAgICAgdmFyIG5mdCA9IHdpbmRvdy5fX2RhdGF2ZXJzZU5mdENyYXdsZXIub3BlbnNlYSgpO1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHsgbXNnVHlwZTogXCJmZXRjaE5mdFJlc3BvbnNlXCIsIHBsYXRmb3JtOiBcIm9wZW5zZWFcIiwgZGF0YTogbmZ0IH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCBcIipcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=