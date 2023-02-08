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

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskslist__item js-taskList">
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


    const renderButton = () => { };

    const bindButtonsEvents = () => { };

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