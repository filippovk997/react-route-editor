import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';

const App = () => (
    <YMaps>
        <div>Hello, my Yandex.Maps!</div>
        <Map defaultState={{
            center: [54.31558342, 48.39393918],
            zoom: 10
        }} />
    </YMaps>
);

export default App;