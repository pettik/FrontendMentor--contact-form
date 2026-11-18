const form = document.querySelector('form');
const formStatus = document.getElementById('form-status');
let statusTimeout;

function clearStatus() {
  clearTimeout(statusTimeout);
  formStatus.textContent = '';
}

function announceStatus(message) {
  clearStatus();
  // Updating the existing live region also announces repeated submissions.
  statusTimeout = setTimeout(() => {
    formStatus.textContent = message;
  }, 10);
}

if (form && formStatus) {
  const messages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    queryType: 'Please select a query type',
    consent: 'To submit this form, please consent to being contacted',
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fields = [
    {
      controls: [form.elements.namedItem('firstName')],
      messageId: 'first-name-mess',
      getError: ([input]) => input.value.trim() ? '' : messages.required,
    },
    {
      controls: [form.elements.namedItem('lastName')],
      messageId: 'last-name-mess',
      getError: ([input]) => input.value.trim() ? '' : messages.required,
    },
    {
      controls: [form.elements.namedItem('email')],
      messageId: 'email-mess',
      getError: ([input]) => {
        const email = input.value.trim();
        if (!email) return messages.required;
        return emailPattern.test(email) && !input.validity.typeMismatch
          ? ''
          : messages.email;
      },
    },
    {
      controls: Array.from(form.querySelectorAll('input[name="query-type"]')),
      messageId: 'query-type-mess',
      getError: controls => controls.some(input => input.checked) ? '' : messages.queryType,
    },
    {
      controls: [form.elements.namedItem('message')],
      messageId: 'message-mess',
      getError: ([input]) => input.value.trim() ? '' : messages.required,
    },
    {
      controls: [form.elements.namedItem('consent')],
      messageId: 'consent-mess',
      getError: ([input]) => input.checked ? '' : messages.consent,
    },
  ];

  function validateField(field) {
    const message = field.getError(field.controls);
    const messageElement = document.getElementById(field.messageId);

    messageElement.textContent = message;
    messageElement.classList.toggle('hidden', !message);

    field.controls.forEach(input => {
      input.classList.toggle('invalid', Boolean(message));
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', field.messageId);
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
      }
    });

    return !message;
  }

  fields.forEach(field => {
    field.controls.forEach(input => {
      // Hidden errors should not be read as descriptions before validation.
      input.removeAttribute('aria-describedby');
      const eventName = input.type === 'radio' || input.type === 'checkbox'
        ? 'change'
        : 'input';

      input.addEventListener(eventName, () => {
        clearStatus();
        // Let users finish typing before showing a field's first error.
        if (input.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    clearStatus();

    const invalidFields = fields.filter(field => !validateField(field));

    if (invalidFields.length) {
      invalidFields[0].controls[0].focus();
      announceStatus('Please correct the highlighted fields and submit again.');
      return;
    }

    form.reset();
    announceStatus('Form completed successfully! Thanks for completing the form.');
  });
}
