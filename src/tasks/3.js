import React, { useState } from 'react';
import { v4 as uid } from 'uuid';

/**
 * Задача: сделать так чтобы "дорогой" компонент рендерился как можно меньше
 */

const createTodo = (title) => ({ title, id: uid() });

const waitSync = (ms) => {
    let start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
};

const initialTodos = [
    createTodo('1'),
    createTodo('2'),
    createTodo('3'),
    createTodo('4'),
    createTodo('5'),
    createTodo('6'),
    createTodo('7'),
    createTodo('8'),
    createTodo('9'),
    createTodo('10'),
];

const ExpensiveTodoComponent = ({ title, onDelete }) => {
    waitSync(50);
    console.log('render expensive component!');
    return (
        <div>
            {title}
            <button onClick={onDelete}>delete</button>
        </div>
    );
};

export const Task3 = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button
                onClick={() => {
                    setTodos([...todos, createTodo(inputValue)]);
                    setInputValue('');
                }}
            >
                add
            </button>
            {todos.map((todo) => (
                <ExpensiveTodoComponent
                    title={todo.title}
                    key={todo.id}
                    onDelete={() => setTodos((prev) => prev.filter((el) => el.id !== todo.id))}
                />
            ))}
        </div>
    );
};
