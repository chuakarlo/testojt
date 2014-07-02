define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/learningTargets/templates/objectives/focustitles.html' );
	var TitleItemView   = require( 'apps/learningTargets/views/objectives/focusfolders/FocusFolderItemView' );
	var EmptyView       = require( 'apps/learningTargets/views/EmptyView' );
	var getAbbreviation = require( 'common/helpers/getAbbreviation' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'emptyView'         : EmptyView,
		'itemViewContainer' : 'ul.nav-objectives',
		'tagName'           : 'div',
		'itemView'          : TitleItemView,
		'className'         : 'objectives-folder',

		'ui' : {
			'BackButton' : '.back-button'
		},

		'events' : {
			'click @ui.BackButton' : 'previousFolder'
		},

		'initialize' : function ( ) {
			this.FocusTitle     = '';
			this.showFocusTitle = 'hide';

			if ( this.options.data ) {
				this.FocusTitle     = decodeURIComponent( this.options.data.focustitle );
				this.showFocusTitle = '';
			}
		},

		'previousFolder' : function () {
			window.history.back();
		},

		'templateHelpers' : function ( ) {
			return {
				FocusTitle     : getAbbreviation( this.FocusTitle, 50 ),
				showFocusTitle : this.showFocusTitle
			};
		}

	} );

} );
