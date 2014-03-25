'use strict';

var cwd = process.cwd();

var http    = require( 'http' );
var express = require( 'express' );
var path    = require( 'path' );
var fetch   = require( 'request' );
var util    = require( 'util' );
var app     = express();
var server  = http.createServer( app );

var files = path.join( cwd );

var proxy = function ( url, request, response ) {
	if ( process.env.TRAVIS === 'true' ) {
		url = 'http://cebudev.pd360.com' + request.path;
	} else {
		util.log( 'proxing request for ' + request.method + ' ' + url );
	}

	request.pipe( fetch( {
		'method' : request.method,
		'url'    : url,
		'qs'     : request.query,
		'json'   : true
	} ) ).pipe( response );
};

// this project's files
app.use( express.static( files ) );

// proxy to staging for all other files
app.use( '/', function ( request, response, next ) {
	var url = 'http://cfapi.dev.pd360.com' + request.path;

	proxy( url, request, response );
} );

server.listen( '8080' );
