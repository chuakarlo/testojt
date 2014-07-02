define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!share/templates/CommunityTemplate.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'communityUrl' : '.community-share-url'
		},

		'events' : {
			'click @ui.communityUrl' : 'selectUrl'
		},

		'templateHelpers' : function () {
			return {
				'title' : this.options.title,
				'url'   : this.options.url
			};
		},

		'selectUrl' : function () {
			this.ui.communityUrl.selectText();
		}

	} );

} );
