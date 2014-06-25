define( function ( require ) {
	'use strict';

	describe ( 'WidgetCompositeView Test', function () {

		var sinon      = window.sinon;
		var App        = require( 'App' );
		var Marionette = require( 'marionette' );

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

			var widgets    = App.Homepage.Widgets.allWidgets().splice(1);
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
				sinon.stub( App, 'request' ).returns( true );

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
				App.request.restore();
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

		} );

	} );

} );
