const store = {
    todos: [
        {
            "id": "1",
            "title": "Complete Task 1",
            "completed": false,
        },
        {
            "id": "2",
            "title": "Complete Task 2",
            "completed": true,
        },
        {
            "id": "3",
            "title": "Complete Task 3",
            "completed": false,
        }
    ],
    tasks: [
        {
            "id": "1",
            "title": "My Task 1",
            "completed": false,
        },
    ]
}

const storeHandler = {
    // traps
    get(target, property) {
        return target[property]
    },
    set(target, property, value) {
        target[property] = value;
        if (property == "todos") {
            window.dispatchEvent(new Event("todoschange"));
        }
        localStorage.setItem("store", JSON.stringify(store));
        return true;
    }
}

const storeProxy = new Proxy(store, storeHandler);

const addTodo = (newTodo) => {
    storeProxy.todos = [...storeProxy.todos, newTodo];
}

const deleteTodo = (id) => {
    storeProxy.todos = storeProxy.todos.filter((todo) => todo.id !== id)
}

const toggleCompleted = (id, completed) => {
    storeProxy.todos = storeProxy.todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: completed };
        } else {
            return todo;
        }
    })
}

export { addTodo, deleteTodo, toggleCompleted };
export default storeProxy;