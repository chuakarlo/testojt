define( function( require ) {
  'use strict';

  var _          = require( 'underscore' );
  var Backbone   = require( 'backbone' );
  var Marionette = require( 'marionette' );
  var async      = require( 'async' );


  Marionette.MiddlewareRouter = Marionette.AppRouter.extend( {

    // Internal method to process the `appRoutes` for the
    // router, and turn them in to routes that trigger the
    // specified method on the specified `controller`.
    'processAppRoutes' : function ( controller, appRoutes ) {
      var method;
      var methodName;
      var middleware;
      var route;
      var routesLength;
      var i;
      var routes = [];
      var router = this;
      var err;
      var errMsg;

      for(route in appRoutes){
        if (appRoutes.hasOwnProperty(route)){
          routes.unshift([route, appRoutes[route]]);
        }
      }

      routesLength = routes.length;
      for ( i = 0; i < routesLength; i++ ){
        route = routes[ i ][ 0 ];
        methodName = routes[ i ][ 1 ];
        if( typeof methodName === 'string' ) {
          method = controller[ methodName ];

          if ( !method ){

            errMsg   = 'Method "' + methodName + '" was not found on the controller';
            err      = new Error( errMsg );
            err.name = 'NoMethodError';

            throw err;
          }

          method = _.bind( method, controller );
          router.route( route, methodName, method );

        } else if ( _.isArray( methodName ) ) {

          if ( methodName.length === 0 ) {

            errMsg   = 'Methods for "' + route + '" could not be found on the controller';
            err      = new Error( errMsg );
            err.name = 'NoMethodError';

            throw err;
          }

          method = controller[ methodName.pop() ];

          middleware = methodName.map( function ( value, index, array ) {
            return controller[ value ];
          } );

          _.bind( method, controller );

          this.routeToMiddleware( route, middleware, method, controller );
        }
      }
    },

    'routeToMiddleware' : function ( route, middleware, callback, controller ) {

      if ( !_.isRegExp( route ) ) {
        route = this._routeToRegExp( route );
      }

      Backbone.history.route( route, _.bind( function ( fragment) {

        var args = this._extractParameters( route, fragment );

          async.series( middleware.map( function ( value, index, array ) {
            return function ( callback ) {
              value.call( controller, args, callback );
            };
          } ) , function ( error, results ) {
              callback.call( controller, error, results, args );
          } );

          this.trigger.apply( this, [ 'route:' + name].concat( args ) );
          this.trigger( 'route', name, args );

          Backbone.history.trigger( 'route', this, name, args );

        }, this ) );

      return this;
    }

  } );

} );