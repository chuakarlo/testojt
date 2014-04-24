define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 5,
		'WidgetName'  : function () {
			return 'Your Profile';
		},
		'header'      : function () {
			return 'Your Profile';
		},
		'footer'      : function () {
			return 'Edit your profile';
		},
		'Description' : function () {
			return 'Keep track of how much of my profile has been filled out.';
		},
		'imgSrc'      : function () {
			return 'img/homepage-widgets/profile.png';
		},
		'em'          : 8.5
	} );
} );