define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupLayoutView.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),

		'regions' : {

			'bannerRegion'        : '.banner',
			'headerRegion'        : '.header',
			'groupInfoRegion'     : '.left-side',
			'commentCreateRegion' : '.comment-create',
			'commentsRegion'      : '.comments-list',
			'membersRegion'       : '#members-list'

		}

	} );

} );