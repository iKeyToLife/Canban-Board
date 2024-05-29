const taskForm = $(`#taskForm`);

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


function taskSaveToLocalStorage(tasksArray) {
    localStorage.setItem(`tasks`, JSON.stringify(tasksArray));
}

// get tasks for localStorage
function readTasksFromStorage() {
    return JSON.parse(localStorage.getItem(`tasks`)) || [];
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const uniqueId = new UUID();
    return uniqueId.getId();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // create card
    const taskCard = $('<section></section>')
        .addClass('card task-card draggable my-3 col-9')
        .attr(`data-task-id`, task.id);

    // create card-header title
    const cardHeaderEl = $('<header></header>')
        .addClass(`card-header h4`)
        .text(task.name);

    // create card-body
    const cardBodyEl = $(`<body></body>`)
        .addClass(`card-body`)

    //create card-pEl description
    const pCardTypeEl = $(`<p></p>`)
        .addClass(`card-text`)
        .text(task.description);

    //create card-pEl date
    const pCardDateEl = $(`<p></p>`)
        .addClass(`card-text`)
        .text(task.dueDate);

    // create card-deleteBtn
    const cardDeleteBtn = $(`<button></button>`)
        .addClass(`btn btn-danger delete`)
        .text(`Delete`)
        .attr(`data-task-id`, task.id);
    cardDeleteBtn.on(`click`, handleDeleteTask);

    // check status done
    if (task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        // set color yellow if task day complete today
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
            cardBodyEl.addClass(`bg-warning text-white`);
            // set color red if task after today
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardBodyEl.addClass(`bg-danger text-white`);
            cardDeleteBtn.addClass('border-light');
        }
    }

    // append cardBody elements
    cardBodyEl.append(pCardTypeEl, pCardDateEl, cardDeleteBtn);
    // append to task card header and body
    taskCard.append(cardHeaderEl, cardBodyEl);
    // return task card
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();

    // Empty existing task cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // TODO: Loop through projects and create project cards for each status
    for (let task of tasks) {
        let newTask = createTaskCard(task);
        switch (task.status) {
            case `to-do`:
                todoList.append(newTask);
                break;
            case `in-progress`:
                inProgressList.append(newTask);
                break;
            case `done`:
                doneList.append(newTask);
                break;
            default:
                break;
        }
    }

    // draggable for cards
    $(".draggable").draggable({
        opacity: 0.8,
        zIndex: 10,
        helper: function () {
            var clone = $(this).clone();
            clone.css({
                width: $(this).width(),
                height: $(this).height()
            });
            return clone;
        },
        revert: "invalid"
    });
    $("ul, li").disableSelection();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const tasks = readTasksFromStorage();
    const taskName = $('#taskTitle').val();
    const taskDate = $('#taskDueDate').val();
    const taskDescription = $('#taskDescription').val();

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        dueDate: taskDate,
        description: taskDescription,
        status: 'to-do',
    }
    tasks.push(newTask);
    // save tasks
    taskSaveToLocalStorage(tasks);
    // reset Form
    $('#taskForm')[0].reset();
    // hide modal after add task
    $('#formModal').modal('hide');
    // render after add task
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const tasks = readTasksFromStorage();
    const taskId = $(event.target).data(`task-id`);
    // delete from array task by id
    const updatedTaskArray = tasks.filter(task => task.id != taskId);
    // update task local storage
    taskSaveToLocalStorage(updatedTaskArray);
    // render after delete
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    // current task id
    const taskId = ui.draggable[0].dataset.taskId;
    // new status by target drop
    const newStatus = event.target.id;
    // find task at array
    const task = tasks.find(task => task.id == taskId);
    // if have task change status
    if (task) {
        task.status = newStatus;
        taskSaveToLocalStorage(tasks);
        // render if we update taskLocalStorage
        renderTaskList();
    }
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    taskForm.on(`submit`, function (event) {
        $("#taskDueDate").datepicker({
            changeMonth: true,
            changeYear: true
        });
        handleAddTask(event);

    });

    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true
    });
    // drop by class lane
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});


// class constructor for encapsulation id
const UUID = (() => {
    let idCount = nextId || 0;

    return class {
        constructor() {
            this.id = ++idCount;
            localStorage.setItem(`nextId`, this.id);
        }

        getId() {
            return this.id;
        }
    };
})();


