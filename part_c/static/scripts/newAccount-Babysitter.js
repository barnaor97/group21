const form = document.querySelector(".form-NewAccount");
const email = document.querySelector("#email");
const full_name = document.querySelector("#full_name");
const dob = document.querySelector("#birth_date");
const phoneNumber = document.querySelector("#phone_number");
const password = document.querySelector("#password");
const skill = document.querySelector("#skill");
const gender = document.querySelector('input[name="gender"]:checked');
const msg = document.querySelector(`.msg`);
const now = new Date();

const on_submit = (e) => {
    e.preventDefault();

    if (email.value === "") {
        msg.innerHTML = "Please enter an email";
        msg.classList.add("error");
        return;
    } else if (!validateEmail(email.value)) {
        msg.innerHTML = "Please enter a valid email";
        msg.classList.add("error");
        return;
    }

    // full name validation
    if (full_name.value === "" || full_name.value.length <= 1) {
        msg.innerHTML = "Please enter full name";
        msg.classList.add("error");
        return;
    } else if (!validateName(full_name.value)) {
        msg.innerHTML = "Please enter a valid full name";
        msg.classList.add("error");
        return;
    }

    // Date of birth validation
    if (dob.value === "") {
        msg.innerHTML = "Please enter a date of birth";
        msg.classList.add("error");
        return;
    } else if (!validateDate(dob.value)) {
        return;
    }

    // Phone number validation
    if (phoneNumber.value === "") {
        msg.innerHTML = "Please enter a phone number";
        msg.classList.add("error");
        return;
    } else if (!validatePhoneNumber(phoneNumber.value)) {
        msg.innerHTML = "Please enter a valid phone number";
        msg.classList.add("error");
        return;
    }

    // Password validation
    if (password.value === "") {
        msg.innerHTML = "Please enter a password";
        msg.classList.add("error");
        return;
    } else if (!validatePassword(password.value)) {
        msg.innerHTML =
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
        msg.classList.add("error");
        return;
    } else {
        fetch("/createNewBabysitter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                full_name: full_name.value,
                Date_Of_Birth: dob.value,
                phone_Number: phoneNumber.value,
                skill: skill.value,
                gender: gender.value,
                password: password.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res && res.sqlMessage) {
                    console.log(res.sqlMessage);
                    msg.innerHTML = res.sqlMessage;
                    msg.classList.add("error");
                } else if (res) {
                    window.location = "login";
                }
            })
            .catch((err) => {
                console.log(err);
                msg.innerHTML = err.message;
                msg.classList.add("error");
            });
    }
};

form.addEventListener("submit", on_submit);

function validateEmail(email) {
    const bool = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return bool.test(email);
}

function validateName(name) {
    const bool = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return bool.test(name);
}

function validateDate(date) {
    const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
    const dateOfB = new Date(date);
    if (!regex.test(date)) {
        msg.innerHTML = "Please enter a valid date of birth";
        msg.classList.add("error");
        return;
    } else if (now.getFullYear() - dateOfB.getFullYear() < 18) {
        msg.innerHTML = "must be older then 18 years old";
        msg.classList.add("error");
        return;
    } else {
        return true;
    }
}
function validatePhoneNumber(phoneNumber) {
    const regex = /^\+?[0-9]{7,15}$/;
    return regex.test(phoneNumber);
}

function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}
