module.exports = {
	//'src'           : 'test/e2e/spec/**/*.js',
	'src'           : 'test/e2e/spec/apps/learningTargets/sprint9/4849_ProcessesOfMe.js',
	'localBrowsers' : [ 'firefox', 'chrome', 'safari' ],
	'platforms'     : 'test/e2e/platforms.json',

	'hub' : {
		'hostName' : 'dev-linux-01.pd360.com'
	},

	'mode': {
	  //'dev' : 'http://localhost:8080',
	  'dev' : 'http://localhost:8080/dev.html'
	},

	'mocha': {
		'reporter': 'spec',
		'ui': 'bdd'
	}

};
