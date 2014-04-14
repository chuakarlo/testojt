define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var FilteredRouter = Marionette.AppRouter.extend( {

		before: {},

		after: {},

		runFilters : function( filters, fragment, args ) {
			if ( _.isEmpty( filters ) ) {
				return true;
			}
			var failingFilter = _.find( filters, function( func, filterRoute ) {
				if ( !_.isRegExp( filterRoute ) ) {
					filterRoute = new RegExp( filterRoute );
				}
				if ( filterRoute.test( fragment ) ) {
					var result = ( _.isFunction( func ) ? func.apply( this, args ) : this[func].apply( this, args ) );
					return _.isBoolean( result ) && result === false;
				}
				return false;
			},
			this );
			return failingFilter ? false : true;
		},

		route : function(route, name, callback) {
			// This is overloading the default Backbone.Router.route and
			// contains about 90% of the original code.
			if ( !_.isRegExp( route ) ) {
				route = this._routeToRegExp( route );
			}
			if ( _.isFunction( name ) ) {
				callback = name;
				name = '';
			}
			if ( !callback ) {
				callback = this[name];
			}
			var router = this;
			Backbone.history.route( route, function( fragment ) {
				var args = router._extractParameters( route, fragment );
				if ( router.runFilters( router.before, fragment, args ) ) {
					// Backbone v1.1.2 uses the following to execute the
					// function call instead of callback.apply
					// router.execute( callback, args );
					if (callback) {
						callback.apply( router, args );
					}
					router.runFilters( router.after, fragment, args);
					router.trigger.apply( router, ['route' + name].concat( args ) );
					router.trigger( 'route', name, args );
					Backbone.history.trigger( 'route', router, name, args );
				}
			} );
			return this;
		},
	} );

	return FilteredRouter;

} );