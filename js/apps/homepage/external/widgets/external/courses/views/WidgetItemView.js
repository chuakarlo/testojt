define( function ( require ) {
	'use strict';

	var App              = require( 'App' );
	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var progressTemplate = require( 'text!apps/homepage/external/widgets/external/courses/templates/progressItemTemplate.html' );
	var widgetCompositeController = require('apps/homepage/external/widgets/controllers/widgetCompositeController');

	var widgetDirectory = 'resources/learning/courses/';

	function setTemplateHelpers ( model ) {
		return {
			'content'    : App.Homepage.Utils.limitCharacters( App.Homepage.Utils.modelGet( model, 'COURSENAME' ), 37 ),
			'completion' : App.Homepage.Utils.modelGet( model, 'PERCENTCOMPLETE', '0')
		};
	}

	function doOnShow ( view, model ) {
		if ( model ) {
			App.Homepage.Utils.progressCircle( view.$el, '.courses', model.get( 'PERCENTCOMPLETE' ) );
		}
	}

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a.courseLink' : 'redirect'
		},
		'className'       : 'widget-item',
		'template'        : _.template( progressTemplate ),
		'templateHelpers' : function () {
			return setTemplateHelpers ( this.model );
		},
		'onShow'          : function ( ) {
			doOnShow( this, this.model );
		},
		'redirect'        : function ( e ) {
			widgetCompositeController.doRedirect( e, widgetDirectory );
			return false;
		}
	} );
} );
