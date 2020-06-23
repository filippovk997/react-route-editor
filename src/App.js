/**
 * The main application component
 * contains data from Yandex.Maps 
 * and its children Map and Container
 * components
 */
import React from 'react';

import Map from './Map';
import Header from './Header';
import ListPlacemarks from './ListPlacemarks';

let listPlacemarks = [];

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

function ymapCleanMap() {
    map.geoObjects.removeAll();
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

function ymapAddPlacemark() {
    listPlacemarks.map((pm) => map.geoObjects.add(pm));
}

function ymapAddPolyline() {
    // create and add polyline to the map
    var pl = new window.ymaps.Polyline(
        listPlacemarks.map(
            pm => {
                return pm.geometry._coordinates;
            })
        , {}, {
            strokeColor: "#000000",
            strokeWidth: 4,
            strokeOpacity: 0.5
        }
    );
    map.geoObjects.add(pl);
}

function ymapDropPlacemark() {
    map.geoObjects.events.add(['dragend'], function (e) {
        ymapCleanMap();
        ymapAddPlacemark();
        ymapAddPolyline();
    });
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listPoints: [] };

        this.addPoint = this.addPoint.bind(this);
        this.pointsToPlacemarks = this.pointsToPlacemarks.bind(this);
        this.listPointsSetState = this.listPointsSetState.bind(this);
    }

    addPoint(name) {
        // add placemark to the map and 
        // its name to the listPoints array
        let pm = createPlacemark(name);
        listPlacemarks.push(pm);
        let lP = this.state.listPoints;
        lP.push(name);
        this.setState({ listPoints: lP });
        console.log(this.state.listPoints);

        ymapCleanMap();
        ymapAddPlacemark();
        ymapAddPolyline();
    }

    listPointsSetState(listPoints) {
        this.setState({ listPoints: listPoints });
        this.pointsToPlacemarks();
        ymapCleanMap();
        ymapAddPlacemark();
        ymapAddPolyline();
    }

    pointsToPlacemarks() {
        let list_placemarks = [];
        let list_points = this.state.listPoints;
        for (let i = 0; i < list_points.length; i++) {
            for (let j = 0; j < listPlacemarks.length; j++) {
                // !warning: poor search results for identical values in the list
                if (listPlacemarks[j].properties._data.balloonContent == list_points[i]) {
                    list_placemarks.push(listPlacemarks[j]);
                }
            }
        }
        listPlacemarks = list_placemarks;
    }

    render() {
        return (
            <>
                <Map />
                <Header addPoint={this.addPoint} />
                <ListPlacemarks listPoints={this.state.listPoints} listPointsSetState={this.listPointsSetState} />
            </>
        );
    }
}
