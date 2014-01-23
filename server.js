'use strict';

var cwd = process.cwd();

var http    = require( 'http' );
var express = require( 'express' );
var fs      = require( 'fs' );
var path    = require( 'path' );
var fetch   = require( 'request' );
var app     = express();
var server  = http.createServer( app );

var files = path.join( cwd );

app.use( '/', express.static( files ) );

app.get( '/pd360/dao*', function ( request, response, next ) {
	var url = 'http://staging.pd360.com/com/schoolimprovement' + request.path;

	console.log( 'proxing request for', request.method, url );

	request.pipe( fetch( {
		'method' : request.method,
		'url'    : url,
		'qs'     : request.query,
		'json'   : true
	} ) ).pipe( response );
} );

server.listen( '8080' );