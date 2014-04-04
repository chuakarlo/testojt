define( function( require ) {
	'use strict';

	// libraries
	var FilterableCollection = require( 'filterable.collection' );

	// model
	var SelectedItemModel = require( 'videoPlayer/models/SelectedItemModel' );

	return FilterableCollection.extend( {
		'model': SelectedItemModel,

		'initialize': function() {
			var testData = [
				{
					'id'    : 1,
					'name'  : 'Juan dela Cruz',
					'email' : 'juan@delacruz.com'
				},
				{
					'id'    : 2,
					'name'  : 'Maria Pagpaitan',
					'email' : 'maria@hotmail.com'
				},
				{
					'id'    : 3,
					'name'  : 'Pedro Penduko',
					'email' : 'pedro@gmail.com'
				},
				{
					'id'    : 4,
					'name'  : 'Nick Smith',
					'email' : 'nick.smith@globalzeal.net'
				},
				{
					'id'    : 5,
					'name'  : 'John Doe',
					'email' : 'johndoe@example.com'
				},
				{
					'id'    : 6,
					'name'  : 'Jerome Ramos',
					'email' : 'jerome.ramos@globalzeal.net'
				},
				{
					'id'    : 7,
					'name'  : 'Crisostomo Ibara',
					'email' : 'crisostomo.ibara@sinet.com'
				},
				{
					'id'    : 8,
					'name'  : 'Maria Clara',
					'email' : 'maria.clara@globalzeal.net'
				},
				{
					'id'    : 9,
					'name'  : 'Padre Damaso',
					'email' : 'damaso@damaso.net'
				}
			];

			this.set( testData );
		}
	} );
} );
