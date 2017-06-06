import React from 'react';
import d3 from 'd3';

const Visualization = ({ links, }) =>

  // const bv = d3.select('.boardVis');

  // console.log('bv', bv);

    // .attr({
    //  width: '100%',
    //  height: '100%',
    // });

   (
  <svg className="linkVis">
    {links.map(({ source, target, }, i) =>
      (<line
        key={i}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        className="link"/>)
    )}
  </svg>
  );

export default Visualization;
