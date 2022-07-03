import TodoItemSubItem from './TodoItemSubItem';

export default function TodoItemTable({ Item, TodoItemSubItems, DeleteSubItem }) {
  return (
    <div>
      {
        TodoItemSubItems && (
          TodoItemSubItems.map(subItem => {
            return (
              <TodoItemSubItem
                key={subItem.createdAt}
                Item={Item}
                SubItem={subItem}
                DeleteSubItem={DeleteSubItem} />
            )
          })
        )
      }
    </div>
  );
}