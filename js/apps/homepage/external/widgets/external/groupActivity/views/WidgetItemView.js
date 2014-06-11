define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var template   = require( 'text!apps/homepage/external/widgets/external/groupActivity/templates/widgetItemView.html' );

	var className    = 'col-md-12 no-padding widget-item';
	var templateBind = _.template( template );

	var getConfig  = require( 'common/helpers/getConfig' );

	var widgetDirectory = 'groups/';

	return Marionette.ItemView.extend( {
		'initialize'      : function () {

			$( window ).resize( function () {
				App.Homepage.Utils.limitCharsByDOMLength( this.$el,  '.description',
					'.progress-circle-item' );
			}.bind( this ) );

		},
		'events'          : {
			'click a.groupActivityLink' : 'redirect'
		},
		'template'        : templateBind,
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'creatorName' : this.model.get( 'LicenseName' ),
				'getConfig'   : getConfig( 'groupAvatarWebPath' )
			};
		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		},
		'onShow'          : function ( ) {
			App.Homepage.Utils.limitCharsByDOMLength( this.$el,  '.description',
				'.progress-circle-item' );
		}
	} );
} );
