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

var addButton = document.querySelector('#add-button')
var taskInputElement = document.querySelector('#description')

addButton.addEventListener('click', function() {
  var taskValue = taskInputElement.value
  taskInputElement.value = ""

  var newItem = document.createElement('li')
  newItem.innerHTML = taskValue
  newItem.addEventListener('click',toggleLineThrough)


  document.querySelector('#todo-list').appendChild(newItem)
})

var allLi = document.querySelectorAll('li')


allLi.forEach(function(ele){
  ele.addEventListener('click',toggleLineThrough)
})

function toggleLineThrough(event) {
  console.log('wefwef')
  var myDecoration = event.currentTarget.style.textDecoration
  if(myDecoration === "line-through") {
    event.currentTarget.style.textDecoration = "none"
  } else {
    event.currentTarget.style.textDecoration = "line-through"
  }
}

var editTasksButton = document.querySelector('#edit-button')
var finishEditButton = document.querySelector('#finish-button')
var todoList = document.querySelector('#todo-list')

editTasksButton.addEventListener('click',function(event) {
  addButton.disabled = true
  taskInputElement.value = ""
  taskInputElement.disabled = true


  var myList = document.querySelectorAll('li')
  var listModel = []

  myList.forEach(function(ele) {
    var newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.value = ele.innerHTML
    if(ele.style.textDecoration === 'line-through')
    {
      newInput.className = 'edit-input task-complete'
    } else {
      newInput.className = 'edit-input'
    }
    todoList.appendChild(newInput)

    ele.remove()

    var newDeleteButton = document.createElement('button')
    newDeleteButton.innerHTML = "Delete"
    newDeleteButton.addEventListener('click',deleteItem)
    newDeleteButton.className = 'delete-button'
    todoList.appendChild(newDeleteButton)

    todoList.appendChild(document.createElement('br'))

  })

  editTasksButton.style.display = 'none'
  finishEditButton.style.display = 'inline'
})


finishEditButton.addEventListener('click',function(event) {
  addButton.disabled = false
  taskInputElement.disabled = false



  document.querySelectorAll('.delete-button,br').forEach(function(ele) {
    ele.remove()
  })

  document.querySelectorAll('.edit-input').forEach(function(ele) {
    var newTask = document.createElement('li')
    newTask.innerHTML = ele.value
    if(ele.className.includes('task-complete')) {
      newTask.style.textDecoration = 'line-through'
    }
    newTask.addEventListener('click',toggleLineThrough)

    todoList.appendChild(newTask)

    ele.remove()
  })

  editTasksButton.style.display = 'inline'
  finishEditButton.style.display = 'none'
})


function deleteItem(event) {
  var myButton = event.currentTarget
  var myInput = myButton.previousSibling
  var myBr = myButton.nextSibling

  myInput.remove()
  myButton.remove()
  myBr.remove()
}
