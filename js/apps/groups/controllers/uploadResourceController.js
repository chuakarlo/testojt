define( function ( require ) {
	'use strict';

	var App        = require( 'App' );

	App.module( 'Groups.Upload', function ( Upload ) {
		Upload.Controller = {

			'uploadPage' : function ( options ) {

				this.model = options.groupModel;

				this.layout = new App.Groups.Views.UploadResource( {
					'model' : this.model
				} );

				App.content.show( this.layout );
			}

		};
	} );
} );
