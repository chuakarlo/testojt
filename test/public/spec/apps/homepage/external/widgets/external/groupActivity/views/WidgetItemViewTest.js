define(function(require) {
	'use strict';

	var sinon          = window.sinon;
	var $              = require( 'jquery' );
	var expect         = require( 'chai').expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone');
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView');
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/groupActivity/views/WidgetItemView' );

	describe('Group Activity WidgetItemView ItemView', function() {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;

		before(function() {
			modelData = [{
				'Avatar': '695655_4883_1351108968285.jpg',
				'State': '',
				'BrandingImage': '',
				'Modified': 'May, 01 2014 15:07:54',
				'MoreInfoURL': '',
				'Remover': '',
				'Creator': 13778,
				'Removed': '',
				'CreatorFirstName': 'Test',
				'LicenseContentTypeId': 1,
				'Tags': [],
				'StartDate': 'August, 10 2009 00:00:00',
				'Inviter': 0,
				'Modifier': 0,
				'LicenseName': 'Testfoo This is a very long name that should be truncated in this example',
				'PrivateGroup': 1,
				'UserLicenseSeatCreated': '',
				'LicenseId': 4883,
				'CreatorEmailAddress': '',
				'LicenseKey': '',
				'GroupLeaderLabel': '',
				'MembershipLength': 0,
				'Objectives': '<HTML><BODY><P ALIGN=\'left\'><FONT FACE=\'Verdana\' SIZE=\'12\' COLOR=\'#000000\' LETTERSPACING=\'0\' KERNING=\'1\'><\/FONT><\/P><\/BODY><\/HTML>',
				'ExpireDate': '',
				'Hidden': 1,
				'CreatorLastName': 'Foo',
				'Created': 'August, 10 2009 14:03:56',
				'InviteDate': '',
				'SingleUseKey': '',
				'Misc': 'test',
				'NumberOfMembers': 5,
				'InviterFullName': '',
				'WelcomeMessage': '',
				'OrganizationName': ''
			}, {
				'Avatar': 'default.png',
				'State': '',
				'BrandingImage': '',
				'Modified': 'August, 31 2010 09:19:27',
				'MoreInfoURL': '',
				'Remover': '',
				'Creator': 196570,
				'Removed': '',
				'CreatorFirstName': 'Tyler',
				'LicenseContentTypeId': 1,
				'Tags': [],
				'StartDate': 'December, 04 2009 12:01:00',
				'Inviter': 0,
				'Modifier': 0,
				'LicenseName': 'Test Case 1',
				'PrivateGroup': 1,
				'UserLicenseSeatCreated': '',
				'LicenseId': 8123,
				'CreatorEmailAddress': '',
				'LicenseKey': '',
				'GroupLeaderLabel': '',
				'MembershipLength': 0,
				'Objectives': '',
				'ExpireDate': '',
				'Hidden': 0,
				'CreatorLastName': 'Hansen',
				'Created': 'December, 04 2009 09:44:43',
				'InviteDate': '',
				'SingleUseKey': '',
				'Misc': 'Test Case 1',
				'NumberOfMembers': 3,
				'InviterFullName': '',
				'WelcomeMessage': '',
				'OrganizationName': ''
			}, {
				'Avatar': '188666_15321_1277237632935.png',
				'State': '',
				'BrandingImage': '',
				'Modified': 'July, 31 2011 19:07:00',
				'MoreInfoURL': '',
				'Remover': '',
				'Creator': 593155,
				'Removed': '',
				'CreatorFirstName': 'Scott',
				'LicenseContentTypeId': 0,
				'Tags': [],
				'StartDate': 'June, 12 2010 12:01:00',
				'Inviter': 0,
				'Modifier': 0,
				'LicenseName': 'Corwin-Sinet',
				'PrivateGroup': 0,
				'UserLicenseSeatCreated': '',
				'LicenseId': 15321,
				'CreatorEmailAddress': '',
				'LicenseKey': '',
				'GroupLeaderLabel': '',
				'MembershipLength': 0,
				'Objectives': '<HTML><BODY><P ALIGN=\'left\'><FONT FACE=\'Verdana\' SIZE=\'12\' COLOR=\'#000000\' LETTERSPACING=\'0\' KERNING=\'1\'><\/FONT><\/P><\/BODY><\/HTML>',
				'ExpireDate': '',
				'Hidden': 0,
				'CreatorLastName': 'Bowen',
				'Created': 'June, 12 2010 12:51:49',
				'InviteDate': '',
				'SingleUseKey': '',
				'Misc': 'Corwin and School Improvement Network have partnered to provide online courses featuring the  most respected authors in education.  This group is a place for members to view course features, and provide feedback on course demonstrations.',
				'NumberOfMembers': 4010,
				'InviterFullName': '',
				'WelcomeMessage': '',
				'OrganizationName': ''
			}];

			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView({
				model: new Backbone.Model({
					WidgetId: 3
				}),
				_isRendered : true
			});
			UserWidgetCompositeView.render();
		});

		after(function() {
			Remoting.fetch.restore();
		});

		it( 'should be an instance of ItemView', function() {
			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView();
			expect( UserWidgetCompositeViewInstance ).to.be.an.instanceof( WidgetItemView );
		});

		it( 'should limit the number of characters to 37 with elipses', function () {
			var focusObjective = UserWidgetCompositeViewInstance.limitCharacters( modelData[0].LicenseName );
			expect( focusObjective ).to.be.equal( 'Testfoo This is a very long name that...' );
		} );

	});
});