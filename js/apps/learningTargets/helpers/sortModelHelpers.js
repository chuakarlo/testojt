define( function ( require ) {
	'use strict';

	var helper = {
		'sortModel' : function ( model ) {

			model.Tasks.sort ( function ( a, b ) {

				if ( a.TaskName < b.TaskName ) {
					return -1;
				}
				if ( a.TaskName > b.TaskName ) {
					return 1;
				} else {
					return 0;
				}

			} );

			return model;

		}

	};

	return function ( model ) {
		return helper.sortModel( model );
	};

} );
