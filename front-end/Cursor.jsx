/*

Cursor.jsx

Tracks the user's mouse to display a component at it's curent position.
Base Code taken from yoavik -- https://yoavik.com/snippets/mouse-tracker

Calls: 
Called In: PlanButton, WorkoutButton

*/

import React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import './Cursor.css';

    const Cursor = ({ children, offset = { x: 0, y: 0} }) => {
        const element = useRef({});
    
        useEffect(() => {
            function handler(e) {
                if (element.current) {
                    const x = e.clientX + offset.x + window.scrollX, y = e.clientY + offset.y + window.scrollY; // sets x and y based off mouse position, scroll positions, and offset
                    element.current.style.transform = `translate(${x}px, ${y}px)`;
                    element.current.style.visibility = 'visible';
                }
            }
            document.addEventListener('mousemove', handler); // tracks user's mouse
            return () => document.removeEventListener('mousemove', handler);
        }, [offset.x, offset.y]);
    
        return createPortal( // creates cursor component outside of the component it's called in
            <div className='mouse-tracker' ref={element}>
                {children}
            </div>
        , document.body);
    };

export default Cursor