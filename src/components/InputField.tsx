import React, { useEffect, useRef, useState } from 'react'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef: any = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <form
            onSubmit={handleAdd}
            className="flex relative group bg-white h-9 rounded-full overflow-hidden pl-3 pr-0.5 items-center w-full"
        >
            <input
                ref={inputRef}
                value={todo}
                onChange={(e) => { setTodo(e.target.value) }}
                type="text" placeholder='Enter a task'
                className='outline-none text-gray-700 flex-grow pr-2'
            />
            <div className='aspect-square rounded-full h-8  bg-sky-700 grid place-items-center text-xs font-semibold  group-focus-within:scale-90 transition-all duration-200'>
                <button className=' '>
                    GO
                </button>
            </div>
        </form>
    )
}

export default InputField