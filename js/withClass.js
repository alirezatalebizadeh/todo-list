let $ = document
let todosArray = []
class todo {
    constructor(titleTodo, completed) {
        this.id = todosArray.length + 1
        this.titleTodo = titleTodo
        this.completed = completed
    }
}


class createTodo {
    constructor(containerBox) {
        this.container = containerBox
        this.inputElem = $.querySelector('.form-control')
        this.addButton = $.querySelector('#addButton')
        this.clearButton = $.querySelector('#clearButton')
        this.todoContainer = $.querySelector('#todoList')
        this.removeBtn = $.querySelector('.btn-danger')

        this.render()

    }


    render() {

        window.addEventListener('load', () => {
            this.getDataFromLocalStorage()
        })

        this.todoContainer.addEventListener('click', (event) => {
            this.editTodo(event)
        })

        this.todoContainer.addEventListener('click', (event) => {
            this.removeTodo(event)
        })

        this.addButton.addEventListener('click', () => {
            this.createTodo()
        })

        this.clearButton.addEventListener('click', () => {
            this.reset()
        })

        this.inputElem.addEventListener('keydown', (event) => {
            this.createTodoWithInput(event)
        })
    }


    createTodo() {

        let valueTodo = this.inputElem.value;
        if (valueTodo) {
            // let newTodo = {
            //     id: todosArray.length + 1,
            //     titleTodo: valueTodo,
            //     completed: false
            // }
            this.inputElem.value = ''
            todosArray.push(new todo(valueTodo, false))
            this.setLocalStorage(todosArray)
            this.generatorTodo(todosArray)
        } else {
            alert('لطفا کار بعدی ای که قصد انجام ان را دارید انجام دهید تایپ کنید')
        }

    }

    createTodoWithInput(event) {
        if (event.keyCode === 13) {
            this.createTodo()
        }
    }


    reset() {
        this.inputElem.value = ''
        this.todoContainer.innerHTML = ''
        todosArray = []
        this.setLocalStorage(todosArray)
    }

    setLocalStorage(todosArray) {
        localStorage.setItem('todos', JSON.stringify(todosArray))
    }


    generatorTodo(todosArray) {

        let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn

        this.todoContainer.innerHTML = ''
        todosArray.forEach(todo => {
            newTodoLiElem = $.createElement('li')
            newTodoLiElem.className = 'completed well'

            newTodoLabalElem = $.createElement('label')
            newTodoLabalElem.innerHTML = todo.titleTodo

            newTodoCompleteBtn = $.createElement('button')
            newTodoCompleteBtn.className = 'btn btn-success'
            newTodoCompleteBtn.innerHTML = 'انجام نشده'

            newTodoDeleteBtn = $.createElement('button')
            newTodoDeleteBtn.className = 'btn btn-danger'
            newTodoDeleteBtn.innerHTML = 'حذف'

            if (todo.completed) {
                newTodoLiElem.className = 'uncompleted well'
                newTodoCompleteBtn.innerHTML = 'انجام شده'
                newTodoCompleteBtn.style.backgroundColor = 'rgb(240,0,0,.8)'
            }

            newTodoLiElem.append(newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn)

            this.todoContainer.append(newTodoLiElem)
        })
    }

    getDataFromLocalStorage() {
        let dataLocalStorage = JSON.parse((localStorage.getItem('todos')))

        if (dataLocalStorage) {
            todosArray = dataLocalStorage
        } else {
            todosArray = []
        }
        this.generatorTodo(todosArray)

    }


    removeTodo(event) {
        let titleItemInDom = event.target.previousElementSibling.previousElementSibling.innerHTML
        let dataLocalStorage = JSON.parse(localStorage.getItem('todos'))
        todosArray = dataLocalStorage

        let todoIndex = todosArray.findIndex(todo => {
            if (todo.titleTodo === titleItemInDom) {
                return todo
            }
        })
        todosArray.splice(todoIndex, 1)
        this.setLocalStorage(todosArray)
        this.generatorTodo(todosArray)

    }

    editTodo(event) {
        let titleItemInDom = event.target.previousElementSibling.innerHTML
        console.log(titleItemInDom);

        let dataLocalStorage = JSON.parse(localStorage.getItem('todos'))
        todosArray = dataLocalStorage
        todosArray.forEach(todo => {
            if (todo.titleTodo === titleItemInDom) {
                todo.completed = !todo.completed
            }
        })
        this.setLocalStorage(todosArray)
        this.generatorTodo(todosArray)
    }

}


new createTodo()