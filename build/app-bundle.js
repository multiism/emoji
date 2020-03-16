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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _emojiDisplay = __webpack_require__(/*! ./emoji-display */ \"./src/emoji-display.js\");\n\nvar _emojiDisplay2 = _interopRequireDefault(_emojiDisplay);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar makeRandomEmoji = function makeRandomEmoji() {\n  var chooseRandom = function chooseRandom(array) {\n    return array[~~(Math.random() * array.length)];\n  };\n\n  var randomEye = function randomEye() {\n    return {\n      type: Math.random() < 0.3 ? \"wink\" : \"open\",\n      offsetX: Math.random() - 0.5,\n      offsetY: Math.random() - 0.5\n    };\n  };\n  return {\n    eyes: {\n      left: randomEye(),\n      right: randomEye()\n    },\n    // TODO: offsets or whatever\n    // TODO: hearts, dollars, stars\n    // also: XD  >_<  ^^  ._.  8)  B)\n    // what about spider eyes? ::::)\n    mouth: {\n      smile: Math.random() - Math.random(), // -1..1 (negative for frown)\n      open: Math.random() < 0.3, // 0..1?\n      // teeth: 0 # 0..1 or bool? what would this define exactly?\n      // slant: 0 # -1..1?\n      // -1..1? TODO: offsets or angle or whatever\n      tongue: Math.random() < 0.7 ? // Math.random() - Math.random()\n      chooseRandom([-1, -0.5, 0.5, 1]) : 0 // for dat.gui's benefit, could be undefined otherwise\n    }\n  };\n};\n// TODO: width & offset or whatever\n// TODO: :O :o :3 :S :P :9 :F :C :c :B :] :J :I :T :*\n// TODO: skin color\n// TODO: cat ears, hats etc.\n// TODO: animation (maybe have an update method on these objects? or have higher level descriptors?)\n\nvar emojisContainer = document.getElementById(\"emojis\");\n\nvar selectedEmojiDisplay = null;\n\nvar makeEditableEmojiDisplay = function makeEditableEmojiDisplay(emoji) {\n  var emojiDisplay = new _emojiDisplay2.default(emoji);\n  var canvas = emojiDisplay.canvas;\n\n  canvas.style.cursor = \"pointer\";\n  emojisContainer.appendChild(canvas);\n  canvas.addEventListener(\"click\", function (e) {\n    selectedEmojiDisplay = emojiDisplay;\n    return toggleDatGuiForEmoji(emoji);\n  });\n  return emojiDisplay;\n};\n\nvar datGui = null;\nvar datGuiOpenForEmoji = null;\nvar toggleDatGuiForEmoji = function toggleDatGuiForEmoji(emoji) {\n  if (datGui && datGuiOpenForEmoji === emoji) {\n    datGui.destroy();\n    return datGui = null;\n  } else {\n    return openDatGuiForEmoji(emoji);\n  }\n};\nvar openDatGuiForEmoji = function openDatGuiForEmoji(emoji) {\n  if (datGui != null) {\n    datGui.destroy();\n  }\n  datGui = new dat.GUI();\n  datGuiOpenForEmoji = emoji;\n  var mouthFolder = datGui.addFolder(\"Mouth\");\n  mouthFolder.open();\n  mouthFolder.add(emoji.mouth, \"smile\", -1, +1).name(\"Smile\");\n  mouthFolder.add(emoji.mouth, \"open\").name(\"Open\");\n  mouthFolder.add(emoji.mouth, \"tongue\", -1, +1).step(0.5).name(\"Tongue\");\n  var eyesFolder = datGui.addFolder(\"Eyes\");\n  eyesFolder.open();\n  eyesFolder.add(emoji.eyes.left, \"type\", { Open: \"open\", Wink: \"wink\" }).name(\"Left Eye\");\n  eyesFolder.add(emoji.eyes.left, \"offsetX\", -1, 1).name(\"Left Eye X\");\n  eyesFolder.add(emoji.eyes.left, \"offsetY\", -1, 1).name(\"Left Eye Y\");\n  eyesFolder.add(emoji.eyes.right, \"type\", { Open: \"open\", Wink: \"wink\" }).name(\"Right Eye\");\n  eyesFolder.add(emoji.eyes.right, \"offsetX\", -1, 1).name(\"Right Eye X\");\n  return eyesFolder.add(emoji.eyes.right, \"offsetY\", -1, 1).name(\"Right Eye Y\");\n};\n\nvar emojiDisplays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (i) {\n  return makeEditableEmojiDisplay(makeRandomEmoji());\n});\n\nvar animate = function animate() {\n  selectedEmojiDisplay && selectedEmojiDisplay.update();\n  requestAnimationFrame(animate);\n};\nanimate();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/draw-emoji.js":
/*!***************************!*\
  !*** ./src/draw-emoji.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar PI = Math.PI,\n    cos = Math.cos,\n    sin = Math.sin;\n\nvar TAU = PI * 2;\n\nvar drawEmoji = function drawEmoji(ctx, _ref, x, y, diameter, colorScheme) {\n  var eyes = _ref.eyes,\n      mouth = _ref.mouth;\n\n  var radius = diameter / 2;\n\n  var strokeWidth = diameter / 15;\n  var yellowGradient = ctx.createLinearGradient(0, -radius, 0, diameter);\n\n  yellowGradient.addColorStop(0.0, \"#fcf5b5\");\n  yellowGradient.addColorStop(0.5, \"#f1da36\");\n  yellowGradient.addColorStop(1.0, \"#f4c838\");\n\n  var fill = colorScheme.fill || yellowGradient;\n  var strokeColor = colorScheme.stroke || \"black\";\n\n  ctx.save();\n  ctx.translate(x, y);\n\n  //draw fill\n  ctx.beginPath();\n  ctx.arc(0, 0, radius, 0, TAU);\n  ctx.fillStyle = fill;\n  ctx.fill();\n\n  //draw highlight\n  ctx.beginPath();\n  ctx.arc(0, strokeWidth / 2, radius * 0.92, 0, TAU);\n  ctx.strokeStyle = \"rgba(255, 255, 255, 0.3)\";\n  ctx.lineWidth = strokeWidth;\n  ctx.stroke();\n\n  //draw outline\n  ctx.beginPath();\n  ctx.arc(0, 0, diameter / 2, 0, TAU);\n  ctx.strokeStyle = strokeColor;\n  ctx.lineWidth = strokeWidth;\n  ctx.stroke();\n\n  if (mouth) {\n    var i = void 0;\n    ctx.beginPath();\n    //ctx.moveTo(-radius/2, radius*0.2)\n    //ctx.lineTo(-radius/2*0.9, radius*0.4)\n    //ctx.lineTo(0, radius*0.5)\n    //ctx.lineTo(+radius/2*0.9, radius*0.4)\n    //ctx.lineTo(+radius/2, radius*0.2)\n\n    var smileY = mouth.smile * radius * 0.2;\n\n    for (i = 0; i <= 1; i += 0.1) {\n      ctx.lineTo(cos(i * PI) * radius / 2, sin(i * PI) * radius / 2 * mouth.smile + radius * 0.3 - smileY);\n    }\n\n    ctx.strokeStyle = strokeColor;\n    ctx.lineJoin = \"round\";\n    ctx.lineCap = \"round\";\n    ctx.lineWidth = strokeWidth;\n    if (mouth.open) {\n      ctx.closePath();\n      ctx.fillStyle = \"white\";\n      ctx.fill();\n    }\n\n    ctx.stroke();\n\n    if (mouth.tongue) {\n      // TODO: mesh with the curve of the mouth\n      ctx.beginPath();\n      for (i = 0; i <= 1; i += 0.1) {\n        ctx.lineTo(cos(i * PI) * radius / 3, sin(i * PI) * radius / 2 * mouth.tongue + radius * 0.3 + smileY * (mouth.open ? 0 : 1));\n      }\n\n      ctx.strokeStyle = strokeColor;\n      ctx.lineJoin = \"round\";\n      ctx.lineCap = \"round\";\n      ctx.lineWidth = strokeWidth;\n      ctx.closePath();\n      ctx.fillStyle = \"#f34\";\n      ctx.fill();\n      ctx.stroke();\n    }\n  }\n  // TODO: add line down middle of tongue\n\n  var drawEye = function drawEye(eye, x, y) {\n    ctx.beginPath();\n    x += eye.offsetX * radius;\n    y += eye.offsetY * radius;\n    switch (eye.type) {\n      case \"open\":\n        ctx.arc(x, y, radius / 6, 0, TAU);\n        ctx.fillStyle = strokeColor;\n        return ctx.fill();\n      case \"wink\":\n        ctx.moveTo(x - radius / 7, y);\n        ctx.lineTo(x + radius / 7, y);\n        ctx.strokeStyle = strokeColor;\n        ctx.lineWidth = strokeWidth;\n        return ctx.stroke();\n    }\n  };\n\n  if (eyes && eyes.left) {\n    drawEye(eyes.left, -radius * 0.4, -radius / 3);\n  }\n  if (eyes && eyes.right) {\n    drawEye(eyes.right, +radius * 0.4, -radius / 3);\n  }\n\n  return ctx.restore();\n};\nexports.default = drawEmoji;\n\n//# sourceURL=webpack:///./src/draw-emoji.js?");

/***/ }),

/***/ "./src/emoji-display.js":
/*!******************************!*\
  !*** ./src/emoji-display.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _drawEmoji = __webpack_require__(/*! ./draw-emoji */ \"./src/draw-emoji.js\");\n\nvar _drawEmoji2 = _interopRequireDefault(_drawEmoji);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar EmojiDisplay = function () {\n  function EmojiDisplay(emoji) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, EmojiDisplay);\n\n    this.canvas = document.createElement(\"canvas\");\n    this.context = this.canvas.getContext(\"2d\");\n\n    this.size = options.size || 150;\n    this.spacing = options.spacing || this.getDefaultSpacing();\n    this.colorScheme = options.colorScheme || {};\n    this.emoji = emoji;\n\n    this.update();\n  }\n\n  _createClass(EmojiDisplay, [{\n    key: \"getDefaultSpacing\",\n    value: function getDefaultSpacing() {\n      return this.size * 0.1 + 5;\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n      this.size = options.size || this.size;\n      this.spacing = options.spacing || options.size ? this.getDefaultSpacing() : this.spacing;\n      this.colorScheme = options.colorScheme || this.colorScheme;\n\n      this.canvas.width = this.size + this.spacing;\n      this.canvas.height = this.size + this.spacing;\n      if (options.emoji) {\n        this.emoji = Object.assign(this.emoji, options.emoji);\n      }\n\n      (0, _drawEmoji2.default)(this.context, this.emoji, this.canvas.width / 2, this.canvas.height / 2, this.size, this.colorScheme);\n    }\n  }]);\n\n  return EmojiDisplay;\n}();\n\nexports.default = EmojiDisplay;\n\n//# sourceURL=webpack:///./src/emoji-display.js?");

/***/ })

/******/ });