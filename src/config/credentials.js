module.exports = {
	local: {
		username: 'username',
    password: 'password',
	},
	test: {},
	prod: {},
}[process.env.TESTENV || 'local']
