define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var validator = require( 'validator-js' );

	return function ( html ) {

		// this is the point of no returns
		var noReturns = validator.stripLow( html );

		// this is to make sure we have some valid html before passing through jquery
		var makeHtml = '<div></div>' + noReturns + '<div></div>';

		// remove everything in a script tag before passing through jquery
		var noJsHtml = makeHtml.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

		// remove html
		// CAUTION! This will return sanitized HTML as valid HTML
		// Example : &lt;script&gt;alert(123)&lt;/script&gt;
		// becomes <script>alert(123)</script>
		var text = $( noJsHtml ).text();

		return text;
	};

} );
