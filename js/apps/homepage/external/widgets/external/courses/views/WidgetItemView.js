define( function ( require ) {
	'use strict';

	var App                       = require( 'App' );
	var $                         = require( 'jquery' );
	var Marionette                = require( 'marionette' );
	var _                         = require( 'underscore' );
	var UIManager                 = require( 'apps/homepage/external/widgets/external/agents/UIManager' );
	var progressTemplate          = require( 'text!apps/homepage/external/widgets/external/courses/templates/progressItemTemplate.html' );

	var widgetDirectory = 'resources/learning/courses/';

	function setTemplateHelpers ( model ) {
		return {
			'content'    : App.Homepage.Utils.modelGet( model, 'COURSENAME' ),
			'completion' : App.Homepage.Utils.modelGet( model, 'PERCENTCOMPLETE', '0')
		};
	}

	function doOnShow ( view, model ) {
		if ( model ) {
			App.Homepage.Utils.progressCircle( view.$el, '.courses', model.get( 'PERCENTCOMPLETE' ) );
		}
	}

	function adjustDescription ( that ) {
		var content = UIManager.limitDescriptionByWidth( that.$el, that.model );
		var eDesc   = that.$el.find( '.description>p' );
		eDesc.text( content );
	}

	return Marionette.ItemView.extend( {
		'initialize'      : function () {

			$( window ).resize( function () {
				adjustDescription( this );
			}.bind( this ) );

		},
		'events'          : {
			'click a.courseLink' : 'redirect'
		},
		'className'       : 'widget-item',
		'template'        : _.template( progressTemplate ),
		'templateHelpers' : function () {
			return setTemplateHelpers ( this.model );
		},
		'onShow'          : function ( ) {

			adjustDescription( this );
			doOnShow( this, this.model );

		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		}
	} );
} );
