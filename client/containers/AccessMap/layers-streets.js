import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const Streets = (props) => {
  const {
    inclineDownhillMax,
    inclineDownhillMin,
    inclineUphillMax,
    inclineUphillMin,
    uphillMode,
  } = props;

  const max = uphillMode ? inclineUphillMax : inclineDownhillMax;
  const min = uphillMode ? inclineUphillMin : inclineDownhillMin;

  // Note: the nested `cases` are just a way to get around not having an
  // absolute value function in Mapbox's expressions
  const visible = [
    'case',
    [
      '>',
      [
        'case',
        [
          '<',
          ['to-number', ['get', 'incline']],
          0,
        ],
        ['*', -1, ['to-number', ['get', 'incline']]],
        ['to-number', ['get', 'incline']],
      ],
      max,
    ],
    false,
    [
      '<',
      [
        'case',
        [
          '<',
          ['to-number', ['get', 'incline']],
          0,
        ],
        ['*', -1, ['to-number', ['get', 'incline']]],
        ['to-number', ['get', 'incline']],
      ],
      min,
    ],
    false,
    true,
  ];

  return (
    <React.Fragment>
      <Layer
        id='street-click'
        type='line'
        sourceId='streets'
        filter={visible}
        paint={{
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
          },
          'line-opacity': 0,
        }}
      />
      <Layer
        id='street-outline'
        type='line'
        sourceId='streets'
        layout={{ 'line-cap': 'round' }}
        filter={visible}
        paint={{
          'line-color': '#000',
          'line-width': {
            stops: [[14, 0.00], [20, 1]],
          },
          'line-opacity': {
            stops: [[13.5, 0.0], [16, 1]],
          },
          'line-gap-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]],
          },
        }}
      />
      <Layer
        id='street'
        type='line'
        sourceId='streets'
        layout={{ 'line-cap': 'round' }}
        filter={visible}
        paint={{
          'line-color': uphillMode ? 'red' : 'blue',
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
          },
        }}
      />
    </React.Fragment>
  );
};

Streets.propTypes = {
  inclineDownhillMax: PropTypes.number.isRequired,
  inclineDownhillMin: PropTypes.number.isRequired,
  inclineUphillMax: PropTypes.number.isRequired,
  inclineUphillMin: PropTypes.number.isRequired,
  uphillMode: PropTypes.bool.isRequired,
};

Streets.defaultProps = {
  inclineUphill: true,
};

const mapStateToProps = (state) => {
  const {
    inclineRanges,
    map,
  } = state;

  return {
    inclineDownhillMax: inclineRanges.inclineDownhillMax,
    inclineDownhillMin: inclineRanges.inclineDownhillMin,
    inclineUphillMax: inclineRanges.inclineUphillMax,
    inclineUphillMin: inclineRanges.inclineUphillMin,
    uphillMode: map.inclineUphill,
  };
};

export default connect(
  mapStateToProps,
)(Streets);
