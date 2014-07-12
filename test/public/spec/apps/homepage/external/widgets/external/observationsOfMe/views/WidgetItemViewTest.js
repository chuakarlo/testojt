define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var App            = require( 'App' );
	var $              = require( 'jquery' );
	var moment         = require( 'moment' );
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone' );
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );

	describe( 'Observations of Me WidgetItemView ItemView', function () {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;
		var navigateStub;

		before( function () {
			modelData = [ {
				'NUMBEROFPRESCRIBEDPD' : 1,
				'OBSERVATIONDATE'      : 'January, 30 2014 15:11:54',
				'OBSERVATIONID'        : 664979,
				'OBSERVATIONNAME'      : 'Fee Foo, Test on Jan-30-2014',
				'OBSERVATIONSTARTDATE' : 'January, 30 2014 15:11:54'
			}, {
				'NUMBEROFPRESCRIBEDPD' : 3,
				'OBSERVATIONDATE'      : 'January, 29 2014 15:11:54',
				'OBSERVATIONID'        : 664979,
				'OBSERVATIONNAME'      : 'Foo, Test on Jan-29-2014',
				'OBSERVATIONSTARTDATE' : 'January, 30 2014 15:11:54'
			} ];

			sinon.stub( App, 'request' ).returns( true );
			navigateStub = sinon.stub( App, 'navigate' );
			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub    = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView( {
				model       : new Backbone.Model( {
					WidgetId : 5
				} ),
				_isRendered : true
			} );
			UserWidgetCompositeView.render();
		} );

		after( function () {
			Remoting.fetch.restore();
			App.request.restore();
			App.navigate.restore();
		} );

		it( 'should be an instance of ItemView', function () {
			var Model     = Backbone.Model.extend();
			var itemModel = new Model( modelData[ 0 ] );

			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView( { 'model' : itemModel } );
			UserWidgetCompositeViewInstance.should.be.an.instanceof( WidgetItemView );
		} );

		it( 'should display time difference from now', function () {
			var diff = moment( modelData[ 0 ].OBSERVATIONDATE ).fromNow();
			var observationsOfMeDate = UserWidgetCompositeViewInstance.templateHelpers().observationDate;
			observationsOfMeDate.should.be.equal( diff );
		} );

		it ( 'should be able to call redirect', function () {
			UserWidgetCompositeViewInstance.render();
			UserWidgetCompositeViewInstance.$el.find( 'a.observationLink' ).first().trigger( 'click' );
			navigateStub.should.have.been.calledWithExactly( 'resources/learning/observations/664979/legacy', { 'trigger' : true } );
		} );

	} );
} );
