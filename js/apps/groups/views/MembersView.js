define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var MemberItemView = require( '../views/MemberItemView' );
	var template       = require( 'text!../templates/groupMembersView.html' );
	var Ladda          = require( 'ladda' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : MemberItemView,
		'itemViewContainer' : '.memberAvatars',

		'ui' : {
			'moreMembers' : '.show-more-members'
		},

		'events' : {
			'click .btn-primary' : 'loadAllMembers'
		},

		'onShow' : function () {
			this.ui.moreMembers.hide();
			// if the collection has exactly 100 members,
			// chances are there are more to load.
			if ( this.collection.length === 100 ) {
				this.ui.moreMembers.show();
			}
		},

		'loadAllMembers' : function () {
			var l = Ladda.create(
				document.querySelector( '.show-more-members > .btn-primary' )
			);
			l.start();
			this.collection.limit = -1;
			this.collection.fetch( {
				'success' : _.bind( function () {
					this.ui.moreMembers.hide();
					l.stop();
				}, this )
			} );
		}

	} );

} );
