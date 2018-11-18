import React from 'react';
import PropTypes from 'prop-types';

import TrashIcon from 'react-icons/lib/fa/trash-o';
import StarIcon from 'react-icons/lib/fa/star-o';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';
import classNames from 'classnames';

import './Task.css';

const Task = ({
  id,
  label,
  done,
  favorite,
  hidden,
  onToggleTask,
  onDeleteTask,
  onFavoriteTask,
  onHideTask,
}) => {
  const currentClassNames = classNames(
    'todo-task',
    {
      'todo-task--done': done,
      'todo-task--favorite': favorite,
      'todo-task--hidden': hidden,
    },
  );

  return (
    <li
      key={id}
      className={currentClassNames}
    >
      <input
        type="checkbox"
        checked={done}
        onChange={onToggleTask(id)}
      />
      <p className="task-label">{label}</p>
      <TrashIcon
        className="task-delete"
        onClick={onDeleteTask(id)}
      />
      <StarIcon
        className="task-favorite"
        onClick={onFavoriteTask(id)}
      />
      <FaEyeSlash
        className="task-hidden"
        onClick={onHideTask(id)}
      />
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onFavoriteTask: PropTypes.func.isRequired,
  onHideTask: PropTypes.func.isRequired,
};

export default Task;