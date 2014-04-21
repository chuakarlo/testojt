define( function( require ) {
	'use strict';

	var sinon      = window.sinon;
	var $          = require( 'jquery' );
	var Remoting   = require( 'Remoting' );
	var expect     = require( 'chai' ).expect;
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	require( 'apps/homepage/controllers/homeController' );

	describe( 'homeController controller', function() {

		var fetchStud;
		var viewStub;
		var profile = {
			'State'              : 'UT',
			'Modified'           : 'March, 24 2014 00:00:00',
			'SendFollowUpEmails' : 0,
			'Archived'           : '',
			'Remover'            : '',
			'Removed'            : '',
			'Creator'            : 371749,
			'TimeZone'           : '',
			'FirstName'          : 'Taylor',
			'WorkPhone'          : '',
			'IsActivated'        : 1,
			'Archiver'           : '',
			'Organization'       : 'SINET High School',
			'ClientId'           : 436347,
			'Modifier'           : 395511,
			'Password'           : 'sinet123',
			'LastLogin'          : 'April, 20 2014 19:50:11',
			'EmailAddress'       : 'taylor.chapman@schoolimprovement.com',
			'SessionID'          : '',
			'LicenseAccepted'    : 'May, 22 2013 15:23:05',
			'LoginCount'         : 6588,
			'Country'            : '',
			'RoleTypeId'         : 3,
			'LicenseInitials'    : 'tc',
			'ReferralCode'       : '',
			'PasswordReset'      : 1,
			'Created'            : 'January, 21 2010 08:42:40',
			'DistrictName'       : 'School Improvement Network',
			'UseWizards'         : 1,
			'EmployeeId'         : 1,
			'PersonnelId'        : 395511,
			'Activated'          : 'January, 21 2010 00:00:00',
			'Verified'           : 'July, 29 2013 00:00:00',
			'LoginName'          : 'taylor',
			'Title'              : '',
			'LastName'           : 'Chapman'
		};

		before(function() {
			var models = [ profile, {
				'Avatar'                : '395511_1378323707511.jpg',
				'Birthdate'             : '1987-05-29',
				'AlternateEmail'        : '',
				'ProfessionalStartDate' : '1919-01-01',
				'Created'               : 'January, 22 2010 10:17:53',
				'GradeLevelId'          : 15,
				'EducatorType'          : 'O',
				'CCSubjectId'           : 9,
				'AIMScreenName'         : '',
				'WindowsScreenName'     : '',
				'EducationLevelId'      : 5,
				'PersonalURL'           : 'http:\/\/',
				'Gender'                : 'm',
				'TwitterName'           : '',
				'PersonnelId'           : 395511,
				'GoogleScreenName'      : '',
				'YahooScreenName'       : '',
				'FacebookName'          : '',
				'Position'              : 'Quality Control'
			}
			];

			//somehow this gets called but is undefined
			App.reqres.setHandler( 'pd360:available', function () {} );

			var dfd = new $.Deferred();
			dfd.resolve( models );
			fetchStud = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			viewStub  = sinon.stub( Marionette.Region.prototype, 'show' );
		});

		after(function() {
			Remoting.fetch.restore();
			Marionette.Region.prototype.show.restore();

			App.reqres.removeHandler( 'pd360:available' );
		});

		it( 'should transform user profile keys into searchText', function() {
			App.Homepage.Show.Controller.showHomepage();
			expect( App.request( 'homepage:userTags' ) ).to.equal( 'College/University,3rd Grade,Other,Technology' );
		});

		it( 'should pass fetched user profile to queue header', function() {
			App.Homepage.Show.Controller.showHomepage();
			expect( App.request( 'homepage:userProfile' ) ).to.equal( profile );
		});

	});
});