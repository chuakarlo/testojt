define( function ( require ) {
	'use strict';

	describe( 'WidgetPreviewItemView Test', function () {

		var Marionette = require( 'marionette' );
		var Backbone = require( 'backbone' );

		var widgetItemView;
		var observation;

		before( function () {
			observation = {
				'Description'  : function () { return 'observation'; },
				'EmptyMessage' : function () { return 'observation empty'; },
				'WidgetId'     : 2,
				'WidgetName'   : function () { return 'observation'; },
				'_footer'      : function () { return 'See All Observation'; },
				'_header'      : function () { return 'Observation'; },
				'_id'          : 'observation',
				'_items'       : [],
				'_mainUrl'     : '/#resources/learning/courses',
				'imgSrc'       : function () { return 'link'; },
				'em'           : 8.5
			};

		} );

		it( 'should be an instance of CompositeView', function (  ) {
			var WidgetItemView = require( 'apps/homepage/external/widgets/views/WidgetPreviewItemView' );
			var model = new Backbone.Model( observation );

			var models = [
				{
					'PersonnelId'       : 13778,
					'PresentationOrder' : 1,
					'WidgetId'          : 1
				},
				{
					'PersonnelId'       : 13778,
					'PresentationOrder' : 2,
					'WidgetId'          : 2
				}
			];

			var userWidget  = new Backbone.Collection( models );
			widgetItemView  = new WidgetItemView( { 'model' : model, 'userWidgetCollection' : userWidget } );

			widgetItemView.should.be.an.instanceof( Marionette.ItemView );
		} );

	} );

} );
