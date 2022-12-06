// TODO
document.addEventListener("DOMContentLoaded", function () {
    const firstName = document.getElementById("first-name")
    const lastName = document.getElementById("last-name")
    const email = document.getElementById("email")
    const form = document.querySelector("form")
    const feedBack = document.getElementById("feedBack");

    function checkValidation(e) {
        feedBack.innerText = '';
        let f = nameValidation(firstName);
        let l = nameValidation(lastName);
        let em = emailValidation();

        if (!(f && l && em))
            e.preventDefault();
    }

    function nameValidation(name) {
        if (name.value.length < 3) {
            name.validity.valid = false;
            let msg = `Your ${name.id} is too short`;
            feedBack.innerHTML += msg + '<br/>'; 
            name.setCustomValidity(msg);
            name.reportValidity();
            name.classList.add('invalid');
            name.parentElement.classList.add('invalid')
            return false;
        } else {
            name.validity.valid = true;
            name.classList.remove('invalid');
            name.parentElement.classList.remove('invalid')
            name.setCustomValidity(``);
            return true;
        }
    }

    function emailValidation(e) {
        let regex = new RegExp(/\w+@\w+\.\w+/);

        if (!email.value.match(regex)) {
            email.validity.valid = false;
            let msg = `The email format is wrong`;
            email.setCustomValidity(msg);         
            feedBack.innerHTML += msg + '<br/>'; 
            email.reportValidity();
            email.classList.add('invalid');
            email.parentElement.classList.add('invalid')
            return false;
        } else {
            email.validity.valid = true;
            email.classList.remove('invalid');
            email.parentElement.classList.remove('invalid')
            email.setCustomValidity(``);
            return true;
        }
    }

    firstName.addEventListener("change", (e) => { checkValidation(e) })
    lastName.addEventListener("change", (e) => {checkValidation(e)})
    email.addEventListener("change", (e) => { checkValidation(e) })
    form.addEventListener("submit", (e) => { checkValidation(e) })

})