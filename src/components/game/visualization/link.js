import React from 'react';
import * as d3 from 'd3';
import { cMap, } from '../../../utils/viz';
import { connect, } from 'react-redux';
import { gameX, gameY, } from '../../../utils/viz';
import { colorMap, mountSimulation, simInit, } from '../../../utils/viz';

const stateToProps = ({ game, }, { link, simulation: sim, }) => ({ stroke: colorMap()(game.players).get(link.source.player), });

const x1 = ({ source, }) => gameX(source.x) || source.column;
const y1 = ({ source, }) => gameY(source.y) || source.row;
const x2 = ({ target, }) => gameX(target.x) || target.column;
const y2 = ({ target, }) => gameY(target.y) || target.row;

// const x1 = ({ source, }) => source.column;
// const y1 = ({ source, }) => source.row;
// const x2 = ({ target, }) => target.column;
// const y2 = ({ target, }) => target.row;

// const stateToProps= ({})
const Link = ({ link, simulation: sim, stroke, }) => {
  const a = 0;

  // console.log('link', link);
  // 
  // const anim = link => () => d3.select(`link${link.index}`)
  //   .attr('x1', d => sim.force('x').x()(link.source))
  // 
  //   .attr('y1', d => sim.force('y').y()(link.source))
  //   .attr('x2', d => sim.force('x').x()(link.target))
  //   .attr('y2', d => sim.force('y').y()(link.target));
  // 
  // sim.on('tick', anim(link));
  // console.log('LINK simulation', sim.force('x'));
  return (
    <g className="linkGroup">
      <line className="linkLine" id={`link${link.index}`}

        x1={x1(link)}
        y1={y1(link)}
        x2={x2(link)}
        y2={y2(link)}
        stroke={stroke}
        strokeWidth={0.2}
      />
    </g>
  );
};

export default connect(stateToProps)(Link);
