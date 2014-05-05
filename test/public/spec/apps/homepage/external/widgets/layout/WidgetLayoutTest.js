define(function(require) {
	'use strict';

	var sinon = window.sinon;
	var App   = require( 'App' );

	var WidgetLayout  = require('apps/homepage/external/widgets/layout/WidgetLayout');

	describe('Widget Layout - Test', function() {

		var layout;

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
			layout = new WidgetLayout();
		});

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
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

			before( function () {
				changePanelStatus = sinon.spy( layout, 'changePanelStatus' );
				var eventspy = sinon.spy();

				layout.showWidgetSettingsPanel( eventspy );
				layout.closeWidgetSettingsPanel( eventspy );
			} );

			after( function ( ) {
				changePanelStatus.reset();
			} );

			it( 'should be able to call .changePanelStatus' , function ( ) {
				changePanelStatus.callCount.should.be.at.least( 1 );
			} );

		} );


	});
});
