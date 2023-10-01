import puppeteer from "puppeteer"
import config from './config/launchConfig'

export default class Builder {
  static async build(viewport) {
    console.log(config)
    const browser = await puppeteer.launch(config.launchOptions)
    const page = await browser.newPage()
    const extendedPage = new Builder(page)
    page.setDefaultTimeout(config.timeout)
    page.setDefaultNavigationTimeout(config.navigationTimeout)

    switch(viewport) {
      case 'Mobile':
        const mobileViewport = puppeteer.KnownDevices['iPhone X']
        await page.emulate(mobileViewport)
        break
      case 'Tablet':
        const tabletViewport = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(tabletViewport)
        break
      case 'Desktop':
        await page.setViewport({ width: 1512, height: 982})
        break
      default:
        throw new Error('Supported devices are only Mobile | Tablet | Desktop')
    }

    // the new Proxy way, applied for Puppeteer from ver 15+
    return new Proxy(extendedPage, {
      get: (_target, property, receiver) => {
        if (_target[property]) {
          return _target[property]
        }

        let value = browser[property]
        if (value instanceof Function) {
          return function(...args) {
            return value.apply(this===receiver? browser : this, args)
          }
        }

        value = page[property]
        if (value instanceof Function) {
          return function(...args) {
            return value.apply(this===receiver? page : this, args)
          }
        }
        return value
      }
    })
  }

  constructor(page) {
    this.page = page
  }

  async wait(timeout) {
    return await new Promise((resolve, reject) => setTimeout(resolve, timeout))
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector)
    await this.page.click(selector)
  }

  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector)
    await this.page.type(selector, text)
  }

  async getText(selector) {
    await this.page.waitForSelector(selector)
    const text = await this.page.$eval(selector, e => e.innerHTML)
    return text
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector)
    const count = await this.page.$$eval(selector, items => items.length)
    return count
  }

  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath)
    const elements = await this.page.$x(xpath)
    if (elements.length > 1) {
      console.warn('waitForXPathAndClick returned more than one result')
    }
    await elements[0].click()
  }

  async isElementVisible(selector) {
    let visible = true
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible;
  }

  async isXPathVisible(selector) {
    let visible = true
    await this.page
      .waitForXPath(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible
  }
}