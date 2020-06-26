import React, { useState } from 'react';

export default function Header(props) {
    const [inputText, setInputText] = useState("");

    function handleChangeInput(event) {
        setInputText(event.target.value);
    }

    function onKeyPressEnter(event) {
        if (event.key === "Enter") {
            if (event.target.value === "") {
                return;
            }
            setInputText("");
            props.addItem(event.target.value);
        }
    }

    return (
        <input 
            id="input-point" 
            type="text" 
            name="enter" 
            placeholder="Новая точка маршрута"
            value={inputText} 
            onChange={handleChangeInput}
            onKeyPress={onKeyPressEnter}
            autoFocus={true}
        />
    );
}