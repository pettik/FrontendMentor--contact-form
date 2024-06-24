document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function () {
    document.querySelectorAll('.radio-option').forEach(option => {
      option.style.backgroundColor = ''; // Reset background color for all
    });
    if (radio.checked) {
      radio.closest('.radio-option').style.backgroundColor =
        'var(--light-green)';
    }
  });
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  let isValid = true;

  // Function to show message
  function showMessage(element, message) {
    const messageElement = document.getElementById(message);
    messageElement.classList.remove('hidden');
  }

  // Function to hide message
  function hideMessage(element, message) {
    const messageElement = document.getElementById(message);
    messageElement.classList.add('hidden');
  }

  // Check First Name
  const firstNameInput = document.querySelector('.first-name-input');
  if (firstNameInput.value.trim() === '') {
    showMessage(firstNameInput, 'first-name-mess');
    isValid = false;
  } else {
    hideMessage(firstNameInput, 'first-name-mess');
  }

  // Check Last Name
  const lastNameInput = document.querySelector('.last-name-input');
  if (lastNameInput.value.trim() === '') {
    showMessage(lastNameInput, 'last-name-mess');
    isValid = false;
  } else {
    hideMessage(lastNameInput, 'last-name-mess');
  }

  // Check Email
  const emailInput = document.querySelector('.email-input');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    showMessage(emailInput, 'email-mess');
    document.getElementById('email-mess').innerText = 'This field is required';
    isValid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    showMessage(emailInput, 'email-mess');
    document.getElementById('email-mess').innerText =
      'Please enter a valid email address';
    isValid = false;
  } else {
    hideMessage(emailInput, 'email-mess');
  }

  // Check Query Type
  const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
  let queryTypeChecked = false;
  queryTypeInputs.forEach(input => {
    if (input.checked) {
      queryTypeChecked = true;
    }
  });
  if (!queryTypeChecked) {
    showMessage(null, 'query-type-mess');
    isValid = false;
  } else {
    hideMessage(null, 'query-type-mess');
  }

  // Check Message
  const messageInput = document.querySelector('.message-input');
  if (messageInput.value.trim() === '') {
    showMessage(messageInput, 'message-mess');
    isValid = false;
  } else {
    hideMessage(messageInput, 'message-mess');
  }

  // Check Consent
  const consentInput = document.getElementById('consent');
  if (!consentInput.checked) {
    showMessage(consentInput, 'consent-mess');
    isValid = false;
  } else {
    hideMessage(consentInput, 'consent-mess');
  }

  // If the form is valid, you can submit it here or show a success message
  if (isValid) {
    alert('Form submitted successfully!');
    // form.submit(); // uncomment to actually submit the form
  }
});
