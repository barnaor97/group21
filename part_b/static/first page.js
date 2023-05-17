let d = new Date(); //give the date and time
let h = d.getHours(); //get the hours

if(h<12 && h>6){ //morning
    document.getElementById("Greeting").innerHTML = "Good Morning";
} else if(h>=12 && h<=16){ //noon
    document.getElementById("Greeting").innerHTML = "Good noon";
} else if(h>16 && h<18){ //afternoon
    document.getElementById("Greeting").innerHTML = "Good Afternoon";
} else if(h>=18 && h<21){ //evening
    document.getElementById("Greeting").innerHTML = "Good Evening";
} else{ //night
    document.getElementById("Greeting").innerHTML = "Good Night";
}

// toggle the visibility of the rolling message container
window.addEventListener('scroll', function() {
    const rollingMessageContainer = document.getElementById('rollingMessageContainer');
    const rollingMessage = document.getElementById('rollingMessage');
    const rollingMessageRect = rollingMessage.getBoundingClientRect();

    // Adds the "visible" class if the rolling message is within the viewport
    if (rollingMessageRect.top < window.innerHeight && rollingMessageRect.bottom >= 0) {
        rollingMessageContainer.classList.add('visible');
    } else {
        rollingMessageContainer.classList.remove('visible');
    }
});