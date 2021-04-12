//this is only for the application form.For normal form validation used bootstrapFormValidation.js
(function () {
    'use strict'

    const forms = document.querySelectorAll('.validated-form')
    console.dir(forms);
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                const submitBtn = document.querySelector('#submit-application-btn');
                const errorBlock = document.querySelector('#application-form-error');
                console.dir(errorBlock);
                errorBlock.classList.remove('hide');
                form.classList.add('was-validated')
            }, false)
        })
})()




        // const form = document.querySelector('#application-form');

        // form.addEventListener('submit', () => {
        //     console.log(form);
        //     const inputElements = document.getElementsByTagName('input');

        //     for (let ele of inputElements) {
        //         console.log(ele.classList);
        //         if (ele.classList.contains('has-error')) {
        //             errorBlock.classList.remove('hide');
        //             break;
        //         }
        //     }
        // })

