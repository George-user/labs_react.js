import React, { useState } from 'react';

// Компонент для формы добавления задач
const ToDoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Компонент для отображения списка задач
const ToDoItems = ({ tasks, onToggle, filter }) => {
  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.completed === (filter === 'completed'));

  return (
    <ul>
      {filteredTasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.text}</span>
        </li>
      ))}
    </ul>
  );
};

// Компонент ToDoList, содержащий ToDoForm и ToDoItems
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
 










class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state.props = {
      tasks: [],
      filter: 'all'
    };
  }

  addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    this.setState({ tasks: [...this.state.tasks, newTask] });
  };

  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    });
  };

  render() {
    const { tasks } = this.state;

  }
}





















  return (
    <div>
      <h1>To Do List</h1>
      <ToDoForm onAdd={addTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('uncompleted')}>Uncompleted</button>
      </div>
      <ToDoItems tasks={tasks} onToggle={toggleTask} filter={filter} />
    </div>
  );
};

export default ToDoList;
