import deleted from '../assets/img/delete.svg';
import '../css/TodoHeader.css';

export default function TodoHeader({ Items, DeleteAll }) {
  const sizeFromTodo = () => {
    let sizeTodos = Items.length;
    let sizeSubTodos = 0;
    for (let index = 0; index < Items.length; index++) sizeSubTodos += Items[index].subItems.length;
    if (sizeTodos === 0 && sizeSubTodos === 0)
      return 'No tienes tareas actualmente!'
    else
      return `${sizeTodos} tareas por terminar con ${sizeSubTodos} subtareas.`;
  }

  return (
    <div className="header">
      <p className="header-title">{sizeFromTodo()}</p>
      <div className='header-items'>
        <div className="header-item">
          <img src={deleted} alt="delete" onClick={() => DeleteAll()} />
        </div>
      </div>
    </div>
  );
}