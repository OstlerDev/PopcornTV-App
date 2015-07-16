function start(){
	var button = document.getElementById('status');
	button.textContent = 'Stop';
	button.setAttribute('onclick', 'require(\'ipc\').send(\'stop\'); app.stop();');
	button.className = 'btn btn-danger';
};

function stop(){
	var button = document.getElementById('status');
	button.textContent = 'Start';
	button.setAttribute('onclick', 'require(\'ipc\').send(\'start\'); app.start();');
	button.className = 'btn btn-success';
};

function installed(){
	var fs = require('fs');

	try{
		fs.lstatSync(__dirname + '/app');
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

	git.clone('https://github.com/OstlerDev/PopcornTV.git', __dirname + '/app', function(err, repo){ 
		if (err){
			alert(err);
			return;
		}

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

		start();

		alert("Please follow the Installation instructions");
	});
}

function update(){
	var git = require('gift');
	var repo = git(__dirname + '/app');

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

exports.start = start;
exports.stop = stop;
exports.installed = installed;
exports.install = install;
exports.update = update;