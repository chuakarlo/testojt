define( function ( require ) {
	'use strict';

	var helper = {
		'sortModel' : function ( model ) {

			model.Tasks.sort ( function ( a, b ) {

				var order     = '*!@_.()#^&%-=+01234567989ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
				var aTaskName = a.TaskName.toString();
				var bTaskName = b.TaskName.toString();
				var nameA     = order.indexOf ( aTaskName[ 0 ] );
				var nameB     = order.indexOf ( bTaskName[ 0 ] );

				if ( nameA === nameB ) { // same first character, sort regular
					if ( a < b ) {
						return -1;
					} else if ( a > b ) {
						return 1;
					}
					return 0;
				} else {
					return nameA - nameB;
				}

			} );

			return model;

		}

	};

	return function ( model ) {
		return helper.sortModel( model );
	};

} );
