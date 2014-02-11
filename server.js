'use strict';

var cwd = process.cwd();

var http    = require( 'http' );
var express = require( 'express' );
var fs      = require( 'fs' );
var path    = require( 'path' );
var fetch   = require( 'request' );
var util    = require( 'util' );
var app     = express();
var server  = http.createServer( app );

var files = path.join( cwd );

var proxy = function ( url, request, response ) {
	util.log( 'proxing request for ' + request.method + ' ' + url );

	request.pipe( fetch( {
		'method' : request.method,
		'url'    : url,
		'qs'     : request.query,
		'json'   : true
	} ) ).pipe( response );
};

// any files pertaining to this project, to avoid conflict with PD360 swf making calls to the root
app.use( '/public', express.static( files ) );

// calls made from PD360 swf for ColdFusion
app.use( '/', function ( request, response, next ) {
	var url = 'http://cfapi.dev.pd360.com' + request.path;

	proxy( url, request, response );
} );

server.listen( '8080' );
