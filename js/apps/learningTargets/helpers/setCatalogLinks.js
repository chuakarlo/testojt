define( function ( require ) {
	'use strict';

	var linkSetters = [
		function ( resourceId ) {
			var opts = {
				'icon'            : 'fa-youtube-play',
				'catalogTraining' : 'catalog-video',
				'catalogLinks'    : '#resources/videos/' + resourceId
			};

			return opts;
		},

		function ( resourceId ) {
			var opts = {
				'icon'            : 'fa-university',
				'catalogTraining' : 'catalog-course',
				'catalogLinks'    : '#resources/learning/catalogs/' + resourceId + '/legacy'
			};

			return opts;
		},

		function ( ) {
			var opts = {
				'icon'            : 'fa-cubes',
				'catalogTraining' : 'catalog-training',
				'catalogLinks'    : '#catalog-training'
			};

			return opts;
		}
	];

	return function ( model ) {
		return linkSetters[ model.get( 'CatalogResourceTypeId' ) - 1 ]( model.get( 'ResourceId' ) );
	};

} );
