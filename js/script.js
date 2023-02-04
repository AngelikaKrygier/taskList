{
    const tasks = [
        {},
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButton = document.querySelectorAll(".js-toggleDone");
        toggleDoneButton.forEach((toggleDone, index) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="taskslist__item"
            >
               <button class="tasksList__button tasksList__button--toogleDone js-toggleDone"> 
               ${task.done ? "✓" : ""}
               </button>
                <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}">
                ${task.content}
                </span>

                <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
             
            </li>
            `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};