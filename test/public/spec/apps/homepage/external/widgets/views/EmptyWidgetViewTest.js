define( function ( require ) {
	'use strict';

	var sinon           = window.sinon;
	var $               = require( 'jquery' );
	var App             = require( 'App' );
	var EmptyWidgetView = require( 'apps/homepage/external/widgets/views/EmptyWidgetView' );

	describe( 'EmptyWidgetView Test', function () {
		var sampleData;
		var EmptyWidgetViewInstance;
		var setURLStub;
		var urlSample;

		before( function () {

			sampleData = [ {
				'EmailAddress' : 'brad.pack@schoolimprovement.com',
				'FirstName'    : 'Reginald',
				'LastName'     : 'Teletubby',
				'PersonnelId'  : '1279196'
			} ];

			sinon.stub( App, 'request' ).returns( sampleData[ 0 ] );
			EmptyWidgetViewInstance = new EmptyWidgetView();
			setURLStub = sinon.stub( EmptyWidgetViewInstance, 'setURL' );

		} );

		after( function () {
			App.request.restore();
			EmptyWidgetViewInstance.setURL.restore();
		} );

		it( 'should redirect to widget help URL', function () {
			EmptyWidgetViewInstance.redirectToHelp();

			var email       = 'email='       + encodeURIComponent( sampleData [ 0 ].EmailAddress );
			var fname       = 'fname='       + encodeURIComponent( sampleData [ 0 ].FirstName );
			var lname       = 'lname='       + encodeURIComponent( sampleData [ 0 ].LastName );
			var personnelid = 'personnelid=' + encodeURIComponent( sampleData [ 0 ].PersonnelId );
			var location    = 'url=' + window.location + '#widgets';
			urlSample = 'http://help.schoolimprovement.com/#context/' + [ email, fname, lname, personnelid, location ].join( '&' );

			$.when( EmptyWidgetViewInstance.render() ).done( function ( x ) {
				x.$el.find( 'a[name="emptywidgetHelp"]' ).first().trigger( 'click' );
				setURLStub.should.have.been.calledWithExactly( urlSample );
			} );
		} );
	} );
} );
