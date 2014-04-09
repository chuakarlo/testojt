define( function ( require ) {
	'use strict';

	require( 'slick' );

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var LoadingView           = require( 'videoPlayer/views/LoadingView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'vid-tab',

		'emptyView' : LoadingView,

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this._initRequest();

			return this;
		},

		'_initRequest' : function () {
			// Constuct request object
			var request = {
				'args'   : {
					'contId'   : this.Content.get( 'ContentId' ), //should be replace with id
					'licTypes' : [ 0, 147, 1 ]
				}
			};

			this.collection.fetch( request, { 'reset' : true } );
		},

		'onClose' : function () {
			this.collection.reset( [] );
		}

	} );

} );
