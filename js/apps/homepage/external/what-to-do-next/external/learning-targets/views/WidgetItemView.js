define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var progressTemplate = require( 'text!apps/homepage/external/what-to-do-next/external/learning-targets/templates/progressItemTemplate.html' );
	var videoTemplate    = require( 'text!apps/homepage/external/what-to-do-next/external/learning-targets/templates/videoItemTemplate.html');


	return Marionette.ItemView.extend( {
		'initialize' : function ( options ) {

			//default template
			this.template = _.template( progressTemplate );
			if( options &&
					options.model ) {
				var inProgress = options.model.get( 'inProgress' );

				this.template = _.template( inProgress ? progressTemplate : videoTemplate );
			}
		},
		'className' : 'col-md-12 no-padding learningTarget',
		'templateHelpers' : function () {
			return {
				'content'    : this.model ? this.limitCharacter( this.model.get( 'content' ) ) : '',
				'completion' : this.model ? this.model.get( 'completion' ) : ''
			};
		},
		'limitCharacter' : function ( text ) {
			if ( text ){
				return ( text.length > 40 ) ? text.substr( 0, 40 ) +'...' : text;
			} else {
				return '';
			}
		},
		'onShow'  : function ( parent ) {

			if( this.model ) {
				var completion = this.model.get( 'completion' );
				if ( completion ) {
					var that = this;
					require( [ 'pc-progressCircle' ], function ( $ ) {
						$(that.$el).find( 'a' ).progressCircle( {
							'nPercent'        : completion,
							'circleSize'      : 25,
							'thickness'       : 4,
							'showPercentText' : false
						} );
					} );
				}
			}
		}

	} );

} );