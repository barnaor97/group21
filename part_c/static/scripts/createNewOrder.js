const form = document.querySelector(".createOrder-form");
const street = document.querySelector("#street");
const city = document.querySelector("#city");
let number = document.querySelector("#number");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
let kids_num = document.querySelector("#kids_number");
const msg = document.querySelector(".msg");

const on_submit = (e) => {
    e.preventDefault(); /*so the user won't click on submit by accident or of the form is not filled correctly*/

    if (street.value.length <= 2) {
        msg.innerHTML = "Please enter a valid street name";
        msg.classList.add("error");
    } else if (city.value.length <= 2) {
        msg.innerHTML = "Please enter a valid city name";
        msg.classList.add("error");
    } else if (number.value <= 0) {
        msg.innerHTML = "Please enter a valid address number";
        msg.classList.add("error");
    } else if (start.value === "" || end.value === "") {
        //if the dates are empty
        msg.innerHTML = "Please enter start and end time";
        msg.classList.add("error");
    } else if (!validateDate(start.value, end.value)) {
        msg.innerHTML = "Please enter valids dates";
        msg.classList.add("error");
    } else if (kids_num.value <= 0) {
        msg.innerHTML = "Please enter a valid kids number";
        msg.classList.add("error");
    } else {
        const loggedInUserCookie = getCookie("loggedInUser");
        const loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

        fetch("/createNewOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientID: loggedInUser.clientID,
                city: city.value,
                street: street.value,
                number: number.value,
                start: start.value,
                end: end.value,
                kids_number: kids_num.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    localStorage.setItem("clientSearch", JSON.stringify(res));
                    window.location = "clientSearch";
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
    } else if (s.getDate() === e.getDate() && s.getHours() >= e.getHours()) {
        return false;
    }

    return true;
}
