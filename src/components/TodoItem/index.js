// Write your code here
import './index.css'

const TodoItem = props => {
  const {todoItem, deleteTodoList} = props
  const {title, id} = todoItem
  const onClickDelete = () => {
    deleteTodoList(id)
  }

  return (
    <li className="list-item-card">
      <p className="subheading">{title}</p>
      <button type="button" className="button" onClick={onClickDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
