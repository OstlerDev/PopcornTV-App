function installed(){
	var fs = require('fs');

	try{
		fs.lstatSync('app');
		return true;
	} catch(e) {
		return false;
	}
	return false;
}

function install(){
	var git = require('gift');

	var button = document.getElementById('install');
	button.textContent = 'Installing...';

	git.clone('https://github.com/OstlerDev/PopcornTV.git', 'app/', function(err, repo){ 
		if (err) alert(err);

		var remote = require('remote');
		var BrowserWindow = remote.require('browser-window');  // Module to create native browser window.
		// Create the Installation Screen
		installWindow = new BrowserWindow({width: 800, height: 600});
		// Set Unresizable by user
	    installWindow.setResizable(false);

	    // and load the index.html of the app.
	    installWindow.loadUrl('file://' + __dirname + '/install/step1.html');


		var button = document.getElementById('install');
		button.textContent = 'Update';
		button.setAttribute('onclick', 'app.update()');

		var button = document.getElementById('status');
		button.removeAttribute('disabled');

		alert("Please follow the Installation instructions");
	});
}

function update(){
	var git = require('gift');
	var repo = git('app');

	var button = document.getElementById('install');
	button.textContent = 'Updating...';

	repo.sync(function(err){
		if (err){
		 	alert(err);
		 	button.textContent = 'Update';
		} else {
			alert('Updated!');
			button.textContent = 'Update';
		}
	});
}

exports.installed = installed;
exports.install = install;
exports.update = update;