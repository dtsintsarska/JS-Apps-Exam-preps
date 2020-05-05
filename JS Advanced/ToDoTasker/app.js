function solve() {


    let taskInput = document.querySelector("#task");
    let descriptionInput = document.querySelector("#description");
    let dateInput = document.querySelector("#date");

    let openSectionDiv = document.querySelector("body > main > div > section:nth-child(2) > div:nth-child(2)");
    let inProgressDiv = document.querySelector("#in-progress");
    let completeDiv = document.querySelector("body > main > div > section:nth-child(4) > div:nth-child(2)");

    let addButton = document.querySelector("#add")

    addButton.addEventListener('click', (e) => {
        e.preventDefault()
        addTasks(e)
    })


    function addTasks(e) {

        let task = taskInput.value;
        let description = descriptionInput.value;
        let date = dateInput.value;

        if (task !== '' && description !== '' && date !== '') {

            let article = document.createElement('article');

            let h3 = document.createElement('h3')
            h3.textContent = task;
            article.appendChild(h3)

            let p1 = document.createElement('p')
            p1.textContent = `Description: ${description}`
            article.appendChild(p1)

            let p2 = document.createElement('p');
            p2.textContent = `Due Date: ${date}`
            article.appendChild(p2)

            let divButtons = document.createElement('div');
            divButtons.className = 'flex'

            let startButton = document.createElement('button')
            startButton.className = 'green'
            startButton.textContent = 'Start'
            startButton.addEventListener('click', (ev) => {
                startTask(ev)
            })

            divButtons.appendChild(startButton)

            let deleteButton = document.createElement('button')
            deleteButton.className = 'red'
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', (ev) => {
                deleteTask(ev)
            })

            divButtons.appendChild(deleteButton)
            article.appendChild(divButtons)

            openSectionDiv.appendChild(article)
        }
    }

    function startTask(ev) {

        let article = ev.target.parentNode.parentNode

        console.log(article)

        article.querySelector('.green').remove()
        let divButtons = article.querySelector('div')

        let finishButton = document.createElement('button')
        finishButton.className = 'orange'
        finishButton.textContent = 'Finish'
        finishButton.addEventListener('click', (e) => {
            finishTask(e)
        })
        divButtons.appendChild(finishButton)

        inProgressDiv.appendChild(article)

    }

    function deleteTask(ev) {

        let article = ev.target.parentNode.parentNode
        article.remove()

    }

    function finishTask(e) {

        let task = e.target.parentNode.parentNode

        task.querySelector('div').remove()

        completeDiv.appendChild(task)

    }
}