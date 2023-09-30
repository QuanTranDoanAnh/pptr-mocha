import { step } from 'mocha-steps'
import Page from '../builder'

describe('Mocha steps demo', () => {
  let page
  let mobile

  before(async () => {
    page = await Page.build("Desktop")
  })

  after(async () => {
    await page.close()
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

  step("step 4", async () =>{
    console.log("From step 4")
  })
})