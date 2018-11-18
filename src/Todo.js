import React, { Component } from 'react';
import Counter from './Counter';
import Form from './Form';
import Title from './Title';
import List from './List';
import initialTasks from './data/tasks';
import { getMax } from './utils/data';

import './Todo.css';

class Todo extends Component {
  state = {
    tasks: initialTasks,
    currentInputValue: '',
  }

  changeInput = (evt) => {
    this.setState({
      currentInputValue: evt.target.value,
    });
  }

  addTask = (evt) => {
    const { currentInputValue } = this.state;
    const maxId = getMax(this.state.tasks);
    const newTask = {
      id: maxId + 1,
      label: currentInputValue,
      done: false,
    }

    this.setState({
      tasks: [...this.state.tasks, newTask],
      currentInputValue: '',
    })
  }

  toggleTask = id => () => {
    // 1. On génère un **nouveau** tableau de tâches, avec .map
    const editedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    // 2. On utilise ce nouveau tableau pour modifier le state de <Todo />
    this.setState({
      tasks: editedTasks,
    });
  }

  deleteTask = id => () => {
    const tasks = this.state.tasks.filter(task => task.id !== id);
    // this.setState({
    //   tasks: tasks,
    // });
    this.setState({ tasks });
  }

  favoriteTask = id => () => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        /* eslint-disable no-prototype-builtins */
        if (!task.hasOwnProperty('favorite')) {
          task.favorite = false;
        }
        task.favorite = !task.favorite;
      }
      return task;
    });
    this.setState({ tasks });
  }

  hideTask = id => () => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        /* eslint-disable no-prototype-builtins */
        if (!task.hasOwnProperty('hidden')) {
          task.hidden = false;
        }
        task.hidden = !task.hidden;
      }
      return task;
    });
    this.setState({ tasks });
  }

  render() {
    const { currentInputValue, tasks } = this.state;
    const tasksNotDone = tasks.filter(task => !task.done).length;
    const orderedTasks = [
      ...tasks.filter(t => !t.done && t.favorite),
      ...tasks.filter(t => !t.done && !t.favorite),
      ...tasks.filter(t => t.done && t.hidden),
      ...tasks.filter(t => t.done),
    ];
    const taskActions = {
      onToggleTask: this.toggleTask,
      onDeleteTask: this.deleteTask,
      onFavoriteTask: this.favoriteTask,
      onHideTask: this.hideTask,
    };

    return (
      <div className="container">
        <Title />
        <Form
          inputValue={currentInputValue}
          onAddTask={this.addTask}
          onInputChange={this.changeInput}
        />
        <Counter
          count={tasksNotDone}
        />
        <List
          tasks={orderedTasks}
          taskActions={taskActions}
        />
      </div>
    );
  }
}

export default Todo;
