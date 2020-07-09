// Listen for submit 
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e){ 
    console.log('calculating..');
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  // Value of calculation -- as float (decimal)
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12; // 100% divided by 12 months
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments
  // Math power 
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    //toFixed sets the number of decimal points
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  } else { 
    // console.log('Please check your numbers');
    showError('Please check your numbers');
  }

e.preventDefault();
}

// Show error
function showError(error){
  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add Class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading 
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds 
  setTimeout(clearError, 3000);

}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove();
}