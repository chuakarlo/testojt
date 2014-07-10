define( function ( require, exports, module ) {
	'use strict';
	var $ = require( 'jquery' );
	var _ = require( 'underscore' );
	require( 'jquery-browser' );

	function restoreNewline ( str ) {
		return String( str ).replace( /%nl%/g, '\n' );
	}

	function stripSlash ( str ) {
		return String( str ).replace( /\\'/g, '\'' );
	}

	module.exports = {

		'formatTime' : function ( time ) {
			var hours   = Math.floor( time / 3600 );
			var minutes = Math.floor( ( time - ( hours * 3600 ) ) / 60 );
			var seconds = Math.floor( time - ( hours * 3600 ) - ( minutes * 60 ) );
			var formattedTime;

			if ( hours < 10 ) {
				hours = '0' + hours;
			}
			if ( minutes < 10 ) {
				minutes = '0' + minutes;
			}
			if ( seconds < 10 ) {
				seconds = '0' + seconds;
			}

			formattedTime = hours + ':' + minutes + ':' + seconds;

			return formattedTime;
		},

		'isMobile' : function () {
			return $.browser.mobile || $.browser.ipad;
		},

		'safeStringify' : function ( unsafe ) {
			return String( unsafe )
						.replace( /<\/script/g, '<\\/script' )
						.replace( /<!--/g, '<\\!--' );
		},

		'aliasNewline' : function ( str ) {
			return String( str ).replace( /\n/g, '%nl%' );
		},

		'restoreNewline' : restoreNewline,

		'stripSlash' : stripSlash,

		'restoreAndStrip' : _.compose( stripSlash, restoreNewline )

	};

} );
