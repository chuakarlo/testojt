define( function ( require ) {
	'use strict';

	var Spinner = require( 'spin' );

	return {
		'doInitialize' : function ( view ) {
			var opts      = view._getOptions();
			view.spinner  = new Spinner( opts );
		},

		'doOnRender' : function ( view ){
			view.spinner.spin();
			view.$el.append( view.spinner.el );
		},

		'doOnClose' : function ( view ) {
			view.spinner.stop();
		}
	};
} );