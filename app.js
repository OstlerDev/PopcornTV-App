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
		if (err) document.write(err);

		alert("Installed!");
		document.getElementById('install').textContent = 'Update';
	});
}
exports.installed = installed;
exports.start = start;
exports.install = install;