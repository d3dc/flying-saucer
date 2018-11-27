import { $$ } from '@@'
import { Component, findDOMNode } from 'react'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const enhance = $$(
  select => ({
    todo: (state, props) => select.todos.byId(state, props.id),
    isEditing: (state, props) => state.todos.editing === props.id,
  }),
  dispatch => ({
    save: dispatch.todos.save,
    destroy: dispatch.todos.destroy,
  })
)

class TodoItem extends Component {
  handleSubmit = event => {
    const title = this.state.editText.trim()
    if (title) {
      this.props.save({ ...this.props.todo, title })
      this.setState({ editText: title })
    } else {
      this.props.destroy(this.props.todo)
    }
  }

  handleEdit = () => {
    this.props.edit(this.props.todo)
    this.setState({ editText: this.props.todo.title })
  }

  handleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title })
      this.props.cancel()
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }

  handleChange = event => {
    if (this.props.isEditing) {
      this.setState({ editText: event.target.value })
    }
  }

  getInitialState() {
    return { editText: this.props.todo.title }
  }

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.isEditing !== this.props.isEditing ||
      nextState.editText !== this.state.editText
    )
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing && this.props.isEditing) {
      var node = findDOMNode(this.refs.editField)
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  render() {
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }
}

export default enhance(TodoItem)