const textInputs = document.querySelectorAll('.text-input');

const errors = {
  text: 'please enter a valid email',
  password: 'password must be between 4 and 60 characters long'
};

function toggleValidInput(e) {
  const { length } = e.target.value;
  const field = this.parentElement;
  const queryP = field.querySelector('p');

  if ((length < 4 || length > 60) && !queryP) {
    const p = document.createElement('p');
    const type = this.getAttribute('type');

    this.classList.add('invalid');
    p.classList.add('error-message');
    p.textContent = errors[type];
    field.appendChild(p);
  } else if (length >= 4 && (length <= 60 && queryP)) {
    this.classList.remove('invalid');
    queryP && queryP.remove();
  }
}

textInputs.forEach(input => {
  input.addEventListener('keyup', toggleValidInput);
});
