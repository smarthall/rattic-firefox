var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var data = require("sdk/self").data;

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

function handleClick(state) {
    tabs.open(prefs.ratticURL);
}

// Listen for tab content loads.
tabs.on('ready', function(tab) {
  console.log('tab is loaded', tab.title, tab.url);
  tab.attach({
      "contentScriptFile": data.url("injection.js"),
      "contentScriptWhen": "end"
  })
});

