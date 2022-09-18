import React, { useState, useEffect } from 'react';

/**
 * Есть реализация компонента, от которого требуется 2 вещи:
 *
 * 1) выводить текущее значение вертикального скролла окна (window.scrollY)
 *
 * 2) после монтирования асинхронно получить число и вывести его
 *
 * Нужно найти, объяснить и исправить как можно больше проблем в реализации
 */

// имитация запроса к серверу. просто получаем число асинхронно
const fetchRandomNumber = () => Promise.resolve(Math.random());

export const Task1 = () => {
    const [number, setNumber] = useState();
    const [scroll, setScroll] = useState();

    useEffect(async () => {
        setNumber(await fetchRandomNumber());

        window.addEventListener('scroll', () => setScroll(window.scrollY));

        return () => window.removeEventListener('scroll', () => setScroll(window.scrollY));
    });

    return (
        <div>
            <div> Number: { number } </div>
            <div> Scroll: { scroll } </div>
        </div>
    )
}