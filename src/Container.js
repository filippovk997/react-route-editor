/**
 * The Container component contains
 * the Header and ListPlacemarks 
 * components
 */
import React from 'react';

import Header from './Header';
import ListPlacemarks from './ListPlacemarks';

export default function Container(props) {
    return (
        <>
            <Header listPoints={props.listPoints} addPoint={props.addPoint} />
            <ListPlacemarks listPoints={props.listPoints} />
        </>
    );
}