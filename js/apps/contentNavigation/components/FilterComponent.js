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
		'splitColumn' : false,
		'multiSelect' : true
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			if ( !options.title || !options.vent || !options.collection ) {
				new Error( 'Options Error.' );
			}

			this.setTitle( options.title );
			this.setComponentId( options.id );
			this.setCollection( options.collection );
			this.setVent( options.vent );
			this.setSplitColumn( options.splitColumn );
			this.setMultiSelect( options.multiSelect );
			this.createView();
			this.prevSelectedValue        = { };
			this.selectedFilters          = { };
			this.flattenedSelectedFilters = [ ];
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

		'getMultiSelect' : function () {
			return this.multiSelect;
		},

		'setMultiSelect' : function ( multiSelect ) {
			if ( !multiSelect ) {
				this.multiSelect = multiSelect;
			} else {
				this.multiSelect = defaultConfig.multiSelect;
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
					'splitColumn' : self.getSplitColumn(),
					'multiSelect' : self.getMultiSelect()
				},

				'itemViewOptions' : {
					'events' : {
						'click label'	: function ( event ) {
							event.preventDefault();

							var el = $( this.el );

							var elClass = ( this.el.className === 'filter-item' ) || ( this.el.className === 'filter-item right' );

							if ( self.getMultiSelect() && elClass ) {
								self._addFilter( el, this.model );
							} else if ( self.getMultiSelect() && !elClass ) {
								self._removeFilter( el, this.model );
							} else {
								self._singleSelectFilter( el, this.model );
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
								collapseButton.addClass( 'fa-minus' ).removeClass( 'fa-plus' );
							} else {
								collapseButton.addClass( 'fa-plus' ).removeClass( 'fa-minus' );
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

		'_singleSelectFilter' : function ( el, model ) {

			var modelId     = model.get( 'id' );
			var prevModelId = this.prevSelectedValue.modelId;
			var prevEl      = this.prevSelectedValue.el;
			var filterIndex = _.indexOf( this.flattenedSelectedFilters, prevModelId );

			this.selectedFilters[ modelId ] = {
				'id'    : modelId,
				'el'    : el,
				'model' : model
			};

			this.view.$el.find( 'li.filter-item' ).removeClass( 'addHighlight' ).find( '.filter-tick' ).removeClass( 'fa fa-check' );

			if ( prevEl && prevModelId ) {
				prevEl.removeClass( 'addHighlight' ).find( '.filter-tick' ).removeClass( 'fa fa-check' );
				this.flattenedSelectedFilters.splice( filterIndex, 1 );
				delete this.selectedFilters[ prevModelId ];
			}

			this.flattenedSelectedFilters.push( modelId );
			el.addClass( 'addHighlight' ).find( '.filter-tick' ).addClass( 'fa fa-check' );
			this.vent.mediator.trigger( 'filter:change' );
			this.prevSelectedValue.el = el;
			this.prevSelectedValue.modelId = modelId;
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

			el.addClass( 'addHighlight' ).find( '.filter-tick' ).addClass( 'fa fa-check' );
			this.vent.mediator.trigger( 'filter:change' );
		},

		'_removeFilter' : function ( el, model ) {
			var modelId     = model.get( 'id' );
			var filterIndex = _.indexOf( this.flattenedSelectedFilters, modelId );
			var clear       = $( this.view.ui.clearButton );

			this.flattenedSelectedFilters.splice( filterIndex, 1 );

			delete this.selectedFilters[ modelId ];

			el.removeClass( 'addHighlight' ).find( '.filter-tick' ).removeClass( 'fa fa-check' );

			if ( this.flattenedSelectedFilters.length <= 0 ) {
				clear.attr( 'disabled', 'disabled' );
			}

			this.vent.mediator.trigger( 'filter:change' );
		},

		'clearFilters' : function ( currentFilters ) {
			var self  = this;

			$( this.view.ui.clearButton ).attr( 'disabled', 'disabled' );

			_.each( currentFilters, function ( data ) {
				$( data.el ).removeClass( 'addHighlight' ).find( '.filter-tick' ).removeClass( 'fa fa-check' );

				var modelId     = data.model.get( 'id' );
				var filterIndex = _.indexOf( self.flattenedSelectedFilters, modelId );

				self.flattenedSelectedFilters.splice( filterIndex, 1 );
				delete self.selectedFilters[ modelId ];
			} );

			this.vent.mediator.trigger( 'filter:change' );
		}
	} );

} );
