import React from 'react';

function ItemPlacemark(props) {
    return (
        <li
            data-position={props.index}
            draggable="true"
            onDragEnd={props.dragEnd}
            onDragStart={props.dragStart}
        >
            {props.itemName}
            <button onClick={() => { props.removeItem(props.id) }}>
                X
            </button>
        </li>
    );
}

export default ItemPlacemark;