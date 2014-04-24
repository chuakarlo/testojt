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


	var customContentCategories = [
		{ 'id' : 'Sinet Internal Training', 'title': 'CIS' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Sinet Internal Training2', 'title': 'General', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Sinet Internal Training43', 'title': 'Management' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Sinet Internal Training3', 'title': 'Product Training' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'GZDemo66', 'title': 'TDD and BDD' ,'library': 'GZDemo' },
		{ 'id' : 'GZDemo232', 'title': 'Node Js ' , 'library': 'GZDemo' },
		{ 'id' : 'GZDemod55', 'title': 'Marionette JS', 'library': 'GZDemo' },
		{ 'id' : 'GZDemo998', 'title': 'Slacking' , 'library': 'GZDemo'},
		{ 'id' : 'GZDemo2323', 'title': 'Dota' , 'library': 'GZDemo'},
		{ 'id' : 'GZDemo323233', 'title': 'Foosball Crossovers' ,'library': 'GZDemo' }
	] ;

	var libraryTreeSample = [
		{ 'id' : 100, 'libraryName': 'Sinet Internal Training' , 'nodes': [{'id': 200, 'categoryName':'CIS', 'libraryName':'Sinet Internal Training'}, {'id': 201, 'categoryName':'Community', 'libraryName':'Sinet Internal Training'}, {'id': 202, 'categoryName':'Strategies', 'libraryName':'Sinet Internal Training'}] },
		{ 'id' : 101, 'libraryName': 'Technology' , 'nodes': [{'id': 203, 'categoryName':'Education', 'libraryName':'Technology'}, {'id': 204, 'categoryName':'Student', 'libraryName':'Technology'}, {'id': 205, 'categoryName':'Training', 'libraryName':'Technology'}] },
		{ 'id' : 105, 'libraryName': 'NodeJs' , 'nodes': [] },
		{ 'id' : 106, 'libraryName': 'Bacbone.Marionette' , 'nodes': [] }
	] ;

	var contentLibraryTree = [
    [
        {
            "ContentName": "SINET Internal Training",
            "SegmentLengthInSeconds": 0,
            "Children": [
                {
                    "ContentName": "CIS",
                    "SegmentLengthInSeconds": 0,
                    "Children": [
                        {
                            "ContentName": "LiveBook Training with Neil Jarmin",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5331,
                            "ImageURL": "thumb_2122_Sinet_Training_Jarman.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2122_Sinet_Training_Jarman.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment Product Management train the CIS team on LiveBook."
                        }
                    ],
                    "ContentId": 5330,
                    "ImageURL": "",
                    "TranscriptFileName": "",
                    "GuidebookFileName": "",
                    "ContentTypeId": 2,
                    "AudioFileName": "",
                    "ContentDescription": ""
                },
                {
                    "ContentName": "General",
                    "SegmentLengthInSeconds": 0,
                    "Children": [
                        {
                            "ContentName": "Basic Salesforce Access and Navigation",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6409,
                            "ImageURL": "thumb_2169_Salesforce_AccessNavigation.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2169_Salesforce_AccessNavigation.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment gives an overview of accessing and navigating Salesforce.-This segment is for all new SINET employees who may not already be familiar with Salesforce and i"
                        },
                        {
                            "ContentName": "Emergency Preparedness: Preparing Yourself, Your Family, and Your Home for Emergencies",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5393,
                            "ImageURL": "thumb_2133_Sinet_Training_ChaffinBertoch.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2133_Sinet_Training_ChaffinBertoch.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment focuses on learning what to do in emergency situations. The following emergencies will be discussed:-What to do in case of a fire.-How to find proper shelt"
                        },
                        {
                            "ContentName": "Implementing Educator Effectiveness",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6410,
                            "ImageURL": "thumb_2185_SINET_Training_ImplementingEducatorEffectiveness.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2185_SINET_Training_ImplementingEducatorEffectiveness.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment Curtis Linton and Marissa Bernhard discuss Implementing Educator Effectiveness.-School Improvement Network offers a variety of professional development "
                        },
                        {
                            "ContentName": "LumiBook \"Global Education Study: Six Drivers of Student Success\"",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6962,
                            "ImageURL": "thumb_2190_SinetTraining_Lumibook.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2190_SinetTraining_Lumibook.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. Steve Burton, Producer, gives internal training on the LumiBook \"Global Education Study: Six Drivers of Student Success.\"-Content and implementation information are pro"
                        },
                        {
                            "ContentName": "Medicine Cabinet Makeover",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5333,
                            "ImageURL": "thumb_2123_Sinet_Training_MCM.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2123_Sinet_Training_MCM.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment features a certified Holistic Health Coach specializing in Iridology, Kinesiology, Aromatherapy, Herbology, Nutrition & Life Coaching, and her own propriet"
                        },
                        {
                            "ContentName": "Open Enrollment 2013",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7592,
                            "ImageURL": "thumb_2226_Training_OpenEnrollment.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2226_Training_OpenEnrollment.mp3",
                            "ContentDescription": "Understanding new medical plans, enhanced dental plans, and a new vision plan."
                        },
                        {
                            "ContentName": "Personal Finance PD",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5530,
                            "ImageURL": "thumb_2150_Sinet_Training_NBS.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2150_Sinet_Training_NBS.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, National Benefit Services talks about personal finance and debt management."
                        },
                        {
                            "ContentName": "PD 360 Enhancements",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6286,
                            "ImageURL": "thumb_2169_Obs360_PD360Enhancements.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2169_Obs360_PD360Enhancements.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment is a quick overview of the new enhancements to PD 360 for the February product release."
                        },
                        {
                            "ContentName": "Power of Networking PD",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5809,
                            "ImageURL": "thumb_2153_Sinet_Training_PON.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2153_Sinet_Training_PON.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, three of the Women Tech Award Finalists for 2012 talk about how they built and used their networks to develop amazing and impactful careers.-Janna Lewi"
                        },
                        {
                            "ContentName": "Predictors of Success: Data Presentation by Steven H. Shaha",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6213,
                            "ImageURL": "thumb_2171_Sinet_Training_SteveShaha.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2171_Sinet_Training_SteveShaha.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. Predictors of Success: Data Presentation by Steven H. Shaha.-Dr. Shaha is Professor, Center for Policy and Public Information and President, Institute for Integrated Ou"
                        },
                        {
                            "ContentName": "Real Estate 101: Annie Sperry's How-To's on Buying a Home",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6212,
                            "ImageURL": "thumb_2170_Sinet_Training_AnnieSperry.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2170_Sinet_Training_AnnieSperry.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. Real Estate \"How To's\" with Annie Sperry of Equity Real Estate-Advantage.-This presentation and Q/A session is for anyone wanting to know about real estate, how to begi"
                        }
                    ],
                    "ContentId": 5332,
                    "ImageURL": "",
                    "TranscriptFileName": "",
                    "GuidebookFileName": "",
                    "ContentTypeId": 2,
                    "AudioFileName": "",
                    "ContentDescription": ""
                },
                {
                    "ContentName": "Product Training",
                    "SegmentLengthInSeconds": 0,
                    "Children": [
                        {
                            "ContentName": "Back to School Launch PD 360 Product Enhancements",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7184,
                            "ImageURL": "thumb_2169_SINET_Training_PD360ProductEnhancements.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2169_SINET_Training_PD360ProductEnhancements.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Neil Jarman, Peyton Craighill, and Chana Webster announce new product enhancements for PD 360, scheduled to be launched July 31, 2013.-The Observations"
                        },
                        {
                            "ContentName": "Evidence 360 Internal Product Demo",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7214,
                            "ImageURL": "thumb_2203_PD_Evidence360extended.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2203_PD_Evidence360extended.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Neil Jarman introduces a new tool for the back-to-school launch called Evidence 360.-Evidence 360 is a companion tool to Observation 360 to aid educato"
                        },
                        {
                            "ContentName": "Introduction to Distance Learning Demo",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7215,
                            "ImageURL": "thumb_2203_PD_DL_Internal_Explain.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2203_PD_DL_Internal_Explain.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Ken Torgerson introduces Distance Learning.-Distance Learning is asynchronous training where the trainer and those who are learning do not need to be i"
                        },
                        {
                            "ContentName": "Math Practice Standards",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7423,
                            "ImageURL": "thumb_2217_SINET_MathTasks.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2217_SINET_MathTasks.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this webinar, Kevin Klein and Mark Porter discuss new video content, Math Practice Standards, released in October 2013.-Mark gives a definition of the Math Practice "
                        },
                        {
                            "ContentName": "New LumiBook: InTASC Model Core Teaching Standards",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7178,
                            "ImageURL": "thumb_2201_SINET_Training_InTASC.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2201_SINET_Training_InTASC.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this webinar, Steve Burton, Curtis Linton, and Lisa Leith discuss the new LumiBook release, InTASC Model Core Teaching Standards.-Steve shows the introduction to the"
                        },
                        {
                            "ContentName": "Observation 360 Enhancements",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7024,
                            "ImageURL": "thumb_2169_Obs360_AprilRelease.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2169_Obs360_AprilRelease.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment is an internal training of all of the new enhancements for the Observation 360 Release on April 22, 2013."
                        },
                        {
                            "ContentName": "Observation/Processes Reporting",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7123,
                            "ImageURL": "thumb_2198_SINET_Training_ProcessesReporting.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2198_SINET_Training_ProcessesReporting.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment Curtis Linton, Scott Bowen, Chana Webster, and Peyton Craighill discuss a SINET product update, which is Observation/Processes Reporting changes. This i"
                        },
                        {
                            "ContentName": "Product Fall Update & PD 360 App Split",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7390,
                            "ImageURL": "thumb_2214_PD_Training_PD360AppSplit.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2214_PD_Training_PD360AppSplit.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Neil Jarman talks about the Product Fall Update and introduces the PD 360 App Split.-The Help and Support features have changed. (1:21)-The Product Sup"
                        },
                        {
                            "ContentName": "Teaching Strategies",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 7048,
                            "ImageURL": "thumb_2194_SINET_Training_TeachingStrategies.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2194_SINET_Training_TeachingStrategies.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this webinar, Lisa Leith and Marissa Bernhard discuss new PD 360 Content: Teaching Strategies.-The Teaching Strategies--Elementary and Secondary--give excellent exam"
                        }
                    ],
                    "ContentId": 7023,
                    "ImageURL": "",
                    "TranscriptFileName": "",
                    "GuidebookFileName": "",
                    "ContentTypeId": 2,
                    "AudioFileName": "",
                    "ContentDescription": ""
                },
                {
                    "ContentName": "RVP and SPA",
                    "SegmentLengthInSeconds": 0,
                    "Children": [
                        {
                            "ContentName": "Dr. Ann Johnson Mapping To The Core LivePlanner to educators",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6074,
                            "ImageURL": "thumb_2157_Sinet_Training_Johnson.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2157_Sinet_Training_Johnson.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Dr. Ann Johnson discusses how to effectively promote Mapping To The Core LivePlanner to educators."
                        },
                        {
                            "ContentName": "Basic Salesforce Level Two Certification",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 6905,
                            "ImageURL": "thumb_2169_Salesforce_LevelTwoCertification.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2169_Salesforce_LevelTwoCertification.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. This segment dives deeper into specific tasks and areas that SPAs should know when working in Salesforce.-Learn to create opportunities, run reports, refresh dashboards"
                        },
                        {
                            "ContentName": "Blanch Linton Discusses Inter-Rater Reliability: Part 1",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5531,
                            "ImageURL": "thumb_2149_Sinet_Training_BLinton_1.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2149_Sinet_Training_BLinton_1.mp3",
                            "ContentDescription": "Segment 1 of 2 of this program. This segment is part 1 of Inter-Rater Reliability Training with Blanch Linton.-The big concept target of inter-rater reliability is to improve instructional practice an"
                        },
                        {
                            "ContentName": "Blanch Linton Discusses Inter-Rater Reliability: Part 2",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5532,
                            "ImageURL": "thumb_2149_Sinet_Training_BLinton_2.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2149_Sinet_Training_BLinton_2.mp3",
                            "ContentDescription": "Segment 2 of 2 of this program. This segment is part 2 of Inter-Rater Reliability Training with Blanch Linton.-The big concept target of inter-rater reliability is to improve instructional practice an"
                        },
                        {
                            "ContentName": "Heidi Hayes Jacobs Talks about Mapping to the Core",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5276,
                            "ImageURL": "thumb_2127_Training_PDAJacobs.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2127_Training_PDAJacobs.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Heidi Hayes Jacobs talks to the PDAs and RVPs about her LiveBook \"Mapping to the Core\"."
                        },
                        {
                            "ContentName": "SPA Training with Jon Smalley: May 15, 2012",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5318,
                            "ImageURL": "thumb_2124_Sinet_Training_Smalley.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2124_Sinet_Training_Smalley.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Jon Smalley trains the SPAs and RVPs on the new release of Obervation 360."
                        },
                        {
                            "ContentName": "SINET Media Appliance",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5413,
                            "ImageURL": "thumb_2143_Sinet_Training_Kindt.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2143_Sinet_Training_Kindt.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Mike Kindt details the new media appliance."
                        },
                        {
                            "ContentName": "Truenorthlogic Talks about Their Partnership with SINET",
                            "SegmentLengthInSeconds": 0,
                            "Children": [],
                            "ContentId": 5810,
                            "ImageURL": "thumb_2152_Sinet_Training_TNL.jpg",
                            "TranscriptFileName": "",
                            "GuidebookFileName": "",
                            "ContentTypeId": 3,
                            "AudioFileName": "au_2152_Sinet_Training_TNL.mp3",
                            "ContentDescription": "Segment 1 of 1 of this program. In this segment, Truenorthlogic talks about their partnership with SINET.-Truenorthlogic provides human resource management systems for K-12 education agencies that are"
                        }
                    ],
                    "ContentId": 5275,
                    "ImageURL": "",
                    "TranscriptFileName": "",
                    "GuidebookFileName": "",
                    "ContentTypeId": 2,
                    "AudioFileName": "",
                    "ContentDescription": ""
                }
            ],
            "ContentId": 5274,
            "ImageURL": "",
            "TranscriptFileName": "",
            "GuidebookFileName": "",
            "ContentTypeId": 1,
            "AudioFileName": "",
            "ContentDescription": "The videos provided in this folder are for internal use only. These are unedited meetings that have been filmed for the benefit of SINET employees who were either unable to attend the meeting or who w"
        	}
	    ]
	];

	var userUploadeContentCategories = [
		{ 'id' : 'My Uploads', 'title': 'My Uploads' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Popular', 'title': 'Popular', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Recommended For You', 'title': 'Recommended For You' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Featured', 'title': 'Featured' , 'library': 'Sinet Internal Training'},

		{ 'id' : 'Aha Moments', 'UUVideoTopicId': 1, 'title': 'Aha Moments' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Best Practices', 'UUVideoTopicId': 2, 'title': 'Best Practices', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Celebrating Accomplishments', 'UUVideoTopicId': 3, 'title': 'Celebrating Accomplishments' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Classroom Management', 'UUVideoTopicId': 4, 'title': 'Classroom Management' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Coaching', 'UUVideoTopicId': 5, 'title': 'Coaching' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Community & Family Involvement', 'UUVideoTopicId': 6, 'title': 'Community & Family Involvement', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Differentiation', 'UUVideoTopicId': 7, 'title': 'Differentiation' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Equity, Diversity, & Race', 'UUVideoTopicId': 8, 'title': 'Equity, Diversity, & Race' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Examining Student Work', 'UUVideoTopicId': 9, 'title': 'Examining Student Work' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Global Education', 'UUVideoTopicId': 10, 'title': 'Global Education', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Inquiry & Project-Based Education', 'UUVideoTopicId': 11, 'title': 'Inquiry & Project-Based Education' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Instructional Strategies', 'UUVideoTopicId': 12, 'title': 'Instructional Strategies' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Intervention', 'UUVideoTopicId': 13, 'title': 'Intervention' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Just For Fun', 'UUVideoTopicId': 14, 'title': 'Just For Fun', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Motivational', 'UUVideoTopicId': 15, 'title': 'Motivational' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Other', 'UUVideoTopicId': 16, 'title': 'Other' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'PLC & Collaboration', 'UUVideoTopicId': 17, 'title': 'PLC & Collaboration' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Powerful Leadership', 'UUVideoTopicId': 18, 'title': 'Powerful Leadership', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Professional Development', 'UUVideoTopicId': 19, 'title': 'Professional Development' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'School Culture', 'UUVideoTopicId': 20, 'title': 'School Culture' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Student Engagement', 'UUVideoTopicId': 21, 'title': 'Student Engagement' , 'library': 'Sinet Internal Training' },
		{ 'id' : 'Success Stories', 'UUVideoTopicId': 22, 'title': 'Success Stories', 'library': 'Sinet Internal Training' },
		{ 'id' : 'Teachers Shine', 'UUVideoTopicId': 23, 'title': 'Teachers Shine' , 'library': 'Sinet Internal Training'},
		{ 'id' : 'Technology in the Classroom', 'UUVideoTopicId': 24, 'title': 'Technology in the Classroom' , 'library': 'Sinet Internal Training'}
		
	] ;

	var libraries = [
		{ 'id' : 'PD360', 'title': 'PD360' , 'contentType' : 'PD360Content' },
		{ 'id' : 'SINETInternalTraining', 'title': 'SINET Internal Training' ,  'contentType' : 'CustomContent' },
		{ 'id' : 'GZDemo', 'title': 'GZ Demo' , 'contentType' : 'CustomContent' },
		{ 'id' : 'GZDemo2', 'title': 'GZ Demo2' , 'contentType' : 'CustomContent' },
		{ 'id' : 'UUV', 'title': 'User Uploaded Videos' , 'contentType' : 'UserUploadedContent' }
	];

	return {
		'Contents' : '/api/contents',

		'Filters'  : {
			'PD360Content-Grades'   : grades,
			'PD360Content-Subjects' : subjects,
			'PD360Content-Topics'   : topics,			
			'CCC'      : customContentCategories,
			'UUCC'     : userUploadeContentCategories
		},
		'Libraries' : libraries,
		'LibTreeSample': contentLibraryTree
	} ;

} );