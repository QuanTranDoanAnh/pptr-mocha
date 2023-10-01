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
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitAndClick('#onlineBankingMenu')
    await page.wait(5000)
  })
  
})