define( function ( require ) {
	'use strict';

	var App       = require( 'App' );
	var Backbone  = require( 'backbone' );
	var toolTypes = require( 'admin/data/ToolTypes' );

	var tools;

	var API = {

		'getTools' : function () {

			var privileges = App.request( 'user:privileges' );

			var Tools = Backbone.Collection.extend( {
				'comparator' : 'name'
			} );

			tools = new Tools();

			if ( privileges.isLibraryAdmin() ) {
				tools.add( toolTypes.ondemand );
			}

			if ( privileges.isCourseAdmin() ) {
				tools.add( toolTypes.course );
			}

			if ( privileges.isCommunityAdmin() || privileges.isSinetAdmin() ) {
				tools.add( toolTypes.community );
			}

			if ( privileges.isSinetAdmin() ) {
				tools.add( toolTypes.sinet );
			}

			if ( privileges.isLumiBookAuthor() ) {
				tools.add( toolTypes.lumibook );
			}

			return tools;

		}

	};

	App.reqres.setHandler( 'admin:tools', function () {
		return API.getTools();
	} );

} );
