import { Component } from 'react';
import Alert from '../lib/Alert';

class TodoItemCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: this.props.Item,
      AddSubItem: this.props.AddSubItem,
      inputValue: ''
    };
  }

  AddSubItem = (e) => {
    e.preventDefault();
    if (this.state.inputValue.length === 0) {
      Alert('No puedes ingresar campos vacios!');
      return;
    }

    this.state.AddSubItem({
      createdAt: new Date().getTime(),
      content: this.state.inputValue
    });

    this.setState({ inputValue: '' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.AddSubItem}>
          <input
            type="text"
            placeholder="Ingresa la sub-tarea por anexar."
            aria-label="Crear tarea"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })} />
        </form>
      </div>
    );
  }
}

export default TodoItemCreator;