'use strict';

function cb ( callback ) {
	if ( typeof callback === 'function' ) {
		callback();
	}
}

module.exports = cb;
