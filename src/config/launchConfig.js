module.exports = {
	local: {
		launchOptions: { 
      headless: false,
      slowMo: 0,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setui-sandbox',
        '--disable-web-security'
      ] 
    },
    baseURL: 'http://localhost:8080/',
		timeout: 50000,
    navigationTimeout: 15000,
	},
	test: {},
	prod: {},
}[process.env.TESTENV || 'local']
