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
            taskCompletedId = e.target.parentElement.id
            taskCompleted = document.getElementById(taskCompletedId)
            completedTask.appendChild(taskCompleted)
            checkTasks()
        }

        var txt = document.createElement('p')
        txt.innerHTML = inputField.value
        task.appendChild(txt)

        var deleteIcon = document.createElement('i')
        deleteIcon.className = 'fas fa-trash-alt remove-icon'
        task.appendChild(deleteIcon)
        deleteIcon.onclick = function(e){
            delTaskid = e.target.parentElement.id
            delTask = document.getElementById(delTaskid)
            delTask.remove()
        }
        incompleteTask.appendChild(task)
    }
}

function checkTasks(){
    if(incompleteTask.childElementCount === 0){
        infoMsg.style.display = ''
    }else{
        infoMsg.style.display = 'none'
    }            

}
