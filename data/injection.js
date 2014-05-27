// This script gets injected into each page that RatticDB
// recognises.

var port = self.port;
var cred_uri = undefined;

function findPasswordBoxes() {
    var pwdinput = [];
    var inputs = document.getElementsByTagName("INPUT");
    for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].type == "password") {
            pwdinput.push(inputs[x]);
        }
    }

    return pwdinput;
}

function findUsernameBox(passwordBox) {
    current = passwordBox.previousSibling;
    while (current) {
        if (current.name = "INPUT" && current.type == "text") {
            return current;
        }

        current = current.previousSibling;
    }

    return null;
}

document.body.style.border = "5px solid green";
var boxes = findPasswordBoxes();
for (var x = 0; x < boxes.length; x++) {
    var input = boxes[x],
        nparent = input.parentElement,
        link = document.createElement('span'),
        ubox = findUsernameBox(input);

    // Build our link
    link.innerHTML = "Rattic";
    link.addEventListener("click", _ratticFillClick);

    // Inject the link
    nparent.insertBefore(link, input.nextSibling);

    // Apply debug highlighting
    input.style.border="5px solid red";
    ubox.style.border="5px solid blue";
}

function _ratticFillClick() {
    port.emit("filldata", "test");
}

port.on("credid", function(uri) {
    cred_uri = uri;
    alert(cred_uri);
});

