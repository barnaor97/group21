const form = document.querySelector('.createOrder-form')
const street = document.querySelector('#street')
const city = document.querySelector('#city')
let number = document.querySelector('#number')
const start = document.querySelector('#start')
const end = document.querySelector('#end')
let kids_num = document.querySelector('#kids-number')
const now = new Date();
const startDateTime = new Date(start.value);
const endDateTime = new Date (end.value)
const msg = document.querySelector('.msg')

// const orders_list = document.querySelector('.orders_list')
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
    else if ((startDateTime.getTime() >= now.getTime() || endDateTime.getTime() <= startDateTime.getTime() || start.value === '' || end.value === '')) {
        msg.innerHTML = 'Please enter a valid start and end time'
        msg.classList.add('error')
    }
    else if(kids_num.value <= 0){
        msg.innerHTML = 'Please enter a valid kids number'
        msg.classList.add('error')
    }
    else{
        // const li = document.createElement('li')
        // li.appendChild(document.createTextNode(`${street.value}: ${city.value}: ${number.value}: ${start.value}: ${endDateTime.value}: ${kids_num.value}`))
        msg.classList.remove('error')
        msg.innerHTML = 'Form submitted successfully';
        // orders_list.appendChild(li)

        street.value = ''
        city.value = ''
        number.value = ''
        start.value = ''
        endDateTime.value = ''
        end.value = ''
        kids_num.value = ''
    }
}
form.addEventListener('submit', on_submit)


