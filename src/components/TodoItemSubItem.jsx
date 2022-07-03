import { Component } from 'react';
import { getDifference } from './TodoItem';
import { motion } from "framer-motion"

export default class TodoItemSubItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: this.props.Item,
      SubItem: this.props.SubItem,
      DeleteSubItem: this.props.DeleteSubItem,
      TimeDifference: getDifference('Actualizado', this.props.SubItem.createdAt)
    };
  }

  deleteSubItem = (e) => {
    if(e.target.checked)
      setTimeout(() => this.state.DeleteSubItem(this.state.SubItem), 600);
  }

  render() {
    return (
      <motion.div className="sub-items"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5
        }}>
        <label className="checkbox" htmlFor={`item-${this.state.SubItem.createdAt}`}>
          <input id={`item-${this.state.SubItem.createdAt}`} className="checkbox__input" type="checkbox" onChange={this.deleteSubItem} />
          <svg className="checkbox__check" width="24" height="24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </label>
        <span>{this.state.SubItem.content}</span>
        <p>{this.state.TimeDifference}</p>
      </motion.div>
    );
  }
}