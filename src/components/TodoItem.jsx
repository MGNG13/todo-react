import { Component } from 'react';
import TodoItemCreator from './TodoItemCreator';
import TodoItemTable from './TodoItemTable';
import { ADD, DELETE, playAudio } from '../lib/AudioPlayer'
import { motion } from "framer-motion"
import '../css/TodoItem.css';

const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

const getDifference = (textToShow, dateInSeconds) => {
  const now = new Date();
  const lastDate = new Date(dateInSeconds);

  if (getDayOfYear(lastDate) === getDayOfYear(now)) {
    const seconds = Math.abs(Math.floor((lastDate.getTime() - now.getTime()) / 1000));
    const minutes = Math.abs(Math.floor(seconds / 60));
    const hours = Math.abs(Math.floor(seconds / 3600));

    return `${textToShow} hace ${(hours >= 1) ? `${hours} horas` : ''}${(minutes <= 59) ? (minutes > 1) ? `${hours >= 1 ? ', ' : ''}${minutes} minutos` : 'un momento' : ''}.`;
  } else
    return `${textToShow} hace ${Math.abs(getDayOfYear(now) - getDayOfYear(lastDate))} día.`;
}

export default class TodoItem extends Component {
  updateComponentInterval = 0;
  
  constructor(props) {
    super(props);
    this.state = {
      Items: this.props.Items,
      Item: this.props.Item,
      Delete: this.props.Delete,
      Update: this.props.Update,
      TimeDifference: getDifference('Creado', this.props.Item.createdAt)
    };
  }

  componentDidMount() {
    this.updateComponentInterval = setInterval(() => {
      this.setState({ TimeDifference: getDifference('Creado', this.state.Item.createdAt) })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateComponentInterval);
  }

  handleEventDelete = (e) => {
    if (e.target.checked)
      setTimeout(() => this.state.Delete(this.state.Item), 600);
  }

  addSubItem = (subItem) => {
    let newTodoItem = this.state.Item;
    newTodoItem.subItems = [...this.state.Item.subItems, { ...subItem }];
    this.state.Update(this.state.Item, newTodoItem);
    playAudio(ADD);
  }

  deleteSubItem = (subItem) => {
    let newTodoItem = this.state.Item;
    let subItems = [...this.state.Item.subItems];
    let deletedSubItem = false;
    
    for (let i=0; i<subItems.length; i++)
      if(subItem.createdAt === subItems[i].createdAt && subItem.content === subItems[i].content && !deletedSubItem) {
        subItems.splice(i, 1);
        deletedSubItem = true;
        newTodoItem.subItems = subItems;
        break;
      }

    this.state.Update(this.state.Item, newTodoItem);
    playAudio(DELETE);
  }

  render() {
    return (
      <motion.div className="todo-item-parent"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20
        }}>
        <div className="todo-item">
          <label htmlFor={`item-${this.state.Item.createdAt}`}>
            <div className="container">
              <label className="checkbox" htmlFor={`item-${this.state.Item.createdAt}`}>
                <input id={`item-${this.state.Item.createdAt}`} className="checkbox__input" type="checkbox" onChange={this.handleEventDelete} />
                <svg className="checkbox__check" width="24" height="24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </label>
              <span>{this.state.Item.content}</span>
              <p>{this.state.TimeDifference}</p>
            </div>
          </label>
          <div className="creator">
            <TodoItemCreator
              AddSubItem={this.addSubItem}
              Item={this.state.Item} />
            <TodoItemTable
              Item={this.state.Item}
              DeleteSubItem={this.deleteSubItem}
              TodoItemSubItems={this.state.Item.subItems} />
          </div>
        </div>
      </motion.div>
    );
  }
}

export { getDifference };