// JavaScript code to toggle the visibility of the rolling message container
window.addEventListener("scroll", function () {
    const rollingMessageContainer = document.getElementById(
        "rollingMessageContainer"
    );
    const rollingMessage = document.getElementById("rollingMessage");
    const rollingMessageRect = rollingMessage.getBoundingClientRect();

    // Add the "visible" class if the rolling message is within the viewport
    if (
        rollingMessageRect.top < window.innerHeight &&
        rollingMessageRect.bottom >= 0
    ) {
        rollingMessageContainer.classList.add("visible");
    } else {
        rollingMessageContainer.classList.remove("visible");
    }
});

//greeting
let d = new Date(); //give the date and time
let h = d.getHours(); //get the hours

if (h < 12 && h > 6) {
    //morning
    document.getElementById("Greeting").innerHTML = "Good Morning";
} else if (h >= 12 && h <= 16) {
    //noon
    document.getElementById("Greeting").innerHTML = "Good noon";
} else if (h > 16 && h < 18) {
    //afternoon
    document.getElementById("Greeting").innerHTML = "Good Afternoon";
} else if (h >= 18 && h < 21) {
    //evening
    document.getElementById("Greeting").innerHTML = "Good Evening";
} else {
    //night
    document.getElementById("Greeting").innerHTML = "Good Night";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toDate(date) {
    if (!date) {
        return "";
    }

    var d = new Date(date);
    var dateStr =
        ("00" + d.getDate()).slice(-2) +
        "/" +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        d.getFullYear();

    return dateStr;
}

function toDateTime(date) {
    if (!date) {
        return "";
    }

    var d = new Date(date);
    var dateStr =
        ("00" + d.getDate()).slice(-2) +
        "/" +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        d.getFullYear() +
        " " +
        ("00" + d.getHours()).slice(-2) +
        ":" +
        ("00" + d.getMinutes()).slice(-2);

    return dateStr;
}
