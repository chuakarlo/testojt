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

		var widgetComposite;

		var yourProfile = {
			'Description'  :
				function () {
					return 'your profile';
				},
			'EmptyMessage' :
				function () {
					return 'your profile empty';
				},
			'WidgetId'     : 1,
			'WidgetName'   :
				function () {
					return 'yourprofile';
				},
			'_footer'      :
				function () {
					return 'See Profile';
				},
			'_header'      :
				function () {
					return 'Your Profile';
				},
			'_id'          : 'yourprofile',
			'_items'       : [ ],
			'_mainUrl'     : '/#resources/learning/your-profile',
			'em'           : 8.5,
			'imgSrc'       :
				function () {
					return '.jpg';
				}
		};

		var observation = {
			'Description'  :
				function () {
					return 'observation';
				},
			'EmptyMessage' :
				function () {
					return 'observation';
				},
			'WidgetId'     : 2,
			'WidgetName'   :
				function () {
					return 'observation';
				},
			'_footer'      :
				function () {
					return 'Observation';
				},
			'_header'      :
				function () {
					return 'Observation';
				},
			'_id'          : 'courses',
			'_items'       : [ ],
			'_mainUrl'     : '/#resources/observation',
			'em'           : 8.5,
			'imgSrc'       :
				function () {
					return '.jpg';
				}
		};

		var courses = {
			'Description'  :
				function () {
					return 'courses';
				},
			'EmptyMessage' :
				function () {
					return 'courses';
				},
			'WidgetId'     : 3,
			'WidgetName'   :
				function () {
					return 'courses';
				},
			'_footer'      :
				function () {
					return 'courses';
				},
			'_header'      :
				function () {
					return 'courses';
				},
			'_id'          : 'courses',
			'_items'       : [ ],
			'_mainUrl'     : '/#resources/courses',
			'em'           : 8.5,
			'imgSrc'       :
				function () {
					return '.jpg';
				}
		};

		var groupActivity = {
			'Description'  :
				function () {
					return 'groupActivity';
				},
			'EmptyMessage' :
				function () {
					return 'groupActivity';
				},
			'WidgetId'     : 4,
			'WidgetName'   :
				function () {
					return 'groupActivity';
				},
			'_footer'      :
				function () {
					return 'groupActivity';
				},
			'_header'      :
				function () {
					return 'groupActivity';
				},
			'_id'          : 'groupActivity',
			'_items'       : [ ],
			'_mainUrl'     : '/#resources/groupActivity',
			'em'           : 8.5,
			'imgSrc'       :
				function () {
					return '.jpg';
				}
		};

		function createWidgetCompositeObj () {
			var collection           = [ yourProfile, observation, courses, groupActivity ];
			var userWidgetCollection = [ yourProfile, observation ];

			var widgetComposite = new WidgetComposite ( {
				'collection'                 : new WidgetCollection( widgets ),
				'widgetCollection'           : new WidgetCollection( collection ),
				'actualUserWidgetCollection' : new UserWidgetCollection( userWidgetCollection ),
				'userWidgetCollection'       : new UserWidgetCollection( userWidgetCollection )
			} );
			return widgetComposite;
		}

		describe( 'Functions', function () {

			var newPreviewStub;
			var previewRenderStub;
			var utilStub;
			var getModelStub;
			var widgetPreview;
			var activateWidget;

			var trueStub;
			var falseStub;

			var deactiveStub;
			var changeStub;
			var changeStubIconBtn;
			var selectedStub;

			before( function () {

				widgetPreview     = new ( Marionette.ItemView ) ();
				utilStub          = sinon.stub( utils, 'doShow' );
				newPreviewStub    = sinon.stub( utils, 'newPreviewItem' )
					.returns ( widgetPreview );

				previewRenderStub = sinon.stub( widgetPreview, 'render' )
					.returns( { el : '<div> NewItemView </>' } );

				getModelStub      = sinon.stub( controllers, 'doGetModelByClickEvent' )
					.returns ( courses );

				activateWidget    = utils.doActivateWidgetCheck;
				trueStub          = sinon.stub( activateWidget, 'true');
				falseStub         = sinon.stub( activateWidget, 'false' );
				deactiveStub      = sinon.stub( controllers, 'doDeactivateWidget' );
				changeStub        = sinon.stub( utils, 'changeButtonAttr' );
				changeStubIconBtn = sinon.stub( controllers, 'doChangeWidgetIconBtnAttr' );
				selectedStub      = sinon.stub( controllers, 'doChangeSelectedNavBtn' );
			} );

			after( function () {
				utils.doShow.restore();
				utils.newPreviewItem.restore();
				utils.changeButtonAttr.restore();

				widgetPreview.render.restore();

				activateWidget.true.restore();
				activateWidget.false.restore();

				controllers.doDeactivateWidget.restore();
				controllers.doChangeWidgetIconBtnAttr.restore();
				controllers.doChangeSelectedNavBtn.restore();
				controllers.doGetModelByClickEvent.restore();
			} );

			it( 'should be an instance of CompositeView', function (  ) {
				widgetComposite = createWidgetCompositeObj();
				widgetComposite.should.be.an.instanceof( Marionette.CompositeView );
			} );

			it( 'should be able to render', function () {
				widgetComposite.itemView.should.not.equal( undefined );
				widgetComposite.render();
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

				widgetComposite.showWidgetPreview( sinon.spy() );
				widgetComposite.widgetPreviewItemView.should.not.equal( undefined );

				newPreviewStub.callCount.should.be.at.least( 1 );
				previewRenderStub.callCount.should.be.at.least( 1 );
			} );

			it( 'should be able to call .getModelByClickedEvent', function () {
				var model = widgetComposite.getModelByClickEvent( sinon.spy() );

				model.should.equal( courses );
				getModelStub.callCount.should.be.at.least( 1 );
			} );

			it( 'should be able to call .activateWidget', function () {

				var evt = document.createEvent( 'Event' );

				widgetComposite.options.userWidgetCollection.length = 1;
				widgetComposite.activateWidget( evt );

				widgetComposite.options.userWidgetCollection.length = 3;
				widgetComposite.activateWidget( evt );

				trueStub.callCount.should.be.at.least( 1 );
				falseStub.callCount.should.be.at.least( 1 );
			} );

			it( 'should be able to call .deactivateWidget', function () {

				var evt = document.createEvent( 'Event' );
				widgetComposite.deactivateWidget( evt );

				deactiveStub.callCount.should.be.at.least( 1 );
			} );

			it( 'should be able to call .changeButtonAttr', function () {

				var evt = document.createEvent( 'Event' );
				widgetComposite.widgetPreviewItemView.ui =  {
					'actionBtn'      : '.action-btn',
					'actionCloseBtn' : '.action-close-btn',
					'widgetMessage'  : '#widget-limit-message'
				};
				widgetComposite.changeButtonAttr( evt );
				changeStub.callCount.should.be.at.least( 2 );

			} );

			it( 'should return upper first letter', function () {

				var upper = widgetComposite.upperFirstLetter( 'focus objectives' );
				upper.should.be.equal( 'Focus Objectives' );

			} );

			it( 'should be able to call .changeWidgetIconBtnAttr', function () {

				widgetComposite.changeWidgetIconBtnAttr( );
				changeStubIconBtn.callCount.should.be.at.least( 1 );

			} );

			it( 'should be able to call .changeSelectedNavBtn', function () {

				var evt = document.createEvent( 'Event' );

				widgetComposite.changeSelectedNavBtn( evt );
				selectedStub.callCount.should.be.at.least( 1 );

			} );

			it( 'should be able to call .changeWidgetSelectedTab', function () {

				widgetComposite.changeWidgetSelectedTab( 'all' );
				var selected = widgetComposite.$el.find( '.selected' );
				selected.text().should.equal( 'All Widgets' );

			} );

		} );

		describe( 'Events', function () {

			var widgetPreviewSpy;
			var allWidgetsSpy;
			var activeWidgetSpy;
			var inactiveWidgetSpy;
			var activateWidgetSpy;
			var deactivateWidgetSpy;
			var saveAllSpy;
			var saveAllCloseSpy;
			var resetAllSpy;

			var widgetCompositeEvt;

			before( function () {
				widgetPreviewSpy    = sinon.spy( WidgetComposite.prototype, 'showWidgetPreview');
				allWidgetsSpy       = sinon.spy( WidgetComposite.prototype, 'showAllWidgets');
				activeWidgetSpy     = sinon.spy( WidgetComposite.prototype, 'showActiveWidgets');
				inactiveWidgetSpy   = sinon.spy( WidgetComposite.prototype, 'showInactiveWidgets');
				activateWidgetSpy   = sinon.spy( WidgetComposite.prototype, 'activateWidget' );
				deactivateWidgetSpy = sinon.spy( WidgetComposite.prototype, 'deactivateWidget' );
				saveAllSpy          = sinon.spy( WidgetComposite.prototype, 'saveAll' );
				saveAllCloseSpy     = sinon.spy( WidgetComposite.prototype, 'saveAllClose' );
				resetAllSpy         = sinon.spy( WidgetComposite.prototype, 'resetAll' );

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
				WidgetComposite.prototype.saveAll.restore();
				WidgetComposite.prototype.saveAllClose.restore();
				WidgetComposite.prototype.resetAll.restore();

				Remoting.fetch.restore();
			} );

			it( 'showWidgetPreview : click #widget-settings-selection li', function () {

				widgetCompositeEvt.$el.find('#widget-settings-selection li').first().trigger( 'click' );
				widgetPreviewSpy.called.should.equal( true );
				widgetPreviewSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showActiveWidgets : #widget-settings-header li#active', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#active').first().trigger( 'click' );
				activeWidgetSpy.called.should.equal( true );
				activeWidgetSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showInactiveWidgets : #widget-settings-header li#inactive', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#inactive').first().trigger( 'click' );
				inactiveWidgetSpy.called.should.equal( true );
				inactiveWidgetSpy.callCount.should.be.at.least( 1 );

			} );

			it( 'showAllWidgets : #widget-settings-header li#all', function () {

				widgetCompositeEvt.$el.find('#widget-settings-header li#all').first().trigger( 'click' );
				allWidgetsSpy.called.should.equal( true );
				allWidgetsSpy.callCount.should.be.at.least( 1 );
			} );

			// it( 'activateWidget : click .widget-icon-btn.inactive', function () {

			// 	widgetCompositeEvt.$el.find('.widget-icon-btn.inactive').first().trigger( 'click' );
			// 	console.log(widgetCompositeEvt.$el.find('.widget-icon-btn.inactive') );
			// 	activateWidgetSpy.called.should.equal( true );
			// 	activateWidgetSpy.callCount.should.be.at.least( 1 );
			// } );

			it( 'deactivateWidget : click .widget-icon-btn.active', function () {
				widgetCompositeEvt.render();
				widgetCompositeEvt.$el.find('.widget-icon-btn.active').first().trigger( 'click' );
				deactivateWidgetSpy.called.should.equal( true );
				deactivateWidgetSpy.callCount.should.be.at.least( 1 );
			} );

			it( 'saveAll : mousedown .actions .save', function () {
				widgetCompositeEvt.$el.find('.actions .save').first().trigger( 'mousedown' );

				saveAllSpy.called.should.equal( true );
				saveAllSpy.callCount.should.be.at.least( 1 );
			} );

			it( 'saveAllClose : mousedown .actions .save-and-close', function () {
				widgetCompositeEvt.$el.find('.actions .save-and-close').first().trigger( 'mousedown' );

				saveAllCloseSpy.called.should.equal( true );
				saveAllCloseSpy.callCount.should.be.at.least( 1 );
			} );

			it( 'resetAll : mousedown .actions .cancel', function () {
				widgetCompositeEvt.$el.find('.actions .cancel').first().trigger( 'mousedown' );

				resetAllSpy.called.should.equal( true );
				resetAllSpy.callCount.should.be.at.least( 1 );
			} );
		} );

	} );

} );
