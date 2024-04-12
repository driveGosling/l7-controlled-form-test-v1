import axios from 'axios';
import onChange from 'on-change';

const isValidName = (name) => {
  return /[\S]+/.test(name);
};

const isValidEmail = (email) => {
  return /[\S]+@[\S]+/.test(email);
};

// MODEL START
const formState = {
  validationStates: { // так удобнее указать объект для просмотра onChange'ем
    inputName: 'empty',
    inputEmail: 'empty',
  },

  inputName: {
    value: '',
    isValidInput: isValidName,
    validationState: 'empty',
  },

  inputEmail: {
    value: '',
    isValidInput: isValidEmail,
    validationState: 'empty',
  },
};
// MODEL END

// VIEW START
const toggleSwitch = () => {
  const switchBtn = document.querySelector('input[type="submit"]');

  if (formState.validationStates.inputName === 'valid' && formState.validationStates.inputEmail === 'valid') {
    console.log('yes')
    switchBtn.disabled = false;
  } else {
    console.log('no')
    switchBtn.disabled = true;
  }
};

const changeInputStyle = (inputId) => {
  const validationState = formState[inputId].validationState;
  const input = document.querySelector(`#${inputId}`);

  input.classList.remove('form-control'); // багулина в тестах паходу
  if (validationState === 'valid') {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else if (validationState === 'invalid') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
  }
  input.classList.add('form-control'); // багулина в тестах паходу

  toggleSwitch();
};
// VIEW END

const watchedValidation = onChange(formState.validationStates, (inputId, value) => {
  formState[inputId].validationState = value; // строчка чтобы синхронизировать значения validationStates и [inputId].validationState
  changeInputStyle(inputId);
});

const validate = (inputId) => {
  const value = formState[inputId].value;
  const isValidInput = formState[inputId].isValidInput;

  if (isValidInput(value)) {
    console.log('valid')
    watchedValidation[inputId] = 'valid';
  } else {
    console.log('invalid')
    watchedValidation[inputId] = 'invalid';
  }
};

const formHtml = `
<form id="registrationForm">
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
  </div>
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
  </div>
  <input type="submit" value="Submit" class="btn btn-primary">
</form>
`;

const form = () => {
  // Step 1
  const formContainer = document.querySelector('.form-container');
  formContainer.innerHTML = formHtml;

  toggleSwitch();

  // Step 2
  const submitBtn = document.querySelector('input[type="submit"]');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.post('/users')
      .then((res) => {
        document.body.innerHTML = `<p>${res.data.message}</p>`;
      });
  });

  // Step 3
  const form = document.querySelector('#registrationForm');
  form.addEventListener('input', (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    formState[inputId].value = inputValue;
    validate(inputId);
  });
};

export default form;
