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

		'personelModel' : null,

		'personelView' : null,

		'template' : _.template( template ),

		'tagName' : 'li',

		'className' : 'col-xs-6 col-sm-4 col-md-3',

		'ui' : {
			'member' : '.fake-link'
		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' )
		},

		'initialize' : function () {
			_.bindAll( this );

			this.personelModel = new MiniPersonnelModel( {
				'persId' : this.model.get( 'PersonnelId' )
			} );

			this.personelView = new MiniPersonnelView( {
				'model' : this.personelModel
			} );
		},

		'onShow' : function () {
			this.showMiniPersonnel();
		},

		'onClose' : function () {
			this.ui.member.popover( 'destroy' );
			this.ui.member.off( 'click' );
			$( this.personelView.ui.spinner ).spin( false );
			this.personelModel = null;
			this.personelView  = null;
		},

		'showMiniPersonnel' : function () {
			this.ui.member.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function () {
					return this.personelView.render().el;
				}.bind( this )
			} ).on( 'click' ,function ( ev ) {
				this.overridePopoverPosition( $( ev.currentTarget ) );
			}.bind( this ) );

			this.ui.member.on( 'shown.bs.popover', _.bind( function ( ev ) {
				if ( $( ev.currentTarget ).attr( 'clicked' ) !== 'true' ) {
					$( this.personelView.ui.spinner ).spin();

					this.personelModel.fetch( {
						'success' : _.bind( function ( model, res, options ) {
							this.personelView.render();
							$( ev.currentTarget ).attr( 'clicked', true );
						}, this )
					} );
				}

				App.vent.trigger( 'show:popover', this );
			}, this ) );
		},

		'overridePopoverPosition' : function ( el ) {
			var offset  = el.offset();
			var popover = el.next( 'div.popover' );
			var arrow   = popover.find( 'div.arrow' );
			var extra   = ( $( window ).width() > 767 ) ? 150 : 80;

			offset.right = $( window ).width() - ( offset.left + el.outerWidth( true ) );

			if ( offset.right < 175 ) {
				popover.css( 'left' , parseInt( popover.position().left - extra ) + 'px' );
				arrow.css( 'left' , parseInt( arrow.position().left + extra  ) + 'px' );
			}
		}

	} );
} );
