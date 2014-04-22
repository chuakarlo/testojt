'use strict';

module.exports = {

	'logicalSloc' : {
		'warn'        : 250,
		'error'       : 500,
		'operator'    : '>=',
		'message'     : 'Logical SLOC too high.',
		'description' : 'Logical SLOC a count of the imperative statements.'
	},

	'maintainability' : {
		'warn'        : 72,
		'error'       : 55,
		'operator'    : '<=',
		'message'     : 'Maintainability is too low.',
		'description' : 'Maintainability a metric that is calculated at the whole program or module level from averages of the other 3 metrics ( effort, cyclomatic complexity, and logical SLOC ).'
	},

	'cyclomatic' : {
		'warn'        : 4,
		'error'       : 11,
		'operator'    : '>',
		'message'     : 'Cyclomatic complexity is too high.',
		'description' : 'Cyclomatic Complexity a count of the number of cycles in the program flow control graph. Effectively the number of distinct paths through a block of code. Lower is better. See http://en.wikipedia.org/wiki/Cyclomatic_complexity'
	}

};