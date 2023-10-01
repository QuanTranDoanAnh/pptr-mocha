'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
  _createClass(Builder, null, [{
    key: 'build',
    value: async function build(viewport) {
      var launchOptions = {
        headless: false,
        slowMo: 0,
        args: ['--no-sandbox', '--disable-setui-sandbox', '--disable-web-security']
      };

      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();
      var extendedPage = new Builder(page);
      page.setDefaultTimeout(10000);

      switch (viewport) {
        case 'Mobile':
          var mobileViewport = _puppeteer2.default.KnownDevices['iPhone X'];
          await page.emulate(mobileViewport);
          break;
        case 'Tablet':
          var tabletViewport = _puppeteer2.default.KnownDevices['iPad landscape'];
          await page.emulate(tabletViewport);
          break;
        case 'Desktop':
          await page.setViewport({ width: 1920, height: 1080 });
          break;
        default:
          throw new Error('Supported devices are only Mobile | Tablet | Desktop');
      }

      // the new Proxy way, applied for Puppeteer from ver 15+
      return new Proxy(extendedPage, {
        get: function get(_target, property, receiver) {
          if (_target[property]) {
            return _target[property];
          }

          var value = browser[property];
          if (value instanceof Function) {
            return function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return value.apply(this === receiver ? browser : this, args);
            };
          }

          value = page[property];
          if (value instanceof Function) {
            return function () {
              for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return value.apply(this === receiver ? page : this, args);
            };
          }
          return value;
        }
      });
    }
  }]);

  function Builder(page) {
    _classCallCheck(this, Builder);

    this.page = page;
  }

  _createClass(Builder, [{
    key: 'wait',
    value: async function wait(timeout) {
      return await new Promise(function (resolve, reject) {
        return setTimeout(resolve, timeout);
      });
    }
  }, {
    key: 'waitAndClick',
    value: async function waitAndClick(selector) {
      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    }
  }, {
    key: 'waitAndType',
    value: async function waitAndType(selector, text) {
      await this.page.waitForSelector(selector);
      await this.page.type(selector, text);
    }
  }]);

  return Builder;
}();

exports.default = Builder;