define( function () {
'use strict';

	var grades = [
		{ 'id' : 'Pre-K', 'title': 'Pre-K' },
		{ 'id' : 'Kindergarten', 'title': 'K' },
		{ 'id' : '1st Grade', 'title': '1st' },
		{ 'id' : '2nd Grade', 'title': '2nd' },
		{ 'id' : '3rd Grade', 'title': '3rd' },
		{ 'id' : '4th Grade', 'title': '4th' },
		{ 'id' : '5th Grade', 'title': '5th' },
		{ 'id' : '6th Grade', 'title': '6th' },
		{ 'id' : '7th Grade', 'title': '7th' },
		{ 'id' : '8th Grade', 'title': '8th' },
		{ 'id' : '9th Grade', 'title': '9th' },
		{ 'id' : '10th Grade', 'title': '10th' },
		{ 'id' : '11th Grade', 'title': '11th' },
		{ 'id' : '12th Grade', 'title': '12th' }
	] ;

	var subjects = [
		{ 'id' : 'Math', 'title': 'Math' },
		{ 'id' : 'ELA', 'title': 'ELA' },
		{ 'id' : 'Science', 'title': 'Science' },
		{ 'id' : 'Social Studies', 'title': 'Social Studies' }
	] ;

	var topics = [
		{ 'id' : 'Assessment', 'title': 'Assessment' },
		{ 'id' : 'Classroom Management', 'title': 'Classroom Management' },
		{ 'id' : 'Common Core', 'title': 'Common Core' },
		{ 'id' : 'Compliance', 'title': 'Compliance' },
		{ 'id' : 'ELL', 'title': 'ELL' },
		{ 'id' : 'Equity', 'title': 'Equity' },
		{ 'id' : 'Instructional Strategies', 'title': 'Instructional Strategies' },
		{ 'id' : 'Special Education', 'title': 'Special Education' },
		{ 'id' : 'Technology', 'title': 'Technology' }
	] ;

	return {
		'Contents' : '/api/contents',

		'Filters' : {
			'Grades'   : grades,
			'Subjects' : subjects,
			'Topics'   : topics
		}
	} ;

} );