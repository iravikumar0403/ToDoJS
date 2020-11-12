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

        var check = document.createElement('i')
        check.className = 'fas fa-check check'
        task.appendChild(check)
        check.onclick = function(e){
            markAsCompleted(e.target.parentElement)
        }

        var txt = document.createElement('p')
        txt.innerHTML = inputField.value
        task.appendChild(txt)

        var deleteIcon = document.createElement('i')
        deleteIcon.className = "fas fa-times remove-icon"
        task.appendChild(deleteIcon)
        deleteIcon.onclick = function(e){
            delTaskid = e.target.parentElement.id
            delTask = document.getElementById(delTaskid)
            delTask.remove()
            checkIncompleteTasks()
            checkCompletedTasks()
        }
        incompleteTask.appendChild(task)
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
    if (task.classList.contains('completed')){
        task.classList.remove('completed')
        incompleteTask.appendChild(task)
        childElems = task.children
        childElems[2].className = "fas fa-times remove-icon"
    }else{
        task.classList.add('completed')
        completedTask.appendChild(task)
        childElems = task.children
        childElems[2].className = "far fa-trash-alt remove-icon"
    }
    checkIncompleteTasks()
    checkCompletedTasks();
}
checkCompletedTasks()
function checkCompletedTasks(){
    var completedHeading = document.getElementById('completedHeading')
    if (completedTask.childElementCount > 1 ){
        completedHeading.style.display = ''
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
