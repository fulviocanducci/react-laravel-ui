import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect } from "react";
function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(null);
    function save() {
        axios
            .post("/api/todo", { name: todo })
            .then((result) => {
                if (result.status === 200) {
                    setTodo("");
                    const { id, name } = result.data;
                    setTodos((data) => [...data, { id, name }]);
                }
            })
            .catch((error) => {
                console.log(error);
                setTodo("");
            });
    }
    function load() {
        axios
            .get("/api/todo")
            .then((result) => {
                if (result.status === 200) {
                    setTodos(result.data);
                }
            })
            .catch((error) => console.log(error));
    }
    function handleSubmit(e) {
        e.preventDefault();
        save();
    }
    useEffect(() => {
        load();
        console.log("error");
    }, []);

    return (
        <div className="container mt-2 mb-2">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Tarefa</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="form-group">
                                    <label className="form-label mb-0 mt-1">
                                        Digite a Tarefa
                                    </label>
                                    <input
                                        className="form-control form-control-sm"
                                        value={todo}
                                        onChange={(e) =>
                                            setTodo(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2 mt-2">
                        <div className="card-header">Lista de Tarefas</div>
                        <div className="card-body">
                            {todos && (
                                <div className="">
                                    <ul class="list-group">
                                        {todos.map((t, i) => (
                                            <li class="list-group-item" key={i}>
                                                {t.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {todos === null ||
                                (todos.length === 0 && (
                                    <div>Nenhum item encontrado</div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;

if (document.getElementById("todo")) {
    ReactDOM.render(<Todo />, document.getElementById("todo"));
}
