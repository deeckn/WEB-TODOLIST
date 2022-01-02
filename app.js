// DOM Elements
const textBox = document.querySelector(".inputField input");
const addTaskButton = document.querySelector(".inputField button");
const taskList = document.querySelector(".taskList");
const taskCountLabel = document.querySelector("footer span");
const clearAllButton = document.querySelector("footer button");

// Creating new task li and appending to ul
function addTask() {
    let taskDescription = textBox.value;
    textBox.value = "";
    if (taskDescription === "") return;

    // Constructing Tasklist li container
    let newTask = document.createElement("li");
    newTask.classList.add("taskItem");

    // TaskList Text
    let newTaskText = document.createElement("span");
    newTaskText.classList.add("taskText");
    newTaskText.textContent = taskDescription;
    newTaskText.addEventListener('click', () => {
        newTask.classList.contains("textStrike") ? incrementTaskCount() : decrementTaskCount();
        newTask.classList.toggle("textStrike");
    });

    // Constructing Trash Icon Span
    let trashIconSpan = document.createElement("span");
    trashIconSpan.classList.add("trashIcon");
    trashIconSpan.addEventListener('click', () => {
        if (!newTask.classList.contains("textStrike")) decrementTaskCount();
        newTask.remove();
    });

    // Constructing Trash Icon
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas");
    trashIcon.classList.add("fa-trash");

    // Constructing TaskItem
    trashIconSpan.appendChild(trashIcon);
    newTask.appendChild(newTaskText);
    newTask.appendChild(trashIconSpan);
    taskList.appendChild(newTask);
    incrementTaskCount();
}

// Add Task Event Listeners
addTaskButton.addEventListener('click', addTask);

this.addEventListener('keydown', (event) => {
    if (event.key === "Enter") addTask();
});

// Task Counter
let taskCount = 0;

// Task Count Increment
function incrementTaskCount() {
    taskCountLabel.textContent = `You have ${++taskCount} pending tasks`;
}

function decrementTaskCount() {
    taskCountLabel.textContent = `You have ${--taskCount} pending tasks`;
    if (taskCount === 0) taskCountLabel.textContent = "You have no tasks left, add more?";
}

// Clear All
clearAllButton.addEventListener('click', () => {
    let tasks = Array.prototype.slice.call(taskList.children);
    tasks.forEach(task => { task.remove(); });
    taskCount = 0;
    taskCountLabel.textContent = "You have no tasks left, add more?";
});

// Dragging Functionality
const dragArea = document.querySelector(".taskList");
new Sortable(dragArea, { animation: 500 });