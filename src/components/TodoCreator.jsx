import { useState } from 'react';
import Alert from '../lib/Alert'
import '../css/TodoCreator.css';

export default function TodoCreator({ CreateTodo }) {
  const [todoContent, setTodoContent] = useState('');

  const handleEvent = (e) => {
    e.preventDefault();
    if (todoContent.length === 0) {
      Alert('No puedes ingresar campos vacios!');
      return;
    }

    CreateTodo({
      createdAt: new Date().getTime(),
      content: todoContent,
      subItems: []
    });

    setTodoContent('');
  }

  return (
    <div className="todo-creator">
      <form onSubmit={handleEvent}>
        <input
          type="text"
          placeholder="Ingresa la tarea por realizar."
          aria-label="Crear tarea"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)} />
      </form>
    </div>
  );
}