$(document).ready(function () {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        $('#taskList').empty();
        taskList.forEach((task, index) => {
            $('#taskList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center task-item">
                    <span class="task-text">${task}</span>
                    <input type="text" class="form-control form-control-sm edit-input d-inline-block" style="width: 60%;" value="${task}">
                    <div>
                        <button class="btn btn-sm btn-info edit-btn">Edit</button>
                        <button class="btn btn-sm btn-success save-btn d-none">Save</button>
                        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    $('#addTask').click(function () {
        const task = $('#taskInput').val().trim();
        if (task) {
            taskList.push(task);
            saveToLocalStorage();
            renderTasks();
            $('#taskInput').val('');
        }
    });

    $('#taskList').on('click', '.delete-btn', function () {
        const index = $(this).closest('li').index();
        taskList.splice(index, 1);
        saveToLocalStorage();
        renderTasks();
    });

    $('#taskList').on('click', '.edit-btn', function () {
        const li = $(this).closest('li');
        li.find('.task-text').hide();
        li.find('.edit-input').show();
        li.find('.edit-btn').addClass('d-none');
        li.find('.save-btn').removeClass('d-none');
    });

    $('#taskList').on('click', '.save-btn', function () {
        const li = $(this).closest('li');
        const newText = li.find('.edit-input').val().trim();
        const index = li.index();
        if (newText) {
            taskList[index] = newText;
            saveToLocalStorage();
            renderTasks();
        }
    });

    renderTasks(); // Initial load
});
