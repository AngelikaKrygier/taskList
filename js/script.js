{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleEvents = () => {
        const toggleDoneButton = document.querySelectorAll(".js-toggleDone");

        toggleDoneButton.forEach((toggleDone, index) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };


    const finishAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task, done: true,
        }));
        render();
    };


    const toggleViewDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskslist__item ${task.done && hideDoneTasks ? "tasksList__item--hidden" : ""} js-taskList">
           <button class="tasksList__button tasksList__button--toogleDone js-toggleDone"> 
                ${task.done ? "✓" : ""} 
           </button>
           <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}">
                 ${task.content}
            </span>
            <button class="tasksList__button tasksList__button--remove js-remove">
            🗑
            </button>
        </li>
        `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    };


    const renderButton = () => {
        const tasksActionButtons = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            tasksActionButtons.innerHTML = "";
            return;
        } else {
            tasksActionButtons.innerHTML = `
                <button class="section__button js-hideComplitedTasks">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
                <button class="section__button js-finishAllTasksButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
                 </button >  `
        };
    };


    const bindButtonsEvents = () => {
        const finishAllTasksButton = document.querySelector(".js-finishAllTasksButton")

        if (finishAllTasksButton) {
            finishAllTasksButton.addEventListener("click", finishAllTasksDone)
        };


        const toggleViewDoneTasksButton = document.querySelector(".js-hideComplitedTasks")
        if (toggleViewDoneTasksButton) {
            toggleViewDoneTasksButton.addEventListener("click", toggleViewDoneTasks)
        }
    };


    const render = () => {
        renderTask();
        renderButton();

        bindEvents();
        bindToggleEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();

    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};