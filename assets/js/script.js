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

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    // Function to show message
    function showMessage(element, messageId) {
      const messageElement = document.getElementById(messageId);

      if (!messageElement) {
        console.warn('Missing element with id:', messageId);
        return;
      }

      messageElement.classList.remove('hidden');

      if (element) {
        element.classList.add('invalid');
      }
    }

    // Function to hide message
    function hideMessage(element, messageId) {
      const messageElement = document.getElementById(messageId);

      if (!messageElement) {
        console.warn('Missing element with id:', messageId);
        return;
      }

      messageElement.classList.add('hidden');

      if (element) {
        element.classList.remove('invalid');
      }
    }

    // Check First Name
    const firstNameInput = document.querySelector('.first-name-input');

    if (!firstNameInput) {
      console.warn('Missing .first-name-input');
      isValid = false;
    } else if (firstNameInput.value.trim() === '') {
      showMessage(firstNameInput, 'first-name-mess');
      isValid = false;
    } else {
      hideMessage(firstNameInput, 'first-name-mess');
    }

    // Check Last Name
    const lastNameInput = document.querySelector('.last-name-input');
    if (!lastNameInput) {
      console.warn('Missing .last-name-input');
      isValid = false;
    } else if (lastNameInput.value.trim() === '') {
      showMessage(lastNameInput, 'last-name-mess');
      isValid = false;
    } else {
      hideMessage(lastNameInput, 'last-name-mess');
    }

    // Check Email
    const emailInput = document.querySelector('.email-input');
    const emailMessage = document.getElementById('email-mess');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput || !emailMessage) {
      console.warn('Missing email input or message element');
      isValid = false;
    } else if (emailInput.value.trim() === '') {
      showMessage(emailInput, 'email-mess');
      emailMessage.innerText = 'This field is required';
      isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
      showMessage(emailInput, 'email-mess');
      emailMessage.innerText = 'Please enter a valid email address';
      isValid = false;
    } else {
      hideMessage(emailInput, 'email-mess');
    }

    // Check Query Type
    const queryTypeInputs = document.querySelectorAll(
      'input[name="query-type"]',
    );
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

    if (!messageInput) {
      console.warn('Missing .message-input');
      isValid = false;
    } else if (messageInput.value.trim() === '') {
      showMessage(messageInput, 'message-mess');
      isValid = false;
    } else {
      hideMessage(messageInput, 'message-mess');
    }

    // Check Consent
    // Check Consent
    const consentInput = document.getElementById('consent');

    if (!consentInput) {
      console.warn('Missing #consent');
      isValid = false;
    } else if (!consentInput.checked) {
      showMessage(consentInput, 'consent-mess');
      isValid = false;
    } else {
      hideMessage(consentInput, 'consent-mess');
    }

    if (isValid) {
      announceStatus('Form submitted successfully!');
      form.reset();
    }
  });
} else {
  console.warn('Form element not found');
}

const formStatus = document.getElementById('form-status');

function announceStatus(message) {
  if (!formStatus) return;

  formStatus.textContent = '';
  setTimeout(() => {
    formStatus.textContent = message;
  }, 10);
}
