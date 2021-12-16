import moment from "moment";
import "../styles/style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const TodoItem = ({ todo, onEditClick, onDeleteClick }) => {
  return (
    <div className="card" key={todo.id}>
      <div>
        <h3 className="title"> Name: {todo.text} </h3>
        <h5>
          Created On : {moment(todo.id).format("MMMM Do YYYY, h:mm:ss a")}
        </h5>
      </div>
      <div className="btn-container">
        <button onClick={() => onEditClick(todo)} className="edit-btn">
          <AiFillEdit />
        </button>
        <button onClick={() => onDeleteClick(todo.id)} className="delete-btn">
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
