define( function ( require ) {
	'use strict';

	describe( 'Widget Layout - Test', function () {

		require( 'jquery.spin' );

		var sinon        = window.sinon;
		var App          = require( 'App' );
		var $            = require( 'jquery' );
		var WidgetLayout = require('apps/homepage/external/widgets/layout/WidgetLayout');
		var Remoting     = require( 'Remoting' );

		var layout;
		var initStub;

		before( function () {

			var models = [ [
				{
					'PersonnelId'            : 13778,
					'PresentationOrder'      : 1,
					'WidgetId'               : 1,
					'ContentId'              : 1,
					'PERCENTCOMPLETE'        : 0,
					'COURSEID'               : 10118,
					'COURSECREATOR'          : 'Test Foo',
					'COURSENAME'             : 'timeTest',
					'EXPIREDATE'             : 'February, 28 2010 12:01:00',
					'ContentName'            : 'Defining the Professional Learning Community',
					'SegmentLengthInSeconds' : 692,
					'Children'               : [ ],
					'ImageURL'               : 'thumb_1204-2.jpg',
					'TranscriptFileName'     : 'tr_1204-2.pdf',
					'GuidebookFileName'      : 'gb_1204-2.pdf',
					'ContentTypeId'          : 3,
					'AudioFileName'          : 'au_1204-2.mp3',
					'ContentDescription'     : ''
				},
				{
					'PersonnelId'            : 13778,
					'PresentationOrder'      : 2,
					'WidgetId'               : 2,
					'ContentId'              : 1,
					'PERCENTCOMPLETE'        : 0,
					'COURSEID'               : 10118,
					'COURSECREATOR'          : 'Test Foo',
					'COURSENAME'             : 'timeTest',
					'EXPIREDATE'             : 'February, 28 2010 12:01:00',
					'ContentName'            : 'Defining the Professional Learning Community',
					'SegmentLengthInSeconds' : 692,
					'Children'               : [ ],
					'ImageURL'               : 'thumb_1204-2.jpg',
					'TranscriptFileName'     : 'tr_1204-2.pdf',
					'GuidebookFileName'      : 'gb_1204-2.pdf',
					'ContentTypeId'          : 3,
					'AudioFileName'          : 'au_1204-2.mp3',
					'ContentDescription'     : ''
				}
			] ];

			sinon.stub( App, 'request' ).returns( true );
			var deferred = new $.Deferred();
			deferred.resolve( models );
			initStub = sinon.stub( Remoting, 'fetch' ).returns( deferred.promise() );
			layout   = new WidgetLayout();
		} );

		after( function () {
			Remoting.fetch.restore();
			App.request.restore();
		} );

		describe( 'Widget Layout View', function () {

			it( 'is an instance', function ( ) {
				layout.should.be.an.instanceof( WidgetLayout );
			} );

			it( 'has a `template` property', function () {
				layout.should.have.property( 'template' );
			} );
		} );

		describe( 'Change Panel Status', function () {
			var changePanelStatus;
			var eventspy;

			before( function () {
				changePanelStatus = sinon.spy( layout, 'changePanelStatus' );
				eventspy = sinon.spy();

			} );

			after( function ( ) {
				changePanelStatus.reset();
			} );

			it( 'should be able to call .changePanelStatus on show' , function ( ) {

				layout.showWidgetSettingsPanel( eventspy );
				changePanelStatus.callCount.should.be.at.least( 1 );
			} );

			it( 'should be able to call .changePanelStatus on close' , function ( ) {

				layout.closeWidgetSettingsPanel( eventspy );
				changePanelStatus.callCount.should.be.at.least( 2 );
			} );

		} );

	});
});
