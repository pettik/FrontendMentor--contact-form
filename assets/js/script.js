// Vybereme všechny radio-option elementy
let radioOptions = document.querySelectorAll('.radio-option');

// Pro každý radio-option element
radioOptions.forEach((option) => {
  // Přidáme posluchače události 'click'
  option.addEventListener('click', () => {
    // Odstraníme třídu 'selected' a odstraníme všechny vytvořené elementy ze všech radio-option elementů
    radioOptions.forEach((opt) => {
      opt.classList.remove('selected');
      let customDot = opt.querySelector('.custom-dot');
      if (customDot) {
        opt.removeChild(customDot);
      }
    });

    // Přidáme třídu 'selected' na aktuálně vybraný radio-option element
    option.classList.add('selected');

    // Vytvoříme nový element
    let dot = document.createElement('span');
    dot.style.width = '15px';
    dot.style.height = '15px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = 'var(--green)';
    dot.style.position = 'absolute';
    dot.style.top = '50%';
    dot.style.left = '50%';
    dot.style.transform = 'translate(-50%, -50%)';
    dot.classList.add('custom-dot');

    // Vložíme nový element na stejnou pozici jako ".radio-option label::before"
    let label = option.querySelector('label');
    option.insertBefore(dot, label);
  });
});
