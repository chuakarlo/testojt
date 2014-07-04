define( function ( require ) {
	'use strict';

	var helper = {
		'sortModel' : function ( model ) {

			model.Tasks.sort( function ( a, b ) {
				var nameA = a.TaskName.toLowerCase();
				var nameB = b.TaskName.toLowerCase();

				if ( nameA < nameB ) {
					return -1;
				}      //sort string ascending
				if ( nameA > nameB ) {
					return 1;
				}
				return 0; //default return value (no sorting)
			} );

			return model;
		}

	};

	return function ( model ) {
		return helper.sortModel( model );
	};

} );
