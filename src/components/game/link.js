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

  return (

    <line className="linkLine" id={`link${link.index}`}

      stroke={stroke}
      strokeWidth={0.2}
    />

  );
};

export default connect(stateToProps)(Link);
