// This script gets injected into each page that RatticDB
// recognises.

var port = self.port;
var cred_uri = undefined;

var resources = {
    "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gUaASkf2ygXXQAABTpJREFUWMPll1tsVFUUhr+9zzlzpp1OLJQWZtqh01ZLvVC1tEqCAak2QtQEojGKiTEmmvigScGoQfH24osSffRBvCcmykXxgrZBioCIRYEab1VrUlrRFuxl2unMmXOWD22RtjPTAXwwcb2dvfb6/3+vvdbe+8D/3dSZH8cOt9Yi8hCwHCgG+oA2JTy3uKGp42yAe3u6avHYoGCFKIqV0CfQJvBcaaSiY4aAo+2fblaoZjENrP4YjCaRgI/UvAKU4wI8X1vf9FBO5Me7NiM047OQ3j+R4VFUMIAKF0PSAdgcjlRsOC2go73lRVE8aAyOYe/+ATeRwjA1WkDZJiPLq/Eu8AO8UFvf1JyVvLvrRRQPSv8g8a2tuPEkhmmgRNB5Pqw1jeh5hYjIC6WRimZ17HDLxQjf6aE49offYvgtAvk+tAYRUAq8pEv/ykW4+T7QXnVt3Q2d6ch/P95VI8L3cnKQ2Gs7sfL9BAI+tPoHy004eLetgmAARC3SCBvFNLD3/IThtwgGbNREAEwEWgZzjnQjhgZPP5Vp9SI8oXwW8e27sQJ+ggEfiqlY2mdhfnYITAOUPK6Ba62+Yby4QyDfhyBpwa2BOMaoA7Aqyw6s9nr+xB0ZI5Dny4AE9P+Fio0CrDCB+WpoDNMyxlOVKUgrzHiCpJ0/91h7aw+gRTxKwosQ8QA8hEJvYDgHLA2DMfDbIRP4S/xWiaFU5gCBxJx8EkUFKNcDJHzaIUxhMi+pxPvuV2RoKHOeRCDPBjilgUNO2RzEk4zkybn5nFxWNUGe3cRJYd16PTK/6J/Nn262DykqBPhSK9iinBTxKyMzAwQS8wKcXFqJSnm5n0JOCvfGFUi4ZCam5+EuqwMnBbBFL65v2g4cSlUVM1QTGu+VSfL5QU5dVZHTytOKWHUNEgmNixBAKdxldUg0DPBlOFLx3umT8Fh7SzdQJlqTd2IQY9QhVlmE8iTLVnqUhGomizC9GRrV0QnBfCRaBq4L0B2OVCwE0JPzauubIqLUeuV57lhJUEaic7OS52yuh1xShURCguu6IM2T5DMuoykXU3vLMFCQteByycC4xcKRimDajkxL/lXLFdPJDcPg7Xd2sm3HJxiGMTPThsEbb77FlldewzTN6e6C3uNdl6fjMjNc0uumD+3Ze5Ct23YhCJFIiIYltVP8bW17efnlV1FKUb4wwnXXNU7vqHXA0ZwyANw+faCsdAFOysFJOkTKQjMCotFykkmHZNIhGi3PCTNjDUx2xPTxRCI5fo7YvrQ1MDaWAAS/358OtvvM4suagaLESCWQmHGA2b7T5OnM77czkSeCQ4mqnIuwdNkaJ6XMQiD1Lzz7UklXFwYvrXFyFgBQt2TlGC7F58uuPSmORsvHMvqzBdde3TSghdB5sIcWlFcOZJ0yG8ZlDU333Xv/w+td18Pvt2flzMvLw3VdbrvjzvXh0qp7Zptv5LCOtp7eEz9+c6Tj44KCgrtff3MrDUsux7IsQAgE5wFCLBZj05NP46ZSPLpx07X793+xC2g5XwEXAY8BdT29f4QGBoZiVVXlNZdeXI1t21MEjI6O8vPPv/D+Bx9u37f/gDHxb3ET0AWcykRgziKgE9gw+XHgYPtVSqvgXetuaQRQPgvtt3HjcUzTpP3w17v3fr7vWeCrc/ozyuAX4AngN+Ag8NO3X7eudXr6tg2+9C7aMIk88gB5CyNrF5SV7wCqgaVAFHjmDIxzEgBwM7Bz+uDuFas7Eblw4pHZ2bjno+pcY8+qCzICeKxBq16ldY8StfasYv9L9jejDBBHO+WlEQAAAABJRU5ErkJggg=="
};

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

function tagSearch(startTag, nextFunc, compFunc, nextArg, compArg) {
    if (typeof startTag == "undefined") {
        return undefined;
    }

    if (startTag === null) {
        return null;
    }

    if (compFunc(startTag, compArg)) {
        return startTag;
    }

    return tagSearch(nextFunc(startTag, nextArg), nextFunc, compFunc, nextArg, compArg);

}

function findFirstParentTag(tag, tagName) {
    return tagSearch(tag, function(tag, nextArg) {
        return tag.parentElement;
    },
    function(tag, compArg) {
        return tag.tagName == compArg.toUpperCase();
    },
    undefined,
    tagName);
}

function findFirstChildTag(tag, tagName) {
    return tagSearch(tag, function(tag, nextArg) {
        var next = tag.firstChild;
        if (typeof next !== "undefined") {
            return next;
        }

        next = tag.nextSibling;
        if (typeof next !== "undefined") {
            return next;
        }

        next = tag.parentElement;
        if (nextArg === next) {
            return null;
        }

        return next;
    },
    function(tag, compArg) {
        return tag.tagName == compArg.toUpperCase();
    },
    tag,
    tagName);
}

function getPasswordForms() {
    var boxlist = [];

    var pboxes = findPasswordBoxes();
    for (var x = 0; x < pboxes.length; x++) {
        var box = {},
            input = pboxes[x];

        box.passwordinput = input;
        box.form = findFirstParentTag(input, "FORM");
        box.usernameinput = findUsernameBox(input);

        boxlist.push(box);
    }

    return boxlist;
}

document.body.style.border = "5px solid green";
var boxes = getPasswordForms();
for (var x = 0; x < boxes.length; x++) {
    var box = boxes[x],
        input = box.passwordinput,
        ubox = box.usernameinput,
        nparent = box.passwordinput.parentElement,
        link = document.createElement('button'),
        img = document.createElement('img');

    // Build our link
    img.src = resources.icon;
    link.appendChild(img);
    link.addEventListener("click", _ratticFillClick);

    // Inject the link
    nparent.insertBefore(link, input.nextSibling);

    // Apply debug highlighting
    box.form.style.border="5px solid yellow";
    input.style.border="5px solid red";
    ubox.style.border="5px solid blue";
}

function _ratticFillClick(event) {
    port.emit("filldata", cred_uri);
    event.preventDefault();
}

port.on("creduri", function(uri) {
    cred_uri = uri;
});

port.on("filldata", function(creds){
  for (var x = 0; x < boxes.length; x++) {
    var pbox = boxes[x].passwordinput,
        ubox = boxes[x].usernameinput;

    pbox.value = creds.password;
    ubox.value = creds.username;
  }
});

