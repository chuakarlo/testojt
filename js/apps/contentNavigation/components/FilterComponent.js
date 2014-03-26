define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var views = {
		'ErrorView'           : require( '../views/ErrorView' ),
		'FilterCompositeView' : require( '../views/Filters/FilterCompositeView' )
	};

	var defaultConfig = {
		'splitColumn' : false
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			if ( !options.title ) {
				new Error( 'No title for filter component' );
			}

			if ( !options.vent ) {
				new Error( 'No event handler for filter component' );
			}

			if ( !options.collection ) {
				new Error( 'Filter component needs a collection' );
			}

			this.setTitle( options.title );
			this.setComponentId( options.id );
			this.setCollection( options.collection );
			this.setVent( options.vent );
			this.setSplitColumn( options.splitColumn );
			this.createView();

			this.selectedFilters          = {};
			this.flattenedSelectedFilters = [];
		},

		'getView' : function () {
			return this.view;
		},

		'setComponentId' : function ( id ) {
			this.componentId = id;
		},

		'getComponentId' : function () {
			return this.componentId;
		},

		'getTitle' : function () {
			return this.title;
		},

		'setTitle' : function ( title ) {
			this.title = title;
		},

		'getSplitColumn' : function () {
			return this.splitColumn;
		},

		'setSplitColumn' : function ( splitColumn ) {
			if ( splitColumn ) {
				this.splitColumn = splitColumn;
			} else {
				this.splitColumn = defaultConfig.splitColumn;
			}
		},

		'getCollection' : function () {
			return this.collection;
		},

		'setCollection' : function ( collection ) {
			this.collection  = collection;
		},

		'setVent' : function ( vent ) {
			this.vent = vent;
		},

		'createView' : function () {
			var self = this;

			this.view = new views.FilterCompositeView( {
				'id' : this.getComponentId(),
				'collection' : this.getCollection(),

				'data' : {
					'title'       : self.getTitle(),
					'componentId' : self.getComponentId(),
					'splitColumn' : self.getSplitColumn()
				},

				'itemViewOptions' : {
					'events' : {
						'click label'	: function ( event ) {
							event.preventDefault();

							var el = $( this.el );

							if ( this.el.className === 'filter-item' || this.el.className === 'filter-item right' ) {
								self._addFilter( el, this.model );
							}
							else {
								self._removeFilter( el, this.model );
							}
						}
					}
				},

				'events' : {
					'click span' : function ( event ) {
						event.preventDefault();
						self.clearFilters( self.selectedFilters );
					},

					'click label.btn' : function ( event ) {
						event.preventDefault();

						var collapseButton    = $( event.target );
						var itemViewContainer = this.$el.find( 'ul.cn-content-filter' );
						var filterHeight      = collapseButton.parents( 'div[id=cn-left-region]' ).height();
						var vent              = self.options.vent;

						itemViewContainer.slideToggle( 'fast', 'swing', function () {
							if ( itemViewContainer.is( ':visible' ) ) {
								collapseButton.addClass( 'glyphicon-minus' ).removeClass( 'glyphicon-plus' );
							} else {
								collapseButton.addClass( 'glyphicon-plus' ).removeClass( 'glyphicon-minus' );
							}

							vent.mediator.trigger( 'scroll:unset', filterHeight );
						} );
					}
				}

			} );
		},

		'getSelectedFilters' : function () {
			return this.flattenedSelectedFilters;
		},

		'_addFilter' : function ( el, model ) {
			var modelId = model.get( 'id' );

			$( this.view.ui.clearButton ).removeAttr( 'disabled' );

			this.selectedFilters[ modelId ] = {
				'id'    : modelId,
				'el'    : el,
				'model' : model
			};

			if ( !_.contains( this.flattenedSelectedFilters, modelId ) ) {
				this.flattenedSelectedFilters.push( modelId );
			}

			el.addClass( 'addHighlight' );
			this.vent.mediator.trigger( 'filter:change' );
			$( window ).scrollTop( 0 );
		},

		'_removeFilter' : function ( el, model ) {
			var modelId     = model.get( 'id' );
			var filterIndex = _.indexOf( this.flattenedSelectedFilters, modelId );
			var clear       = $( this.view.ui.clearButton );

			this.flattenedSelectedFilters.splice( filterIndex, 1 );

			delete this.selectedFilters[ modelId ];

			el.removeClass( 'addHighlight' );

			if ( this.flattenedSelectedFilters.length <= 0 ) {
				clear.attr( 'disabled', 'disabled' );
			}

			this.vent.mediator.trigger( 'filter:change' );
			$( window ).scrollTop( 0 );
		},

		'clearFilters' : function ( currentFilters ) {
			var self  = this;

			$( this.view.ui.clearButton ).attr( 'disabled', 'disabled' );

			_.each(currentFilters, function( data ) {
				$( data.el ).removeClass( 'addHighlight' );

				var modelId     = data.model.get( 'id' );
				var filterIndex = _.indexOf( self.flattenedSelectedFilters, modelId );

				self.flattenedSelectedFilters.splice( filterIndex, 1 );
				delete self.selectedFilters[ modelId ];
			} );

			this.vent.mediator.trigger( 'filter:change' );
			$( window ).scrollTop( 0 );
		}
	} );

} );