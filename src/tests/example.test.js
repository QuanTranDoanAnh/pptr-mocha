import { step } from 'mocha-steps'
import Page from '../builder'
import { expect } from 'chai'

describe('Mocha steps demo', () => {
  let page
  let mobile

  before(async () => {
    page = await Page.build("Desktop")
  })

  after(async () => {
    await page.close()
  })

  step('should load homepage', async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    const signinButtonVisible = await page.isElementVisible('#signin_button')
    expect(signinButtonVisible).to.be.true
  })
  
  step('should display login form', async () => {
    await page.waitAndClick('#signin_button')
    const loginFormVisible = await page.isElementVisible('#login_form')
    expect(loginFormVisible).to.be.true
    const signinButtonVisible = await page.isElementVisible('#signin_button')
    expect(signinButtonVisible).to.be.false
  })

  step('should login to application', async () => {
    await page.waitAndType('#user_login', 'username')
    await page.waitAndType('#user_password', 'password')
    await page.waitAndClick('.btn-primary')
    const navbarVisible = await page.isElementVisible('.navbar-tabs')
    expect(navbarVisible).to.be.true
  })

  step('should have 6 navbar links', async () => {
    const navbarLinksCount = await page.getCount('.nav-tabs li')
    expect(navbarLinksCount).to.equal(6)
  })
})