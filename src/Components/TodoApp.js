import React, { useEffect, useState } from "react";

const TodoApp = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleClear = () => {
    setNewTitle("");
    setNewDescription("");
  };

  const handleDelete=index=>{
    let reduceTodo=[...allTodos];
    reduceTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, []);

  return (
    <>
      <h1 className="bg-success text-white text-center m-2 p-2">My Todos</h1>
      <form className="row border rounded p-2 mt-3 ms-5 me-5">
        <div className="col d-flex">
          <label htmlFor="title" className="fs-3 me-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What's the task title?"
          />
        </div>
        <div className="col d-flex">
          <label htmlFor="description" className="fs-3 me-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What's the task description?"
          />
        </div>
        <div className="col">
          <button
            type="button"
            onClick={handleAddTodo}
            className="btn btn-outline-info fw-bold"
          >
            <i class="bi bi-plus-lg"></i>
            Add
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-outline-danger ms-2 fw-bold"
          >
            <i class="bi bi-x-lg"></i>
            Clear
          </button>
        </div>
      </form>
      <div className="container mt-3">
        <button type="button" className="btn btn-outline-primary fw-bold me-2">
          Todo
        </button>
        <button type="button" className="btn btn-outline-success fw-bold">
          Completed
        </button>
      </div>

      <div
        className="border rounded container mt-3"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {allTodos.map((item, index) => {
          return (
            <div
              className="bg-light text-white d-flex justify-content-between p-2 m-2 "
              key={index}
            >
              <div className="ms-2">
                <h5 className="text-success">{item.title}</h5>
                <p className="text-dark">{item.description}</p>
              </div>
              <div className="d-flex me-2 mt-2">
                <h3 className="text-danger me-2" onClick={()=>handleDelete(index)} style={{ cursor: "pointer" }}>
                  <i className="bi bi-trash"></i>
                </h3>
                <h3 className="text-success" style={{ cursor: "pointer" }}>
                  <i className="bi bi-check-lg"></i>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoApp;
