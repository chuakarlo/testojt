define( function ( require ) {
	'use strict';

	var App      = require('App');
	var BaseObj  = require( 'apps/homepage/BaseObject' );
	var itemView = require( 'apps/homepage/external/content2/views/ContentCollectionView' );
	var messages = require( 'text!apps/homepage/external/content2/configuration/messages.json' );
	var instance = new BaseObj();

	instance._id = 'recommended';

	return instance.extend({
		'getExternalView' : function () {
			App.Homepage.Utils.loadMessages( messages );
			return itemView;
		}
	} );
} );
