define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );

	var moment = require( 'moment' );
	require( 'moment-timezone' );
	require( 'timezone' );

	var template           = require( 'text!../templates/groupCommentView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentView.html' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel' );

	var Autolinker = require( 'autolinker' );

	var autolinker = new Autolinker( {
		newWindow   : false,
		stripPrefix : false,
		className   : 'link'
	} );

	return Marionette.ItemView.extend( {

		'personelModel' : null,
		'personelView'  : null,
		'tagName'       : 'li',

		'ui' : {
			'removeReply' : '.remove-child',
			'creator'     : '.child-creator-name'
		},

		'events' : {
			'click @ui.removeReply' : 'removeReply'
		},

		initialize : function () {
			_.bindAll( this );

			this.personelModel = new MiniPersonnelModel( {
				'persId' : this.model.get( 'Creator' )
			} );

			this.personelView = new MiniPersonnelView( {
				'model' : this.personelModel
			} );

			this.listenTo( this.personelView, 'close', function ( event ) {
				this.ui.creator.popover( 'hide' );
			}.bind( this ) );
		},

		'onRender' : function () {
			var message = autolinker.link( _.escape( this.model.get( 'Message' ) ) );
			$( this.el ).find( 'p.wall-comment' ).prepend( message );
		},

		'getTemplate' : function () {
			// add the remove button if user created the message
			if ( String( this.model.get( 'Creator' ) ) === String( Session.personnelId() ) ) {
				return _.template( usersTemplate );
			} else {
				return _.template( template );
			}
		},

		'onShow' : function () {
			this.showMiniPersonnel();
		},

		'onClose' : function () {
			this.ui.creator.popover( 'destroy' );
			this.ui.creator.off( 'click' );
			$( this.personelView.ui.spinner ).spin( false );
			this.personelModel = null;
			this.personelView  = null;
		},

		'showMiniPersonnel' : function ( event ) {
			this.ui.creator.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function () {
					return this.personelView.render().el;
				}.bind( this )
			} );

			this.ui.creator.on( 'shown.bs.popover', _.bind( function ( ev ) {
				if ( $( ev.currentTarget ).attr( 'clicked' ) !== 'true' ) {
					$( this.personelView.ui.spinner ).spin();
					this.personelModel.fetch( {
						'success' : _.bind( function ( model, res, options ) {
							// Render again once we have attributes
							this.personelView.render();
							$( ev.currentTarget ).attr( 'clicked', true );
						}, this )
					} );
				}
				App.vent.trigger( 'show:popover', this );
			}, this ) );
		},

		'onBeforeClose' : function () {
			// Make sure to destroy the popover events
			this.ui.creator.popover( 'destroy' );
		},

		'removeReply' : function ( e ) {
			this.model.destroy();
		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' ),

			'formatDate' : function ( date ) {
				var server = 'MST7MDT';

				// milliseconds in 24 hours
				var timeToSwitch = 60 * 60 * 24 * 1000;

				// Only show time ago for the first 24 hours
				if ( moment().diff( moment.tz( date, server ) ) > timeToSwitch ) {
					return moment.tz( date , server ).format( 'MMMM D, YYYY' );
				}

				return moment.tz( date, server ).fromNow();

			}
		}

	} );

} );
