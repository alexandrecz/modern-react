import { 
    createTodo,
    removeTodo,
    markTodoAsCompleted,
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,    
 } from './actions';


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

export const removeTodoRequest = id => async dispatch =>{
    
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete',            
        });
    
        const removedTodo = await response.json();

        dispatch(removeTodo(removedTodo));    

    } catch (error) {        
        dispatch(displayAlert(error)); 
    }
};


export const updatedTodoRequest = id => async dispatch =>{
    
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post',            
        });
    
        const completedTodo = await response.json();

        dispatch(markTodoAsCompleted(completedTodo));    

    } catch (error) {        
        dispatch(displayAlert(error)); 
    }
};

export const displayAlert = text => () =>{
    alert(text);
};