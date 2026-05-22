let tasks = JSON.parse(localStorage.getItem("tasks_simple")) || [];
let taskEditIndex = -1;

let taskModal = document.getElementById("taskModal");
let btnOpenTask = document.getElementById("btnOpenTask");
let btnCloseTask = document.getElementById("btnCloseTask");
let taskForm = document.getElementById("taskForm");
let taskList = document.getElementById("taskList");
let taskMessage = document.getElementById("taskMessage");

btnOpenTask.onclick = function () {
    taskEditIndex = -1;
    taskForm.reset();
    document.getElementById("taskFormTitle").innerText = "Thêm công việc";
    taskModal.style.display = "block";
};

btnCloseTask.onclick = function () {
    taskModal.style.display = "none";
};

taskForm.onsubmit = function (event) {
    event.preventDefault();

    let title = document.getElementById("taskTitle").value;
    let desc = document.getElementById("taskDesc").value;
    let date = document.getElementById("taskDate").value;
    let priority = document.getElementById("taskPriority").value;

    if (title === "" || desc === "" || date === "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    let task = {
        title: title,
        desc: desc,
        date: date,
        priority: priority,
        done: false
    };

    if (taskEditIndex === -1) {
        tasks.push(task);
        taskMessage.innerText = "Đã thêm công việc";
    } else {
        task.done = tasks[taskEditIndex].done;
        tasks[taskEditIndex] = task;
        taskMessage.innerText = "Đã sửa công việc";
    }

    saveTaskData();
    renderTasks();
    taskModal.style.display = "none";
};

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>Chưa có công việc nào</p>";
    }

    for (let i = 0; i < tasks.length; i++) {
        let doneClass = "";

        if (tasks[i].done === true) {
            doneClass = "done";
        }

        taskList.innerHTML += `
            <div class="task ${doneClass}">
                <h3>${tasks[i].title}</h3>
                <p>${tasks[i].desc}</p>
                <p>Hạn: ${tasks[i].date}</p>
                <p>Ưu tiên: ${tasks[i].priority}</p>

                <label>
                    <input type="checkbox" onchange="changeStatus(${i})" ${tasks[i].done ? "checked" : ""}>
                    Đã hoàn thành
                </label>

                <br>
                <button onclick="editTask(${i})">Sửa</button>
                <button onclick="deleteTask(${i})">Xóa</button>
            </div>
        `;
    }

    updateTaskInfo();
}

function editTask(index) {
    taskEditIndex = index;

    document.getElementById("taskTitle").value = tasks[index].title;
    document.getElementById("taskDesc").value = tasks[index].desc;
    document.getElementById("taskDate").value = tasks[index].date;
    document.getElementById("taskPriority").value = tasks[index].priority;

    document.getElementById("taskFormTitle").innerText = "Sửa công việc";
    taskModal.style.display = "block";
}

function deleteTask(index) {
    let check = confirm("Bạn có muốn xóa công việc này không?");

    if (check) {
        tasks.splice(index, 1);
        saveTaskData();
        renderTasks();
        taskMessage.innerText = "Đã xóa công việc";
    }
}

function changeStatus(index) {
    tasks[index].done = !tasks[index].done;
    saveTaskData();
    renderTasks();
    taskMessage.innerText = "Đã đổi trạng thái";
}

function updateTaskInfo() {
    let done = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) {
            done++;
        }
    }

    document.getElementById("totalTask").innerText = tasks.length;
    document.getElementById("doneTask").innerText = done;
    document.getElementById("doingTask").innerText = tasks.length - done;
}

function saveTaskData() {
    localStorage.setItem("tasks_simple", JSON.stringify(tasks));
}

renderTasks();
