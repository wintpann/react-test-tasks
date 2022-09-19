import React, { useState, useEffect, useRef } from 'react';

/**
 * Есть реализация компонента, от которого требуется 2 вещи:
 *
 * 1) выводить текущее значение координаты Х мыши
 *
 * 2) после монтирования асинхронно получить число и вывести его
 *
 * Нужно найти, объяснить и исправить как можно больше проблем в реализации
 */

// имитация запроса к серверу. просто получаем число асинхронно
const fetchRandomNumber = () => Promise.resolve(Math.random());

export const Task1 = () => {
    const [number, setNumber] = useState();
    const [mouse, setMouse] = useState();
    const ref = useRef();

    useEffect(async () => {
        setNumber(await fetchRandomNumber());

        ref.current.addEventListener('mousemove', (e) => setMouse(e.clientX));

        return () => ref.current.removeEventListener('mousemove', (e) => setMouse(e.clientX));
    });

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            <div> Number: {number} </div>
            <div> Mouse: {mouse} </div>
        </div>
    );
};
