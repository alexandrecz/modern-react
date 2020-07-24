import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';


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