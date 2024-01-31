document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const tasksLeftElement = document.querySelector('.left');

    let taskCount = 0;
    const maxTasks = 6;

    function updateTasksLeft() {
        const tasksLeft = maxTasks - taskCount;
        tasksLeftElement.textContent = `${tasksLeft} item${tasksLeft !== 1 ? 's' : ''} left`;
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a valid task.');
            return;
        }

        if (taskCount >= maxTasks) {
            alert('Maximum tasks achieved.');
            return;
        }

        const li = document.createElement('div');
        li.classList.add('task');

        const img = document.createElement('img');
        img.src = './img/unchecked.svg';
        img.onclick = function() {
            toggleTask(img, btn);
        };

        const span = document.createElement('span');
        span.textContent = taskText;

        const btn = document.createElement("button")
        btn.classList.add("btn")
        btn.textContent = "X";

        
        btn.style.display = 'none';

        
        btn.addEventListener('click', function() {
            deleteTask(btn);
        });

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn)

        taskList.appendChild(li);

        taskInput.value = '';
        taskCount++;
        updateTasksLeft();
    }

    function deleteTask(button) {
        const li = button.parentElement;
        li.remove();
        taskCount--;
        updateTasksLeft();
    }

    function toggleTask(img, btn) {
        if (img.src.includes('unchecked.svg')) {
            img.src = './img/Group 4 (1).svg';
            btn.style.display = 'none';
           
            img.nextElementSibling.style.color = '#D1D2DA';
            img.nextElementSibling.style.textDecorationLine = 'line-through';
        } else {
            img.src = './img/unchecked.svg';
            btn.style.display = 'inline-block';
            
            img.nextElementSibling.style.color = '';
            img.nextElementSibling.style.textDecorationLine = '';
        }
    }

    function toggleTask(img, btn) {
        img.src = (img.src.includes('unchecked.svg')) ? './img/Group 4 (1).svg' : './img/unchecked.svg';
        btn.style.display = (img.src.includes('unchecked.svg')) ? 'none' : 'inline-block';
    }

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});