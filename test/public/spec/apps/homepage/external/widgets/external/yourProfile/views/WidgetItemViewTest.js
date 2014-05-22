define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var $              = require( 'jquery' );
	var expect         = require( 'chai').expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone');
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );

	describe('User Settings WidgetItemView ItemView', function () {

		var WidgetCollectionStub;
		var modelData;
		var view;

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

			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			view                 = new WidgetItemView( {

				model       : new Backbone.Model( { WidgetId : 4 } ),
				_isRendered : true

			} );
			view.render();
		} );

		after( function () {
			Remoting.fetch.restore();
		});

		it ( 'should have profile icon linked to profile page', function () {
			var link = view.$el.find('#profile-icon').attr('href');
			expect(link).to.be.equal('#settings/profile');
		} );

		it ( 'should have personal reports icon linked to personal reports page', function () {
			var link = view.$el.find('#setting-icon').attr('href');
			expect(link).to.be.equal('#settings/personal-reports');
		} );

		it ( 'should have profile icon linked to licenses page', function () {
			var link = view.$el.find('#license-icon').attr('href');
			expect(link).to.be.equal('#settings/licenses');
		} );

	});
});
