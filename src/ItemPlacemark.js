import React from 'react';

export default function ItemPlacemark(props) {
    return (
        <li
            data-position={props.index}
            draggable="true"
            onDragEnd={props.dragEnd}
            onDragStart={props.dragStart}
        >
            {props.itemName}
            <button onClick={() => { console.log(props.id) }}>
                X
            </button>
        </li>
    );
}