import React from 'react';

const Visualization = ({ links, }) => (
  <svg className="linkVis">
    {links.map(({ source, target, }, i) =>
      (<line
        key={i}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke={'#f0f'}
        className="link"/>)
    )}
        </svg>
);

export default Visualization;
