//
// XUL-based extensions put their code into standard JavaScript files.
// Refer to Mozilla's documentation for K-Meleon's engine's API.
// Refer to the K-Meleon wiki for K-Meleon interface APIs.
//
// K-Meleon specific features are handled by the jsBridge Kplugin.
//
//
// This extension will create a button on the toolbar and a menu item.
// Default toolbar: "Browser Con&figuration" (this is fine for most extensions)
// Menu: CloseWindow (choose a section that matches your extension)
// 
// 
// Create a "hello_world@extensions.kmeleonbrowser.org" string preference (in 
// about:config page) to override defaults.
// Simple KM macros can also change preferences to interact with xpi extensions.
//

var prefBranch = 'hello_world@extensions.kmeleonbrowser.org.'
var ToolbarDefault = 'Browser Con&figuration';
var MenuDefault = 'CloseWindow';


var Toolbar = '';
var CmdName = 'Hello World';

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


//syntax: addbutton("toolbar", "command-name", "menu", "tooltip");
// A blank "" results in K-Meleon default. The defaults are:
// menu: 	"Toolbars >
//			 [] Status Bar"
// tooltip: "command-name
//			 Right-click for more options."
jsb.AddButton(ToolbarDefault, CmdName, "", "Hello World demo.");
  
//syntax setmenu("menu", MENU_TYPE, "item-name", "command-name", <location>);
// for location: -1 adds the last item on a list, other integers order a list,
// 				 strings position an item adjacent to another item.
// Note: all items are not required to build menu entries, but all items are
//		 all items must be present to display icons.
jsb.SetMenu(MenuDefault, jsb.MENU_COMMAND, CmdName, CmdName, -1);

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