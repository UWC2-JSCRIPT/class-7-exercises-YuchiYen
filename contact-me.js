document.addEventListener("DOMContentLoaded", function () {
    const contactReason = document.getElementById("contactReason");
    const codingLanguage = document.getElementById("codingLanguage");
    const jobOpportunityDiv = document.getElementById("jobOpportunityDiv");
    const talkCodeDiv = document.getElementById("talkCodeDiv");
    const name = document.getElementById("name");
    const message = document.getElementById("message");
    const form = document.getElementById("connect-form");
    const jobUrl = document.getElementById("jobUrl");
    const jobTitle = document.getElementById("jobTitle");
    //const err = document.getElementById('errMsgGroup');
    const cdlng = document.getElementById("codingLanguage");
    cdlng.dispatchEvent(new Event('change'));


    const processContactReason = (e) => {
        let selectedValue = e.target.value;
        if (selectedValue === "Job") {
            jobOpportunityDiv.classList.add('show');
            jobOpportunityDiv.classList.remove('hidden');
            talkCodeDiv.classList.remove('show');
            talkCodeDiv.classList.add('hidden')
            message.disabled = true;
            jobUrl.disabled = false;
            jobTitle.disabled = false;
        } else if (selectedValue === "Talk") {
            jobOpportunityDiv.classList.add('hidden');
            jobOpportunityDiv.classList.remove('show')
            talkCodeDiv.classList.remove('hidden');
            talkCodeDiv.classList.add('show');
            message.disabled = false;
            jobUrl.disabled = true;
            jobTitle.disabled = true;
        } else {
            jobOpportunityDiv.classList.add('hidden');
            jobOpportunityDiv.classList.remove('show')
            talkCodeDiv.classList.add('hidden');
            talkCodeDiv.classList.remove('show');
            message.disabled = true;
            jobUrl.disabled = true;
            jobTitle.disabled = true;
        }
    }

    const processCodingLanguage = (e) => {
        // let selectedValue = e.target.value;
        // if (selectedValue === "Job") {
        //     jobOpportunityDiv.classList.add('show').remove('hidden');
        //     talkCodeDiv.classList.remove('show').add('hidden');
        // } else if (selectedValue === "Talk") {
        //     jobOpportunityDiv.classList.add('hidden').remove('show');
        //     talkCodeDiv.classList.remove('hidden').add('show');
        // }
    }

    const checkValidation = (e) => {
        // err.innerHTML = '';
        // err.classList.add('hidden');
        let nme = textLengthValidation(name, 3); //for name  
        let eml = emailValidation();
        let msg = true;
        let url = true;
        let title = true;
        let codeSelected = true;

        if (talkCodeDiv.classList.contains('show')) {
            msg = textLengthValidation(message, 10); //for message
            codeSelected = talkCodeSelectedValidation();
        }

        if (jobOpportunityDiv.classList.contains('show')) {
            url = urlValidation();
            title = textLengthValidation(jobTitle, 1); //Job Tile is not blank
        }

        if (!(nme & eml & msg & url & title & codeSelected))
            e.preventDefault();
    }

    const talkCodeSelectedValidation = () => {
        let err = document.getElementById('codingLanguageError'); 
        err.innerText = '';
        err.classList.add('hidden')

        if (cdlng.value === 'Choice') {
            cdlng.validity.valid = false;
            err.innerHTML += 'Must select a valid code language';
            err.classList.remove('hidden');
            cdlng.setCustomValidity(`Must select a valid code language`);
            cdlng.reportValidity();
            cdlng.classList.add('invalid');
            cdlng.classList.remove('valid');
            return false;
        } else {
            cdlng.validity.valid = true;
            cdlng.classList.remove('invalid');
            cdlng.classList.add('valid');
            cdlng.setCustomValidity(``);
            return true;
        }
    }

    const emailValidation = () => {
        let err = document.getElementById('emailError');
        err.innerText = '';
        err.classList.add('hidden');
        
        let regex = new RegExp(/\w+@\w+\.\w+/);
        if (!email.value.match(regex)) {
            email.validity.valid = false;
            err.innerText += 'Email format is invalid';
            err.classList.remove('hidden');
        
            email.setCustomValidity(`The email format is wrong`);
            email.reportValidity();
            email.classList.add('invalid');
            email.classList.remove('valid');
            return false;
        } else {
            email.validity.valid = true;
            email.classList.remove('invalid');
            email.classList.add('valid');
            email.setCustomValidity(``);
            return true;
        }
    }

    const urlValidation = () => {
        let err = document.getElementById('jobUrlError'); 
        err.innerText = '';
        err.classList.add('hidden')

        let regex = new RegExp(/https?\:\/\/.+\..+/);
        if (!jobUrl.value.match(regex)) {
            jobUrl.validity.valid = false;

            err.innerHTML += 'URL is invalid.';
            err.classList.remove('hidden');

            jobUrl.setCustomValidity(`The URL format is wrong`);
            jobUrl.reportValidity();
            jobUrl.classList.add('invalid');
            jobUrl.classList.remove('valid');
            return false;
        } else {
            jobUrl.validity.valid = true;
            jobUrl.classList.remove('invalid');
            jobUrl.classList.add('valid');
            jobUrl.setCustomValidity(``);
            return true;
        }
    }

    const textLengthValidation = (t, limit) => {
        
        let err = t.nextElementSibling;
        err.innerText = '';
        err.classList.add('hidden')


        if (t.value.length < limit) {
            t.validity.valid = false;

            err.innerHTML += `${t.id} is too short` ;
            err.classList.remove('hidden');

            t.setCustomValidity(`${t.id} is too short`);
            t.reportValidity();
            t.classList.add('invalid');
            t.classList.remove('valid');
            return false;
        } else {
            t.validity.valid = true;
            t.classList.remove('invalid');
            t.classList.add('valid');
            t.setCustomValidity(``);
            return true;
        }
    }

    contactReason.addEventListener("change", (e) => { processContactReason(e) });
    codingLanguage.addEventListener("change", (e) => { processCodingLanguage(e) })
    form.addEventListener("submit", (e) => { checkValidation(e) })

    //Doing the following to allow the fileds to be change after submit validation failed
    name.addEventListener("change", () => {
        if (name.classList.contains('invalid'))
            textLengthValidation(name, 3);
    })
    message.addEventListener("change", () => {
        if (message.classList.contains('invalid'))
            textLengthValidation(message, 10);
    })
    email.addEventListener("change", () => {
        if (email.classList.contains('invalid'))
            emailValidation();
    })
    jobTitle.addEventListener("change", () => {
        if (jobTitle.classList.contains('invalid'))
            textLengthValidation(jobTitle, 1);
    })
    jobUrl.addEventListener("change", () => {
        if (jobUrl.classList.contains('invalid'))
            urlValidation();
    })
    cdlng.addEventListener("change", () => {
        if (cdlng.classList.contains('invalid'))
            talkCodeSelectedValidation();
    })
})