import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import Loading from "./Loading";

function Todo() {
    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: { name: "" },
    });
    const [todos, setTodos] = useState(null);

    function save(values) {
        axios
            .post("/api/todo", values)
            .then((result) => {
                if (result.status === 200) {
                    const { id, name } = result.data;
                    setTodos((data) => [...data, { id, name }]);
                    setValue("name", "");
                    setFocus("name");
                }
            })
            .catch((error) => {
                console.log(error);
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

    function remove(id) {
        axios
            .delete("/api/todo/" + id)
            .then((result) => {
                if (result.status === 200) {
                    setTodos(todos.filter((x) => x.id !== id));
                }
            })
            .catch((error) => console.log(error));
    }

    function submit(values) {
        save(values);
    }

    function handleDelete(e, id) {
        remove(id);
    }

    function handleLoading() {
        setTodos(null);
        window.setTimeout(function () {
            load();
        }, 1250);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="container mt-2 mb-2">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Tarefa</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submit)} method="POST">
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <label className="form-label mb-0 mt-1">
                                                Digite a Tarefa
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="name"
                                                    render={({ message }) => (
                                                        <small className="text-danger is-invalid">
                                                            {" (" +
                                                                message +
                                                                ")"}
                                                        </small>
                                                    )}
                                                />
                                            </label>
                                            <input
                                                name="name"
                                                id="name"
                                                className={
                                                    errors.name
                                                        ? "form-control form-control-sm is-invalid"
                                                        : "form-control form-control-sm is-valid"
                                                }
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Digite a tarefa",
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            "Minimo 3 caracteres",
                                                    },
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <button
                                            disabled={!isValid}
                                            type="submit"
                                            className="btn btn-success btn-sm w-100"
                                        >
                                            <i class="bi bi-cart-plus"></i>{" "}
                                            Cadastrar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2 mt-2">
                        <div className="card-header">Lista de Tarefas</div>
                        <div className="card-body">
                            <div className="mt-1 mb-3">
                                <button
                                    className="w-100 btn btn-primary btn-sm"
                                    onClick={handleLoading}
                                >
                                    <i class="bi bi-cart-plus"></i> Atualizar
                                </button>
                            </div>
                            {todos && (
                                <div className="mt-1 mb-1">
                                    <ul class="list-group">
                                        {todos.map((t, i) => (
                                            <li class="list-group-item" key={i}>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={(e) =>
                                                        handleDelete(e, t.id)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>{" "}
                                                {t.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {todos === null && <Loading />}
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
