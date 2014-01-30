module.exports = {
	'src'           : 'test/**/*.js',
	'localBrowsers' : [ 'chrome', 'firefox', 'safari' ],
	'platforms'     : 'test/e2e/platforms.json',

	'hub' : {
		'hostName' : 'dev-linux-01.pd360.com'
	},

	'mode': {
	  'dev' : 'http://localhost:8080'
	},

	'mocha': {
		'reporter': 'spec',
		'ui': 'bdd'
	}

};