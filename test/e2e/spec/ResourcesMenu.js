var suite  = require( 'selenium-runner' ).suite;
var expect = require( 'selenium-runner' ).expect;

suite( function ( env ) {
  env.deprecated = true;

  describe('Selenium Test Case', function() {

    this.timeout(60000); // 2 min

    it('should execute test case without errors', function(done) {
      var b = env.browser;

      b.maximize();

      b
      .chain()
      .elementById("resources-tab", function(err, el) {
        b.next('clickElement', el );
      })
      .sleep(1000)
      .elementByTagName('html', function(err, el) {
        b.next('text', el, function(err, text) {
          expect("" + text).to.contain("" + "{Videos}");
        });
      })
      .elementByTagName('html', function(err, el) {
        b.next('text', el, function(err, text) {
          expect("" + text).to.contain("" + "LumiBook");
        });
      })
      .elementByTagName('html', function(err, el) {
        b.next('text', el, function(err, text) {
          expect("" + text).to.contain("" + "Observation");
        });
      })
      .elementByTagName('html', function(err, el) {
        b.next('text', el, function(err, text) {
          expect("" + text).to.contain("" + "Communities");
        });
      })
      .elementByTagName('html', function(err, el) {
        b.next('text', el, function(err, text) {
          expect("" + text).to.contain("" + "{Tasks}");
        });
      })
      .close(function(err) {
        done(err);
      });

    });
  });

} );
