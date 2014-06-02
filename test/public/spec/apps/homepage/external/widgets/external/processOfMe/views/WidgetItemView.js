define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var App            = require( 'App' );
	var $              = require( 'jquery' );
	var expect         = require( 'chai').expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone');
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView');
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/processOfMe/views/WidgetItemView' );

	describe('Process Of Me WidgetItemView ItemView', function () {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;
		var navigateStub;

		before( function () {
			modelData = [ {
				'TemplateDescription'      : '',
				'NextTaskTypeId'           : 0,
				'ProcessName'              : 'Process 01\/08\/2013 for Matthew Donaldson',
				'OwnerFirstName'           : 'Cody',
				'LastTaskName'             : '',
				'ProcessStatus'            : '',
				'TemplateCreated'          : '',
				'TemplateCreatorLastName'  : '',
				'Tasks'                    : [ {
					'OwnerFirstName'    : '',
					'Score'             : '',
					'Facilitated'       : '',
					'ActionNotes'       : '',
					'StartDate'         : '',
					'ProcessTaskId'     : 5,
					'OwnerId'           : 1076809,
					'UploadFileId'      : '',
					'TaskCompleted'     : '',
					'ActionTypeId'      : '',
					'ScheduledDate'     : '',
					'ScheduledDuration' : 0,
					'OwnerLastName'     : '',
					'ProcessId'         : 2616,
					'CompleteByDate'    : 'June, 01 2013 00:00:00',
					'Action'            : '',
					'Notes'             : '',
					'ObservationId'     : ''
				} ],
				'EducatorLastName'         : '',
				'NextTaskName'             : '',
				'TemplateCreatorFirstName' : '',
				'TaskCompleted'            : '',
				'LastTaskTypeId'           : 0,
				'ProcessId'                : 2616,
				'OwnerLastName'            : 'Erickson',
				'CompleteByDate'           : 'June, 01 2013 00:00:00',
				'NextTaskId'               : 0,
				'TemplateName'             : '',
				'EducatorFirstName'        : ''
			} ];
			sinon.stub( App, 'request' ).returns( true );
			navigateStub = sinon.stub( App, 'navigate' );
			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView( {
				model       : new Backbone.Model( {
					WidgetId : 2
				} ),
				_isRendered : true
			} );
			UserWidgetCompositeView.render();
		} );

		after( function () {
			Remoting.fetch.restore();
			App.request.restore();
			App.navigate.restore();
		} );

		it( 'should be an instance of ItemView', function () {
			var Model     = Backbone.Model.extend();
			var itemModel = new Model( modelData[ 0 ] );

			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView( { 'model' : itemModel } );
			expect( UserWidgetCompositeViewInstance ).to.be.an.instanceof( WidgetItemView );
			UserWidgetCompositeViewInstance.render();
		} );
	});
});
