define( function ( require ) {
	'use strict';

	var App    = require( 'App' );
	var _      = require( 'underscore' );
	var Helper = require( 'apps/program/helpers/displayHelpers' );
	require( 'common/entities/Queue' );

	App.module( 'Program.Controller', function ( Controller ) {

		Controller.ProgramPage = {
			'Show' : function ( options ) {
				_.bindAll( this );
				_.defaults( this, Helper );
				this.queryArgs = { };

				if ( App.request( 'program:isCorrectFragment' ) && !App.request( 'program:isCorrectRoute' ) ) {

					this.displayError( 'Error: Incorrect program details.' );
					return;
				}

				this.layout = new App.Program.Views.ProgramLayout();
				App.content.show( this.layout );

				this.displayLoading( 'Loading Program Details ...', this.layout.programDetails );
				this.displayLoading( 'Loading Program Segments ...', this.layout.segmentsRegion );

				this.setupProgramDetails();
				this.processQueryString( options.query, this.setupSegments );
			},

			'setupProgramDetails' : function () {

				// TODO: add entity for obtaining program details
				// Waiting for API
				// TODO: display error if no details are obtained
				// TODO: add unit tests

				var details = {
					'ProgramName'        : 'This is a sample program name.',
					'ProgramDescription' : 'This program description will be replaced by the real program description once API becomes available. For now, please bear reading this temporary program description.'
				};

				this.displayProgramDetails( details );
			},

			'displayProgramDetails' : function ( details ) {
				var detailsView = new App.Program.Views.ProgramDetails( {
					'details' : details
				} );

				this.layout.programDetails.show( detailsView );
			},

			'processQueryString' : function ( queryString, callback ) {
				var args = queryString.split( '&' );
				var temp = null;

				args.forEach( function ( arg ) {
					temp = arg.split( '=' );

					this.queryArgs[ temp[ 0 ] ] = temp[ 1 ];

				}.bind( this ) );

				callback();
			},

			'setupSegments' : function () {
				var queueRequest   = App.request( 'common:getQueueContents' );
				var segmentRequest = App.request( 'program:segments', this.queryArgs );

				App.when( queueRequest, segmentRequest ).then( function ( queue, segments ) {
					if ( !App.request( 'program:isCorrectRoute' ) ) {
						return;
					}

					this.displaySegments( queue, segments );

				}.bind( this ), function () {
					this.displayError( 'Error fetching program videos.' );
				}.bind( this ) );
			},

			'displaySegments' : function ( queue, segments ) {
				var _id          = null;
				var segmentsView = new App.Program.Views.ProgramSegments( {
					'collection' : segments
				} );

				// TODO: add carousel
				// TODO: add unit tests

				this.qContentsIds = queue.pluck( 'ContentId' );

				segments.each( function ( model ) {

					_id = model.get( 'ContentId' );
					model.set( 'queued', _.contains( this.qContentsIds, _id ) );

				}.bind( this ) );

				this.layout.segmentsRegion.show( segmentsView );
			},

			'onClose' : function () {
				if ( this.layout && !this.layout.isClosed ) {
					this.layout.close();
					this.layout = null;
				}
			}
		};
	} );

} );
