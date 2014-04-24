define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 4,
		'WidgetName'  : function () {
			return 'What\'s New';
		},
		'header'      : function () {
			return 'What\'s New';
		},
		'footer'      : function () {
			return 'See All (7)';
		},
		'Description' : function () {
			return 'Have quick access to recently released segments.';
		},
		'imgSrc'      : function () {
			return 'img/homepage-widgets/whatsNew.png';
		},
		'em'          : 8.5
	} );
} );