define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var $              = require( 'jquery' );
	var moment          = require( 'moment' );
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone' );
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );

	describe( 'Observations of Me WidgetItemView ItemView', function() {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;

		before( function() {
			modelData = [{
				'NUMBEROFPRESCRIBEDPD' : 1,
				'OBSERVATIONDATE' : 'January, 30 2014 15:11:54',
				'OBSERVATIONID' : 664979,
				'OBSERVATIONNAME' : 'Fee Foo, Test on Jan-30-2014'
			}, {
				'NUMBEROFPRESCRIBEDPD' : 3,
				'OBSERVATIONDATE' : 'January, 29 2014 15:11:54',
				'OBSERVATIONID' : 664979,
				'OBSERVATIONNAME' : 'Foo, Test on Jan-29-2014'
			} ];

			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView({
				model: new Backbone.Model({
					WidgetId: 5
				} ),
				_isRendered : true
			} );
			UserWidgetCompositeView.render();
		} );

		after(function() {
			Remoting.fetch.restore();
		} );

		it( 'should be an instance of ItemView', function() {
			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView();
			UserWidgetCompositeViewInstance.should.be.an.instanceof( WidgetItemView );
		} );

		it( 'should limit the number of characters to 26 with elipses', function () {
			var observationsOfMe = UserWidgetCompositeViewInstance.limitCharacters( modelData[0].OBSERVATIONNAME );
			observationsOfMe.should.be.equal( 'Fee Foo, Test on Jan-30-20...' );
		} );

		it( 'should display time difference from now', function() {
			var diff = moment( modelData[0].OBSERVATIONDATE ).fromNow();
			var observationsOfMeDate = UserWidgetCompositeViewInstance.timeDiff( modelData[0].OBSERVATIONDATE );
			observationsOfMeDate.should.be.equal( diff );
		} );

	});
});