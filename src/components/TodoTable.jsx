import TodoItem from './TodoItem';

export default function TodoTable({ TodoItems, DeleteItems, UpdateTodo }) {
  return (
    <div>
      {
        TodoItems && (
          TodoItems.map(Item => {
            return <TodoItem
              key={Item.createdAt}
              Items={TodoItems}
              Item={Item}
              Delete={DeleteItems}
              Update={UpdateTodo} />
          })
        )
      }
    </div>
  );
}