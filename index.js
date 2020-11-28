var inputField = document.getElementById("inputField")
var infoMsg = document.getElementById("info")
var incompleteTask = document.getElementById('notCompleted')
var completedTask = document.getElementById('completed')
var submitBtn = document.getElementById("submitBtn")
var taskList = document.getElementById('task-list')

submitBtn.addEventListener('click', function(){
    addTask()
    inputField.value = ''
})

inputField.onkeyup = function(e){
    if (e.key === 'Enter'){
        addTask()
        inputField.value = ''
    }
}

function addTask(){
    if(inputField.value ===""){
        alert('Task cannot be empty')
    }else{
        infoMsg.style.display = 'none'

        var task =  document.createElement('div')
        task.className = 'task'
        task.id = Date.now()

        var taskContainer = document.createElement('div')
        taskContainer.className = 'taskContainer'
        

        var check = document.createElement('i')
        check.className = 'fas fa-check check'
        taskContainer.appendChild(check)
        check.onclick = function(e){
            markAsCompleted(e.target.parentElement.parentElement)
            // checkCompletedTasks()
        }

        var txt = document.createElement('p')
        txt.innerHTML = inputField.value
        taskContainer.appendChild(txt)

        var editIcon = document.createElement('i')
        editIcon.className = 'fas fa-edit edit-icon'
        taskContainer.appendChild(editIcon)
        editIcon.onclick = function(e){
            editInput.value = e.target.parentElement.innerText;
            e.target.parentElement.style.display = 'none'
            var toBeEditedTask = e.target.parentElement.parentElement
            toBeEditedTask.lastChild.style.display = 'flex'
            toBeEditedTask.lastChild.firstChild.focus()
        }

        var deleteIcon = document.createElement('i')
        deleteIcon.className = "fas fa-times remove-icon"
        taskContainer.appendChild(deleteIcon)
        deleteIcon.onclick = function(e){
            delTaskid = e.target.parentElement.parentElement.id
            delTask = document.getElementById(delTaskid)
            delTask.remove()
            checkIncompleteTasks()
            checkCompletedTasks()
        }
        task.appendChild(taskContainer)

        var editContainer = document.createElement('div')
        editContainer.className = 'editContainer'

        var editInput = document.createElement('input')
        editInput.className = 'editInput'
        editInput.type = 'text'
        editContainer.appendChild(editInput)

        var updateBtn = document.createElement('button')
        updateBtn.className = 'updateBtn'
        updateBtn.innerHTML = 'Update'
        updateBtn.addEventListener('click', function(e){
            editTask(e)
        })
        editInput.addEventListener('keyup', function(e){
            if( e.key ==='Enter'){
                editTask(e)
            }
        })
        editContainer.appendChild(updateBtn)
        
        task.appendChild(editContainer)
        incompleteTask.appendChild(task)

        function editTask(e){
            var toBeEditedTask = e.target.parentElement.parentElement
            var taskContainer = toBeEditedTask.children[0]
            taskContainer.children[1].innerHTML = editInput.value
            toBeEditedTask.firstChild.style.display = 'flex'
            toBeEditedTask.lastChild.style.display = 'none'
        }
    }
}

function checkIncompleteTasks(){
    if(incompleteTask.childElementCount === 0){
        infoMsg.style.display = ''
    }else{
        infoMsg.style.display = 'none'
    }            

}

function markAsCompleted(task){
    if (task.firstChild.classList.contains('completed')){
        task.firstChild.classList.remove('completed')
        incompleteTask.appendChild(task)
        childElems = task.firstChild.children
        childElems[2].className = 'fas fa-edit edit-icon'
        childElems[3].className = "fas fa-times remove-icon"
    }else{
        task.firstChild.classList.add('completed')
        completedTask.appendChild(task)
        childElems = task.firstChild.children
        childElems[2].className = ''
        childElems[3].className = "far fa-trash-alt remove-icon"
    }
    checkIncompleteTasks()
    checkCompletedTasks();
}

checkCompletedTasks()
function checkCompletedTasks(){
    var completedHeading = document.getElementById('completedHeading')
    if (completedTask.childElementCount > 1 ){
        completedHeading.style.display = 'block'
        infoMsg.innerHTML = "<i>Wohoo!! No more task for today</i>"
    }else{
        completedHeading.style.display = 'none'
        infoMsg.innerHTML = "<i>Your tasks will appear here.<br>Start planning your day.</i>"
    }
}

var deleteAll = document.getElementById('deleteAll')
deleteAll.onclick = function(){
    while(completedTask.childElementCount > 1){
        completedTask.lastChild.remove()
    }
    checkCompletedTasks();
}
