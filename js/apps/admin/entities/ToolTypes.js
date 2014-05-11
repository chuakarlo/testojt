define( function ( require ) {
	'use strict';

	var App       = require( 'App' );
	var Backbone  = require( 'backbone' );
	var toolTypes = require( 'admin/data/ToolTypes' );

	var tools;

	var API = {

		'getTools' : function () {
			var defer = App.Deferred();

			if ( tools ) {
				return defer.resolve( tools );
			}

			this.getPrivileges( defer );

			return defer.promise();
		},

		'getPrivileges' : function ( defer ) {
			var fetchingPrivileges = App.request( 'user:privileges' );
			var fetchingPersonnel  = App.request( 'user:personnel' );

			App.when( fetchingPrivileges, fetchingPersonnel ).done( function ( privileges, personnel ) {
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

				if ( privileges.isCommunityAdmin() || personnel.isSinetAdmin() ) {
					tools.add( toolTypes.community );
				}

				if ( personnel.isSinetAdmin() ) {
					tools.add( toolTypes.sinet );
				}

				if ( privileges.isLumiBookAuthor() ) {
					tools.add( toolTypes.lumibook );
				}

				defer.resolve( tools );
			} );
		}

	};

	App.reqres.setHandler( 'admin:tools', function () {
		return API.getTools();
	} );

} );
