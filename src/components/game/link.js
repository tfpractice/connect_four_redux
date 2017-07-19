import React from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { cMap,
  colorMap, gameX, gameY, mountSimulation, simInit, } from '../../utils/viz';

const stateToProps = ({ game, }, { link, simulation: sim, }) =>
  ({ stroke: colorMap()(game.players).get(link.source.player), });

const Link = ({ link, simulation: sim, stroke, }) => {
  const a = 0;

  const x1 = ({ source, }) => sim.force('x') ? sim.force('x').x()(source) : source.fx;
  const y1 = ({ source, }) => sim.force('y') ? sim.force('y').y()(source) : source.fy;
  const x2 = ({ target, }) => sim.force('x') ? sim.force('x').x()(target) : target.fx;
  const y2 = ({ target, }) => sim.force('y') ? sim.force('y').y()(target) : target.fy;

  if (!x1(link)) {
    console.log('x1(link) undef', x1(link));
  }
  
  if (sim.force('x')) {
    sim.force('x').x()(link.source);
  }
  console.log('sim.force(\'x\')', sim.force('x'));
  console.log('x1(link)', x1(link));
  return (

    <line className="linkLine" id={`link${link.index}`}

      x1={(link.source.x)}
      y1={(link.target.y)}
      x2={(link.source.x)}
      y2={(link.target.y)}
      stroke={stroke}
      strokeWidth={0.2}
    />

  );
};

export default connect(stateToProps)(Link);
