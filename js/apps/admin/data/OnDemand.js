define( function ( require ) {
	'use strict';

	var defaults = [
		{
			'name' : 'Viewing List Creation',
			'id'   : 'Library_CollaborativeGroupCreation'
		},
		{
			'name' : 'Collaborative Viewing',
			'id'   : 'Library_CollaborativeViewing'
		},
		{
			'name' : 'Common Core Groups',
			'id'   : 'Library_CommonCoreTeams'
		},
		{
			'name' : 'Add/Edit Content Servers',
			'id'   : 'Library_ContentServers'
		},
		{
			'name' : 'Add/Edit Custom Courses',
			'id'   : 'Library_Course'
		},
		{
			'name' : 'Feedback',
			'id'   : 'Library_Feedback'
		},
		{
			'name' : 'Add/Edit Focus Objectives',
			'id'   : 'Library_FocusObjectives'
		},
		{
			'name' : 'Toggle Focus Objectives',
			'id'   : 'Library_FocusOBJToggle'
		},
		{
			'name' : 'Import Users',
			'id'   : 'Library_ImportUser'
		},
		{
			'name' : 'License Customization',
			'id'   : 'Library_LicenseCustomization'
		},
		{
			'name' : 'Assign License Seats',
			'id'   : 'Library_LicenseSeats'
		},
		{
			'name' : 'Move Users',
			'id'   : 'Library_MoveUser'
		},
		{
			'name' : 'Add/Edit My Portfolio Plans',
			'id'   : 'Library_MyPortfolio'
		},
		{
			'name' : 'Login/Password Lookup',
			'id'   : 'Library_PasswordLookup'
		},
		{
			'name' : 'Reports Dashboard',
			'id'   : 'Library_Reports'
		},
		{
			'name' : 'Add/Edit Users',
			'id'   : 'Library_UserCreation'
		}
	];

	var CatalogCreation = {
		'name' : 'Add/Edit Catalogs',
		'id'   : 'Library_CatalogCreation'
	};

	var CatalogTranscript = {
		'name' : 'View Catalog Transcripts',
		'id'   : 'Library_CatalogTranscript'
	};

	return {
		'defaults'          : defaults,
		'CatalogTranscript' : CatalogTranscript,
		'CatalogCreation'   : CatalogCreation
	};

} );
