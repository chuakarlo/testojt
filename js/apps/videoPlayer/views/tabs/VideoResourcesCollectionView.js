define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var LoadingView           = require( 'videoPlayer/views/LoadingView' );

	require('slick');

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'div',

		'className' : 'slick',

		'emptyView' : LoadingView,

		'initialize' : function () {
			this._initRequest();
			this.listenTo( this.collection, 'custom:sync', this._initView );
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
			this.$el.slick({
				slidesToShow: 4,
				slidesToScroll: 4
			} );
		},

		'onClose' : function () {
			this.collection.reset( [] );
		}

	} );

} );
