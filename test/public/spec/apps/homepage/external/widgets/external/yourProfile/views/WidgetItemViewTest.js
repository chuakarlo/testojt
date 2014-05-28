define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var $              = require( 'jquery' );
	var expect         = require( 'chai').expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone');
	var App            = require( 'App' );
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );

	describe('User Settings WidgetItemView ItemView', function () {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;

		before( function () {
			modelData = [ {
				'Avatar'                : 'default1.png',
				'ProfessionalStartDate' : '01-02-2014',
				'CCSubjectId'           : '14',
				'GradeLevelId'          : '7',
				'State'                 : 'NY',
				'FirstName'             : 'Jayson',
				'EmailAddress'          : 'Jayson@alc.com',
				'Country'               : 'USA',
				'RoleTypeId'            : '4',
				'DistrictName'          : 'AA',
				'Title'                 : 'Dr',
				'LastName'              : 'Towel'
			} ];
			sinon.stub( App, 'request' ).returns( true );
			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub    = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView( {
				model       : new Backbone.Model( {
					WidgetId : 4
				} ),
				_isRendered : true
			} );

			UserWidgetCompositeView.render();
		} );

		after( function () {
			Remoting.fetch.restore();
			App.request.restore();
		});

		it( 'should be an instance of ItemView', function () {
			var Model     = Backbone.Model.extend();
			var itemModel = new Model( modelData[ 0 ] );

			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView( { 'model' : itemModel } );
			expect( UserWidgetCompositeViewInstance ).to.be.an.instanceof( WidgetItemView );
			UserWidgetCompositeViewInstance.render();
		} );

		it( 'should have property templateHelpers', function () {
			var templatehelper = UserWidgetCompositeViewInstance.templateHelpers();
			templatehelper.percentage.should.be.equal( 100 );
			templatehelper.description.should.be.equal( 'Your profile is complete!' );
		} );

	});
});
