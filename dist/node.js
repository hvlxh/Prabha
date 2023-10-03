(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("prabha", ["exports", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("moment"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.moment);
    global.prabha = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.modernTheme = _exports.defaultTheme = _exports.Logger = _exports.Colors = void 0;
  _moment = _interopRequireDefault(_moment);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  var defaultTheme = _exports.defaultTheme = function defaultTheme() {
    /** @type {import('@types/prabha').ThemeConfiguration} */
    var theme = {
      levels: {
        info: "INFO",
        warn: "WARN",
        error: "ERRR",
        debug: "DBUG"
      },
      date: "DD/MM/YYYY HH:mm:ss",
      message: "[%date] %level | %log"
    };
    return theme;
  };
  var modernTheme = _exports.modernTheme = function modernTheme() {
    /** @type {import('@types/prabha').ThemeConfiguration} */
    var theme = {
      levels: {
        info: "bgGreenBright(black( INFO ))",
        warn: "bgYellowBright(black( WARN ))",
        error: "bgRedBright(black( ERROR ))",
        debug: "bgWhiteBright(black( DEBUG ))"
      },
      date: "bgBlueBright(black( hh:mm:ss))",
      message: "%date %level %log"
    };
    return theme;
  };
  var Colors = _exports.Colors = /*#__PURE__*/function () {
    function Colors() {
      _classCallCheck(this, Colors);
    }
    _createClass(Colors, null, [{
      key: "parse",
      value: function parse(str) {
        var _this = this;
        var nonNestedRegex = /(\w+)\(([^()]+)\)/g;
        str = str.replace(nonNestedRegex, function (match, functionName, argument) {
          if (_this.styles.hasOwnProperty(functionName)) {
            var argValue = _this.parse(argument); // Recursively handle nested function calls
            return "".concat(_this.styles[functionName]).concat(argValue).concat(_this.styles['reset']);
          } else {
            return match;
          }
        });

        // Match nested function calls
        var nestedRegex = /(\w+)\(([^()]+)\)/;
        while (nestedRegex.test(str)) {
          str = str.replace(nestedRegex, function (match, functionName, argument) {
            if (_this.styles.hasOwnProperty(functionName)) {
              var argValue = _this.parse(argument); // Recursively handle nested function calls
              return "".concat(_this.styles[functionName]).concat(argValue).concat(_this.styles['reset']);
            } else {
              return match;
            }
          });
        }
        return str;
      }
    }, {
      key: "format",
      value: function format(mode, str) {
        if (!this.styles[mode]) throw new Error("Unknown styles in the colors.js");
        return "".concat(this.styles[mode]).concat(str).concat(this.styles['reset']);
      }
    }]);
    return Colors;
  }();
  _defineProperty(Colors, "styles", {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    overline: "\x1b[53m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    blackBright: '\x1b[90m',
    gray: '\x1b[90m',
    grey: '\x1b[90m',
    redBright: '\x1b[91m',
    greenBright: '\x1b[92m',
    yellowBright: '\x1b[93m',
    blueBright: '\x1b[94m',
    magentaBright: '\x1b[95m',
    cyanBright: '\x1b[96m',
    whiteBright: '\x1b[97m',
    whiteBrighest: '\x1b[15m',
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgBlackBright: '\x1b[100m',
    bgGray: '\x1b[100m',
    bgGrey: '\x1b[100m',
    bgRedBright: '\x1b[101m',
    bgGreenBright: '\x1b[102m',
    bgYellowBright: '\x1b[103m',
    bgBlueBright: '\x1b[104m',
    bgMagentaBright: '\x1b[105m',
    bgCyanBright: '\x1b[106m',
    bgWhiteBright: '\x1b[107m'
  });
  var Logger = _exports.Logger = /*#__PURE__*/function () {
    function Logger(config) {
      _classCallCheck(this, Logger);
      _defineProperty(this, "config", void 0);
      /** @type {import("@types/prabha").ThemeConfiguration} */
      var defaultConfig;
      if (typeof config === "string") {
        switch (config) {
          case "modern":
            defaultConfig = modernTheme();
            break;
          case "default":
            defaultConfig = defaultTheme();
            break;
          default:
            defaultConfig = defaultTheme();
            break;
        }
        this.config = defaultConfig;
      } else {
        switch ((config === null || config === void 0 ? void 0 : config.theme) || "default") {
          case "default":
            defaultConfig = defaultTheme();
            break;
          case "modern":
            defaultConfig = modernTheme();
            break;
          default:
            defaultConfig = defaultTheme();
            break;
        }
        this.config = _objectSpread(_objectSpread({
          theme: this.config || "default"
        }, defaultConfig), config);
      }
    }
    _createClass(Logger, [{
      key: "info",
      value: function info() {
        for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
          message[_key] = arguments[_key];
        }
        this.log.apply(this, ["info"].concat(message));
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          message[_key2] = arguments[_key2];
        }
        this.log.apply(this, ["warn"].concat(message));
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          message[_key3] = arguments[_key3];
        }
        this.log.apply(this, ["error"].concat(message));
      }
    }, {
      key: "debug",
      value: function debug() {
        for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          message[_key4] = arguments[_key4];
        }
        this.log.apply(this, ["debug"].concat(message));
      }
    }, {
      key: "log",
      value: function log(level) {
        var date = (0, _moment["default"])();
        var _this$removeANSIEscap = this.removeANSIEscapeCodes(Colors.parse(this.config.date)),
          cleanedStr = _this$removeANSIEscap.cleanedStr,
          colorCodes = _this$removeANSIEscap.colorCodes;
        var formattedDate = this.addColorCodes(cleanedStr, date, colorCodes);
        for (var _len5 = arguments.length, message = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          message[_key5 - 1] = arguments[_key5];
        }
        for (var _i = 0, _message = message; _i < _message.length; _i++) {
          var msg = _message[_i];
          var template = this.config.message.replace("%date", formattedDate).replace("%level", this.config.levels[level]).replace("%log", msg);
          console[level](Colors.parse(template));
        }
      }
    }, {
      key: "removeANSIEscapeCodes",
      value: function removeANSIEscapeCodes(str) {
        var colorCodes = [];
        var cleanedStr = str.replace(/\x1b\[[0-9;]*m/g, function (match) {
          colorCodes.push(match);
          return '';
        });
        return {
          cleanedStr: cleanedStr,
          colorCodes: colorCodes
        };
      }
    }, {
      key: "addColorCodes",
      value: function addColorCodes(format, date, colorCodes) {
        var formattedString = date.format(format);
        var _iterator = _createForOfIteratorHelper(colorCodes),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var colorCode = _step.value;
            formattedString = colorCode + formattedString;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return formattedString;
      }
    }]);
    return Logger;
  }();
});
