var suite  = require( 'selenium-runner' ).suite;
var expect = require( 'selenium-runner' ).expect;


suite( function ( env ) {

	env.deprecated = true;

	describe( 'Logout', function() {

		it( 'should change nav and title after logging user out', function(done) {

			var b = env.browser;

			b.maximize();

			b
			.chain()
			.get( 'http://localhost:8080/index.html?#login' )
			.sleep( 1000 )
			.elementById( 'login-input-email', function( err, el ) {
				b.next( 'clear', el, function(err) {
					b.next( 'type', el, 'matthew.donaldson@schoolimprovement.com', {} );
				} );
			} )
			.elementById( 'login-input-password', function( err, el ) {
				b.next( 'clear', el, function( err ) {
					b.next( 'type', el, 'pd360', {} );
				} );
			} )
			.elementById( 'login-button', function( err, el ) {
				b.next( 'clickElement', el, {} );
			} )
			.sleep( 2000 )
			.hasElementByXPath( '//div[@id=\'main-content\']//h1[.=\'Home\']', function( err, bool ) {
				expect( bool ).to.equal( true );
			} )
			.hasElementByXPath( '//li[@id=\'resources-tab\']//span[.=\'Resources\']', function( err, bool ) {
				expect( bool ).to.equal( true );
			} )
			.hasElementByXPath( '//li[@id=\'groups-tab\']//span[.=\'{Groups}\']', function( err, bool ) {
				expect( bool ).to.equal( true );
			} )
			.elementByCssSelector( 'div.nav-menu', function( err, el ) {
				b.next( 'moveTo', el, 0, 0, {} );
			} )
			.sleep( 1000 )
			.elementByXPath('//a[@id=\'logout\']//li[.=\'Log Out\']', function( err, el ) {
				b.next('clickElement', el, {});
			} )
			.sleep( 2000 )
			.hasElementByXPath('//div[@class=\'sub-page-header\']//h1[.=\'Login\']', function( err, bool ) {
				expect( bool ).to.equal( true );
			} )
			.hasElementByXPath('//li[@id=\'resources-tab\']//span[.=\'Resources\']', function( err, bool ) {
				expect( bool ).to.equal( false );
			} )
			.hasElementByXPath('//li[@id=\'groups-tab\']//span[.=\'{Groups}\']', function( err, bool ) {
				expect( bool ).to.equal( false );
			} )
			.close( function( err ) {
				done( err );
			} );

		} );
	} );

} );

