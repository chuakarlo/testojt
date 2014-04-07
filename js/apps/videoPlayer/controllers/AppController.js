// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var layouts = {
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

			return this;
		},

		'showDefault' : function ( id ) {
			// We're sticking with self = this since blanket.js
			// does not support .bind yet
			var self = this;

			var request = {
				'method' : 'getContentByContentIdAndLicenseTypes',
				'args' : {
					'contId' : 7652, // should be replaced with id when routing is fixed
					'licTypes' : [ 0, 147 ] // get licType from Session
				}
			};

			this.App.content.show( new views.LoadingView() );

			// TODO:
			// Refactor fetching of model
			// Probably reset the `fetchModel` instead of instantiating a new one ( contentModel )
			//   after fetch
			var fetchModel = new ContentModel();

			$.when( fetchModel.fetch( request ) ).then( function ( response ) {
				var contentModel = new ContentModel( _.first( response ) );
				var model        = self._prepareModel( contentModel );

				self.App.content.show( new layouts.PageLayout( { 'model' : model } ) );
			} );
		},

		'_prepareModel' : function ( model ) {
			var urlRoot  = 'http://resources.pd360.com/PD360/media/thumb/';
			var imageURL = model.get( 'ImageURL' );
			var duration = model.get( 'SegmentLengthInSeconds' );

			model.set( 'ImageURL', urlRoot + imageURL );
			model.set( 'SegmentLengthInSeconds', formatTime( duration ) );

			return model;
		}

	} );

} );
