let students = JSON.parse(localStorage.getItem("students_simple")) || [];
let editIndex = -1;

let modal = document.getElementById("modal");
let btnOpen = document.getElementById("btnOpen");
let btnClose = document.getElementById("btnClose");
let form = document.getElementById("studentForm");
let studentList = document.getElementById("studentList");
let message = document.getElementById("message");

btnOpen.onclick = function () {
    editIndex = -1;
    form.reset();
    document.getElementById("formTitle").innerText = "Thêm sinh viên";
    modal.style.display = "block";
};

btnClose.onclick = function () {
    modal.style.display = "none";
};

form.onsubmit = function (event) {
    event.preventDefault();

    let code = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let birthday = document.getElementById("birthday").value;
    let className = document.getElementById("className").value;
    let score = document.getElementById("score").value;
    let email = document.getElementById("email").value;

    if (code === "" || name === "" || birthday === "" || className === "" || score === "" || email === "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (Number(score) < 0 || Number(score) > 10) {
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    let student = {
        code: code,
        name: name,
        birthday: birthday,
        className: className,
        score: Number(score),
        email: email
    };

    if (editIndex === -1) {
        students.push(student);
        message.innerText = "Đã thêm sinh viên";
    } else {
        students[editIndex] = student;
        message.innerText = "Đã sửa sinh viên";
    }

    saveData();
    renderStudents();
    modal.style.display = "none";
};

function renderStudents() {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<tr><td colspan='7'>Chưa có dữ liệu</td></tr>";
    }

    for (let i = 0; i < students.length; i++) {
        studentList.innerHTML += `
            <tr>
                <td>${students[i].code}</td>
                <td>${students[i].name}</td>
                <td>${students[i].birthday}</td>
                <td>${students[i].className}</td>
                <td>${students[i].score}</td>
                <td>${students[i].email}</td>
                <td>
                    <button onclick="editStudent(${i})">Sửa</button>
                    <button onclick="deleteStudent(${i})">Xóa</button>
                </td>
            </tr>
        `;
    }

    updateInfo();
}

function editStudent(index) {
    editIndex = index;

    document.getElementById("code").value = students[index].code;
    document.getElementById("name").value = students[index].name;
    document.getElementById("birthday").value = students[index].birthday;
    document.getElementById("className").value = students[index].className;
    document.getElementById("score").value = students[index].score;
    document.getElementById("email").value = students[index].email;

    document.getElementById("formTitle").innerText = "Sửa sinh viên";
    modal.style.display = "block";
}

function deleteStudent(index) {
    let check = confirm("Bạn có muốn xóa sinh viên này không?");

    if (check) {
        students.splice(index, 1);
        saveData();
        renderStudents();
        message.innerText = "Đã xóa sinh viên";
    }
}

function updateInfo() {
    document.getElementById("total").innerText = students.length;

    let sum = 0;

    for (let i = 0; i < students.length; i++) {
        sum = sum + Number(students[i].score);
    }

    if (students.length === 0) {
        document.getElementById("avg").innerText = 0;
    } else {
        document.getElementById("avg").innerText = (sum / students.length).toFixed(2);
    }
}

function saveData() {
    localStorage.setItem("students_simple", JSON.stringify(students));
}

renderStudents();
