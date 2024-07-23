import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isEdited: true,
    isChecked: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isEdited: true,
    isChecked: false,
  },
]

class SimpleTodos extends Component {
  state = {todosList: initialTodosList, userText: ''}

  deleteList = uniqueNo => {
    const {todosList} = this.state
    const removedList = todosList.filter(
      eachObject => eachObject.id !== uniqueNo,
    )
    this.setState({todosList: removedList})
  }

  onChangeUserText = event => {
    this.setState({userText: event.target.value})
  }

  isDigit = value =>
    typeof value === 'string' &&
    !Number.isNaN(parseInt(value)) &&
    parseInt(value).toString() === value

  onClickAddBtn = () => {
    const {userText} = this.state
    if (userText !== '') {
      const userTextList = userText.split(' ')
      const findLastItem = userTextList[userTextList.length - 1]
      const findIsDigitOrNot = this.isDigit(findLastItem)

      if (findIsDigitOrNot && userTextList.length > 1) {
        const newUserText = userTextList
          .slice(0, userTextList.length - 1)
          .join(' ')
        this.setState(prevState => {
          const newTodos = Array.from({length: parseInt(findLastItem)}, () => ({
            id: uuidv4(),
            title: newUserText,
            isEdited: true,
            isChecked: false,
          }))
          return {
            todosList: [...prevState.todosList, ...newTodos],
            userText: '',
          }
        })
      } else {
        this.setState(prevState => ({
          todosList: [
            ...prevState.todosList,
            {id: uuidv4(), title: userText, isEdited: true, isChecked: false},
          ],
          userText: '',
        }))
      }
    }
  }

  onClickEditBtn = editId => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(eachItem =>
      eachItem.id === editId ? {...eachItem, isEdited: false} : eachItem,
    )
    this.setState({todosList: updatedTodoList})
  }

  onClickSaveBtn = (editId, editTitle) => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(eachItem =>
      eachItem.id === editId
        ? {...eachItem, title: editTitle, isEdited: true}
        : eachItem,
    )
    this.setState({todosList: updatedTodoList})
  }

  onClickCheckbox = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, isChecked: !eachItem.isChecked}
        : eachItem,
    )
    this.setState({todosList: updatedTodoList})
  }

  render() {
    const {todosList, userText} = this.state

    return (
      <div className="bg-container">
        <div className="todo-card">
          <h1 className="main-heading">Simple Todos</h1>
          <div className="user-input-card">
            <input
              className="user-input"
              onChange={this.onChangeUserText}
              type="text"
              placeholder="Add Task"
              value={userText}
            />
            <button
              onClick={this.onClickAddBtn}
              className="add-button"
              type="button"
            >
              Add
            </button>
          </div>
          <ul className="todo-list-card">
            {todosList.map(eachObject => (
              <TodoItem
                key={eachObject.id}
                todosList={todosList}
                todoItem={eachObject}
                deleteTodoList={this.deleteList}
                editTodoItem={this.onClickEditBtn}
                saveTodoItem={this.onClickSaveBtn}
                onClickCheckboxInput={this.onClickCheckbox}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
