[![Build Status](https://magnum.travis-ci.com/School-Improvement-Network/backbone.video-player.png?token=k1ButpL8Gfow1RsSRpDy&branch=dev)](https://magnum.travis-ci.com/School-Improvement-Network/backbone.video-player)

#Video player client for Platform Waimea.
___
This is a stripdown version of [Videojs](https://github.com/videojs/video.js) without the unnecessary codes and with support for Adaptive Streaming (HLS) using JWPlayer for platforms that don't have a built-in HLS (Chrome, Firefox, IE).

___
##Installation
`git clone git@github.com:School-Improvement-Network/backbone.video-player.git`

on the project folder:

`npm install && bower install` (at this point. js/libs/ will not be anymore empty)

##Usage
* `grunt compile` - Test and Compile code

or

* `grunt compile:js` - Compiles code with requirejs.

* `grunt uglify:js` - Uglifies main.compile.js.

* `grunt compile:less` - Compiles LESS source to CSS.


##Run
* `sling start -r` - as stand alone
* `sling start` - if part on platform.

##Create Documentation
* `grunt docs` - Generates Documentation

> In grunt > docs.js  set `github : true` if you want to create ghpages in github.
___
##Player Overview

Eventually this will be used within Backbone and Marionette applications.
The compiled and minified source file will expose functions to frameworks. Example:

	// Init function
	player( videoDom, options );

	player.play();
	player.pause();
	player.seek();
	player.setVolume();
	...

`options` will be an object which should include:

	{
		// Video resource location
		url: 'example.com/test-vid/
		// Video controls which default is ['play', 'pause', 'loader', 'volume', 'fullscreen']
		controls : []
	}

On HTML5 videos, player will handle the creation of DOM elements for the controls during initialization. This is for uniformity of controls accross different platforms/browsers.

We evaluated different video player plugins that already handles this functionalities like:

- Video.js
- Mediaelement.js

All meet our needs except support for Adaptive Streaming. We saw two solutions for this.

- We could fork a plugin and add a code which will load our flash player of choice that supports adaptive streaming ( for .smil or .m3u8 video extensions ).
- Write our own HTML5 video player plugin that handles loading of flash player that supports adaptive streaming. For faster development, refer to one of the plugins structure and approach.

The team is still reviewing the best solution. We're leaning towards solution #2.

We see # benefits to this approach:

- Extending player with custom controls will be much easier.
- Unnecessary features of plugins will not be included.
- Good for our team since we will be exposed to coding pure Javascript. Time invested will be worth it in the long run.
