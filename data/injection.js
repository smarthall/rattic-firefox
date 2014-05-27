// This script gets injected into each page that RatticDB
// recognises.

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

document.body.style.border = "5px solid red";
var boxes = findPasswordBoxes();
for (var x = 0; x < boxes.length; x++) {
    var input = boxes[x],
        nparent = input.parentElement,
        link = document.createElement('span');

    // Build our link
    link.innerHTML = "Rattic";
    link.addEventListener("click", _ratticFillClick);

    // Inject the link
    input.style.border="5px solid red";
    nparent.insertBefore(link, input.nextSibling);
}

function _ratticFillClick() {
    alert("Clicked!");
}

