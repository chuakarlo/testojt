/* jshint camelcase: false */
define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var vjs = require( 'videojs' );

	var defaults = {
		'timeToShow' : null
	};

	// VideoReplay component
	vjs.VideoReplay = vjs.Button.extend( {
		'init' : function ( player, options ) {
			vjs.Button.call( this, player, options );

			player.on( 'play', vjs.bind( this, this.hideComponent ) );
			player.on( 'firstplay', vjs.bind( this, this.hideComponent ) );
			player.on( 'ended', vjs.bind( this, this.showComponent ) );
		},

		'buttonText' : 'Replay',

		'buildCSSClass' : function () {
			return 'vjs-replay-control ' + vjs.Button.prototype.buildCSSClass.call( this );
		},

		'onClick' : function () {
			this.hideComponent();
			this.player_.currentTime( 0 );
			this.player_.play();
			this.player_.trigger( 'play' );
		},

		'showComponent' : function () {
			vjs.addClass( this.player_.controlBar.el_, 'vjs-replay' );
			this.show();
		},

		'hideComponent' : function () {
			vjs.removeClass( this.player_.controlBar.el_, 'vjs-replay' );
			this.hide();
		}

	} );

	var videoReplay = function ( options ) {
		var self     = this;
		var settings = _.extend( defaults, options || { } );
		var shown    = false;

		var replay = {

			'check' : function () {
				if ( self.currentTime() > settings.timeToShow ) {
					replay.enable();
				} else {
					shown = false;
				}
			},

			'enable' : function () {
				if ( shown ) {
					return;
				}
				shown = true;
				var component = self.controlBar.getChild( 'videoReplay' );
				if ( component ) {
					component.showComponent();
				}
			}

		};

		if ( settings.timeToShow ) {
			self.on( 'timeupdate', replay.check );
		}
	};

	vjs.plugin( 'videoReplay', videoReplay );
} );
