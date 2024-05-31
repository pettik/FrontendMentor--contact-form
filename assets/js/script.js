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
