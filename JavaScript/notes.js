// Define a constant key for the local storage
const task_KEY = 'tasks';

// Function to load tasks from local storage and display them
function loadTasks() {
    const tasks = getTasksFromStorage();
    displayTasks(tasks);
    newTaskInput.focus(); // Set the focus on the "newTaskInput" field
}

// Function to add a task to the list
function addTask() {
    const isValid = validate();
    if (!isValid) return; // If validation fails, do not proceed

    const task = getTasks(); // Get task data from input fields
    const tasks = getTasksFromStorage();

    tasks.unshift(task); // Add the new task to the beginning of the tasks array

    displayTasks(tasks); // Update the displayed tasks
    saveTasksToStorage(tasks); // Save the tasks to local storage
    clearForm(); // Clear the input fields

    noteCards.style.background = 'url("../images/notebg.png")';
    noteCards.style.backgroundRepeat = 'repeat'; // Allow background image to repeat
    noteCards.style.backgroundPosition = 'center'; // Center the background image
    noteCards.style.backgroundAttachment = 'fixed'; // Fix the background image in place
}

// Function to clear the task form
function clearTaskForm() {
    clearForm();
}

// Function to get task data from input fields
function getTasks() {
    const newTask = newTaskInput.value;
    const newDate = newDateInput.value;
    const newTime = newTimeInput.value;

    return { newTask, newDate, newTime };
}

// Function to display tasks in the HTML
function displayTasks(tasks) {
    noteCards.innerHTML = ''; // Clear the existing task cards

    tasks.forEach((task, i) => {
        // Generate HTML for each task card and append it to the "noteCards" div
        const taskCard = `
        <div class="card">
            <div class="text" id="newNote">
                <p>${task.newTask} <br> ${task.newDate} <br> ${task.newTime}</p>
            </div>
            <button class="button" id="${i}" value="delete" onclick="deleteCard(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="exit-icon" viewBox="0 0 16 16">
            <path d="M3.5 4.793l1.297-1.296 4.205 4.206L12.206 3.5 13.5 4.794 9.294 9 13.5 13.206l-1.293 1.293-4.205-4.206-4.206 4.206-1.296-1.293L4.794 9 1.5 4.794z"/>
        </svg>        
            </button>
        </div>`;

        noteCards.innerHTML += taskCard; // Append the task card to the "noteCards" div
    });

}

// Function to delete a task card
function deleteCard(button) {
    const index = button.id;
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1); // Remove the task from the tasks array
    displayTasks(tasks); // Update the displayed tasks
    saveTasksToStorage(tasks); // Save the updated tasks to local storage
}

// Function to validate input fields
function validate() {
    const newTaskValue = newTaskInput.value;
    const newDateValue = newDateInput.value;
    const newTimeValue = newTimeInput.value;

    if (newTaskValue === '' || newDateValue === '' || newTimeValue === '') {
        alert('Please fill in all the fields.'); // Show an alert if any field is missing
        return false;
    }

    return true; // Return true if all fields are filled
}

// Function to get tasks from local storage
function getTasksFromStorage() {
    const str = localStorage.getItem(task_KEY);
    const tasks = str ? JSON.parse(str) : [];

    return tasks;
}

// Function to save tasks to local storage
function saveTasksToStorage(allTasks) {
    const str = JSON.stringify(allTasks);
    localStorage.setItem(task_KEY, str);
}

// Function to clear input fields
function clearForm() {
    newTaskInput.value = '';
    newDateInput.value = '';
    newTimeInput.value = '';
    newTaskInput.focus(); // Set the focus back to the "newTaskInput" field
}
