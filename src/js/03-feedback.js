import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';
restoreInputs();

feedbackForm.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(feedbackForm);
  console.log({ email: formData.get('email'), message: formData.get('message') });
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

feedbackForm.addEventListener('input', throttle(setFormInputs, 500));
function setFormInputs(evt) {
  let persistedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  persistedFormData = persistedFormData ? JSON.parse(persistedFormData) : {};
  persistedFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFormData));
}

function restoreInputs() {
  let persistedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedFormData) {
    persistedFormData = JSON.parse(persistedFormData);
    Object.entries(persistedFormData).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}
