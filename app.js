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

function start(){
	return;
}

function install(){
	var git = require('gift');

	git.clone('https://github.com/OstlerDev/PopcornTV.git', 'app/', function(err, repo){ 
		if (err) alert(err);

		alert("Installed!");
		var button = document.getElementById('install');
		button.textContent = 'Update';
		button.onclick = app.update();

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
exports.start = start;
exports.install = install;
exports.update = update;