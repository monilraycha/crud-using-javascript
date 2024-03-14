// ------------- Validation ----------------------
function validateForm() {
    const form = document.getElementById("employeeForm");
    const name = form.elements.name.value;
    const dob = form.elements.dob.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;

    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error")
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dob-error")
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error")
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error")

    let valid = true;
    if (name.trim() === "") {
        nameError.innerHTML = "Name is required";
        nameInput.style.borderColor = "red";
        valid = false;
    } else if (name.length < 4 || name.length > 20) {
        nameError.innerHTML = "Name must be between 4 and 20 characters";
        nameInput.style.borderColor = "red";
        valid = false;
    } else {
        nameError.innerHTML = "";
        nameInput.style.borderColor = "green";  
    }

    const currentDate = new Date();
    const selectedDate = new Date(dob);
    if (!dob || selectedDate >= currentDate) {
        dobError.innerHTML = "Please enter a valid date of birth";
        dobInput.style.borderColor = "red";
        valid = false;
    } else {
        dobError.innerHTML = "";
        dobInput.style.borderColor = "green";
    }

    if (!email.trim() || !validateEmail(email)) {
        emailError.innerHTML = "Please enter a valid email address";
        emailInput.style.borderColor = "red";
        valid = false;
    } else {
        emailError.innerHTML = "";
        emailInput.style.borderColor = "green";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phone.trim() !== "" && !phone.match(phonePattern)) {
        phoneError.innerHTML = "Please enter a 10-digit phone number";
        phoneInput.style.borderColor = "red";
        valid = false;
    } else {
        phoneError.innerHTML = "";
        phoneInput.style.borderColor = "green";
    }

    return valid;
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email.match(emailPattern);
}
    