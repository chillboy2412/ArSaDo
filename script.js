// ==================================================
//                     ArSaDo JS v2
//              Your Space to Get Things Done
// ==================================================


// ================= ELEMENTS =================

const clock = document.getElementById("clock");

const quoteEn = document.getElementById("quote-en");
const quoteId = document.getElementById("quote-id");

const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");

const addTaskButton = document.getElementById("add-task-button");
const taskModal = document.getElementById("task-modal");
const closeTaskModal = document.getElementById("close-task-modal");

const taskModalTitle = document.getElementById("task-modal-title");

const taskInput = document.getElementById("task-input");
const saveTaskButton = document.getElementById("save-task-button");

const themeButton = document.getElementById("theme-button");
const themeModal = document.getElementById("theme-modal");
const closeThemeModal = document.getElementById("close-theme-modal");

const colorOptions =
    document.querySelectorAll(".color-option");

const iconOptions =
    document.querySelectorAll(".icon-option");

const themeOptions =
    document.querySelectorAll(".theme-option");

const taskTypeOptions =
    document.querySelectorAll(".task-type-option");

const weekdayOptions =
    document.querySelectorAll(".weekday-option");

const dailySettings =
    document.getElementById("daily-settings");

const monthlySettings =
    document.getElementById("monthly-settings");

const yearlySettings =
    document.getElementById("yearly-settings");

const goalSettings =
    document.getElementById("goal-settings");

const taskTime =
    document.getElementById("task-time");

const monthStart =
    document.getElementById("month-start");

const monthEnd =
    document.getElementById("month-end");

const yearStart =
    document.getElementById("year-start");

const yearEnd =
    document.getElementById("year-end");

const goalDate =
    document.getElementById("goal-date");

const fontSelector =
    document.getElementById("font-selector");


// ================= DATA =================

let tasks =
    JSON.parse(
        localStorage.getItem("arsaDoTasks")
    ) || [];


let selectedColor = "default";

let selectedIcon = "-";

let selectedType = "daily";

let selectedDays = [];

let editingTaskId = null;


// ================= MOTIVATIONAL QUOTES =================

const quotes = [

    {
        en: "Small steps still count.",
        id: "Langkah kecil tetap berarti."
    },

    {
        en: "One task at a time.",
        id: "Satu tugas dalam satu waktu."
    },

    {
        en: "Progress, not perfection.",
        id: "Kemajuan, bukan kesempurnaan."
    },

    {
        en: "You can do more than you think.",
        id: "Kamu bisa melakukan lebih dari yang kamu kira."
    },

    {
        en: "Start where you are.",
        id: "Mulailah dari tempatmu berada."
    },

    {
        en: "Keep going, even slowly.",
        id: "Tetap berjalan, meskipun perlahan."
    },

    {
        en: "Today is another chance to grow.",
        id: "Hari ini adalah kesempatan lain untuk berkembang."
    },

    {
        en: "Make today count.",
        id: "Jadikan hari ini berarti."
    }

];


// ================= RANDOM QUOTE =================

function setRandomQuote() {

    const randomIndex =
        Math.floor(
            Math.random() * quotes.length
        );

    const quote =
        quotes[randomIndex];

    quoteEn.textContent =
        `"${quote.en}"`;

    quoteId.textContent =
        quote.id;
}


// ================= CLOCK =================

function updateClock() {

    const now = new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}`;
}


updateClock();

setInterval(
    updateClock,
    1000
);


// ================= TASK TYPE =================

function setTaskType(type) {

    selectedType = type;


    taskTypeOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.type === type
        );

    });


    dailySettings.hidden =
        type !== "daily";

    monthlySettings.hidden =
        type !== "monthly";

    yearlySettings.hidden =
        type !== "yearly";

    goalSettings.hidden =
        type !== "goal";
}


taskTypeOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            setTaskType(
                option.dataset.type
            );

        }
    );

});


// ================= WEEKDAYS =================

weekdayOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            const day =
                Number(
                    option.dataset.day
                );


            if (
                selectedDays.includes(day)
            ) {

                selectedDays =
                    selectedDays.filter(
                        item => item !== day
                    );

                option.classList.remove(
                    "active"
                );

            }

            else {

                selectedDays.push(day);

                selectedDays.sort(
                    (a, b) => a - b
                );

                option.classList.add(
                    "active"
                );

            }

        }
    );

});


// ================= TASK MODAL =================

function openTaskModal() {

    resetTaskForm();

    taskModal.classList.add(
        "active"
    );

    setTimeout(
        () => taskInput.focus(),
        50
    );
}


function closeTaskModalFunction() {

    taskModal.classList.remove(
        "active"
    );

    resetTaskForm();
}


// ================= RESET TASK FORM =================

function resetTaskForm() {

    taskInput.value = "";

    taskTime.value = "";

    monthStart.value = "";

    monthEnd.value = "";

    yearStart.value = "";

    yearEnd.value = "";

    goalDate.value = "";


    selectedColor = "default";

    selectedIcon = "-";

    selectedType = "daily";

    selectedDays = [];


    editingTaskId = null;


    taskModalTitle.textContent =
        "New Task";

    saveTaskButton.textContent =
        "Add Task";


    setTaskType("daily");

    resetOptions();

}


// ================= RESET OPTIONS =================

function resetOptions() {

    colorOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.color === "default"
        );

    });


    iconOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.icon === "-"
        );

    });


    weekdayOptions.forEach(option => {

        option.classList.remove(
            "active"
        );

    });

}


// ================= ADD TASK BUTTON =================

addTaskButton.addEventListener(
    "click",
    openTaskModal
);


closeTaskModal.addEventListener(
    "click",
    closeTaskModalFunction
);


// ================= COLOR SELECT =================

colorOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            selectedColor =
                option.dataset.color;


            colorOptions.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            option.classList.add(
                "active"
            );

        }
    );

});


// ================= ICON SELECT =================

iconOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            selectedIcon =
                option.dataset.icon;


            iconOptions.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            option.classList.add(
                "active"
            );

        }
    );

});


// ================= VALIDATE SCHEDULE =================

function validateSchedule() {

    if (selectedType === "daily") {

        if (selectedDays.length === 0) {

            alert(
                "Pilih minimal satu hari."
            );

            return false;
        }

    }


    if (selectedType === "monthly") {

        if (!monthStart.value) {

            alert(
                "Pilih bulan mulai."
            );

            return false;
        }


        if (!monthEnd.value) {

            monthEnd.value =
                monthStart.value;

        }


        if (
            monthEnd.value <
            monthStart.value
        ) {

            alert(
                "Bulan akhir tidak boleh sebelum bulan mulai."
            );

            return false;
        }

    }


    if (selectedType === "yearly") {

        if (!yearStart.value) {

            alert(
                "Masukkan tahun mulai."
            );

            return false;
        }


        if (!yearEnd.value) {

            yearEnd.value =
                yearStart.value;

        }


        if (
            Number(yearEnd.value) <
            Number(yearStart.value)
        ) {

            alert(
                "Tahun akhir tidak boleh sebelum tahun mulai."
            );

            return false;
        }

    }


    return true;
}


// ================= SAVE TASK =================

saveTaskButton.addEventListener(
    "click",
    saveTask
);


function saveTask() {

    const text =
        taskInput.value.trim();


    if (!text) {

        taskInput.focus();

        return;
    }


    if (!validateSchedule()) {
        return;
    }


    const schedule = {

        days:
            selectedType === "daily"
                ? [...selectedDays]
                : [],

        monthStart:
            selectedType === "monthly"
                ? monthStart.value
                : "",

        monthEnd:
            selectedType === "monthly"
                ? monthEnd.value
                : "",

        yearStart:
            selectedType === "yearly"
                ? Number(yearStart.value)
                : "",

        yearEnd:
            selectedType === "yearly"
                ? Number(yearEnd.value)
                : "",

        goalDate:
            selectedType === "goal"
                ? goalDate.value
                : "",

        time:
            taskTime.value || ""

    };


    // ================= EDIT =================

    if (editingTaskId !== null) {

        const task =
            tasks.find(
                item =>
                    item.id === editingTaskId
            );


        if (task) {

            task.text = text;

            task.type = selectedType;

            task.color = selectedColor;

            task.icon = selectedIcon;

            task.schedule = schedule;

        }

    }


    // ================= ADD =================

    else {

        const newTask = {

            id: Date.now(),

            text: text,

            completed: false,

            color: selectedColor,

            icon: selectedIcon,

            type: selectedType,

            schedule: schedule

        };


        tasks.push(
            newTask
        );

    }


    saveTasks();

    renderTasks();

    closeTaskModalFunction();

}


// ================= FORMAT MONTH =================

function formatMonth(value) {

    if (!value) return "";

    const parts =
        value.split("-");

    const year =
        Number(parts[0]);

    const month =
        Number(parts[1]);


    const names = [

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];


    return `${names[month - 1]} ${year}`;
}


// ================= FORMAT DATE =================

function formatDate(value) {

    if (!value) return "";

    const date =
        new Date(
            value + "T00:00:00"
        );


    return date.toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


// ================= SCHEDULE TEXT =================

function getScheduleText(task) {

    const schedule =
        task.schedule || {};


    let parts = [];


    if (task.type === "daily") {

        const dayNames = [
            "Sen",
            "Sel",
            "Rab",
            "Kam",
            "Jum",
            "Sab",
            "Min"
        ];


        const days =
            Array.isArray(schedule.days)
                ? schedule.days
                : [];


        if (days.length > 0) {

            parts.push(
                days
                    .map(
                        day =>
                            dayNames[day]
                    )
                    .join(" · ")
            );

        }

    }


    if (task.type === "monthly") {

        if (schedule.monthStart) {

            if (
                schedule.monthEnd &&
                schedule.monthEnd !==
                schedule.monthStart
            ) {

                parts.push(
                    `${formatMonth(schedule.monthStart)} – ${formatMonth(schedule.monthEnd)}`
                );

            }

            else {

                parts.push(
                    formatMonth(
                        schedule.monthStart
                    )
                );

            }

        }

    }


    if (task.type === "yearly") {

        if (schedule.yearStart) {

            if (
                schedule.yearEnd &&
                schedule.yearEnd !==
                schedule.yearStart
            ) {

                parts.push(
                    `${schedule.yearStart} – ${schedule.yearEnd}`
                );

            }

            else {

                parts.push(
                    String(
                        schedule.yearStart
                    )
                );

            }

        }

    }


    if (task.type === "goal") {

        if (schedule.goalDate) {

            parts.push(
                `Target ${formatDate(schedule.goalDate)}`
            );

        }

    }


    if (schedule.time) {

        parts.push(
            schedule.time
        );

    }


    return parts.join(" · ");
}


// ================= TYPE LABEL =================

function getTypeLabel(type) {

    const labels = {

        daily: "Daily",

        monthly: "Monthly",

        yearly: "Yearly",

        goal: "Goal"

    };


    return labels[type] ||
        "Task";
}


// ================= TEXT COLOR =================

function applyTaskColor(
    textElement,
    color
) {

    if (color === "blue") {

        textElement.style.color =
            "#3b82f6";

    }

    else if (color === "pink") {

        textElement.style.color =
            "#ec4899";

    }

    else {

        textElement.style.color =
            "var(--text)";

    }

}


// ================= RENDER TASKS =================

function renderTasks() {

    todoList.innerHTML = "";


    if (tasks.length === 0) {

        taskCount.textContent =
            "0 tasks";

        return;
    }


    tasks.forEach(task => {

        // Backward compatibility
        if (!task.type) {
            task.type = "daily";
        }

        if (!task.schedule) {
            task.schedule = {};
        }


        const taskElement =
            document.createElement(
                "div"
            );


        taskElement.className =
            "task-item";


        if (task.completed) {

            taskElement.classList.add(
                "completed"
            );

        }


        // ================= ICON =================

        const iconButton =
            document.createElement(
                "button"
            );


        iconButton.className =
            "task-icon";


        iconButton.textContent =
            task.completed
                ? "✓"
                : task.icon || "-";


        iconButton.setAttribute(
            "aria-label",
            "Selesaikan task"
        );


        iconButton.addEventListener(
            "click",
            () =>
                toggleTask(task.id)
        );


        // ================= CONTENT =================

        const content =
            document.createElement(
                "div"
            );


        content.className =
            "task-content";


        // TEXT

        const textElement =
            document.createElement(
                "span"
            );


        textElement.className =
            "task-text";


        textElement.textContent =
            task.text;


        applyTaskColor(
            textElement,
            task.color
        );


        // META

        const meta =
            document.createElement(
                "div"
            );


        meta.className =
            "task-meta";


        // BADGE

        const badge =
            document.createElement(
                "span"
            );


        badge.className =
            "task-badge";


        badge.textContent =
            getTypeLabel(
                task.type
            );


        // SCHEDULE

        const schedule =
            document.createElement(
                "span"
            );


        schedule.className =
            "task-schedule";


        schedule.textContent =
            getScheduleText(
                task
            );


        meta.appendChild(
            badge
        );


        if (schedule.textContent) {

            meta.appendChild(
                schedule
            );

        }


        content.appendChild(
            textElement
        );

        content.appendChild(
            meta
        );


        // ================= ACTIONS =================

        const actions =
            document.createElement(
                "div"
            );


        actions.className =
            "task-actions";


        const editButton =
            document.createElement(
                "button"
            );


        editButton.className =
            "task-edit";


        editButton.textContent =
            "✎";


        editButton.setAttribute(
            "aria-label",
            "Edit task"
        );


        editButton.addEventListener(
            "click",
            () =>
                editTask(task.id)
        );


        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.className =
            "task-delete";


        deleteButton.textContent =
            "×";


        deleteButton.setAttribute(
            "aria-label",
            "Hapus task"
        );


        deleteButton.addEventListener(
            "click",
            () =>
                deleteTask(task.id)
        );


        actions.appendChild(
            editButton
        );

        actions.appendChild(
            deleteButton
        );


        // ================= FINAL STRUCTURE =================

        taskElement.appendChild(
            iconButton
        );

        taskElement.appendChild(
            content
        );

        taskElement.appendChild(
            actions
        );


        todoList.appendChild(
            taskElement
        );

    });


    updateTaskCount();

}


// ================= CHECK TASK =================

function toggleTask(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();

    renderTasks();

}


// ================= EDIT TASK =================

function editTask(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    editingTaskId = id;


    taskInput.value =
        task.text;


    selectedColor =
        task.color || "default";


    selectedIcon =
        task.icon || "-";


    selectedType =
        task.type || "daily";


    const schedule =
        task.schedule || {};


    selectedDays =
        Array.isArray(
            schedule.days
        )
            ? [...schedule.days]
            : [];


    taskTime.value =
        schedule.time || "";


    monthStart.value =
        schedule.monthStart || "";


    monthEnd.value =
        schedule.monthEnd || "";


    yearStart.value =
        schedule.yearStart || "";


    yearEnd.value =
        schedule.yearEnd || "";


    goalDate.value =
        schedule.goalDate || "";


    taskModalTitle.textContent =
        "Edit Task";


    saveTaskButton.textContent =
        "Save Changes";


    setTaskType(
        selectedType
    );


    resetOptions();


    colorOptions.forEach(option => {

        if (
            option.dataset.color ===
            selectedColor
        ) {

            option.classList.add(
                "active"
            );

        }

    });


    iconOptions.forEach(option => {

        if (
            option.dataset.icon ===
            selectedIcon
        ) {

            option.classList.add(
                "active"
            );

        }

    });


    weekdayOptions.forEach(option => {

        if (
            selectedDays.includes(
                Number(
                    option.dataset.day
                )
            )
        ) {

            option.classList.add(
                "active"
            );

        }

    });


    taskModal.classList.add(
        "active"
    );

}


// ================= DELETE TASK =================

function deleteTask(id) {

    const confirmed =
        confirm(
            "Hapus task ini?"
        );


    if (!confirmed) return;


    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );


    saveTasks();

    renderTasks();

}


// ================= TASK COUNT =================

function updateTaskCount() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    if (total === 0) {

        taskCount.textContent =
            "0 tasks";

        return;

    }


    taskCount.textContent =
        `${completed}/${total} completed`;

}


// ================= LOCAL STORAGE =================

function saveTasks() {

    localStorage.setItem(
        "arsaDoTasks",
        JSON.stringify(tasks)
    );

}


// ================= THEME =================

function applyTheme(theme) {

    document.body.dataset.theme =
        theme;


    localStorage.setItem(
        "arsaDoTheme",
        theme
    );

}


const savedTheme =
    localStorage.getItem(
        "arsaDoTheme"
    );


applyTheme(
    savedTheme || "light"
);


// ================= THEME MODAL =================

themeButton.addEventListener(
    "click",
    () => {

        themeModal.classList.add(
            "active"
        );

    }
);


closeThemeModal.addEventListener(
    "click",
    () => {

        themeModal.classList.remove(
            "active"
        );

    }
);


// ================= SELECT THEME =================

themeOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            const theme =
                option.dataset.theme;


            applyTheme(
                theme
            );

        }
    );

});


// ================= FONT =================

function applyFont(font) {

    document.body.style.fontFamily =
        `'${font}', sans-serif`;


    localStorage.setItem(
        "arsaDoFont",
        font
    );

}


const savedFont =
    localStorage.getItem(
        "arsaDoFont"
    );


if (savedFont) {

    fontSelector.value =
        savedFont;

    applyFont(
        savedFont
    );

}


fontSelector.addEventListener(
    "change",
    () => {

        applyFont(
            fontSelector.value
        );

    }
);


// ================= CLOSE MODALS =================

taskModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            taskModal
        ) {

            closeTaskModalFunction();

        }

    }
);


themeModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            themeModal
        ) {

            themeModal.classList.remove(
                "active"
            );

        }

    }
);


// ================= ENTER TO SAVE =================

taskInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            saveTask();

        }

    }
);


// ================= START =================

setRandomQuote();

renderTasks();

resetOptions();