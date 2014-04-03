[![Build Status](https://magnum.travis-ci.com/School-Improvement-Network/backbone.content-navigation.png?token=ENyA7axoxX5Ea7xuQpUx&branch=develop)](https://magnum.travis-ci.com/School-Improvement-Network/backbone.content-navigation)

#backbone.content-navigation
Content navigation component for resource applications and the platform.

## Class System
```
ContentNavigation/
├── MainView
├── Views/
│   ├── SegmentItem
│   └── SegmentCollection
└── Components/
    └── SegmentCollection
```
## Main Class
```
var GZContentNavigation = require( 'backbone.contentnavigation' );

var contentNavigation = new GZContentNavigation({
	init: true
});

// add to a region
region.show( contentNavigation.MainView );
```

**Options**
* **init** (boolean) - Optional. Default true. Set to false if you only want the shared components. False will prevent the app from initializing the main view and other dependencies.

## Segment Component
```
var GZContentNavigation = require( 'backbone.contentnavigation' );

var contentNavigation = new GZContentNavigation({
	init: false
});

var segmentComponent = new contentNavigation.Component.SegmentCollection({
	url	: '/api/contents',
	className : 'myClass',
	layout: 'grid'
});
```
**Options**
* **url** (string) - Required if there's no collection set. This will use the default collection and set the URL.
* **collection** (backbone.collection) - Required. This will take precedence over the ```url``` config. Set this if you want to use your own collection. Collection model must comply with the Video Content schema.
* **className** (string) - Optional. Set this to add your own CSS class on the collection view.

**Methods**
* **getView** - Returns the component's collection view.
* **getCollection** - Returns the collection used on the collection view.
* **getVent** - Returns a Backbone.Event. Use this to subscribe for events.
* **getClassName** - Returns the custom CSS class add on the collection view.

**Events**

Subscribe to events by calling ```component.getVent()```. This will return Backbone.Events.
* **click:watchLater** - Triggered when the Watch Later button is clicked on segments.
	Parameter passed:
	- model (backbone.model) - The model of the clicked segment.
	- click (boolean) - The click state of the Watch Later button.
* **click:watchLater** - Triggered when the Segment Play Now is clicked
	Parameter passed:
	- model (backbone.model) - The model of the clicked segment.
	- e (event object) - The event object on click.

## Adding Filter Component
```
// Require the filter component
var components	= {
	'FilterComponent'	: require( 'components/FilterComponent' )
};

// Require the filter collection
var collections	= {
	'FilterCollection'	: require('collections/FilterCollection')
};

// Instantiate a filter collection
var gradesFilterCollection =  new collections.FilterCollection();
gradesFilterCollection.url = '/api/grades';

// Instantiate a new filter component
// Set the options for instantiating the filter component
var gradesFilterComponent = new components.FilterComponent({
	vent :				eventListener, // Event listener
	title :				'Grades', // Title for the filter component
	id :				'cn-grades-filter', // Add an id for the component
	splitColumn	:		true, // For 1 or 2 columns. Defaults to false
	collection :		gradesFilterCollection // The filter collection to use
});

// For the Filter Controller
// Register and add the filter component to the filter container view
// Pass an identifier on the first parameter.
this.addFilterComponent( 'gradesFilter', gradesFilterComponent );

// For Region Views
// Filter can also be added to any region getting its view
region.show( gradesFilterComponent.getView() );
```

Filter component triggers  ```filter:change``` and subscribers can call the filter component ```getSelectedFilters``` method that will return an array of selected filters.

## File Architecure
```
ContentNavigation/
├── build - compiled js and css
├── grunt - grunt files
├── resources - less and images source
├── src - content navigation application source
└── test - unit tests
```

## Grunt Tasks
Running a static connect server, livereload, watches for js and html changes, and jshint.

```grunt dev```

Running a static connect server, livereload, watches for js and html changes, compiles and jshint.

```grunt devbuild```

Running connect, file watch, jshint, livereload on pulic tests

```grunt testpublic```

Run JSHint on app src and test.

```grunt jshintall```