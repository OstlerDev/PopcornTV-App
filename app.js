var gui = require('nw.gui');
var win = gui.Window.get();

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

		var installWindow = gui.Window.open('file://' + __dirname + '/install/step1.html', {
      position: 'center',
      width: 800,
      height: 600
    });
		// Create the Installation Screen
		//installWindow = new BrowserWindow({width: 800, height: 600});
		// Set Unresizable by user
	    //nstallWindow.setResizable(false);

	    // and load the index.html of the app.
	    //installWindow.loadUrl('file://' + __dirname + '/install/step1.html');

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

	require('ipc').send('stop');
	stop();

	repo.sync(function(err){
		button.textContent = 'Update';
		require('ipc').send('start');
		start();

		if (err){
		 	alert(err);
		} else {
			alert('Updated!');
		}
	});
}

/*var remote = require('remote');
var Menu = remote.require('menu');
var template = [
  {
    label: 'PopcornTV',
    submenu: [
      {
        label: 'About PopcornTV',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide PopcornTV',
        accelerator: 'Command+H',
        selector: 'hide:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() { remote.getCurrentWindow().reload(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() { remote.getCurrentWindow().toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Report Bug',
        click: function() { shell = require('shell').openExternal('https://github.com/OstlerDev/PopcornTV/issues') }
      }
    ]
  }
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
*/

exports.start = start;
exports.stop = stop;
exports.installed = installed;
exports.install = install;
exports.update = update;