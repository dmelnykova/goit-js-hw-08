import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');
const LC_KEY = 'feedback-form-state';

const throttledSaveToLS = throttle(handleSaveToLS, 500);

feedbackForm.addEventListener('input', throttledSaveToLS);

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
  }
}

document.addEventListener('DOMContentLoaded', loadFormState);

function handleSubmit(event) {
  event.preventDefault();

  const formDataObject = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.removeItem(LC_KEY);

  if (formDataObject.email === '' || formDataObject.message === '') {
    const message = 'Please fill all fields!';
    alert(message);
    return; 
  }

  emailInput.value = '';
  messageTextarea.value = '';

  console.log(formDataObject);
}

feedbackForm.addEventListener('submit', handleSubmit);
emailInput.addEventListener('input', handleSaveToLS);
messageTextarea.addEventListener('input', handleSaveToLS);
