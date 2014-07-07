define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var ModalPersonnelView = require( 'common/views/PersonnelModal' );

	//-----------------------------------------------
	// Handle calls from flash to show a user profile
	//-----------------------------------------------
	window.showProfile = function ( pid ) {
		var model = new MiniPersonnelModel( {
			'persId' : pid
		} );

		var view = new ModalPersonnelView( {
			'model' : model
		} );

		model.fetch( {
			'success' : function () {
				App.modalRegion.show( view );
			}
		} );
	};
} );
