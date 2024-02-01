document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const tasksLeftElement = document.querySelector('.left');
    const darkModeButton = document.getElementById('darkModeBtn');
    const todoList = document.getElementById('taskList');
    const container = document.querySelector('.container');

    let taskCount = 0;
    const maxTasks = 6;
    let isDarkMode = false;

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

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = "X";

        btn.style.backgroundColor = isDarkMode ? '#25273D' : '#FFFFFF';
        btn.style.color = isDarkMode ? '#C8CBE7' : '#25273D';

        btn.style.display = 'none';

        btn.addEventListener('click', function() {
            deleteTask(btn);
        });

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);

        li.classList.add('dark-task');

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
        img.src = (img.src.includes('unchecked.svg')) ? './img/Group 4 (1).svg' : './img/unchecked.svg';
        btn.style.display = (img.src.includes('unchecked.svg')) ? 'none' : 'inline-block';

        const task = img.parentElement;
        const span = task.querySelector('span');
        span.style.color = isDarkMode ? '#C8CBE7' : '#494C6B';
    }

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        todoList.classList.toggle('dark-list', isDarkMode);
        container.classList.toggle('dark-cont', isDarkMode);

        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => task.classList.toggle('dark-task'));

        const taskTexts = document.querySelectorAll('.task span');
        taskTexts.forEach(text => {
            text.style.color = isDarkMode ? '#C8CBE7' : '#494C6B';
        });

        taskInput.style.backgroundColor = isDarkMode ? '#25273D' : '#FFF';

        const deleteButtons = document.querySelectorAll('.btn');
        deleteButtons.forEach(button => {
            button.style.backgroundColor = isDarkMode ? '#25273D' : '#FFFFFF';
            button.style.color = isDarkMode ? '#C8CBE7' : '#25273D';
        });
    }

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    darkModeButton.addEventListener('click', toggleDarkMode);
});
