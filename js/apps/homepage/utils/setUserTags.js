define( function ( require ) {
	'use strict';

	var userData = require( 'apps/homepage/configuration/userDataLookup' );

	function hasOwnProperty ( object, key, value ) {
		return object && object.hasOwnProperty( key ) ? object[ key ] : value;
	}

	function pushTags ( targetArray, sourceArray, model, keyStr, comparison ) {
		var key = hasOwnProperty( model, keyStr, comparison );
		if ( key !== comparison ) {
			if ( sourceArray[ key ] ) {
				targetArray.push( sourceArray[ key ] );
			}
		}
	}

	return function setUserTags ( model ) {
		var userTags = [ ];

		pushTags( userTags, userData.gradeLevels, model, 'GradeLevelId', 0 );
		pushTags( userTags, userData.educatorTypes, model, 'EducatorType', '' );
		pushTags( userTags, userData.subjects, model, 'CCSubjectId', 0 );

		return userTags.join(',');
	};
} );
