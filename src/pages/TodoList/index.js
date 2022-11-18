import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import uuid from "react-uuid";
import Button from "../../components/Button";
import Input from "../../components/Input";

import NewItem from "../../components/NewItem";
import TodoItem from "../../components/TodoItem";

import "./style.css";

const TodoList = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todolist")) || []);
  const [isPending, setIsPending] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateForm = () => {
    setIsPending(prev => !prev);
  };

  const addItem = (todo) => {
    setIsPending(false);

    setTodos(prev => [{ id: uuid(), content: todo, editable: false }, ...prev]);
  };

  const deleteItem = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editItem = (id) => {
    setIsPending(false);

    const data = todos.map((todo) =>
      todo.id === id ? { ...todo, editable: true } : todo
    );

    setTodos(data);
  };

  const saveItem = (todo, id) => {
    const data = todos.map((item) =>
      item.id === id ? { ...item, content: todo, editable: false } : item
    );

    setTodos(data);
  };

  return (
    <div className="todo-container">
      <Button className="btn-logout" onClick={logout} label="Logout" />
      <div className="center-box w-full h-full">
        <div className="form-box">
          <h1 className="title">
            My To-Do List
          </h1>
          <div className="toolbar">
            <Input
              className="w-100 mr-10px"
              type="text"
              name="keyword"
              maxLength="50"
              placeholder="Search"
              icon={<img alt="Search icon" src="https://img.icons8.com/ios-filled/256/search.png" />}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <Button className="btn-new" onClick={handleCreateForm} label={!isPending ? "New" : "Cancel"} />
          </div>
          <div className="content">
            {isPending && <NewItem todo="" onSave={addItem} />}
            <ul>
              {(() => {
                const data = todos.filter(item => item?.content.toLowerCase().search(keyword.toLowerCase()) !== -1);
                return data.length > 0 ? data.map((todo) => (
                  <li key={todo.id}>
                    {!todo.editable ? (
                      <TodoItem
                        id={todo.id}
                        description={todo.content}
                        onDelete={deleteItem}
                        onEdit={editItem}
                      />
                    ) : (
                      <NewItem
                        todo={todo.content}
                        id={todo.id}
                        onSave={saveItem}
                      />
                    )}
                  </li>
                )) :
                  <div className="empty">Empty List :(</div>
              })()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
