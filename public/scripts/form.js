
document.getElementById("contact-form").onsubmit = function () {
    clearErrors();
    let isValid = true;

    // Validate first name
    let first = document.getElementById("firstName").value;
    if (first == "") {
        document.getElementById("err-fname").style.display = "inline";
        isValid = false;
    }
    // Validate last name
    let last = document.getElementById("lastName").value;
    if (last == "") {
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }

    let howMeet = document.getElementById("howMeet").value;
    if (howMeet == "") {
        document.getElementById("err-howMeet").style.display = "inline";
        isValid = false;
    }

    let otherOption = document.getElementById("other").value;
    if (howMeet == "other" && otherOption == "") {
        document.getElementById("err-other").style.display = "inline";
        isValid = false
    }

    let emailCheck = document.getElementById("mailingList");
    let email = document.getElementById("email").value;

    
    if (email !== "" && !validateEmail(email)) {
        document.getElementById("err-invalidEmail").style.display = "inline";
        isValid = false;
    }
    
    if (emailCheck.checked && email == "") {
        document.getElementById("err-noEmail").style.display = "inline";
        isValid = false;
    }

    let linkedIn = document.getElementById("linkedin").value;
    if (linkedIn !== "" && !validateLinkedIn(linkedIn)) {
        document.getElementById("err-linkedin").style.display = "inline"; // Error for invalid LinkedIn URL
        isValid = false;
    }


    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

function validateEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
    
}

function validateLinkedIn(linkedIn) {
    const linkedInPattern = /^https:\/\/linkedin.com\/in\/.+$/;  // Validate LinkedIn URL pattern
    return linkedInPattern.test(linkedIn);
}

document.getElementById("mailingList").addEventListener("change", function() {
    let emailFormatGroup = document.getElementById("emailFormatGroup");
    if (this.checked) {
        emailFormatGroup.style.display = "inline";  
    } else {
        emailFormatGroup.style.display = "none";   
    }
});

document.getElementById("howMeet").addEventListener("change", function() {
    let otherFieldGroup = document.getElementById("other-option");
    if (this.value === "other") {
        otherFieldGroup.style.display = "inline";
    } else {
        otherFieldGroup.style.display = "none"; 
    }
});

document.getElementById("mailingList").addEventListener("change", function() {
    let emailFormatGroup = document.getElementById("checks");
    if (this.checked) {
        emailFormatGroup.style.display = "inline";  // Show email format options
    } else {
        emailFormatGroup.style.display = "none";   // Hide email format options
    }
});