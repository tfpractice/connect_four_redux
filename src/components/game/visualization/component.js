import React from 'react';
import d3 from 'd3';
import { connect, } from 'react-redux';

const Visualization = ({ players, links, colors, }) => (
  <svg className="linkVis">
    {links.map(({ source, target, }, i) =>
      (<line
        key={i}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}

        stroke={source.player ? colors[source.player] : 'none'}
        className="link"/>)
    )}
  </svg>
  );

export default (Visualization);
