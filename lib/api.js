// Requirements
var Request = require("sdk/request").Request;
var prefs = require("sdk/simple-prefs").prefs;

// Code for the Rattic API
function getCredSearchURL(objectname, url) {
    return prefs.ratticURL + "api/v1/" + objectname + "/?url__startswith=" + url;
}

function findPage(url, pagefound) {
    console.log("Finding page (" + url + ")");
    var request = Request({
        "url": getCredSearchURL("cred", url),
        "headers": {"accept": "text/json"},
        "onComplete": function(response) {
            console.log("Got results: " + response.text);
            if (response.json.meta.total_count > 0) {
                pagefound(response.json.objects[0].resource_uri);
            }
        }
    }).get();
}

exports.findPage = findPage;
