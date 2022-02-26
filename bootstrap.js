//
// XUL-based extensions put their code into js files. The language is javascript
// Refer to Mozilla's documentation for most of K-Meleon's API.
// 
//
// K-Meleon specific features are handled by the jsBridge Kplugin.
//
//
// This extension will create a button on the toolbar
// Default toolbar: "Browser Con&figuration"
// 
// Create "hello_world@extensions.kmeleonbrowser.org" string preference (in 
// about:config page) to override default.
//
// Simple KM macros can also change preferences to interact with xpi extensions.
//

var prefBranch = 'hello_world@extensions.kmeleonbrowser.org.'
var ToolbarDefault = 'Browser Con&figuration';


var Toolbar = '';
var CmdName = 'Hello101';

var jsb = null;

//===========================================//

Components.utils.import("resource://gre/modules/Services.jsm");

var timer = Components.classes["@mozilla.org/timer;1"]
             .createInstance(Components.interfaces.nsITimer); 

var active = false;


//===========================================//


//===========================================//

function startup(data, reason) {

  if(active) { return };
  active = true;

  delayed_startup();

};

//===========================================//

function delayed_startup() { 

  // trying to get the JSBridge pointer
  //  and wait for the JSBridge to be ready (occurs when the browser starts)
  jsb = null;
  try {
    jsb = Components.classes["@kmeleon/jsbridge;1"].getService(Components.interfaces.nsIJSBridge);
  } catch(e) { };

  if(jsb==null) {
    timer.initWithCallback(delayed_startup, 300, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
    return;
  };


  // get prefs
  // getPrefType : PREF_INVALID, PREF_STRING, PREF_INT, PREF_BOOL 
  // getCharPref, getIntPref, getBoolPref, getPrefType, resetBranch('')
  var prefs = Components.classes["@mozilla.org/preferences-service;1"]
              .getService(Components.interfaces.nsIPrefService).getBranch(prefBranch);
  Toolbar = (prefs.getPrefType("toolbar") == prefs.PREF_STRING) ?
     prefs.getCharPref("toolbar") : ToolbarDefault;


  // setup Button
  jsb.RegisterCmd(CmdName, 'Hello World', function(wind, mode, arg) {
	  
	              popupAlert('Alert', 'Hello World!');

  }, 'chrome://helloworld/content/icon.png');

  jsb.AddButton(Toolbar, CmdName, "");

};

//===========================================//
 
function shutdown(data, reason) {

  if(!active) { return };
  active = false;

  // remove button and Command
  try { jsb.RemoveButton(Toolbar, CmdName); } catch(e) { };
  try { jsb.UnregisterCmd(CmdName); } catch(e) { };

};

//===========================================//

function install(data, reason) {
}


function uninstall(data, reason) {
}

//===========================================//

function popupAlert(title, msg) {

  Services.prompt.alert(null, title, msg);
}

//===========================================//