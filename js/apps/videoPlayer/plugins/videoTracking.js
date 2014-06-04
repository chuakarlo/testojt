define( function ( require ) {
	'use strict';

	var vjs = require( 'videojs' );

	var tracker = function ( options ) {
		options = options || { };

		if ( !options.model.get( 'limited' ) ) {
			this.on( 'timeupdate', function () {
				options.model.set( 'currentTime', this.currentTime() );
			} );

			this.on( 'pause', function () {
				options.model.save();
			} );

			this.on( 'ended', function () {
				options.model.save();
			} );
		}
	};

	vjs.plugin( 'tracker', tracker );

} );
