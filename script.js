
const hobbies = [];

// First add hobbies value
function getSelectedHobbies() {
  hobbies.length = 0; // Clear the hobbies array
  const hobbyCheckboxes = document.querySelectorAll('input[name="hobby"]');
  hobbyCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      hobbies.push(checkbox.value);
    }
  });
  return hobbies;   
}

// updated hobbies value
function setHobbiesCheckboxes(hobbies) {
  const hobbyCheckboxes = document.querySelectorAll('input[name="hobby"]');
  hobbyCheckboxes.forEach((checkbox) => {
    checkbox.checked = hobbies.includes(checkbox.value);
  });
}

//  for common operations
function getFormValues() {
  const form = document.getElementById("employeeForm");
  return {
    name: form.elements.name.value,
    gender: form.elements.gender.value,
    dob: form.elements.dob.value,
    email: form.elements.email.value,
    phone: form.elements.phone.value,
    hobbies: getSelectedHobbies(),
  };
}

// get data from local storage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

//  set data in local storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data from local storage
function getEmployeesFromLocalStorage() {
  return getLocalStorage("employees");
}

// set data from local storage
function setEmployeesFromLocalStorage(employees) {
  setLocalStorage("employees", employees);
}

// both updating and adding employees

function handleEmployee(index) {
  const form = document.getElementById("employeeForm");

  form.addEventListener("submit", validateForm);

  if (validateForm()) {
    getSelectedHobbies();
    const employeeData = getFormValues();
    const employees = getEmployeesFromLocalStorage();

    if (typeof index === "number") {
      // If index is provided, update the employee data at that index
      const updatedEmployeeData = getFormValues();
      const employeeData = employees[index];

      Object.assign(employeeData, updatedEmployeeData);
      employeeData.hobbies = Array.from(
        document.querySelectorAll('input[name="hobby"]:checked')
      ).map((checkbox) => checkbox.value);
    } else {
      // If no index is provided, add a new employee
      employees.push(employeeData);
    }

    setEmployeesFromLocalStorage(employees);
    
    displayDataInTable();

    // updateAdvancedTable();

    clearForm();     
  }
}

// basic table insert row
function addEmployeeToTable(employeeData, index) {
  const table = document.getElementById("employeeTable");
  const newRow = table.insertRow();
  const cells = [
    employeeData.name,
    employeeData.gender,
    employeeData.dob,
    employeeData.email,
    employeeData.phone,
    employeeData.hobbies,
    `<button style = "background-color: transparent;" onclick="editEmployee(${index})"> 
     <i class="fa fa-edit" style="font-size:22px; color: green;"></i> 
    </button> 
    <button style = "background-color: transparent;" onclick="deleteEmployee(${index})">
    <i style="color: red; font-size: 22px; " class="fa fa-trash-o"></i></button>`,
  ];

  for (let i = 0; i < cells.length; i++) {
    const cell = newRow.insertCell(i);
    cell.innerHTML = cells[i];
  }
}

// ------- First Time Add Advanced Table cell ---------------
let column = 0;
function updateAdvancedTable(employeeData, index) {
  let nameRow = document.getElementById("nameField");
  let genderRow = document.getElementById("genderField");
  let DOBRow = document.getElementById("DOBField");
  let EmailRow = document.getElementById("EmailField");
  let PhoneRow = document.getElementById("PhoneField");
  let HobbyRow = document.getElementById("HobbyField");
  let ActionRow = document.getElementById("ActionField");

  column++;
  cell1 = nameRow.insertCell(column);
  cell1.innerHTML = employeeData.name;

  cell2 = genderRow.insertCell(column);
  cell2.innerHTML = employeeData.gender;

  cell3 = DOBRow.insertCell(column);
  cell3.innerHTML = employeeData.dob;

  cell4 = EmailRow.insertCell(column);
  cell4.innerHTML = employeeData.email;

  cell5 = PhoneRow.insertCell(column);
  cell5.innerHTML = employeeData.phone;

  cell6 = HobbyRow.insertCell(column);
  cell6.innerHTML = employeeData.hobbies;

  cell7 = ActionRow.insertCell(column);
  cell7.innerHTML = `<button onclick="editEmployee(${index})">Edit</button>
<button onclick="deleteEmployee(${index})">Delete</button>`;
}

// ------------------ Edit Employee Both Table ------------------------
// Add an event listener to handle the Edit button click
function editEmployee(index) {
  const employees = getEmployeesFromLocalStorage();
  const employeeData = employees[index];

  // The form fields with the selected employee's data
  const form = document.getElementById("employeeForm");
  form.elements.name.value = employeeData.name;
  form.elements.gender.value = employeeData.gender;
  form.elements.dob.value = employeeData.dob;
  form.elements.email.value = employeeData.email;
  form.elements.phone.value = employeeData.phone;

  // Set the hobbies checkboxes
  setHobbiesCheckboxes(employeeData.hobbies);

  // Update the form submit button to handle editing
  const submitButton = form.querySelector("input[type=submit]");
  submitButton.value = "Update";
  submitButton.onclick = function () {
    updateEmployee(index);
  };

  // Show the Cancel button
  const cancelButton = form.querySelector("#cancelButton");
  cancelButton.style.display = "inline-block";
  cancelButton.onclick = function () {
    cancelEdit();
  };
}

// ------------ Update Employee -----------
// Update an existing employee
function updateEmployee(index) {
  event.preventDefault();
  handleEmployee(index);

  
}

// ----- Cancel button Function ------------
// Create a function to cancel editing and reset the form
function cancelEdit() {
  const form = document.getElementById("employeeForm");

  const submitButton = form.querySelector("input[type=submit]");
  submitButton.value = "Submit";
  submitButton.onclick = function () {
    handleEmployee();
    updateAdvancedTable();
    return false;
  };

  form.reset();
  const cancelButton = form.querySelector("#cancelButton");
  cancelButton.style.display = "none";
}

// ------------------ Delete -----------------------
// Function to delete an employee from both tables and local storage
function deleteEmployee(index) {
  const employees = getEmployeesFromLocalStorage();

  // Confirm the deletion
  const confirmDelete = confirm(
    "Are you sure you want to delete this employee?"
  );
  if (!confirmDelete) return;

  // Remove the employee from the array
  employees.splice(index, 1);

  removeEmployeeFromTables(index);
  setEmployeesFromLocalStorage(employees);
}

function removeEmployeeFromTables(index) {
  // Remove the row from the basic table
  const basicTable = document.getElementById("employeeTable");
  basicTable.deleteRow(index + 1); // Adding 1 because the header row is row 0.

  // Remove the column from the advanced table
  const advancedTable = document.getElementById("advancedTable");
  // advancedTable.deleteRow(0); // Delete the header row
  const rows = advancedTable.querySelectorAll("tr");
  rows.forEach((row) => {
    row.deleteCell(index + 1); // +1 to account for the header cell
  });
}

// Add event listener for page load
window.addEventListener("load", function () {
  // Get the existing data from local storage
  const employees = getEmployeesFromLocalStorage();
  // Display data in the basic table
  employees.forEach(function (employeeData, index) {
    addEmployeeToTable(employeeData, index);
    updateAdvancedTable(employeeData, index);
  });
});

// Function to display data in the table
function displayDataInTable() {
  const employees = getEmployeesFromLocalStorage();

  // Assuming you have a function to clear the existing table data
  clearTable();

  // Display data in the basic table
  employees.forEach(function (employeeData, index) {
    addEmployeeToTable(employeeData, index);
    // updateAdvancedTable(employeeData, index);
  });
}

// Function to clear existing table data
function clearTable() {

  // console.log("works");

  const basicTable = document.getElementById("employeeTable");

  // Clear basic table
  while (basicTable.rows.length > 1) {
    basicTable.deleteRow(1);
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  let maleButton = document.getElementById("male");
  let femaleButton = document.getElementById("female");

  maleButton.checked = true;
  femaleButton.checked = false;
  

}
