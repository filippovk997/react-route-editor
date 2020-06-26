import React from 'react';

import Map from './Map';
import Header from './Header';
import ListPlacemarks from './ListPlacemarks';

let listItems_ = [];

window.ymaps.ready(init);

var map;
function init(ymaps){
    // create map object
    map = new ymaps.Map("map", {
        center: [54.31558342, 48.39393918],
        zoom: 10
    });

    ymapDropPlacemark();
}

function createPlacemark(name) {
    // create placemark by name
    let customPlacemark = new window.ymaps.Placemark(
        map.getCenter(), { 
            balloonContent: name 
        }, { 
            preset: 'islands#circleDotIcon',
            iconColor: 'black',
            draggable: true 
        }
    );

    return customPlacemark;
}

function ymapDropPlacemark() {
    map.geoObjects.events.add(['dragend'], function (e) {
        map.geoObjects.removeAll();
        
        let items_coordinates = listItems_.map((item) => {
            map.geoObjects.add(item.placemark);

            return item.coordinates;
        });

        let polyline = new window.ymaps.Polyline(
            items_coordinates
            , {}, {
                strokeColor: "#000000",
                strokeWidth: 4,
                strokeOpacity: 0.5
            }
        );
        map.geoObjects.add(polyline);
    });
}

class Item {
    constructor(name) {
        this._name = name;
        this._position = 0;
        this._coordinates = map.getCenter();
        this._placemark = {};
        this._id = Item.createId();
    }
    static idCount = 0;

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get coordinates() {
        return this._placemark.geometry._coordinates;
    }

    get placemark() {
        return this._placemark;
    }

    set position(pos) {
        this._position = pos;
    }

    set placemark(pm) {
        this._placemark = pm;
    }

    static createId() {
        Item.idCount++;
        return Item.idCount;
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listItems: [] };

        this.addItem = this.addItem.bind(this);
        this.setListItems = this.setListItems.bind(this);
    }

    addItem(name) {
        let item = new Item(name);
        let pm = createPlacemark(name);
        item.placemark = pm;
        item.position = this.state.listItems.length;
        
        let list_items = this.state.listItems;
        list_items.push(item);
        this.setListItems(list_items);
        console.log("this.state.listItems", this.state.listItems);
    }

    setListItems(listItems) {
        this.setState({ listItems: listItems });

        listItems_ = this.state.listItems;

        map.geoObjects.removeAll();

        let items_coordinates = this.state.listItems.map((item) => {
            map.geoObjects.add(item.placemark);

            return item.coordinates;
        });

        let polyline = new window.ymaps.Polyline(
            items_coordinates
            , {}, {
                strokeColor: "#000000",
                strokeWidth: 4,
                strokeOpacity: 0.5
            }
        );
        map.geoObjects.add(polyline);
    }

    render() {
        return (
            <>
                <Map />
                <Header addItem={this.addItem} />
                <ListPlacemarks listItems={this.state.listItems} setListItems={this.setListItems} />
            </>
        );
    }
}
