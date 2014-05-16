define( function ( require ) {
	'use strict';


	describe ( 'WidgetCompositeView Test', function () {

		var Marionette = require( 'marionette' );
		var Remoting   = require( 'Remoting' );
		var widgets    = require( 'apps/homepage/external/widgets/manifest' )().splice(1);
		var sinon      = window.sinon;
		//collections
		var UserWidgetCollection = require( 'apps/homepage/external/widgets/collections/UserWidgetCollection' );
		var WidgetComposite      = require( 'apps/homepage/external/widgets/views/WidgetCompositeView' );

		var WidgetCollection     = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );
		var utils                = require( 'apps/homepage/external/widgets/utils/widgetCompositeUtils' );
		var controllers          = require( 'apps/homepage/external/widgets/controllers/widgetCompositeController' );

		var utilStub;
		var widgetComposite;

		var yourProfile = {
			'Description'  : function () { return 'your profile'; },
			'EmptyMessage' : function () { return 'your profile empty'; },
			'WidgetId'     : 1,
			'WidgetName'   : function () { return 'yourprofile'; },
			'_footer'      : function () { return 'See Profile'; },
			'_header'      : function () { return 'Your Profile'; },
			'_id'          : 'yourprofile',
			'_items'       : [],
			'_mainUrl'     : '/dev.html#resources/learning/your-profile',
			'em'           : 8.5
		};

		var observation = {
			'Description'  : function () { return 'observation'; },
			'EmptyMessage' : function () { return 'observation empty'; },
			'WidgetId'     : 2,
			'WidgetName'   : function () { return 'observation'; },
			'_footer'      : function () { return 'See All Observation'; },
			'_header'      : function () { return 'Observation'; },
			'_id'          : 'observation',
			'_items'       : [],
			'_mainUrl'     : '/dev.html#resources/learning/courses',
			'em'           : 8.5
		};

		var courses = {
			'Description'  : function () { return 'courses'; },
			'EmptyMessage' : function () { return 'courses'; },
			'WidgetId'     : 3,
			'WidgetName'   : function () { return 'courses'; },
			'_footer'      : function () { return 'See All Courses'; },
			'_header'      : function () { return 'Courses'; },
			'_id'          : 'courses',
			'_items'       : [],
			'_mainUrl'     : '/dev.html#resources/learning/groupactivity',
			'em'           : 8.5
		};

		var groupActivity = {
			'Description'  : function () { return 'group activity'; },
			'EmptyMessage' : function () { return 'group activity empty'; },
			'WidgetId'     : 4,
			'WidgetName'   : function () { return 'groupactivity'; },
			'_footer'      : function () { return 'Group Activity'; },
			'_header'      : function () { return 'See Group Activity'; },
			'_id'          : 'groupactivity',
			'_items'       : [],
			'_mainUrl'     : '/dev.html#resources/learning/groupactivity',
			'em'           : 8.5
		};

		function createWidgetCompositeObj () {
			var collection           = [ yourProfile, observation, courses, groupActivity ];
			var userWidgetCollection = [ yourProfile, observation ];

			var widgetComposite = new WidgetComposite ( {
				'collection'           : new WidgetCollection( widgets ),
				'widgetCollection'     : new WidgetCollection( collection ),
				'userWidgetCollection' : new UserWidgetCollection( userWidgetCollection ),
			} );
			return widgetComposite;
		}

		before( function () {
			utilStub = sinon.stub( utils, 'doShow' );
		} );

		after( function () {
			utils.doShow.restore();
		} );

		it( 'should be an instance of CompositeView', function (  ) {
			widgetComposite = createWidgetCompositeObj();
			widgetComposite.should.be.an.instanceof( Marionette.CompositeView );
		} );

		it( 'should be able to render', function () {
			widgetComposite.itemView.should.not.equal( undefined );
			widgetComposite.render();
		} );

		describe( 'Events', function () {
			var widgetPreviewSpy, allWidgetsSpy, activeWidgetSpy, inactiveWidgetSpy;
			var activateWidgetSpy, deactivateWidgetSpy;
			var widgetCompositeEvt;

			before( function () {
				widgetPreviewSpy    = sinon.spy( WidgetComposite.prototype, 'showWidgetPreview');
				allWidgetsSpy       = sinon.spy( WidgetComposite.prototype, 'showAllWidgets');
				activeWidgetSpy     = sinon.spy( WidgetComposite.prototype, 'showActiveWidgets');
				inactiveWidgetSpy   = sinon.spy( WidgetComposite.prototype, 'showInactiveWidgets');
				activateWidgetSpy   = sinon.spy( WidgetComposite.prototype, 'activateWidget' );
				deactivateWidgetSpy = sinon.spy( WidgetComposite.prototype, 'deactivateWidget' );

				widgetCompositeEvt = createWidgetCompositeObj();
				widgetCompositeEvt.render();
				sinon.stub( Remoting, 'fetch' );
			} );

			after( function () {
				WidgetComposite.prototype.showWidgetPreview.restore();
				WidgetComposite.prototype.showAllWidgets.restore();
				WidgetComposite.prototype.showActiveWidgets.restore();
				WidgetComposite.prototype.showInactiveWidgets.restore();
				WidgetComposite.prototype.activateWidget.restore();
				Remoting.fetch.restore();
			} );

			it( 'showWidgetPreview : click #widget-settings-selection li', function () {

				widgetCompositeEvt.$el.find('#widget-settings-selection li').first().trigger( 'click' );
				widgetPreviewSpy.called.should.equal( true );
				widgetPreviewSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showAllWidgets : #widget-settings-header li#all', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#all').first().trigger( 'click' );
				allWidgetsSpy.called.should.equal( true );
				allWidgetsSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showActiveWidgets : #widget-settings-header li#active', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#active').first().trigger( 'click' );
				allWidgetsSpy.called.should.equal( true );
				allWidgetsSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showInactiveWidgets : #widget-settings-header li#inactive', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#inactive').first().trigger( 'click' );
				inactiveWidgetSpy.called.should.equal( true );
				inactiveWidgetSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'activateWidget : click .actions .save', function () {

				widgetCompositeEvt.$el.find('#widget-settings-selection li .inactive').first().trigger( 'click' );

				widgetCompositeEvt.$el.find('.actions .save').first().trigger( 'click' );
				activateWidgetSpy.called.should.equal( true );
				activateWidgetSpy.callCount.should.be.at.least( 1 );
				activateWidgetSpy.reset();
			} );

			it( 'activateWidget : click .actions .save-and-close', function () {

				widgetCompositeEvt.$el.find('#widget-settings-selection li .inactive').first().trigger( 'click' );
				widgetCompositeEvt.$el.find('.actions .save-and-close').first().trigger( 'click' );
				activateWidgetSpy.called.should.equal( true );
				activateWidgetSpy.callCount.should.be.at.least( 1 );
				activateWidgetSpy.reset();
			} );

			it( 'activateWidget : click .widget-icon-btn.inactive', function () {

				widgetCompositeEvt.$el.find('.widget-icon-btn.inactive').first().trigger( 'click' );
				activateWidgetSpy.called.should.equal( true );
				activateWidgetSpy.callCount.should.be.at.least( 1 );
				activateWidgetSpy.reset();
			} );

			it( 'deactivateWidget : click .actions .remove', function () {
				widgetCompositeEvt.$el.find('#widget-settings-selection li .active').first().trigger( 'click' );
				widgetCompositeEvt.$el.find('.actions .remove').first().trigger( 'click' );
				deactivateWidgetSpy.called.should.equal( true );
				deactivateWidgetSpy.callCount.should.be.at.least( 1 );
				deactivateWidgetSpy.reset();
			} );

			it( 'deactivateWidget : click .widget-icon-btn.active', function () {
				widgetCompositeEvt.render();
				widgetCompositeEvt.$el.find('.widget-icon-btn.active').first().trigger( 'click' );
				deactivateWidgetSpy.called.should.equal( true );
				deactivateWidgetSpy.callCount.should.be.at.least( 1 );
				deactivateWidgetSpy.reset();
			} );

			it( 'deactivateWidget : click .remove-and-close', function () {
				widgetCompositeEvt.$el.find('#widget-settings-selection li .active').first().trigger( 'click' );
				widgetCompositeEvt.$el.find('.remove-and-close').first().trigger( 'click' );
				deactivateWidgetSpy.called.should.equal( true );
				deactivateWidgetSpy.callCount.should.be.at.least( 1 );
				deactivateWidgetSpy.reset();
			} );

		} );

		it( 'should be able to call .showAllWidgets', function () {

			widgetComposite.showAllWidgets( sinon.spy() );

			utilStub.callCount.should.be.at.least( 1 );
			utilStub.reset();
		} );

		it( 'should be able to call .showInactiveWidgets', function () {

			widgetComposite.showInactiveWidgets( sinon.spy() );

			utilStub.callCount.should.be.at.least( 1 );
			utilStub.reset();
		} );

		it( 'should be able to call .showActiveWidgets', function () {

			widgetComposite.showActiveWidgets( sinon.spy() );

			utilStub.callCount.should.be.at.least( 1 );
			utilStub.reset();
		} );

		it( 'should be able to call .showWidgetPreview', function (  ) {
			var widgetPreview = new ( Marionette.ItemView ) ();
			var newPreviewStub = sinon.stub( utils, 'newPreviewItem' )
				.returns ( widgetPreview );

			var previewRenderStub = sinon.stub( widgetPreview, 'render' )
				.returns( { el : '<div> NewItemView </>' } );

			widgetComposite.showWidgetPreview( sinon.spy() );

			widgetComposite.widgetPreviewItemView.should.not.equal( undefined );
			newPreviewStub.callCount.should.be.at.least( 1 );
			utils.newPreviewItem.restore();

			previewRenderStub.callCount.should.be.at.least( 1 );
			widgetPreview.render.restore();

		} );

		it( 'should be able to call .getModelByClickedEvent', function () {


			var getModelStub = sinon.stub( controllers, 'doGetModelByClickEvent' )
				.returns ( courses );

				var model = widgetComposite.getModelByClickEvent( sinon.spy() );

				model.should.equal( courses );
				getModelStub.callCount.should.be.at.least( 1 );

				controllers.doGetModelByClickEvent.restore();
		} );

		it( 'should be able to call .activateWidget', function () {

			var evt            = document.createEvent( 'Event' );
			var activateWidget = utils.doActivateWidgetCheck;
			var trueStub       = sinon.stub( activateWidget, 'true');
			var falseStub      = sinon.stub( activateWidget, 'false' );

			widgetComposite.options.userWidgetCollection.length = 1;
			widgetComposite.activateWidget( evt );

			widgetComposite.options.userWidgetCollection.length = 3;
			widgetComposite.activateWidget( evt );

			trueStub.callCount.should.be.at.least( 1 );
			falseStub.callCount.should.be.at.least( 1 );

			activateWidget.true.restore();
			activateWidget.false.restore();

		} );

		it( 'should be able to call .deactivateWidget', function () {
			var evt             = document.createEvent( 'Event' );
			var deactiveStub    = sinon.stub( controllers, 'doDeactivateWidget' );
			var hidePreviewStub = sinon.stub( controllers, 'doHidePreviewErrorMsg' );

			widgetComposite.deactivateWidget( evt );

			controllers.doHidePreviewErrorMsg.restore();
			controllers.doDeactivateWidget.restore();

			deactiveStub.restore();
			hidePreviewStub.restore();
		} );

		it( 'should be able to call .changeButtonAttr', function () {
			var evt        = document.createEvent( 'Event' );
			var changeStub = sinon.stub( utils, 'changeButtonAttr' );

			widgetComposite.widgetPreviewItemView.ui =  {
			'actionBtn'      : '.action-btn',
			'actionCloseBtn' : '.action-close-btn',
			'widgetMessage'  : '#widget-limit-message'
			};
			widgetComposite.changeButtonAttr( evt );
			changeStub.callCount.should.be.at.least( 2 );

			utils.changeButtonAttr.restore();
		} );

		it( 'should return upper first letter', function () {
			var upper = widgetComposite.upperFirstLetter( 'focus objectives' );

			upper.should.be.equal( 'Focus Objectives' );
		} );

		it( 'should be able to call .changeWidgetIconBtnAttr', function () {
			var changeStub = sinon.stub( controllers, 'doChangeWidgetIconBtnAttr' );

			widgetComposite.changeWidgetIconBtnAttr( );
			changeStub.callCount.should.be.at.least( 1 );

			controllers.doChangeWidgetIconBtnAttr.restore();

		} );

		it( 'should be able to call .changeSelectedNavBtn', function () {
			var evt          = document.createEvent( 'Event' );
			var selectedStub = sinon.stub( controllers, 'doChangeSelectedNavBtn' );

			widgetComposite.changeSelectedNavBtn( evt );
			selectedStub.callCount.should.be.at.least( 1 );

			controllers.doChangeSelectedNavBtn.restore();
		} );

		it( 'should be able to call .changeWidgetSelectedTab', function () {
			widgetComposite.changeWidgetSelectedTab( 'all' );
			var selected = widgetComposite.$el.find( '.selected' );
			selected.text().should.equal( 'All Widgets' );
		} );

	} );

} );
