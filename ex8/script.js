/*
    Make a Todo List
    0) Make it so that after entering the task and clicking the "Add Task" button,
    that new task appears inside the todo-list.
    1) Add the ability to check off tasks by clicking on them -
    (text-decoration:strikethrough is a nice way to)
    BONUS) Add a functioning "delete" button to each task (HINT: use the keyword
    "this" in your delete button's click listener! Console log "this" to see what value it holds)
    SUPER BONUS) Make each task editable
*/

//define node variables for all functions' use
var addButton = document.querySelector('#add-button')
var taskInputElement = document.querySelector('#description')
var editTasksButton = document.querySelector('#edit-button')
var finishEditButton = document.querySelector('#finish-button')
var todoList = document.querySelector('#todo-list')

//if there are li elements on page load, this will attach the toggleLineThrough
document.querySelectorAll('li').forEach(function(liNode){
  liNode.addEventListener('click',toggleLineThrough)
})

//create handler for 'add task' button
addButton.addEventListener('click', function() {
  //only act if the input has text
  if(taskInputElement.value !== "") {
    var taskValue = taskInputElement.value
    taskInputElement.value = ""

    var newItem = document.createElement('li')
    newItem.innerHTML = taskValue
    newItem.addEventListener('click',toggleLineThrough)


    document.querySelector('#todo-list').appendChild(newItem)
  }
})

//this function attached to 'Edit' button click
editTasksButton.addEventListener('click',function(event) {
  addButton.disabled = true
  taskInputElement.value = ""
  taskInputElement.disabled = true

  //run for every item in the todo list
  document.querySelectorAll('li').forEach(function(oldLi) {
    var newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.value = oldLi.innerHTML
    newInput.className = 'edit-input'

    if(oldLi.style.textDecoration === 'line-through') { //conditionally add a 'completion' status if it was marked
      newInput.className = newInput.className + ' task-complete'
    }
    todoList.appendChild(newInput)
    oldLi.remove() //we have all the information from the li, now remove it

    var newDeleteButton = document.createElement('button')
    newDeleteButton.innerHTML = "Delete"
    newDeleteButton.addEventListener('click',deleteItem) //attach handler for click
    newDeleteButton.className = 'delete-button'
    todoList.appendChild(newDeleteButton)

    todoList.appendChild(document.createElement('br')) //br tag to keep the list item editors on separate lines

  })

  //swap the 'Edit' and 'Done' buttons on the UI
  editTasksButton.style.display = 'none'
  finishEditButton.style.display = 'inline'
})

//The function attached to 'Done' button click
finishEditButton.addEventListener('click',function(event) {

  //allow the entry of new todo items
  addButton.disabled = false
  taskInputElement.disabled = false


  //remove the delete buttons and br tags
  document.querySelectorAll('.delete-button,br').forEach(function(ele) {
    ele.remove()
  })

  //for each of the edit-task inputs, gather its value and its 'completion state' and recreate the li tags
  document.querySelectorAll('.edit-input').forEach(function(ele) {
    var newTaskLi = document.createElement('li')
    newTaskLi.innerHTML = ele.value

    if(ele.className.includes('task-complete')) {
      newTaskLi.style.textDecoration = 'line-through' //we stored the task's 'completion state' as a class of the input element, recover that information as a 'line-through'
    }
    newTaskLi.addEventListener('click',toggleLineThrough) //attach the 'check-off' function to the new li

    todoList.appendChild(newTaskLi) //the new li is ready, add it into the todo list

    ele.remove() //remove the input element for this todo item
  })

  //swap the 'Edit' and 'Done' buttons on the UI
  editTasksButton.style.display = 'inline'
  finishEditButton.style.display = 'none'
})

//when clicking a list item, toggle its 'line-through' style
function toggleLineThrough(event) {
  var myDecoration = event.currentTarget.style.textDecoration
  if(myDecoration === "line-through") {
    event.currentTarget.style.textDecoration = "none"
  } else {
    event.currentTarget.style.textDecoration = "line-through"
  }
}

//The function which will attach to all delete buttons' clicks
function deleteItem(event) {
  var myButton = event.currentTarget
  var myInput = myButton.previousSibling
  var myBr = myButton.nextSibling

  myInput.remove()
  myButton.remove()
  myBr.remove()
}
