const form = document.querySelector(".form-NewShift");
const city = document.querySelector("#city");
const start = document.querySelector("#startTime");
const end = document.querySelector("#endTime");
const msg = document.querySelector(".msg");

const on_submit = (e) => {
    e.preventDefault(); /*so the user won't click on submit by accident or of the form is not filled correctly*/

    if (city.value.length <= 2) {
        msg.innerHTML = "Please enter a valid city name";
        msg.classList.add("error");
    } else if (start.value === "" || end.value === "") {
        //if the dates are empty
        msg.innerHTML = "Please enter start and end time";
        msg.classList.add("error");
    } else if (!validateDate(start.value, end.value)) {
        msg.innerHTML = "Please enter valid times";
        msg.classList.add("error");
    } else {
        const loggedInUserCookie = getCookie("loggedInUser");
        const loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

        fetch("/createNewShift", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                babysitterID: loggedInUser.babysitterID,
                city: city.value,
                start_time: start.value,
                end_time: end.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    window.location = "shifts";
                } else if (res.error) {
                    console.log(res);
                    alert(res.error);
                }
            });
    }
};
form.addEventListener("submit", on_submit);

function validateDate(start, end) {
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);

    if (now.getDate() === s.getDate() && now.getHours() >= s.getHours()) {
        return false;
    } else if (s.getDate() > e.getDate()) {
        return false;
    } else if (s.getDate() === e.getDate() && s.getHours() > e.getHours() && s.getMinutes() > e.getMinutes()) {
        return false;
    }

    return true;
}
