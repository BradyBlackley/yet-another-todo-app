import React, {useState} from 'react';
import TodoForm from './TodoForm';
import TodoDelete from './TodoDelete';
import TodoEdit from './TodoEdit';

function TodoList() {

    const View = {
        TODOS: 0,
        TODO_ADD_FORM: 1,
        TODO_EDIT_FORM: 2,
        TODO_DELETE_FORM: 3
    }

    const [todoItems, setTodoItems] = useState([]);
    const [currentTodo, setCurrentTodo] = useState();
    const [currentView, setCurrentView] = useState(View.TODOS);

    const addClick = () => {
        setCurrentTodo();
        setCurrentView(View.TODO_ADD_FORM);
    };

    const editClick = evt => {
        const todo = todoItems.find(t => t.id === parseInt(evt.target.value, 10));
        setCurrentTodo(todo);
        setCurrentView(View.TODO_EDIT_FORM);
    }

    const saveTodo = todo => {

        if(todo.id) { //edit
            const newTodos = [...todoItems];
            newTodos[todoItems.indexOf(currentTodo)] = todo;
            setTodoItems(newTodos);
        } else { //add
            if(todo.text !== ""){
                todo.id = todoItems.length + 1;
                setTodoItems([...todoItems, todo]);
            }
        }
        setCurrentView("todos");
    };

    const deleteClick = evt => {
        const todo = todoItems.find(t => t.id === parseInt(evt.target.value, 10));
        setCurrentTodo(todo);
        setCurrentView(View.TODO_DELETE_FORM);
    }

    const deleteTodo = (todoId) => {
        const todo = todoItems.find(t => t.id === todoId);
        todoItems.pop(todo);
        setCurrentView(View.TODOS);
    }

    if(currentView === View.TODO_ADD_FORM) {
        return (
            <TodoForm saveTodo={saveTodo} currentTodo={currentTodo}/>
        );
    } else if (currentView === View.TODO_DELETE_FORM) {
        return (
            <TodoDelete saveTodo={saveTodo} currentTodo={currentTodo} deleteTodo={deleteTodo}/>
        );
    } else if (currentView === View.TODO_EDIT_FORM) {
        return (
            <TodoEdit saveTodo={saveTodo} currentTodo={currentTodo}/>
        );
    }
    return (
        <>
        <div className="row">
            <div className="col">
                <h1>Todo App</h1>
            </div>
            <div className="col">
                <button className="btn btn-primary" onClick={addClick}>Add</button>
            </div>
            <div className="row">
                <ul className="list-group">
                    {todoItems.map(i => <li key={i.id} className="list-group-item">{i.text}
                    <button className="btn btn-secondary ms-2 me-2" value={i.id} onClick={editClick}>Edit
                    </button><button className="btn btn-danger me-2" onClick={deleteClick}
                     value={i.id}>Delete</button></li>)}
                </ul>
            </div>
            
        </div>
        </>
    );
}

export default TodoList;