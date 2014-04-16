define( function ( require ) {
	'use strict';

	var SectionModel = require( 'external/models/SectionModel' );

	describe( 'SectionModel Model', function () {

		it('should be an instance of SectionModel Model', function () {
			var sectionModel = new SectionModel();
			sectionModel.should.be.an.instanceof( SectionModel );
		} );

	} );

} );