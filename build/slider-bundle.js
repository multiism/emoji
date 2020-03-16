/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/add-slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/add-slider.js":
/*!****************************!*\
  !*** ./docs/add-slider.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ \"./docs/slider.js\");\n\nvar container = document.querySelector(\"#slider-demo\");\nvar slider = new _slider__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ncontainer.appendChild(slider.render());\n\n//# sourceURL=webpack:///./docs/add-slider.js?");

/***/ }),

/***/ "./docs/slider.js":
/*!************************!*\
  !*** ./docs/slider.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_emoji_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/emoji-display */ \"./src/emoji-display.js\");\n/* harmony import */ var _smile_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smile-factory */ \"./docs/smile-factory.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar frown = -0.7;\nvar smile = 0.7;\n\nvar linearInterpolate = function linearInterpolate(start, end, fraction) {\n  return start + (end - start) * fraction;\n};\n\nvar smileynessForIndex = function smileynessForIndex(face, faceCount) {\n  return linearInterpolate(frown, smile, face / (faceCount - 1));\n};\n\nvar Slider = /*#__PURE__*/function () {\n  function Slider(onSelect) {\n    _classCallCheck(this, Slider);\n\n    this.onSelect = onSelect;\n    this.smileIndex = null;\n  }\n\n  _createClass(Slider, [{\n    key: \"selectSmileIndex\",\n    value: function selectSmileIndex(index) {\n      var previousIndex = this.smileIndex;\n      this.smileIndex = index;\n      this.setSliderFacePosition(index);\n      this.animateSliderFaceExpression(previousIndex, index);\n    }\n  }, {\n    key: \"setSliderFacePosition\",\n    value: function setSliderFacePosition(index) {\n      this.selectedFaceDisplay.canvas.style.position = \"absolute\";\n      var firstCanvas = this.displays[0].canvas;\n      var lastCanvas = this.displays[this.displays.length - 1].canvas;\n      this.selectedFaceDisplay.canvas.style.left = 0;\n      requestAnimationFrame(function () {\n        var x = linearInterpolate(firstCanvas.offsetLeft, lastCanvas.offsetLeft, index / (this.faceCount - 1));\n        var y = linearInterpolate(firstCanvas.offsetTop, lastCanvas.offsetTop, index / (this.faceCount - 1));\n        this.selectedFaceDisplay.canvas.style.transform = \"translate(\".concat(x, \"px, \").concat(y, \"px)\");\n      }.bind(this));\n    }\n  }, {\n    key: \"animateSliderFaceExpression\",\n    value: function animateSliderFaceExpression(previousIndex, index) {\n      var _this = this;\n\n      var frameCount = 12;\n\n      var _loop = function _loop(frame) {\n        var interpolatedIndex = linearInterpolate(previousIndex, index, frame / (frameCount - 1));\n        setTimeout(function () {\n          _this.showExpressionForIndex(interpolatedIndex);\n        }, frame * 500 / frameCount);\n      };\n\n      for (var frame = 0; frame < frameCount; frame++) {\n        _loop(frame);\n      }\n    }\n  }, {\n    key: \"showExpressionForIndex\",\n    value: function showExpressionForIndex(index) {\n      var selectedSmileyness = smileynessForIndex(index, this.faceCount);\n      this.selectedFaceDisplay.update({\n        emoji: Object(_smile_factory__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(selectedSmileyness)\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var container = document.createElement(\"div\");\n      var displays = this.displays = [];\n      var faceCount = this.faceCount = 5;\n      var size = 32;\n\n      for (var face = 0; face < faceCount; face++) {\n        var smileyness = smileynessForIndex(face, faceCount);\n        var display = new _src_emoji_display__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object(_smile_factory__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(smileyness), {\n          size: size,\n          colorScheme: {\n            fill: \"#aaa\",\n            stroke: \"#fff\"\n          }\n        });\n        container.appendChild(display.canvas);\n        displays.push(display);\n      }\n\n      container.style.position = \"relative\";\n      var selectedSmileyness = smileynessForIndex(0, faceCount);\n      var selectedFaceDisplay = this.selectedFaceDisplay = new _src_emoji_display__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object(_smile_factory__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(selectedSmileyness), {\n        size: size\n      });\n      container.appendChild(selectedFaceDisplay.canvas);\n      displays.forEach(function (display, face) {\n        display.canvas.addEventListener(\"click\", function (face) {\n          this.selectSmileIndex(face);\n          selectedFaceDisplay.canvas.style.transition = \"transform 0.5s ease\";\n          selectedFaceDisplay.canvas.style.display = \"initial\";\n\n          if (this.onSelect) {\n            this.onSelect(index);\n          }\n        }.bind(_this2, face));\n      });\n      selectedFaceDisplay.canvas.style.display = \"none\";\n      setTimeout(function () {\n        this.selectSmileIndex(2);\n      }.bind(this), 100);\n      return container;\n    }\n  }]);\n\n  return Slider;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Slider);\n\n//# sourceURL=webpack:///./docs/slider.js?");

/***/ }),

/***/ "./docs/smile-factory.js":
/*!*******************************!*\
  !*** ./docs/smile-factory.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar makeSmileExpression = function makeSmileExpression(smileAmount) {\n  return {\n    eyes: {\n      left: {\n        type: \"open\",\n        offsetX: 0,\n        offsetY: 0\n      },\n      right: {\n        type: \"open\",\n        offsetX: 0,\n        offsetY: 0\n      }\n    },\n    mouth: {\n      smile: smileAmount,\n      open: false,\n      tongue: 0\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeSmileExpression);\n\n//# sourceURL=webpack:///./docs/smile-factory.js?");

/***/ }),

/***/ "./src/draw-emoji.js":
/*!***************************!*\
  !*** ./src/draw-emoji.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar PI = Math.PI,\n    cos = Math.cos,\n    sin = Math.sin;\nvar TAU = PI * 2;\n\nvar drawEmoji = function drawEmoji(ctx, _ref, x, y, diameter, colorScheme) {\n  var eyes = _ref.eyes,\n      mouth = _ref.mouth;\n  var radius = diameter / 2;\n  var strokeWidth = diameter / 15;\n  var yellowGradient = ctx.createLinearGradient(0, -radius, 0, diameter);\n  yellowGradient.addColorStop(0.0, \"#fcf5b5\");\n  yellowGradient.addColorStop(0.5, \"#f1da36\");\n  yellowGradient.addColorStop(1.0, \"#f4c838\");\n  var fill = colorScheme.fill || yellowGradient;\n  var strokeColor = colorScheme.stroke || \"black\";\n  ctx.save();\n  ctx.translate(x, y); //draw fill\n\n  ctx.beginPath();\n  ctx.arc(0, 0, radius, 0, TAU);\n  ctx.fillStyle = fill;\n  ctx.fill(); //draw highlight\n\n  ctx.beginPath();\n  ctx.arc(0, strokeWidth / 2, radius * 0.92, 0, TAU);\n  ctx.strokeStyle = \"rgba(255, 255, 255, 0.3)\";\n  ctx.lineWidth = strokeWidth;\n  ctx.stroke(); //draw outline\n\n  ctx.beginPath();\n  ctx.arc(0, 0, diameter / 2, 0, TAU);\n  ctx.strokeStyle = strokeColor;\n  ctx.lineWidth = strokeWidth;\n  ctx.stroke();\n\n  if (mouth) {\n    var i;\n    ctx.beginPath(); //ctx.moveTo(-radius/2, radius*0.2)\n    //ctx.lineTo(-radius/2*0.9, radius*0.4)\n    //ctx.lineTo(0, radius*0.5)\n    //ctx.lineTo(+radius/2*0.9, radius*0.4)\n    //ctx.lineTo(+radius/2, radius*0.2)\n\n    var smileY = mouth.smile * radius * 0.2;\n\n    for (i = 0; i <= 1; i += 0.1) {\n      ctx.lineTo(cos(i * PI) * radius / 2, sin(i * PI) * radius / 2 * mouth.smile + radius * 0.3 - smileY);\n    }\n\n    ctx.strokeStyle = strokeColor;\n    ctx.lineJoin = \"round\";\n    ctx.lineCap = \"round\";\n    ctx.lineWidth = strokeWidth;\n\n    if (mouth.open) {\n      ctx.closePath();\n      ctx.fillStyle = \"white\";\n      ctx.fill();\n    }\n\n    ctx.stroke();\n\n    if (mouth.tongue) {\n      // TODO: mesh with the curve of the mouth\n      ctx.beginPath();\n\n      for (i = 0; i <= 1; i += 0.1) {\n        ctx.lineTo(cos(i * PI) * radius / 3, sin(i * PI) * radius / 2 * mouth.tongue + radius * 0.3 + smileY * (mouth.open ? 0 : 1));\n      }\n\n      ctx.strokeStyle = strokeColor;\n      ctx.lineJoin = \"round\";\n      ctx.lineCap = \"round\";\n      ctx.lineWidth = strokeWidth;\n      ctx.closePath();\n      ctx.fillStyle = \"#f34\";\n      ctx.fill();\n      ctx.stroke();\n    }\n  } // TODO: add line down middle of tongue\n\n\n  var drawEye = function drawEye(eye, x, y) {\n    ctx.beginPath();\n    x += eye.offsetX * radius;\n    y += eye.offsetY * radius;\n\n    switch (eye.type) {\n      case \"open\":\n        ctx.arc(x, y, radius / 6, 0, TAU);\n        ctx.fillStyle = strokeColor;\n        return ctx.fill();\n\n      case \"wink\":\n        ctx.moveTo(x - radius / 7, y);\n        ctx.lineTo(x + radius / 7, y);\n        ctx.strokeStyle = strokeColor;\n        ctx.lineWidth = strokeWidth;\n        return ctx.stroke();\n    }\n  };\n\n  if (eyes && eyes.left) {\n    drawEye(eyes.left, -radius * 0.4, -radius / 3);\n  }\n\n  if (eyes && eyes.right) {\n    drawEye(eyes.right, +radius * 0.4, -radius / 3);\n  }\n\n  return ctx.restore();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (drawEmoji);\n\n//# sourceURL=webpack:///./src/draw-emoji.js?");

/***/ }),

/***/ "./src/emoji-display.js":
/*!******************************!*\
  !*** ./src/emoji-display.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _draw_emoji__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw-emoji */ \"./src/draw-emoji.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar EmojiDisplay = /*#__PURE__*/function () {\n  function EmojiDisplay(emoji) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, EmojiDisplay);\n\n    this.canvas = document.createElement(\"canvas\");\n    this.context = this.canvas.getContext(\"2d\");\n    this.size = options.size || 150;\n    this.spacing = options.spacing || this.getDefaultSpacing();\n    this.colorScheme = options.colorScheme || {};\n    this.emoji = emoji;\n    this.update();\n  }\n\n  _createClass(EmojiDisplay, [{\n    key: \"getDefaultSpacing\",\n    value: function getDefaultSpacing() {\n      return this.size * 0.1 + 5;\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      this.size = options.size || this.size;\n      this.spacing = options.spacing || options.size ? this.getDefaultSpacing() : this.spacing;\n      this.colorScheme = options.colorScheme || this.colorScheme;\n      this.canvas.width = this.size + this.spacing;\n      this.canvas.height = this.size + this.spacing;\n\n      if (options.emoji) {\n        this.emoji = Object.assign(this.emoji, options.emoji);\n      }\n\n      Object(_draw_emoji__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.context, this.emoji, this.canvas.width / 2, this.canvas.height / 2, this.size, this.colorScheme);\n    }\n  }]);\n\n  return EmojiDisplay;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (EmojiDisplay);\n\n//# sourceURL=webpack:///./src/emoji-display.js?");

/***/ })

/******/ });