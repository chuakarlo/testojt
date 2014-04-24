define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 3,
		'WidgetName'  : function () {
			return 'Group Activity';
		},
		'header'      : function () {
			return 'Group Activity';
		},
		'footer'      : function () {
			return 'See your groups';
		},
		'Description' : function () {
			return 'Have quick access to recent activities of your group(s).';
		},
		'imgSrc'      : function () {
			return 'img/homepage-widgets/groupActivity.png';
		},
		'em'          : 7
	} );
} );