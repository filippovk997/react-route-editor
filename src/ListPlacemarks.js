/**
 * The ListPlacemarks component contains
 * list placemarks names
 */
import React, { Component } from 'react';

import ItemPlacemark from './ItemPlacemark';

var placeholder = document.createElement('li');
placeholder.className = "placeholder";

class ListPlacemarks extends Component {
    constructor(props) {
        super(props);
        this.state = { list: this.props.listPoints };

        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragOver = this.dragOver.bind(this);
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text/html", e.currentTarget);
    }

    dragEnd(e) {
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);

        var list = this.state.list;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if(from < to) to--; // if the placeholder is higher than the over element
        if(this.nodePlacement === "after") to++; // if the placeholder is lower than the over element

        list.splice(to, 0, list.splice(from, 1)[0]); // dragged element from from place is inserted 
                                                     // in to place
        this.setState({list: list});
        this.props.listPointsSetState(list);
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className === "placeholder") 
            return;
        this.over = e.target;
        var relY = e.clientY - this.over.offsetTop; // difference between the user's mouse pointer and 
                                                    // the upper border of the over element
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;
        if (relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling); // inserted before the next element, 
                                                                           // i.e. after the current one
        }
        else if (relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
        }
    }

    render() {
        return (
            <ul onDragOver={this.dragOver}>
                {this.state.list.map(function(item, i) {
                    return (
                        <ItemPlacemark
                            key={i}
                            itemName={item} 
                            index={i} 
                            dragEnd={this.dragEnd} 
                            dragStart={this.dragStart} 
                        />
                    );
                }, this)}
            </ul>
        );
    }
}

export default ListPlacemarks;