import { useState, useEffect } from 'react';
import TodoHeader from './components/TodoHeader'
import TodoCreator from './components/TodoCreator';
import TodoTable from './components/TodoTable';
import { ADD, DELETE, DELETEALL, playAudio } from './lib/AudioPlayer';

function App({ ReadyListener, TodoItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(items));
  }, [items]);

  ReadyListener.addEventListener('finishedSplash', () => 
    setItems(TodoItems ? JSON.parse(TodoItems) : [])
  );

  const createNewTodo = (newTodo) => {
    setItems([...items, { ...newTodo }]);
    playAudio(ADD);
  }

  const updateTodo = (oldTodo, newTodoItem) => {
    let newTodo = [...items];
    const index = newTodo.indexOf(oldTodo);
    if (index !== -1) {
      newTodo.splice(index, 1, newTodoItem);
      setItems(newTodo);
    }
  }

  const deleteTodo = (todo) => {
    let newTodo = [...items];
    const index = newTodo.indexOf(todo);
    if (index !== -1) {
      newTodo.splice(index, 1);
      setItems(newTodo);
      playAudio(DELETE);
    }
  }

  const deleteAll = () => {
    setItems([]);
    playAudio(DELETEALL);
  }

  return (
      <>
        <TodoHeader
          Items={items}
          DeleteAll={deleteAll} />
        <div className='App'>
          <TodoCreator
            CreateTodo={createNewTodo} />
          <TodoTable
            TodoItems={items}
            DeleteItems={deleteTodo}
            UpdateTodo={updateTodo} />
        </div>
      </>
    );
}

export default App;