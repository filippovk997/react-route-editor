/**
 * The main application component
 * contains data from Yandex.Maps 
 * and its children Map and Container
 * components
 */
import React, { useState } from 'react';

import Map from './Map'
import Container from './Container';

let listPlacemarks = [];

window.ymaps.ready(init);

var map;
function init(ymaps){
    // create map object
    map = new ymaps.Map("map", {
        center: [54.31558342, 48.39393918],
        zoom: 10
    });
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

export default function App() {
    const [listPoints, setListPoints] = useState([]);

    function addPoint(name) {
        // add placemark to the map and 
        // its name to the listPoints array
        let pm = createPlacemark(name);
        map.geoObjects.add(pm);
        setListPoints(listPoints.concat(name));
        listPlacemarks.push(pm);
        console.log(listPoints);

        ymapAddPolyline();
    }

    return (
        <>
            <Map />
            <Container listPoints={listPoints} addPoint={addPoint} />
        </>
    );
}
