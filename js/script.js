{
    const tasks = [
        {
            content: "Wypić kawę",
            done: true
        },
        {
            content: "Zrobić prace domową z modułu 6",
            done: false
        },
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



    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
                ${task.done ? "style=\"text-decoration:line-through\"" : ""}
                >
                <button class="js-done">zrobione?</button>
                <button class="js-remove">usuń zadanie</button>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButton = document.querySelectorAll(".js-done");
        toggleDoneButton.forEach((toggleDone, index) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });



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