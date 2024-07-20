// Write your code here
import {useState} from 'react'

import './index.css'

const TodoItem = props => {
  const {
    todosList,
    todoItem,
    deleteTodoList,
    editTodoItem,
    saveTodoItem,
    onClickCheckboxInput,
  } = props

  const {title, isEdited, isChecked, id} = todoItem

  const [editedTitleInput, setEditedTitleInput] = useState(title)

  const onChangeTitleInput = event => {
    setEditedTitleInput(event.target.value)
  }

  const onClickDelete = () => {
    deleteTodoList(id)
  }

  const onClickEditBtn = () => {
    editTodoItem(id)
  }

  const onClickSaveBtn = () => {
    if (editedTitleInput !== '') {
      saveTodoItem(id, editedTitleInput)
    }
  }

  const onClickCheckbox = () => {
    onClickCheckboxInput(id)
  }

  return (
    <li className="list-item-card">
      {isEdited ? (
        <>
          <div className="checkbox-title-card">
            <input
              type="checkbox"
              className="checkbox-input"
              onClick={onClickCheckbox}
            />
            <p
              style={{textDecoration: isChecked ? 'line-through' : 'none'}}
              className="subheading"
            >
              {title}
            </p>
          </div>
          <div className="item-button-card">
            <button
              type="button"
              className="edit-button button"
              onClick={onClickEditBtn}
            >
              Edit
            </button>
            <button type="button" className="button" onClick={onClickDelete}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            value={editedTitleInput}
            onChange={onChangeTitleInput}
            type="text"
            placeholder="Edit Title"
            className="edit-input"
          />
          <button
            onClick={onClickSaveBtn}
            type="button"
            className="save-button button"
          >
            Save
          </button>
        </>
      )}
    </li>
  )
}

export default TodoItem
