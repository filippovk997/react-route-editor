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
        setPointText(event.target.value);
    }

    function onKeyPressEnter(event) {
        if (event.key === "Enter") {
            setPointText("");
            props.addPoint(event.target.value);
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