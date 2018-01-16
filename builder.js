
/*

	Builder
	Version 0.0.1
	
	Process:
		1. Read all files in /views folder
		2. Add all files in .views as []
		3. Read all files in /js/backbone folder
		4. Add all files in .backbone as []
		
	Updated 'public' => 'firebase'

*/

const fs = require('fs');
var output = {};

function build() {
	
	// Get view files
	getFiles('firebase/public/views/', function(files) {
		
		// Push to output object
		output.views = files;
	
	});
	
	// Get backbone files
	getFiles('firebase/public/js/backbone/', function(files) {
	
		// Push to output object
		output.backbone = files;
		
		// Write JSON object
		var json = JSON.stringify(output);
		
		// Write to config_test.json
		fs.writeFile('firebase/public/js/config.json', json, function(err) {
		
			if (err) return console.log(err);
			
			return console.log('Build successful');
		
		}); 
	
	});

}

function getFiles(dir, fnct) {

	fs.readdir(dir, function(err, files) {
	
		if (err) return console.log(err);
		
		fnct(files);
	
	});

}

build();
