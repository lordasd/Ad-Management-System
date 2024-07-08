'use strict';

/**
 * Client side validation for Ad posting form
 * @type {{addInputValidationListeners: addInputValidationListeners, formValidation: formValidation}}
 */
const formValidation = (function() {
    /**
     * Define validation rules
     * @type {{phoneNumber: {pattern: RegExp, message: string}, rangeUnderflow: {message: string}, email: {pattern: RegExp, message: string}, valueMissing: {message: string}}}
     */
    const validationRules = {
        valueMissing: {
            message: "This field cannot be left blank."
        },
        rangeUnderflow: {
            message: "Please increase this value to be no less than 0."
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address (e.g., user@example.com)."
        },
        phoneNumber: {
            pattern: /^[0-9]{2,3}-[0-9]{7}$/,
            message: "Please match the requested format: XXX-XXXXXXX or XX-XXXXXXX."
        }
    };

    /**
     * Validate input
     * @param input
     */
    const validateInput = (input) => {
        const inputEmailName = 'email';
        const inputPhoneNumberName = 'phoneNumber';
        let customValidityMessage = '';

        if (input.validity.valueMissing) {
            customValidityMessage = validationRules.valueMissing.message;
        } else if (input.validity.rangeUnderflow) {
            customValidityMessage = validationRules.rangeUnderflow.message;
        } else if (input.name === inputEmailName && !validationRules.email.pattern.test(input.value)) {
            customValidityMessage = validationRules.email.message;
        } else if (input.name === inputPhoneNumberName && input.value && !validationRules.phoneNumber.pattern.test(input.value)) {
            customValidityMessage = validationRules.phoneNumber.message;
        }

        input.setCustomValidity(customValidityMessage);
        input.reportValidity();
    };

    /**
     * Add listener for an input to listen for clicks
     */
    const addInputValidationListeners = () => {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => validateInput(input));
        });
    };

    /**
     * Validate form - Loop over all input fields
     */
    const formValidation = () => {
        const forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                let isFormValid = true;
                Array.from(form.elements).forEach(input => {
                    validateInput(input); // Validate each input when the form is submitted
                    if (!input.validity.valid) {
                        isFormValid = false;
                    }
                });

                if (!isFormValid) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    };

    return {
        formValidation: formValidation,
        addInputValidationListeners: addInputValidationListeners
    }
})();

/**
 * Entry point functions
 */
document.addEventListener('DOMContentLoaded', () => {
    formValidation.formValidation();
    formValidation.addInputValidationListeners(); // Attach input validation listeners immediately after the DOM is loaded
});
