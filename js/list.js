const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

const options = {weekday : "long", month:"short" , day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us",options);


let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

window.onload = function () {
  theInput.focus();
};

// [1] array to store the data of tasks
var to_dos = [];

// Adding The Task
theAddButton.onclick = function () {
  
  // If Input is Empty
  if (theInput.value === '') {
    
    console.log("No Value");
    
  } else {
    
    // [2] store the value of input field in the array
    to_dos.push(theInput.value);
    
    // [3] to create all tasks by looping on the array 
    createTodoElement();
    
    // Empty The Input
    theInput.value = '';
    
    // Focus On Field
    theInput.focus();
    
    // Calculate Tasks
    calculateTasks();
    
  }
  
};

function createTodoElement(){
  
  // check the array not empty
  if(to_dos.length !== 0){
    console.log(to_dos);
    
    // to clear the box of tasks to add the new uptade of the array's data
    tasksContainer.innerHTML = " ";
    
    // start no Tasks massage
    let noTasksMsg = document.querySelector(".no-tasks-message");
    
    // Check If Span With No Tasks Message Is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) { 
      noTasksMsg.remove();
    }
    // end no Tasks massage
    
    // loop by using foreach to get all data of the array and get its index
    to_dos.forEach((to_do ,toindex) => {
      
      // Create Main Span Element
      let mainSpan = document.createElement("span");
      
      // Create Delete Button
      let deleteElement = document.createElement("span");
      
      // Create The Main Span Text and put evry data element on the task box
      let text = document.createTextNode(to_do); 
      
      // creat the delet button
      let deleteText = document.createTextNode("Delete");
      
      // Add Text To Main Span
      mainSpan.appendChild(text);
      
      // Add Class To Main Span
      mainSpan.className = 'task-box';
      
      // add index attribute to be editable on the array or delet
      mainSpan.setAttribute('index',toindex);
      
      // Add Text To Delete Button
      deleteElement.appendChild(deleteText);
      
      // Add Class To Delete Button
      deleteElement.className = 'delete';
      
      // Add Delete Button To Main Span
      mainSpan.appendChild(deleteElement);
      
      // Add The Task To The Container
      tasksContainer.appendChild(mainSpan);
      
    });
  }
}

document.addEventListener('click', function (e) {
  
  // [1] select task box to get the index attribute
  let mainSpan = document.querySelector(".task-box");
  
  // Delete Task
  if (e.target.className == 'delete') {
    
    // Remove Current Task
    e.target.parentNode.remove();
    
    // [2] remove current task from the data array
    to_dos = to_dos.filter((to_do,index) => index != mainSpan.getAttribute("index") ); 
    console.log(to_dos);
    
    createTodoElement();
    
    // Check Number Of Tasks Inside The Container 
    if (tasksContainer.childElementCount == 0) {
      
      createNoTasks();
      
    }
    
  }
  
  // Finish Task
  if (e.target.classList.contains('task-box')) {
    
    // Toggle Class 'finished'
    e.target.classList.toggle("finished");
    
  }
  
  // Calculate Tasks
  calculateTasks();
  
});

// Function To Create No Tasks Message
function createNoTasks() {
  
  // Create Message Span Element
  let msgSpan = document.createElement("span");
  
  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");
  msgSpan.appendChild(msgText);
  
  // Add Class To Message Span
  msgSpan.className = 'no-tasks-message';
  
  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
  
}

// Function To Calculate Tasks
function calculateTasks() {
  
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
  
  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
  
}  