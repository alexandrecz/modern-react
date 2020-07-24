import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo } from './actions';


export const loadTodos = () => async (dispatch, getState) =>{
    
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));    
    } catch (error) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(error)); 
    }    
};

export const displayAlert = text => () =>{
    alert(text);
};


export const addTodoRequest = text => async dispatch =>{
    
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
    
        const todo = await response.json();
        dispatch(createTodo(todo));    
    } catch (error) {        
        dispatch(displayAlert(error)); 
    }
};