define ( function ( require ) {
	'use strict';

	var LayoutView          = require( 'contentNavigation/views/MainLayoutView' );
	var HeaderView          = require( 'contentNavigation/views/Layouts/HeaderLayoutView' );
	var FilterContainerView = require( 'contentNavigation/views/Filters/FilterContainerView' );
	var MainView            = new LayoutView();
	var TopView             = new HeaderView();
	var FilterView          = new FilterContainerView();
	var $                   = require( 'jquery' );

	require( 'modernizr' );
	require( 'jquery.pscrollbar' );

	describe ( 'FilterContainerView Test', function() {

		describe ( '_toggleFilter' , function () {

			MainView.render();
			TopView.render();

			var sidebar     = MainView.$el.find( 'div.cn-sidebar-content' );
			var showButton  = TopView.$el.find( '.sidebar-toggle' );
			var closeButton = MainView.$el.find( 'div.cn-middle-content .sidebar-close-btn' );
			var sidebarOpen = MainView.$el.find( 'div.cn-sidebar-content sidebar-open' );


			it ( 'should show filter container upon click (mobile)' , function () {
                sidebar.should.have.length.above( 0 ).when( function () {
                    return showButton.click();
                } );
            } );

            it( 'should close filter container upon click (mobile)' , function () {
				sidebarOpen.should.have.length( 0 ).when( function () {
					return closeButton.click();
				} );
            } );

            it ( 'should perfectScrollbar  \'perfectScrollbar\' upon click' , function () {
                FilterView.should.call( 'perfectScrollbar' ).satisfy( function () {
                    return showButton.click();
                } );
            } );

            it ( 'should trigger  \'_setFilterHeight \' upon click' , function () {
                FilterView.should.call( '_setFilterHeight' ).satisfy( function () {
                    return showButton.click();
                } );
            } );

		} );

		describe ('_setFilterHeight', function () {
			 it( 'should call the _getFilterHeight method', function () {
                FilterView.should.call( '_getFilterHeight' ).satisfy( function () {
                    return $(window).resize();
                } );
            } );

			 var el = MainView.$el.find( 'div[id=cn-left-region]' );

			it ( 'should trigger perfectScrollbar plugin' , function () {
				var scrollEl = el.perfectScrollbar();
				scrollEl.trigger( 'scroll' );
	        } );
		} );

		describe ('_getFilterHeight', function () {
			it ( 'should return a number' , function () {
				var  getFilterHeight = parseInt ( FilterView._getFilterHeight() );
				getFilterHeight.should.have.to.be.a( 'number' );
			} );
		} );

		describe('_setFilterScroll', function () {
			var el = MainView.$el.find( 'div[id=cn-left-region]' );

			it ( 'should trigger perfectScrollbar plugin' , function () {
				var scrollEl = el.perfectScrollbar();
				scrollEl.trigger( 'scroll' );
	        } );
		} );
	} );
} );
