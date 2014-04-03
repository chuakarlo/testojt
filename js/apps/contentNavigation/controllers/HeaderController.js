define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );

	var views = {
		'ErrorView'    : require( '../views/ErrorView' ),
		'HeaderLayout' : require( '../views/Layouts/HeaderLayoutView' )
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			this.vent = options.vent;

			this._createVents();

			this.layoutView = new views.HeaderLayout( {
				'events' : {
					'click .dropdown-menu li' : function ( event ) {
						var targetEl = $( event.currentTarget );

					    targetEl.closest( '.btn-group' )
							.find( '[data-bind="label"]' )
							.text( targetEl.text() );

					    this._sortByChanged();
					}.bind( this )
				}
			} );

			this.layoutView.render();
		},

		'getView' : function () {
			return this.layoutView;
		},

		'_createVents' : function () {
			this.vent.reqres.setHandler('segment:getSortValueByValue', function () {
				return this._getSortByValue.call( this );
			}.bind( this ) );
		},

		'_getSortByValue'	: function () {
			var sortVal = '';
			var sortEl  = this.layoutView.$el.find(this.layoutView.ui.selectSort);

			if (sortEl.length) {
				sortVal = sortEl.text();
			}

			return sortVal;
		},

		'_sortByChanged'	: function () {
			var sort = this._getSortByValue();

			if( sort === 'Release Date' ) {
				sort = 'created desc';
				this.vent.mediator.trigger( 'segment:sort', sort );
			} else {
				sort = 'title asc';
				this.vent.mediator.trigger( 'segment:sort', sort );
			}
		}

	} );

} );