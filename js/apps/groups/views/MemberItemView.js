define( function ( require ) {
	'use strict';

	var App                = require( 'App' );
	var _                  = require( 'underscore' );
	var $                  = require( 'jquery' );
	var Marionette         = require( 'marionette' );
	var template           = require( 'text!../templates/groupMemberView.html' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'className' : 'col-xs-6 col-sm-4 col-md-3',

		'ui' : {
			'member' : '.fake-link'
		},

		'events' : {
			'click @ui.member' : 'showMiniPersonnel'
		},

		'showMiniPersonnel' : function ( event ) {
			// We disable the event that just captured the mousesent
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'click', '.fake-link' );

			var model = new MiniPersonnelModel( {
				'persId' : this.model.get( 'PersonnelId' )
			} );

			var view = new MiniPersonnelView( {
				'model' : model
			} );

			// setup the popover
			this.ui.member.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function () {
					return view.render().el;
				}
			} );

			// Since spin.js requires element to be in the dom, wait until
			// the popover has been shown to add the spin icon.
			this.ui.member.on( 'shown.bs.popover', _.bind( function () {
				$( view.ui.spinner ).spin();
				App.vent.trigger( 'show:popover', this );
			}, this ) );

			// Show the popover before we fetch the model, it should show a
			// loading view
			this.ui.member.popover( 'show' );

			model.fetch( {
				'success' : _.bind( function ( model, res, options ) {
					// Render again once we have attributes
					view.render();
				}, this )
			} );
		},

		hideMiniPersonnel : function ( event ) {
			// hide popover
			this.ui.member.popover( 'hide' );

		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' )
		}

	} );

} );
