define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var App        = require( 'App' );

	var template  = require( 'text!admin/templates/NavLayout.html' );

	require( 'backbone.stickit' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'ui' : {
			'main'    : '#admin-main',
			'subpage' : '#admin-subpage'
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
			} else {
				// hide flash
				this.hidePD360();
			}
		},

		'initialize' : function ( options ) {
			this.model = new Backbone.Model();
			this.tools = options.tools;
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
			if ( value === 'adminLibrary' ) {

				this.showSubPages( 'admin:pages:on-demand' );

			} else if ( value === 'adminSinet' ) {

				this.showSubPages( 'admin:pages:sinet' );

			} else if ( value === 'adminCommunity' || value === 'adminCourse' || value === 'adminLivebook' ) {

				this.hideSubPages();
				this.navigate();

			} else {
				this.hideSubPages();
			}

		}

	} );

} );
