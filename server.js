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
	console.log( 'no config file found for the proxy server' );
}

var files = path.join( process.cwd() );
var root  = ( config && config.url ) || 'http://cebudev.pd360.com';

console.log( 'root URL for proxy server is', root );

// this project's files
app.use( express.static( files ) );
// proxy to staging for all other files
app.use( '/', function ( request, response, next ) {
	var url = root + request.path;

	if ( process.env.TRAVIS !== 'true' ) {
		util.log( 'proxing request for ' + request.method + ' ' + url );
	}

	request.pipe( fetch( {
		'method' : request.method,
		'url'    : url,
		'qs'     : request.query,
		'json'   : true
	} ) ).pipe( response );
} );

server.listen( '8080' );
