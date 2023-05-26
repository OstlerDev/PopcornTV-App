import { Accessibility } from 'accessibility';
window.addEventListener('load', function() { new Accessibility(); }, false);
var gui = require('nw.gui');  // NWjs Gui Object

var PopcornTV;

/*
ipc.on('start', function(){
  PopcornTV = require('./app/atv.js');
  try{
    PopcornTV.start();
  } catch(e){
    console.error(e);
  }
});

ipc.on('stop', function(){
  PopcornTV.stop();
});
*/
