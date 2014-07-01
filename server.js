'use strict';
var http    = require( 'http' );
var express = require( 'express' );
var path    = require( 'path' );
var fetch   = require( 'request' );
var util    = require( 'util' );
var app     = express();
var server  = http.createServer( app );

var config;
try {
	config = require( './config' );
} catch ( error ) {
	util.log( 'no config file found for the proxy server' );
}

var files    = path.join( process.cwd() );
var root     = ( config && config.url ) || 'http://cebudev.pd360.com';
var reStatic = /.jpg|.vtt/;

util.log( 'root URL for proxy server is: ' + root );

var resourceProxy = function ( request, response, next ) {
	var url = 'http://resources.pd360.com/' + request.url;

	if ( !path.extname( request.url ).match( reStatic ) ) {
		return next();
	}
	request.pipe( fetch( url ) ).pipe( response );
};

var proxyStaging = function ( request, response, next ) {
	var url = root + request.path;

	if ( process.env.TRAVIS !== 'true' ) {
		util.log( 'proxing request for ' + request.method + ' ' + url );
	}

	request.pipe( fetch( {
		'method' : request.method,
		'url'    : url,
		'qs'     : request.query,
		'json'   : true
	}, function ( error, res, body ) {
		if ( error ) {
			util.log( 'Catched unhandled stream error in pipe ' + error );
		}
	} ) ).pipe( response );
};

// this project's files
app.use( express.static( files ) );
// proxy request to pd360
app.use( resourceProxy );
// proxy to staging for all other files
app.use( '/', proxyStaging );

server.listen( '8080' );
