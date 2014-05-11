define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );

	var views = {
		'ErrorView'    : require( '../views/ErrorView' ),
		'HeaderLayout' : require( '../views/Layouts/HeaderLayoutView' )
	};

	var LicensesCollection = require( '../collections/LicensesCollection' );

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			this.vent = options.vent;

			this._createVents();

			this._initCollection();

			this._fetchLicensesCollection();

			this.layoutView = new views.HeaderLayout( {
				'events' : {

					'click .cn-sortby-menu li' : function ( ev ) {

						this._sortByChanged( $( ev.currentTarget ) );

						this.reloadSidebarLibrarySwitcher();

					}.bind( this ),

					'click .cn-library-menu li' : function ( ev ) {

						this._changeLibrary( $( ev.currentTarget ) );

					}.bind( this ),

					'click .cn-responsive-filter-toggle' : function ( ev ) {

						$( '.cn-sidebar-content' ).removeClass( 'responsive-hidden' );
						$( 'body' ).addClass( 'responsive-non-scrollable' );

					}.bind( this )

				},

				collection : this.collection

			} );

			this.layoutView.render();
		},

		'_initCollection' : function () {
			this.collection = new LicensesCollection();
		},

		'_fetchLicensesCollection' : function () {

			var fetchLicenses = this._getLicenses();
			this.licences = Remoting.fetch( [ fetchLicenses ] );

			App.when( this.licences ).done( function ( models ) {
				this._setLicensesCollection( models[ 0 ] );
			}.bind( this ) ).fail( function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : 'There was an error fetching licenses.',
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

				return this._fetchLicenseFailed.call( this, error );

			}.bind( this ) );

		},

		'_getLicenses' : function () {
			return {
				'method' : 'RespondCustomContentGetLicenses',
				'args'   : {
					'personnelId' : Session.personnelId()
				},
				'path'   : 'com.schoolimprovement.pd360.dao.RespondService'
			};
		},

		'_setLicensesCollection' : function ( models ) {
			this.collection.add( {
				LicenseName : 'PD360'
			} );
			_.each( models, function ( model ) {
				model = this._setLicenseLength( model );
				this.collection.add( model );
			}.bind( this ) );
			this.collection.add( {
				LicenseName : 'User Uploaded Videos'
			} );

			this.reloadSidebarLibrarySwitcher();
		},

		'_setLicenseLength' : function ( data ) {
			data.LicenseName = data.LicenseName.length > 23 ? data.LicenseName.substr( 0, 20 ) + '...' : data.LicenseName;
			return data;
		},

		'getView' : function () {
			return this.layoutView;
		},

		'_createVents' : function () {
			this.vent.reqres.setHandler( 'segment:getSortByValue' , function () {
				return this._sortInit.call( this );
			}.bind( this ) );

		},

		'_sortInit' : function () {
			var sortBy = this.layoutView.$el.find( '.cn-sortby-category').text();

			if ( sortBy === 'Release Date' ) {
				sortBy = 'created desc';
			} else {
				sortBy = 'title asc';
			}

			return sortBy;
		},

		'_sortByChanged' : function ( el ) {
			var sort   = this._getDropdownValue( el );
			var sortBy = '';

			if ( sort === 'Release Date' ) {
				sortBy = 'created desc';
			} else {
				sortBy = 'title asc';
			}

			this.vent.mediator.trigger( 'segment:sort', sortBy );
		},

		'_changeLibrary' : function ( el ) {
			var _libraryLabel = this._getDropdownValue( el );
			var _contentType  = '';
			var that = this;

			if ( _libraryLabel === 'PD360' ) {
				_contentType = 'PD360Content';
			} else if ( _libraryLabel === 'User Uploaded Videos' ) {
				_contentType = 'UserUploadedContent';
			} else {
				_contentType = 'CustomContent';
			}

			setTimeout( function ( ) {
				that.vent.mediator.trigger( 'library:change', _contentType, _libraryLabel );
				that.reloadSidebarLibrarySwitcher();

				if ( _contentType === 'UserUploadedContent' ) {
					that._hideSortBy();
				} else {
					that._showSortBy();
				}

			} );

		},

		'_hideSortBy' : function () {
			$( '.cn-sortby' ).hide();
			setTimeout( function () {
				$( '.cn-sidebar-content .cn-filter.sortby' ).hide();
			}, 0 );
		},

		'_showSortBy' : function () {
			$( '.cn-sortby' ).show();
			setTimeout( function () {
				$( '.cn-sidebar-content .cn-filter.sortby' ).show();
			}, 0 );
		},

		'_getDropdownValue' : function ( el ) {
			var val = '';
			var selectBox = null;

			if ( el.length ) {
				val = el.text();

				selectBox = el.closest( '.btn-group' );
				selectBox.find( '[data-bind="label"]' ).text( val );

			}

			return val;
		},

		'reloadSidebarLibrarySwitcher' : function () {

			$( '.cn-sidebar-content .cn-filter.library .cn-content-filter' ).html('');

			this.collection.each( function ( model ) {
				$( '.cn-sidebar-content .cn-filter.library .cn-content-filter' )
					.append( '<li class="filter-item"><label class="cn-filter-list"><span class="filter-tick"></span>' + model.get( 'LicenseName' ) + '</label></li>' );
			} );

			$( '.cn-sidebar-content .cn-filter.library .cn-content-filter .filter-item .cn-filter-list:contains("' + $('.cn-library-category').text() + '")' )
				.children( '.filter-tick' )
				.addClass( 'fa fa-check' )
				.parent()
				.parent()
				.addClass( 'addHighlight' );

			$( '.cn-sidebar-content .cn-filter.sortby .cn-content-filter .filter-item .cn-filter-list' )
				.children( '.filter-tick' )
				.removeClass( 'fa fa-check' )
				.parent()
				.parent()
				.removeClass( 'addHighlight' );

			$( '.cn-sidebar-content .cn-filter.sortby .cn-content-filter .filter-item .cn-filter-list:contains("' + $('.cn-sortby-category').text() + '")' )
				.children( '.filter-tick' )
				.addClass( 'fa fa-check' )
				.parent()
				.parent()
				.addClass( 'addHighlight' );

			this.redelegateSidebarLibrarySwitcherEvents();
		},

		'redelegateSidebarLibrarySwitcherEvents' : function () {
			$( '.cn-content-filter.library li' ).click( function () {
				$( '.cn-library-menu li:contains("' + $( this )[ 0 ].textContent + '")' ).click();
			} );

			$( '.cn-content-filter.sortby li' ).click( function () {
				$( '.cn-sortby-menu li:contains("' + $( this )[ 0 ].textContent + '")' ).click();
			} );
		}
	} );
} );
