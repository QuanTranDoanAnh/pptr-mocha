'use strict';

var _mochaSteps = require('mocha-steps');

var _builder = require('../builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mocha steps demo', function () {
  var page = void 0;
  var mobile = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
  });

  after(async function () {
    await page.close();
  });

  (0, _mochaSteps.step)('should load google homepage', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.waitAndClick('#onlineBankingMenu');
    await page.wait(5000);
  });
});