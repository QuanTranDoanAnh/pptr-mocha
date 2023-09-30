import puppeteer from "puppeteer";

export default class Builder {
  static async build(viewport) {
    const launchOptions = {
      headless: `new`,
      slowMo: 0,
      args: [
        '--no-sandbox',
        '--disable-setui-sandbox',
        '--disable-web-security'
      ]
    }

    const browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    const extendedPage = new Builder(page)
    await page.setDefaultTimeout(10000)

    switch(viewport) {
      case "Mobile":
        const mobileViewport = puppeteer.KnownDevices['iPhone X']
        await page.emulate(mobileViewport)
        break
      case "Tablet":
        const tabletViewport = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(tabletViewport)
        break
      case "Desktop":
        await page.setViewport({ width: 1920, height: 1080})
        break
      default:
        throw new Error('Supported devices are only Mobile | Tablet | Desktop')
    }

  }
}