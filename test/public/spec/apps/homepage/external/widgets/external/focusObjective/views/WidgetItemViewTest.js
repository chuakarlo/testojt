define(function(require) {
	'use strict';

	var sinon          = window.sinon;
	var $              = require( 'jquery' );
	var expect         = require( 'chai').expect;
	var Remoting       = require( 'Remoting' );
	var Backbone       = require( 'backbone');
	var CompositeView  = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView');
	var WidgetItemView = require( 'apps/homepage/external/widgets/external/focusObjective/views/WidgetItemView' );

	describe('Focus Objectives WidgetItemView ItemView', function() {

		var UserWidgetCompositeViewInstance;
		var UserWidgetCompositeView;
		var WidgetCollectionStub;
		var modelData;

		before(function() {
			modelData = [{
				'ContentName': 'Defining the Professional Learning Community',
				'SegmentLengthInSeconds': 692,
				'Children': [],
				'ContentId': 671,
				'ImageURL': 'thumb_1204-2.jpg',
				'TranscriptFileName': 'tr_1204-2.pdf',
				'GuidebookFileName': 'gb_1204-2.pdf',
				'ContentTypeId': 3,
				'AudioFileName': 'au_1204-2.mp3',
				'ContentDescription': '<i>Segment 2 of 10 of this program.<\/i>\rPrincipals build on the foundational ideas of learning, collaboration, and a focus on results.<br\/>\r-The focus must be on learning, not teaching. (1:15)<br\/>\r-5th grade students have a British cultural eating experience. (1:27)<br\/> \r-Example of elementary school and how they collect and analyze data. (2:04)<br\/> \r-The study of data provides focus for staff development initiatives. (5:40)<br\/>\r-Elementary school celebrates student success. (6:23)<br\/> \r-Teams collaborate and take action. (7:18)<br\/>\r-Teams are provided protective planning time every day. (9:03)<br\/> \r-Teachers are taken out of the classroom to provide planning time.<br\/>  \r-Elementary school has collaborative relationship with community. (10:27)<br\/> \r-PTA runs math club that helps students with math needs. (10:51)<br\/>\r'
			}, {
				'ContentName': 'First Behavior: Identify Instructional Purpose',
				'SegmentLengthInSeconds': 694,
				'Children': [],
				'ContentId': 474,
				'ImageURL': 'thumb_804S-4.jpg',
				'TranscriptFileName': 'tr_804S-4.pdf',
				'GuidebookFileName': 'gb_804S-4.pdf',
				'ContentTypeId': 3,
				'AudioFileName': 'au_804S-4.mp3',
				'ContentDescription': '<i>Segment 4 of 15 of this program.<\/i>\rThe purpose is determined by the teacher\'s intent as to the answer.<br\/>\r-Behaviors for preparing questions, first identify instructional purpose. (0:31)<br\/> \r-Purpose for questions must be determined. (0:38)<br\/> \r-Recitation questions generate responses of facts. (1:16)<br\/> \r-Discussion questions open dialog among students. (1:49)<br\/> \r-Middle school science teacher uses good questioning. (5:53)<br\/> \r-Language arts teacher uses good questioning. (7:38)<br\/> \r-Speech & Debate teacher uses good questioning. (9:41)<br\/> \r-Convergent questions focus thinking onto one answer. (10:18)<br\/>  \r-Divergent questions unveil many possible answers.<br\/> \r\r'
			}, {
				'ContentName': 'The Value of Grouping and Working in Teams',
				'SegmentLengthInSeconds': 394,
				'Children': [],
				'ContentId': 1284,
				'ImageURL': 'thumb_1603E_11.jpg',
				'TranscriptFileName': 'tr_1603E_11.pdf',
				'GuidebookFileName': 'gb_1603E_11.pdf',
				'ContentTypeId': 3,
				'AudioFileName': 'au_1603E_11.mp3',
				'ContentDescription': '<i>Segment 11 of 13 of this program.<\/i> When students with special needs are placed in heterogeneous groups with high expectations for equal participation, remarkable growth occurs.<br\/>-Toby Karten and a fifth-grade science teacher have identified heterogeneous groups to work at stations. (1:12)<br\/>-Students are divided into performance station, word station, picture this, research station, and teacher station. (1:30)<br\/>-Middle school social studies teachers team and have students create their own myths. The students then read their stories to the class. (3:22)<br\/>\r\r\r\r\r'
			}, {
				'ContentName': '2nd E, Experience',
				'SegmentLengthInSeconds': 695,
				'Children': [],
				'ContentId': 25,
				'ImageURL': 'thumb_1104E-3.jpg',
				'TranscriptFileName': 'tr_1104E-3.pdf',
				'GuidebookFileName': 'gb_1104E-3.pdf',
				'ContentTypeId': 3,
				'AudioFileName': 'au_1104E-3.mp3',
				'ContentDescription': '<i>Segment 3 of 10 of this program.<\/i>\nStudents must EXPERIENCE the learning first hand.<br\/>\n-3rd grade active learning classroom. (0:55)<br\/>\n-4th grade science students study chemical reactions. (4:15)<br\/>\n-4th grade science students study energy. (6:41)<br\/>\n-Kindergarten music classroom example. (8:47)<br\/>\n-The Pyramid of Learning explained. (10:24)<br\/> \n\n\n'
			}, {
				'ContentName': 'Knowing the Learner',
				'SegmentLengthInSeconds': 292,
				'Children': [],
				'ContentId': 151,
				'ImageURL': 'thumb_1102E-4.jpg',
				'TranscriptFileName': 'tr_1102E-4.pdf',
				'GuidebookFileName': 'gb_1102E-4.pdf',
				'ContentTypeId': 3,
				'AudioFileName': 'au_1102E-4.mp3',
				'ContentDescription': '<i>Segment 4 of 8 of this program.<\/i>\rTeachers need a picture of who the student is and how they learn.<br\/>\r-Knowing the learner, who they are and how they learn.<br\/>\r-3rd and 4th grade teachers know their students. (0:43)<br\/>\r\r\r'
			}];

			var dfd = new $.Deferred();
			dfd.resolve( modelData );

			WidgetCollectionStub = sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
			UserWidgetCompositeView = new CompositeView({
				model: new Backbone.Model({
					WidgetId: 2
				}),
				_isRendered : true
			});
			UserWidgetCompositeView.render();
		});

		after(function() {
			Remoting.fetch.restore();
		});

		it( 'should be an instance of ItemView', function() {
			UserWidgetCompositeViewInstance = new UserWidgetCompositeView.itemView();
			expect( UserWidgetCompositeViewInstance ).to.be.an.instanceof( WidgetItemView );
		});

		it( 'should limit the number of characters to 27 with elipses', function () {
			var focusObjective = UserWidgetCompositeViewInstance.limitCharacter( modelData[0].ContentName );
			expect( focusObjective ).to.be.equal( 'Defining the Professional L...' );
		} );

	});
});