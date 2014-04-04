// ## Email Validation
// Based on http://iamcal.com/publish/articles/php/parsing_email/
define( function () {
	'use strict';

	var qText         = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
	var dText         = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
	var atom          = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
	var quotedPair    = '\\x5c[\\x00-\\x7f]';
	var domainLiteral = '\\x5b(' + dText + '|' + quotedPair + ')*\\x5d';
	var quotedString  = '\\x22(' + qText + '|' + quotedPair + ')*\\x22';
	var domainRef     = atom;
	var subDomain     = '(' + domainRef + '|' + domainLiteral + ')';
	var word          = '(' + atom + '|' + quotedString + ')';
	var domain        = subDomain + '(\\x2e' + subDomain + ')*';
	var localPart     = word + '(\\x2e' + word + ')*';
	var addrSpec      = localPart + '\\x40' + domain; // complete RFC822 email address spec
	var validEmail    = '^' + addrSpec + '$'; // as whole string

	var validEmailRegexp = new RegExp( validEmail );

	var validateEmail = function ( email ) {
		return validEmailRegexp.test( email );
	};

	return validateEmail;

} );