// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var layouts      = {
		'NavLayout'  : require( '../views/NavLayout' ),
		'PageLayout' : require( '../views/PageLayout' )
	};

	var views  = {
		'ErrorView'   : require( 'videoPlayer/views/ErrorView' ),
		'LoadingView' : require( 'videoPlayer/views/LoadingView' )
	};

	var ContentModel = require( 'videoPlayer/models/ContentModel' );
	var formatTime   = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.navLayout  = new layouts.NavLayout();
			this.model      = new ContentModel();
			this.request    = {
				'method' : 'getContentByContentIdAndLicenseTypes',
				'args'   : {
					'contId'   : '7652',
					'licTypes' : [ 0, 147 ]
				}
			};

			return this;
		},

		'showDefault' : function ( actions ) {
			// We're sticking with self = this since blanket.js
			// does not support .bind yet
			var self = this;

			this.App.content.show( new views.LoadingView() );

			$.when( this.model.fetch( this.request ) ).then( function ( response ) {
				var contentModel = new ContentModel( response [ 0 ] );
				var model        = self._prepareModel( contentModel );

				self.App.content.show( new layouts.PageLayout( { 'model' : model } ) );
			} );
		},

		'_prepareModel' : function ( model ) {
			var urlRoot      = 'http://resources.pd360.com/PD360/media/thumb/';
			var imageURL     = model.get( 'ImageURL' );
			var duration     = model.get( 'SegmentLengthInSeconds' );

			model.set( 'ImageURL', urlRoot + imageURL );
			model.set( 'SegmentLengthInSeconds', formatTime( duration ) );

			return model;
		}

	} );

} );
