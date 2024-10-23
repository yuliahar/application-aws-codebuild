const steps = Array.from(document.querySelectorAll('.form-step'));
const nextBtn = document.querySelectorAll('.next-btn');
const prevBtn = document.querySelectorAll('.prev-btn');
const form = document.getElementById('application-form');
const progress = document.querySelectorAll('.bullet');

let formStep = 0;

// Show the initial step
steps[formStep].classList.add('active');
progress[formStep].classList.add('active');
handleValidation(formStep); // Call validation handler

// Next button event listeners
nextBtn.forEach(button => {
  button.addEventListener('click', () => {

    if (validateCurrentStep()) {  // Check if the current step is valid
      steps[formStep].classList.remove('active');
      progress[formStep].classList.remove('active');
      formStep++;
      steps[formStep].classList.add('active');
      progress[formStep].classList.add('active');

      handleValidation(formStep);  // Re-enable validation for the new step

      if (formStep === steps.length - 1) {
        displayReviewInfo();  // Populate the table with values on the last step
      }
    }
  });
});

// Previous button event listeners
prevBtn.forEach(button => {
  button.addEventListener('click', () => {
    steps[formStep].classList.remove('active');
    progress[formStep].classList.remove('active');
    formStep--;
    steps[formStep].classList.add('active');
    progress[formStep].classList.add('active');

    handleValidation(formStep);  // Re-enable validation for the current step
  });
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent the default form submission
  if (validateCurrentStep()) {  // Only allow submission if current step is valid
    alert('Application Submitted Successfully!');  // Display success alert
    form.reset();  // Optional: Reset the form after submission
    location.reload();  // Optional: Reload the page if you want to reset the steps
  }
});

// Function to validate only the current step
function validateCurrentStep() {
  const currentStepInputs = steps[formStep].querySelectorAll('input, select');

  for (let input of currentStepInputs) {
    if (input.type !== 'checkbox' && !input.checkValidity()) {
      input.reportValidity();  // Show validation message
      return false;  // Return false if there is an invalid input
    }
  }
  return true;  // All non-checkbox inputs are valid
}

// Function to handle input validation for visible step only
function handleValidation(step) {
  const inputs = document.querySelectorAll('.form-step input, .form-step select');
  inputs.forEach(input => {
    if (input.closest('.form-step').classList.contains('active')) {
      input.setAttribute('required', 'true');  // Make visible inputs required
    } else {
      input.removeAttribute('required');  // Remove required from hidden inputs
    }
  });
}

// Function to populate the table in the review step
function displayReviewInfo() {
  // Get input values from form fields
  const name = document.getElementById('name')?.value || 'N/A';
  const email = document.getElementById('email')?.value || 'N/A';
  const phone = document.getElementById('phone')?.value || 'N/A';
  const position = document.getElementById('position')?.value || 'N/A';
  const experience = document.getElementById('experience')?.value || 'N/A';

  // Get file input for resume
  const resume = document.getElementById('resume')?.files[0]?.name || 'No file chosen';

  // Get optional LinkedIn and GitHub profile links
  const linkedin = document.getElementById('linkedin')?.value || 'N/A';

  // Get all checked skills
  const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.value);
  const skillsList = selectedSkills.length > 0 ? selectedSkills.join(', ') : 'None';

  // Function to set text content safely
  function setTextContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  // Populate table cells with the values (use setTextContent to ensure element exists)
  setTextContent('display-name', name);
  setTextContent('display-email', email);
  setTextContent('display-phone', phone);
  setTextContent('display-position', position);
  setTextContent('display-experience', experience);
  setTextContent('display-skills', skillsList);
  setTextContent('display-resume', resume);
  setTextContent('display-linkedin', linkedin);
}


