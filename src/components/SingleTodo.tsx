import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number
}


const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }


    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map(todo => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        )))
        setEdit(false)
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])


    return (
        <Draggable
            draggableId={todo.id.toString()}
            index={index}
        >
            {(provided) => (
                <form
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onSubmit={(e) => {
                        handleEdit(e, todo.id)
                    }}
                    className='my-2 p-2 bg-white/10 rounded-md flex items-center justify-between shadow-xl shadow-sky-700/10 hover:scale-105 transition-all ease-out cursor-pointer select-none'>

                    <div className='flex-grow'>
                        {
                            edit
                                ? <input
                                    value={editTodo}
                                    ref={inputRef}
                                    onChange={(e) => { setEditTodo(e.target.value) }}
                                    type="text" name="" id=""
                                    className=' outline-none w-10/12 pr-2  bg-transparent border-b-2'
                                />
                                :
                                todo.isDone
                                    ? <s>{todo.todo}</s>
                                    : <span>{todo.todo}</span>

                        }

                    </div>


                    <div className='flex ml-2 select-none'>
                        <span
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }

                            }}
                            className='p-1 cursor-pointer text-neutral-200 hover:text-white hover:scale-125 transition-all active:scale-75'>
                            <AiFillEdit className='' />
                        </span>

                        <span
                            onClick={() => { handleDelete(todo.id) }}
                            className='p-1 cursor-pointer text-neutral-200 hover:text-white hover:scale-125 transition-all active:scale-75'>
                            <AiFillDelete
                                className='' />
                        </span>

                        <span
                            onClick={() => { handleDone(todo.id) }}
                            className='p-1 cursor-pointer text-neutral-200 hover:text-white hover:scale-125 transition-all active:scale-75'>
                            <MdDone
                                className='' />
                        </span>
                    </div>


                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo