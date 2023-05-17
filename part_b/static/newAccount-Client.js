const form = document.querySelector('.form-NewAccount')
const email = document.querySelector('#email')
const firstName = document.querySelector('#first_name')
const lastName = document.querySelector('#last_name')
const dob = document.querySelector('#date_of_birth')
const phoneNumber = document.querySelector('#phone_number')
const password = document.querySelector('#password')
const msg = document.querySelector('.msg')
const now = new Date();

const on_submit = (e) => {
    e.preventDefault()
    // Email validation
    if (email.value === '') {
        msg.innerHTML = 'Please enter an email';
        msg.classList.add('error');
        return;

    } else if (!validateEmail(email.value)) {
        msg.innerHTML = 'Please enter a valid email';
        msg.classList.add('error');
        return;
    }

    // First name validation
    if (firstName.value === '' || firstName.value.length <= 1) {
        msg.innerHTML = 'Please enter a first name';
        msg.classList.add('error');
        return;

    } else if (!validateName(firstName.value)) {
        msg.innerHTML = 'Please enter a valid first name';
        msg.classList.add('error');
        return;

    }

    // Last name validation
    if (lastName.value === '' || lastName.value.length <= 1) {
        msg.innerHTML = 'Please enter a last name';
        msg.classList.add('error');
        return;

    } else if (!validateName(lastName.value)) {
        msg.innerHTML = 'Please enter a valid last name';
        msg.classList.add('error');
        return;

    }

    // Date of birth validation
    if (dob.value === '') {
        msg.innerHTML = 'Please enter a date of birth';
        msg.classList.add('error');
        return;

    } else if (!validateDate(dob.value)) {
        msg.innerHTML = 'Please enter a valid date of birth';
        msg.classList.add('error');
        return;
    }


// Phone number validation
    if (phoneNumber.value === '') {
        msg.innerHTML = 'Please enter a phone number';
        msg.classList.add('error');
        return;

    } else if (!validatePhoneNumber(phoneNumber.value)) {
        msg.innerHTML = 'Please enter a valid phone number';
        msg.classList.add('error');
        return;

    }

// Password validation
    if (password.value === '') {
        msg.innerHTML = 'Please enter a password';
        msg.classList.add('error');

    } else if (!validatePassword(password.value)) {
        msg.innerHTML = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
        msg.classList.add('error');


    }

    else{
        //clear all the boxes
        email.value= ''
        firstName.value= ''
        lastName.value= ''
        dob.value= ''
        phoneNumber.value= ''
        password.value= ''
        msg.innerHTML = 'Form submitted successfully';
        msg.classList.remove('error');
    }
}
form.addEventListener('submit', on_submit);


// Helper functions

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
        return false;
    }
    else if ((now.getFullYear()-dateOfB.getFullYear())<18){
        return false;
    }
    else {
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
