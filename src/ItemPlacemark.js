/**
 * The ItemPlacemark component contains
 * list item name
 */
import React from 'react';

export default function ItemPlacemark(props) {
    return (
        <li
            data-id={props.index}
            draggable="true"
            onDragEnd={props.dragEnd}
            onDragStart={props.dragStart}
        >
            {props.itemName}
        </li>
    );
}