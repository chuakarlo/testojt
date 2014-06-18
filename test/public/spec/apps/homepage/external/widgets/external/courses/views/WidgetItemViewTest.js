define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var App            = require( 'App' );
	var $              = require( 'jquery' );
	var expect         = require( 'chai' ).expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone' );
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/courses/views/WidgetItemView' );

	describe( 'Courses WidgetItemView ItemView', function () {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;
		var navigateStub;

		before( function () {

			modelData = [ {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 7313,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'jeremyblarg1',
				'EXPIREDATE'      : 'February, 28 2010 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 8172,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'aaNew Custom Course',
				'EXPIREDATE'      : 'May, 31 2010 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 10118,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'timeTest',
				'EXPIREDATE'      : 'February, 28 2010 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 11696,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'Folder Folder copy test',
				'EXPIREDATE'      : 'March, 31 2010 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 33,
				'COURSEID'        : 16365,
				'COURSECREATOR'   : 'Sara Jones',
				'COURSENAME'      : 'Growing Dendrites with Dr. Marcia Tate [Sample]',
				'EXPIREDATE'      : 'December, 31 2013 12:01:00'
			}, {
				'PERCENTCOMPLETE' : ' 2',
				'COURSEID'        : 17868,
				'COURSECREATOR'   : 'Sara Jones',
				'COURSENAME'      : 'CSvSC1 Talk About Teaching! with Charlotte Danielson and Candi McKay',
				'EXPIREDATE'      : 'December, 22 2012 12:01:00'
			}, {
				'PERCENTCOMPLETE' : ' 7',
				'COURSEID'        : 20806,
				'COURSECREATOR'   : 'Sara Jones',
				'COURSENAME'      : 'Motion Leadership with Michael Fullan [Sample]',
				'EXPIREDATE'      : 'December, 22 2012 12:01:00'
			}, {
				'PERCENTCOMPLETE' : ' 5',
				'COURSEID'        : 22801,
				'COURSECREATOR'   : 'Sara Jones',
				'COURSENAME'      : 'Instructional Coaching with Jim Knight [Sample]',
				'EXPIREDATE'      : 'December, 22 2012 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 20,
				'COURSEID'        : 36781,
				'COURSECREATOR'   : 'Steve Burton',
				'COURSENAME'      : 'Courageous Conversations About Race [SAMPLE]',
				'EXPIREDATE'      : 'December, 31 2013 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 139724,
				'COURSECREATOR'   : 'School Improvement',
				'COURSENAME'      : 'PD360 ESSENTIALS 410465',
				'EXPIREDATE'      : 'August, 14 2025 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 160236,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'Parent 3',
				'EXPIREDATE'      : 'December, 31 2013 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 160237,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'Course for catalogs',
				'EXPIREDATE'      : 'January, 01 2019 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 160238,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'Copy of Parent 3',
				'EXPIREDATE'      : 'December, 31 2013 12:01:00'
			}, {
				'PERCENTCOMPLETE' : 0,
				'COURSEID'        : 160239,
				'COURSECREATOR'   : 'Test Foo',
				'COURSENAME'      : 'Copy of Copy of Parent 3',
				'EXPIREDATE'      : 'December, 31 2013 12:01:00'
			} ];

			sinon.stub( App, 'request' ).returns( true );
			navigateStub = sinon.stub( App, 'navigate' );
			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub    = sinon.stub(Remoting, 'fetch').returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView( {
				model       : new Backbone.Model( {
					WidgetId : 1
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
			var itemModel = new Model( modelData[ 5 ] );

			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView( { 'model' : itemModel } );
			expect( UserWidgetCompositeViewInstance ).to.be.an.instanceof( WidgetItemView );
			UserWidgetCompositeViewInstance.render();
		} );

		it ( 'should be able to call redirect to learning courses', function () {
			UserWidgetCompositeViewInstance.$el.find( 'a.courseLink' ).first().trigger( 'click' );
			navigateStub.should.have.been.calledWithExactly( 'resources/learning/courses/17868/legacy' );
		} );

	});
});
