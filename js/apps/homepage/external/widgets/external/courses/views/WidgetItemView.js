define( function ( require ) {
	'use strict';

	var App              = require( 'App' );
	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var progressTemplate = require( 'text!apps/homepage/external/widgets/external/courses/templates/progressItemTemplate.html' );
	var Utils            = App.Homepage.Utils;

	function setTemplateHelpers ( model ) {
		return {
			'url'        : '#resources/learning/courses/' + model.get( 'COURSEID' ),
			'content'    : Utils.limitCharacters( Utils.modelGet( model, 'COURSENAME' ), 37 ),
			'completion' : Utils.modelGet( model, 'PERCENTCOMPLETE', '0')
		};
	}

	return Marionette.ItemView.extend( {
		'className'       : 'widget-item',
		'template'        : _.template( progressTemplate ),
		'templateHelpers' : function () {
			return setTemplateHelpers ( this.model );
		},
		'onShow'          : function ( ) {
			if ( this.model ) {
				Utils.progressCircle( this.$el, '.courses', this.model.get( 'PERCENTCOMPLETE' ) );
			}
		}
	} );
} );
