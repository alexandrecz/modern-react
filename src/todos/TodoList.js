import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import style from 'styled-components';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { getTodos, getTodosLoading } from './selectors';
import { loadTodos, removeTodoRequest, updatedTodoRequest } from './thunks';


const ListWrapper = style.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ todos = [ ], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    
    useEffect(() => {
        startLoadingTodos();
    }, [startLoadingTodos])
    
    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <ListWrapper>
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem 
                key={todo.id} 
                todo={todo} 
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}
            />)}
        </ListWrapper>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(updatedTodoRequest(id)),    
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);