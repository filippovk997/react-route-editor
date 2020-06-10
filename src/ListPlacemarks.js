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
        if(from < to) to--;
        if(this.nodePlacement == "after") to++;
        list.splice(to, 0, list.splice(from, 1)[0]); // ? algorithm
        this.setState({list: list});
        this.props.listPointsSetState(list);
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.target.className == "placeholder") return;
        this.over = e.target;
        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;
        if(relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
        }
        else if(relY < height) {
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