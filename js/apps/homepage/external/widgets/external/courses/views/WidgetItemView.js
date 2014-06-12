define( function ( require ) {
	'use strict';

	var App                       = require( 'App' );
	var $                         = require( 'jquery' );
	var Marionette                = require( 'marionette' );
	var _                         = require( 'underscore' );
	var progressTemplate          = require( 'text!apps/homepage/external/widgets/external/courses/templates/progressItemTemplate.html' );

	var widgetDirectory = 'resources/learning/courses/legacy';

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
			e.preventDefault();
			var self        = this;
			var pd360Loaded = App.request( 'pd360:loaded' );
			var LoadingView = new App.Common.LoadingView() ;
			var CourseID    = self.model.get( 'COURSEID' );

			App.content.show( LoadingView );
			App.navigate( widgetDirectory + '/' + CourseID );

			App.when( pd360Loaded ).done( function () {
				LoadingView.close();
				$( '.content-wrapper' ).html( '' );
				App.request( 'pd360:navigate', 'courses', 'coursesBrowse', {  'COURSEID' : CourseID } );
			} );
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		},

		'onRender'        : function ( ) {
			$('.courses').tooltip( 'hide' );
		}
	} );
} );
