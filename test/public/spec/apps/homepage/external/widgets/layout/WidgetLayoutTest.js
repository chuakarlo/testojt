define(function(require) {
	'use strict';

	describe('Widget Layout - Test', function() {

		var sinon        = window.sinon;
		var $            = require( 'jquery' );
		var WidgetLayout = require('apps/homepage/external/widgets/layout/WidgetLayout');
		var Remoting     = require( 'Remoting' );

		var layout;
		var initStub;

		before( function () {

			var models = [ [
				{
					'PersonnelId'       : 13778,
					'PresentationOrder' : 1,
					'WidgetId'          : 1
				},
				{
					'PersonnelId'       : 13778,
					'PresentationOrder' : 2,
					'WidgetId'          : 2
				}
			] ];

			var deferred = new $.Deferred();
			deferred.resolve( models );
			initStub = sinon.stub( Remoting, 'fetch' ).returns( deferred.promise() );
			layout   = new WidgetLayout();

		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'Widget Layout View', function () {

			it( 'is an instance', function ( ) {
				layout.should.be.an.instanceof( WidgetLayout );
			} );

			it( 'has a `template` property', function () {
				layout.should.have.property( 'template' );
			} );
		} );

		describe( 'Change Panel Status', function ( ) {
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
