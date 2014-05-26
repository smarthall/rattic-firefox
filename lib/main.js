// Requirements
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var data = require("sdk/self").data;
var api = require("api.js");

// Make a RatticDB button
var button = buttons.ActionButton({
    id: "rattic-link",
      label: "Visit RatticDB",
      icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
      onClick: handleClick
});

// Clicking the button
function handleClick(state) {
    tabs.open(prefs.ratticURL);
}

// Listen for tab content loads
tabs.on('ready', function(tab) {
    console.log('tab is loaded', tab.title, tab.url);
    
    // If they are visiting our RatticDB server, ignore
    if (!(tab.url.lastIndexOf(prefs.ratticURL, 0) === 0)) {
        api.findPage(tab.url, function() {
            tab.attach({
                "contentScriptFile": data.url("injection.js"),
                "contentScriptWhen": "end"
            });
        });
    }
});

