import React from 'react';

import { Source } from 'react-mapbox-gl';

import streetsJSON from 'data/streets.json';

// This has to get set as a constant before render, otherwise all the layers
// using this source have to reload on every render (flickers).
const streetSource = {
  type: 'geojson',
  data: streetsJSON,
  maxzoom: 17,
};


const StreetSource = () =>
  <Source
    id='streets'
    geoJsonSource={streetSource}
  />;


export default StreetSource;
