define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );

	var views = {
		'ErrorView'                : require( '../views/ErrorView' ),
		'LibraryTreeCompositeView' : require( '../views/LibraryTree/LibraryTreeCollectionView' )
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
			this.createView();

			this.prevSelectedValue = {
				'el'                : '',
				'model'             : '',
				'categoryContainer' : ''
			};

			this.selectedCategory = '';
			this.selectedLibrary = this.collection.first().id;
		},

		'getSelectedFilters' : function () {
			return this.selectedCategory;
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

			this.view = new views.LibraryTreeCompositeView( {
				'id'         : this.getComponentId(),

				'collection' : this.getCollection(),

				'data' : {
					'title'       : self.getTitle(),
					'componentId' : self.getComponentId()
				},

				'itemViewOptions' : {
					'events'          : {
						'click label'	: function ( event ) {
							event.preventDefault();

							var el = $( this.el );
							var parentHasChildren = this.model.Children.length;

							if ( parentHasChildren ) {
								self._selectLibrary( el, this.model );
							} else {
								self._selectCategory( el, this.model, true );
							}

						}
					},
					'itemViewOptions' : {
						events : {
							'click label' : function ( event ) {
								event.preventDefault();

								var el = $( this.el );
								var parentHasChildren = this.model.Children;

								if ( parentHasChildren ) {
									self._selectLibrary( el, this.model );
								} else {
									self._selectCategory( el, this.model, false );
								}
							}
						}
					}
				},

				'events' : {

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

		'_selectLibrary' : function ( el, model ) {
			if ( model.id !== this.selectedLibrary ) {
				var itemViewContainer = el.find( 'ul.cn-tree-category' );

				this.view.$el.find( 'ul.cn-tree-category' ).slideUp();
				itemViewContainer.slideDown( 'fast', 'swing');
				this.selectedLibrary = model.id;
			}
		},

		'_selectCategory' : function ( el, model, option ) {
			this.view.$el.find( 'li' ).removeClass( 'addHighlight' ).find( '.filter-tick' ).removeClass( 'fa fa-check' );
			this.view.$el.find( 'ul' ).removeClass( 'addHighlight' );

			if ( option ) {
				this.view.$el.find( 'ul.cn-tree-category' ).slideUp();
				el.find('li').addClass( 'addHighlight' ).find( '.filter-tick' ).addClass( 'fa fa-check' );
				this.selectedLibrary = model.id;
			}

			el.addClass( 'addHighlight' ).find( '.filter-tick' ).addClass( 'fa fa-check' );

			this.selectedCategory = model.id;
			this.vent.mediator.trigger( 'filter:change' );
		}
	} );

} );
