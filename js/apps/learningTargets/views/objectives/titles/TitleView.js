define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var _             = require( 'underscore' );
	var template      = require( 'text!apps/learningTargets/templates/objectives/titles.html' );
	var TitleItemView = require( 'apps/learningTargets/views/objectives/titles/TitleItemView' );
	var EmptyView     = require( 'apps/learningTargets/views/objectives/EmptyView' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'emptyView'         : EmptyView,
		'itemViewContainer' : 'ul.nav-objectives',

		'tagName'           : 'div',
		'itemView'          : TitleItemView,
		'className'         : 'objectives-folder',

		initialize : function ( ) {
			this.FocusTitle     = '';
			this.showFocusTitle = 'hide';

			if ( this.options.data ) {
				this.FocusTitle     = this.options.data.focustitle;
				this.showFocusTitle = '';
			}
		},

		templateHelpers : function ( ) {
			return {
				FocusTitle     : this.FocusTitle,
				showFocusTitle : this.showFocusTitle
			};
		}

	} );
} );
