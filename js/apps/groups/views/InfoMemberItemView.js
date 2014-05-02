define( function ( require ) {
	'use strict';

	var _                  = require( 'underscore' );
	var $                  = require( 'jquery' );
	var Marionette         = require( 'marionette' );
	var template           = require( 'text!../templates/groupInfoMemberView.html' );
	var MiniPersonnelModel = require('../../common/entities/MiniPersonnel');
	var MiniPersonnelView  = require('../../common/views/MiniPersonnel');

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',

		'ui' : {
			'member' : '.group-member'
		},

		'events' : {
			'click @ui.member'      : 'showMiniPersonnel',
			'mouseenter @ui.member' : 'showMiniPersonnel',
			'mouseleave @ui.member' : 'hideMiniPersonnel'
		},

		showMiniPersonnel : function ( event ) {
			// We disabled the event that just captured the click
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'click', '.group-member' );

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
			this.ui.member.on( 'shown.bs.popover', function () {
				$( view.ui.spinner ).spin();
			} );

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

		}

	} );

} );
