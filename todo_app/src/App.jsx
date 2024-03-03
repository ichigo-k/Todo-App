import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'sonner';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const inputRef = useRef(null);

  const handleInput = (e) => {
    inputRef.current.value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      name: inputRef.current.value,
      id: uuid(),
      completed: false
    };

    if (newTodo.name.trim() === "") {
      toast.error("Input field is empty")
    } else {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      toast.success("Todo added successfully")
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  return (
    <div className='flex w-full h-screen justify-center mt-5'>
      <div className='flex flex-col w-1/3 max-md:w-full p-3 gap-y-3'>
        <h1 className='text-2xl font-semibold'>TODO <span className='text-purple-500'>LIST</span> </h1>

        <div>
          <input
            type="text"
            className='w-full border-2 border-purple-500 p-2 rounded-md focus:border-purple-500 focus:outline-none'
            placeholder='Add new todo'
            onChange={handleInput}
            ref={inputRef}
          />
          <button className='mt-1 p-2 bg-purple-600 text-white px-5 rounded-md ' onClick={handleSubmit}>Add</button>
        </div>

        <div className='mt-4'>
          {
            todos.length > 0 ?
              todos.map((todo) => {
                return (
                  <div key={todo.id} className='p-4 bg-purple-200 mb-2 rounded-md flex justify-between items-center'>
                    <div>
                      <input type="checkbox" className='mr-2  ckecked:bg-green-400' onClick={()=>handleComplete(todo.id)} />
                      <span className={`capitalize font-semibold ${todo.completed ? "line-through" : ""}`}>{todo.name}</span>
                    </div>
                   

                    <div className='flex gap-x-3 items-center'>

                      {
                        todo.completed ? <button className='bg-green-500 text-xs px-2 text-white p-1 rounded-md'>Completed</button> :
                          <button className='bg-red-500 text-white p-1 text-xs px-2 rounded-md'>Pending </button>
                      }
                      <AiFillDelete onClick={()=>handleDelete(todo.id)} className='text-lg' />
                    </div>
                  </div>
                );
              }) :
              <div className='text-center mt-5 bg-slate-300 p-4 rounded-md'>No Todo Yet! Add one above.</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
