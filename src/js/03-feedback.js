import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');

const LC_KEY = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(handleSaveToLS, 500));

function handleSaveToLS() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem(LC_KEY, JSON.stringify(formData));
}


function loadFormState() {
  const savedFormData = localStorage.getItem(LC_KEY);
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email || '';
    messageTextarea.value = formData.message || '';
    };
};

document.addEventListener('DOMContentLoaded', loadFormState);

emailInput.addEventListener('input', handleSaveToLS);
messageTextarea.addEventListener('input', handleSaveToLS);

feedbackForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  if (emailInput.value === '' || messageTextarea.value === '') {
    const message = 'Please fill all fields!';
    alert(message);
  }

  localStorage.removeItem(LC_KEY);

  emailInput.value = '';
  messageTextarea.value = '';

  const formDataObject = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formDataObject);
};
