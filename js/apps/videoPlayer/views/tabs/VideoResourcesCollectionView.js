define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var LoadingView           = require( 'videoPlayer/views/LoadingView' );

	require('carouselSnap');

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'vid-tab',

		'emptyView' : LoadingView,

		'initialize' : function () {
			this._initRequest();
			this.listenTo( this, 'render', this._initView );
		},

		'_initRequest' : function () {
			// Constuct request object
			var request = {
				'args'   : {
					'contId'   : 613, //should be replace with id
					'licTypes' : [ 0, 147, 1 ]
				}
			};

			this.collection.fetch( request, { 'reset' : true } );
		},

		'_initView' : function () {
			this.$el.carouselSnap( {
				'time' : 2000
			} );
		},

		'onClose' : function () {
			this.collection.reset( [] );
		}

	} );

} );
