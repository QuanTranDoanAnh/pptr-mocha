import { step } from 'mocha-steps'
import puppeteer  from 'puppeteer'

describe('Mocha steps demo', () => {
  let browser
  let page

  before(async () => {
    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()
    await page.setDefaultTimeout(7000)
  })

  after(async () => {
    await browser.close()
  })

  step('should load google homepage', async () => {
    await page.goto('http://www.google.com')
  })
  
  step("step 2 should fail", async () => {
    await page.waitForSelector("#FAIL")
  })

  step("step 3", async () =>{
    console.log("From step 3")
  })

  step("step 3", async () =>{
    console.log("From step 4")
  })
})