import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model'
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <ul className='mt-10 w-full flex space-x-3 flex-col space-y-5 md:space-y-0 md:flex-row'>



            {todos.length > 0 &&
                <Droppable
                    droppableId='TodosList'
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef} {...provided.droppableProps}
                            className={`basis-1/2 p-3 rounded-md  ${snapshot.isDraggingOver ? 'bg-black/10' : 'bg-black/5'}`}>
                            <h1 className='text-center text-2xl '>Active Tasks</h1>
                            {todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            }


            {todos.length > 0 &&
                <Droppable
                    droppableId='TodosRemove'
                >
                    {
                        (provided, snapshot) => (
                            <div
                                ref={provided.innerRef} {...provided.droppableProps}
                                className={`basis-1/2 p-3 rounded-md ${snapshot.isDraggingOver ? 'bg-white/20' : 'bg-white/10 '}`}>
                                <h1 className='text-center text-2xl '>Completed Tasks</h1>
                                {completedTodos.map((todo, index) => (
                                    <SingleTodo
                                        key={todo.id}
                                        index={index}
                                        todo={todo}
                                        todos={completedTodos}
                                        setTodos={setCompletedTodos}
                                    />
                                ))}
                            </div>
                        )
                    }
                </Droppable>
            }
        </ul>
    )
}

export default TodoList