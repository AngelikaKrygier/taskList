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


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
                ${task.done ? "style=\"text-decoration:line-through\"" : ""}>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

    };

    const init = () => {
        render();


        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            };

            tasks.push({
                content: newTaskContent,
            });
            render();

        });

    };

    init();


}