import React, { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

type Props = {};

const App: React.FC = (props: Props) => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo === '')
            return;
        if (todo) {
            setTodos([{ id: Date.now(), todo: todo, isDone: false }, ...todos])
            setTodo('');
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination)
            return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        let add, active = todos, complete = completedTodos

        if (source.droppableId === 'TodosList') {
            add = active[source.index]
            active.splice(source.index, 1);
        }
        else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }


        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add);
        }
        else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete)
        setTodos(active);
    }


    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div className="bg-gradient-to-br from-sky-700 text-lg to-cyan-600 text-white w-96 md:w-[600px] mx-auto min-h-screen flex flex-col items-center px-4">
                <h1 className="text-3xl my-5 font-mono ">
                    Taskify
                </h1>
                <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
            </div>
        </DragDropContext>
    );
};

export default App;
