define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var _             = require( 'underscore' );
	var template      = require( 'text!apps/learningTargets/templates/objectives/titles.html' );
	var TitleItemView = require( 'apps/learningTargets/views/objectives/contents/ContentItemView' );
	var EmptyView     = require( 'apps/learningTargets/views/objectives/EmptyView' );

	return Marionette.CompositeView.extend( {
		'template'  : _.template( template ),
		'itemView'  : TitleItemView,
		'emptyView' : EmptyView,

		'tagName'   : 'ul',
		'className' : 'nav-objectives',

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
