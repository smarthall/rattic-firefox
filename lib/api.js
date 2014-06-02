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

function get(uri, success) {
    console.log("Getting credential: " + uri);
    if (uri.charAt(0) === "/") {
        uri = uri.substr(1);
    }

    var request = Request({
        "url": prefs.ratticURL + uri,
        "headers": {"accept": "text/json"},
        "onComplete": function(response) {
            console.log("Got results: " + response.text);
            success(response.json);
        }
    }).get();
}

exports.findPage = findPage;
exports.get = get;
