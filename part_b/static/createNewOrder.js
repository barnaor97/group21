const form = document.querySelector('.createOrder-form')
const street = document.querySelector('#street')
const city = document.querySelector('#city')
let number = document.querySelector('#number')
const start = document.querySelector('#start')
const end = document.querySelector('#end')
let kids_num = document.querySelector('#kids-number')
const msg = document.querySelector('.msg')

const on_submit = (e) => {
    e.preventDefault()  /*so the user won't click on submit by accident or of the form is not filled correctly*/

    if(street.value.length <= 2){
        msg.innerHTML = 'Please enter a valid street name'
        msg.classList.add('error')
    }
    else if(city.value.length <= 2) {
        msg.innerHTML = 'Please enter a valid city name'
        msg.classList.add('error')
    }
    else if(number.value <= 0 ){
        msg.innerHTML = 'Please enter a valid address number'
        msg.classList.add('error')
    }
    else if(start.value === '' || end.value === ''){//if the dates are empty
        msg.innerHTML = 'Please enter start and end time'
        msg.classList.add('error')
    }

    else if (!validateDate(start.value, end.value)) {
        msg.innerHTML = 'Please enter valids dates';
        msg.classList.add('error');
    }


    else if(kids_num.value <= 0){
        msg.innerHTML = 'Please enter a valid kids number'
        msg.classList.add('error')
    }
    else{
        //empty the boxes
        street.value = ''
        city.value = ''
        number.value = ''
        start.value = ''
        end.value = ''
        kids_num.value = ''
        msg.classList.remove('error')
        msg.innerHTML = 'Form submitted successfully';
    }
}
form.addEventListener('submit', on_submit)


function validateDate(start, end) {
       const now = new Date();
        const s = new Date(start);
        const e = new Date(end);
    if (now.getDate() > s.getDate()) {
        return false;
    }
    else if (now.getDate() === s.getDate() && now.getTime() >= s.getTime()) {
        return false;
    }
    else if (s.getDate() > e.getDate()){
        return false;
    }
    else if (s.getDate() === e.getDate() && s.getTime() >= e.getTime()){
        return false;
    }
    else {
        return true;
    }
}
