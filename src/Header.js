/**
 * The Header component contains
 * input with the state 
 * that adds placemark when 
 * you press enter
 */
import React, { useState } from 'react';

export default function Header(props) {
    const [pointText, setPointText] = useState("");

    function handleChangeInput(event) {
        setPointText(event.target.pointText);
    }

    function onKeyPressEnter(event) {
        if (event.key === "Enter") {
            props.addPoint(event.target.value);
            let input = document.getElementById('input-point');
            input.value = "";
        }
    }

    return (
        <input 
            id="input-point" 
            type="text" 
            name="enter" 
            placeholder="Новая точка маршрута"
            value={pointText} 
            onChange={handleChangeInput}
            onKeyPress={onKeyPressEnter}
            autoFocus={true}
        />
    );
}