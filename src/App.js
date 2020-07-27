import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './todos/TodoList';

const App = () => (

   <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
      </header>
      <TodoList/>
    </div>  
)

export default App;
