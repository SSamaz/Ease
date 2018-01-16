/*

	Application Loader
	Version 0.0.1
	
	Process:
		1. Read config.json file that was created by builder.js
		2. Iterate through config.views and load templates in #templates
		3. Iterate through config.backbone and execute script file (effects app object)
		4. Build primary app.AppView view object 

*/


var config;
$(document).ready(load);

function load() {

	console.log('Loading...');

	// Load config.json file via async ajax call
	$.ajax({
		url: '/js/config.json',
		dataType: 'JSON',
		error: function(xhr, textStatus, errorThrown) {
			console.log(xhr);
			console.log(textStatus);
			console.log(errorThrown);
		},
		success: function(res) {
			config = res;
			loadViews();
		}
	});

}

function loadViews() {

	// Iterate over the views array and load the files into a new div in the #templates element
	var num_files = config.views.length;
	for (var i = 0; i < config.views.length; i++) {
	
		$.ajax({
			url: '/views/' + config.views[i],
			dataType: 'HTML',
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function(res) {
				$('#templates').append(res);
				--num_files;
				if (num_files === 0) {
					loadBackbone();
				}
			}
		});
	
	}

}

function loadBackbone() {

	// Iterate through config.backbone elements and execute script file
	var num_files = config.backbone.length;
	for (var i = 0; i < config.backbone.length; i++) {
	
		$.ajax({
			url: '/js/backbone/' + config.backbone[i],
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function(res) {
				// Loads automatically
				--num_files;
				if (num_files === 0) {
					loadPage();
				}
			}
		});
	
	}

}

function loadPage() {

	console.log('Assets loaded.');
	app.appView = new app.AppView();

}

