import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED } from "./actions";

export const todos = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo = {
                id: new Date().getTime(),
                text,
                isCompleted: false,
            };
            return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter(todo => todo.text !== text);
        } 
        case MARK_TODO_AS_COMPLETED: {
            const { text } = payload;
            return state.map(todo => {
                const flag = todo.isCompleted;
                if(todo.text === text) {
                    return { ...todo, isCompleted: !flag}
                }
                return todo;
            });
        }    
        default:
            return state;
    }
}