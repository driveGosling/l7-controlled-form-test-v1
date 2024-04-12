import axios from "axios";

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

  // Step 2
  const submitBtn = document.querySelector('input[type="submit"]');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.post('/users')
      .then((res) => {
        document.body.innerHTML = `<p>${res.data.message}</p>`;
      })
  });
};

export default form;