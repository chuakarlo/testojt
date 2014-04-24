define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );

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

					}.bind( this ),

					'click .cn-library-menu li' : function ( ev ) {

					    this._changeLibrary( $( ev.currentTarget ) );

					}.bind( this )
				},

				collection : this.collection

			} );

			this.layoutView.render();
		},

		'_initCollection' : function () {
			this.collection = new LicensesCollection();
			this.collection.add( {
				LicenseName : 'PD360'
			} );
		},

		'_fetchLicensesCollection' : function () {

			var fetchLicenses = this._getLicenses();
			this.licences = Remoting.fetch( [ fetchLicenses ] );

			$.when( this.licences ).done( function ( models ) {
				this._setLicensesCollection( models[ 0 ] );
			}.bind( this ) ).fail( function ( error ) {
				return this._fetchLicenseFailed.call( this, error );
			}.bind( this ) );

		},

		'_getLicenses' : function () {
			return {
				'method' : 'RespondCustomContentGetLicenses',
				'args'   : {
					'personnelId' : Session.personnelId()
				},
				'path' : 'com.schoolimprovement.pd360.dao.RespondService'
			};
		},

		'_setLicensesCollection' : function ( models ) {
			_.each( models, function ( model ) {
				model = this._setLicenseLength( model );
				this.collection.add( model );
			}.bind( this ) );
			this.collection.add( {
				LicenseName : 'User Uploaded Videos'
			} );
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
			if( sortBy === 'Release Date' ) {
				sortBy = 'created desc';
			} else {
				sortBy = 'title asc';
			}
			return sortBy;
		},

		'_sortByChanged' : function ( el ) {
			var sort   = this._getDropdownValue( el );
			var sortBy = '';

			if( sort === 'Release Date' ) {
				sortBy = 'created desc';
			} else {
				sortBy = 'title asc';
			}

			this.vent.mediator.trigger( 'segment:sort', sortBy );
		},

		'_changeLibrary' : function ( el ) {
			var _libraryLabel = this._getDropdownValue( el );
			var _contentType  = '';

			if( _libraryLabel === 'PD360' ) {
				_contentType = 'PD360Content';

				this._showSortBy();
			}
			else if( _libraryLabel === 'User Uploaded Videos' ) {
				_contentType = 'UserUploadedContent';

				// hide sortBy dropdown
				this._hideSortBy();
			}
			else {
				_contentType = 'CustomContent';

				this._showSortBy();
			}

			this.vent.mediator.trigger( 'library:change', _contentType, _libraryLabel );
		},

		'_hideSortBy' : function () {
			$( '.cn-sortby' ).hide();
		},

		'_showSortBy' : function () {
			$( '.cn-sortby' ).show();
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
		}
	} );

} );