/*
Author: 		Gianfranco del Mundo
File name: 		faqSearch.js
Description: 	Predictive Search and FAQ Search JS
Dependencies: 	jQuery, typeahead.js

Example HTML: 	
*/
(function($){
	var search = {
		init: function(){
			var searchPanel = $('.faq-search');
			if(!searchPanel.length){ return; }

			//Hide the search counter result
			//$('.filter-count').hide();

			this.initConfig();
			this.initTypeAhead();
			this.listenDropdownEvent();
			this.addMoreResultsEvent();
			//Change the underscore template variable to search.
			 _.templateSettings.variable = "search";


		},
		//Hide when list of topics is greater than 15
		addMoreResultsEvent: function(){
			var elemOfTopics = $('.list-content ul li');
			var noOfTopics = elemOfTopics.length,
				buttonEl = $('.list-content .button');

			if(noOfTopics > 15){	
				$(elemOfTopics).filter(':gt(15)').hide();
				$(buttonEl).show();
			} else {
				$(buttonEl).hide();
			}

			$(buttonEl).click(function(e){
				e.preventDefault();
				$(buttonEl).hide();
				$(elemOfTopics).filter(':gt(15)').slideDown();
			});
		},
		//Add an Event Listener to the dropdown to populate the second dropdown
		listenDropdownEvent: function(){
			if(!$('.dropdown-topics').length){ return;}

			$('#category').change(function(e) {
				if(!(isNaN($("#category option:selected").val()))){
				  	search.initDropdown($("#category option:selected").val());
				  	$('#subcategory option').not(':eq(0)').remove();	
				} else {
					$('#subcategory').attr('disabled','disabled');
					$('#subcategory').prev().attr('disabled','disabled');
				}
			});

			$('#subcategory').change(function(e) {
			  	$('#topic-dropdowns .button').attr("href", $("#subcategory option:selected").data().value);
			  	//for omniture value
			  	if($("#category option:selected").text()&& $("#subcategory option:selected").text()){
				  	var data_cat = $("#category option:selected").text().toLowerCase();
				  	var data_subcat = $("#subcategory option:selected").text().toLowerCase();
				  	$('#topic-dropdowns .button')
				  		.attr('data-cat',data_cat)
				  		.attr('data-subcat',data_subcat);
			  	}
			});

			$('#subcategory').attr('disabled','disabled');
			$('#subcategory').prev().attr('disabled','disabled');

			var submitButton = $('#topic-dropdowns button');

			submitButton.click(function(e){
				if(submitButton.attr('href') == ''){
					e.preventDefault();
				
				}
			});
		},
		// Initialize URLs to be used for AJAX Calls; init Bloodhound is for the predictive Search initialization
		initConfig:function(){
			//Get Urls Ready
			var urls = $('#faq-services').embeddedData(),
				siteConfig = guxApp.tools.commonConfigData();

			var urlQuery = urls['faq.queryservices'],
				urlTopic = urls['faq.topicitems'],
				site = siteConfig.site;
				//Replace the SITE url based on box
				search.urlQuery = urlQuery.replace('{site}', site);
				search.urlTopic = urlTopic.replace('{site}', site);

			this.initBloodHound();

			//If no dropdown present, don't compile underscore
			if(!$('.dropdown-topics').length){ return;}

			this.config = {
				selectedIndex:'',
				selectedId:'',
				dropdown:{},
				templateDropdown: _.template($('#subdropdown').html())
			};
		},
		//Define and initialize Bloodhound Suggestion Engine
		initBloodHound: function(){
			//Define Suggestion Engine
			this.topics = new Bloodhound({
			    datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
			    remote: {
			    	//Will change the site url later on REST;
			        url: search.urlQuery,
			        filter: function (topics) {
			        	return $.map(topics.topics, function(topic) { 
						  return { 
						   	value: topic.title,
						   	url: topic.url
						  }; 
						});
			        }
			    },
			    limit:5
			});

			// Initialize the Bloodhound suggestion engine
			this.topics.initialize();
		},
		//Initialize Typeahead
		initTypeAhead: function(){
			var self = this;

			$('#faq .typeahead').typeahead({
					minLength:3
				},
				{
				name: 'value',
				displayKey: 'value',
				source: self.topics.ttAdapter(),
				templates: {
					//For now the Text is hardcoded in JS, but will change this later after the code review
					empty:function(){
						//$('#faq .error').slideDown();
					},
				    suggestion: function(data) { // data is an object as returned by suggestion engine
				        return '<div class="tt-suggest-topic"><a href="'+ data.url  +'">' + data.value + '</a></div>';
				    }
				}
			});
		},
		//Populate Second Dropdown
		initDropdown: function(optionId){
			var self = this;
			this.getData(search.urlTopic.replace('{topicId}',optionId),function(data){

				$('#subcategory').attr('disabled', false);
				$('#subcategory').prev().attr('disabled', false);

				self.config.dropdown = data.items;
				$('#subcategory').append(self.config.templateDropdown( self.config ));
				$.uniform.update();
			},
			function(e, extStatus){
			});
		},
		/*
			A reusable function to get the data using AJAX
		*/
		getData: function(url, onSuccess, onError) {
			$.ajax({
				url: url,
				async: true,
				cache: false,
				dataType: 'json',
				headers: {
					'Cache-Control': 'no-cache'
				},
				success: function(data) {				
					onSuccess(data);
				},
				error: function(e, extStatus) {
					onError(url, e, extStatus);
				}
			});
			
		}

	};

	$(function() {
		search.init();
	});

})(jQuery);
