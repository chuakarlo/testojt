define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var App        = require( 'App' );

	var template  = require( 'text!admin/templates/NavLayout.html' );

	require( 'backbone.stickit' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'ui' : {
			'main'              : '#admin-main',
			'subpage'           : '#admin-subpage',
			'frequent'          : '.js-frequent li:not(.disabled) a',
			'frequentContainer' : '.js-frequent'
		},

		'events' : {
			'click @ui.frequent' : 'selectFrequent'
		},

		'regions' : {
			'loading' : '#admin-loading'
		},

		'modelEvents' : {
			'change:selectedTool' : 'toolChanged',
			'change:selectedPage' : 'pageChanged'
		},

		'navigate' : function ( options ) {
			// check if pd360 has completed loading
			var pd360Loaded = App.request( 'pd360:loaded' );

			// show a loading view until pd360 has completed loading
			this.loading.show( new App.Common.LoadingView() );

			App.when( pd360Loaded ).done( function () {
				// close loading
				this.loading.close();

				// navigate to pd360 page
				App.request( 'pd360:navigate', 'admin', this.model.get( 'selectedTool' ), options );
			}.bind( this ) );
		},

		'pageChanged' : function ( model, value ) {
			if ( value && value !== '' ) {
				// navigate to the appropriate flash subpage
				this.navigate( { 'subPage' : value } );
				this.updateFrequentStatus( value );
			} else {
				// hide flash
				this.hidePD360();
			}
		},

		'initialize' : function ( options ) {
			this.model = new Backbone.Model();
			this.tools = options.tools;

			// find if sinetTools exists
			this.sinetTools = _.find( this.tools.models, function ( model ) {
				return model.id === 'adminSinet';
			} );
		},

		'onRender' : function () {
			this.stickit( null, {
				'#admin-main' : {
					'observe'       : 'selectedTool',
					'selectOptions' : {
						'collection'    : this.tools,
						'labelPath'     : 'name',
						'valuePath'     : 'id',
						'defaultOption' : {
							'label' : 'Choose a tool...',
							'value' : ''
						}
					}
				}
			} );
			this.ui.frequentContainer.hide();
		},

		'onShow' : function () {
			// remove sinet frequent tools if the user doesn't have sinet access
			if ( !this.sinetTools ) {
				this.ui.frequentContainer.remove();
			}
		},

		'showSubPages' : function ( pages ) {
			// get the subpages for the selected admin tool
			var subpagesRequest = App.request( pages );

			// hide pd360 until a subpage is selected
			this.hidePD360();

			App.when( subpagesRequest ).done( function ( subpages ) {
				// populate the dropdown
				this.addBinding( null, {

					'#admin-subpage' : {

						'observe' : 'selectedPage',

						'selectOptions' : {

							'defaultOption' : {
								'label' : 'Choose a page...',
								'value' : ''
							},

							'collection' : subpages,
							'labelPath'  : 'name',
							'valuePath'  : 'id'
						}

					}

				} );

				// show the dropdown
				this.ui.subpage.removeClass( 'hidden' ).prop( 'disabled', false );

			}.bind( this ) );
		},

		'hideSubPages' : function () {
			this.ui.subpage.val( '' ).trigger( 'change' ).prop( 'disabled', true ).addClass( 'hidden' );
		},

		'hidePD360' : function () {
			App.request( 'pd360:hide' );
		},

		'toolChanged' : function ( model, value ) {
			// hide active pills
			this.updateFrequentStatus();

			// hide frequent sinet tools
			this.ui.frequentContainer.hide();

			// reset subPage selection
			this.hideSubPages();

			if ( value === 'adminLibrary' ) {

				this.showSubPages( 'admin:pages:on-demand' );

			} else if ( value === 'adminSinet' ) {

				this.ui.frequentContainer.show();
				this.showSubPages( 'admin:pages:sinet' );

			} else if ( value === 'adminCommunity' || value === 'adminCourse' || value === 'adminLivebook' ) {

				this.navigate();

			}

		},

		'selectFrequent' : function ( event ) {
			event.preventDefault();

			// Change to SINet tools if not already selected
			if ( this.ui.main.val() !== 'adminSinet' ) {
				this.ui.main.val( 'adminSinet' );
				this.ui.main.trigger( 'change' );
			}

			var selectedTool = $( event.currentTarget ).attr( 'data-tool' );

			// Change to Selected Tool
			if ( this.ui.subpage !== selectedTool ) {
				this.ui.subpage.val( selectedTool );
				this.ui.subpage.trigger( 'change' );
			}

		},

		'updateFrequentStatus' : function ( selectedTool ) {
			// jquery selector breaks on empty string
			selectedTool = selectedTool || false;

			// remove currently selected tool
			this.ui.frequent.parent().removeClass( 'active' );

			// highlight the current tool
			$( '[data-tool=' + selectedTool + ']' ).parent().addClass( 'active' );
		}

	} );

} );
