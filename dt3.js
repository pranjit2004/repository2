document.addEventListener("DOMContentLoaded", function() {
    initializeScheduleData();
    displaySchedule(document.getElementById("schedule"), false); 
});

function initializeScheduleData() {
    const storedData = localStorage.getItem('scheduleData');
    if (storedData) {
        scheduleData = JSON.parse(storedData);
    } else {
        
        scheduleData = [
            { day: "DAY 1", classes: ["MATHS", "PHYSICS", "CHEMISTRY", "BREAK", "WORKSHOP", "PHYSICS LAB", "CHEMISTRY LAB", "PROGRAMMING LAB"] },
            { day: "DAY 2", classes: ["MATHS", "PHYSICS", "CHEMISTRY", "BREAK", "WORKSHOP", "PHYSICS LAB", "CHEMISTRY LAB", "PROGRAMMING LAB"] },
            { day: "DAY 3", classes: ["MATHS", "PHYSICS", "CHEMISTRY", "BREAK", "WORKSHOP", "PHYSICS LAB", "CHEMISTRY LAB", "PROGRAMMING LAB"] },
            { day: "DAY 4", classes: ["MATHS", "PHYSICS", "CHEMISTRY", "BREAK", "WORKSHOP", "PHYSICS LAB", "CHEMISTRY LAB", "PROGRAMMING LAB"] },
            { day: "DAY 5", classes: ["MATHS", "PHYSICS", "CHEMISTRY", "BREAK", "WORKSHOP", "PHYSICS LAB", "CHEMISTRY LAB", "PROGRAMMING LAB"] }
        ];
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }
    displaySchedule(document.getElementById("schedule"), false);
}

function displaySchedule(container, isEditable) {
    let scheduleHtml = "<table>";
    scheduleHtml += "<tr><th>Day</th><th>9:30-10:30</th><th>10:30-11:30</th><th>11:30-12:30</th><th>12:30-1:30</th><th>1:30-2:30</th><th>2:30-3:30</th><th>3:30-4:30</th><th>4:30-5:30</th></tr>";

    scheduleData.forEach(day => {
        scheduleHtml += `<tr><td>${day.day}</td>`;
        day.classes.forEach(className => {
            scheduleHtml += `<td>${className}</td>`;
        });
        scheduleHtml += "</tr>";
    });
    scheduleHtml += "</table>";

    if (isEditable) {
        scheduleHtml += generateModificationForm();
    }

    container.innerHTML = scheduleHtml;

    if (isEditable) {
        document.getElementById('modifyForm').addEventListener('submit', modifySchedule);
    }
}

function generateModificationForm() {
    let formHtml = "<h2>Modify Schedule</h2><form id='modifyForm'>";
    formHtml += "<label for='day'>Day:</label><select id='day'>";
    scheduleData.forEach((day, index) => {
        formHtml += `<option value='${index}'>${day.day}</option>`;
    });
    formHtml += "</select><br>";
    formHtml += "<label for='period'>Period (1-8):</label><input type='number' id='period' min='1' max='8' required><br>";
    formHtml += "<label for='class'>Class:</label><input type='text' id='class' required><br>";
    formHtml += "<input type='submit' value='Modify Class'></form>";
    return formHtml;
}

function modifySchedule(event) {
    event.preventDefault();
    const dayIndex = document.getElementById("day").value;
    const period = parseInt(document.getElementById("period").value, 10) - 1;
    const newClass = document.getElementById("class").value.trim();

    if (dayIndex !== undefined && period >= 0 && period < 8) {
        scheduleData[dayIndex].classes[period] = newClass;
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData)); 
        updateViews(); 
    } else {
        alert("Invalid input. Please check the day and period.");
    }
}

function updateViews() {
    displaySchedule(document.getElementById("schedule"), false); // Update user view
    displaySchedule(document.getElementById("scheduleAdmin"), true); // Update admin view
}

function login() {
    const password = document.getElementById("adminPassword").value;
    if (password === "adminPassword") {
        document.getElementById("userView").style.display = "none";
        document.getElementById("adminView").style.display = "block";
        updateViews(); // This will update the admin view with the modification form
    } else {
        alert("Incorrect Password");
    }
}

function logout() {
    document.getElementById("userView").style.display = "block";
    document.getElementById("adminView").style.display = "none";
    document.getElementById("adminPassword").value = ""; // Clear password field on logout
}

function showAdminLogin() {
    document.getElementById("adminView").style.display = "block";
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("adminPassword");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
