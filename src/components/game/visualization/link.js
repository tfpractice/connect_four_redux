import React from 'react';
import { cMap, } from '../../../utils/viz';
import { connect, } from 'react-redux';
import { gameX, gameY, } from '../../../utils/viz';
import { colorMap, mountSimulation, simInit, } from '../../../utils/viz';

const steteToProps = ({ game, }) => ({ cMap: colorMap()(game.players), });

const x1 = ({ source, }) => gameX(source.x) || source.column;
const y1 = ({ source, }) => gameY(source.y) || source.row;
const x2 = ({ target, }) => gameX(target.x) || target.column;
const y2 = ({ target, }) => gameY(target.y) || target.row;

// const x1 = ({ source, }) => source.column;
// const y1 = ({ source, }) => source.row;
// const x2 = ({ target, }) => target.column;
// const y2 = ({ target, }) => target.row;

// const stateToProps= ({})
const Link = ({ link, simulation, stroke, }) => {
  const a = 0;

  return (
    <g className="linkGroup">
      <line className="linkLine"

        // x1={x1(link)}
        // y1={y1(link)}
        // x2={x2(link)}
        // y2={y2(link)}
        stroke={stroke}
        strokeWidth={0.2}
      />
    </g>
  );
};

export default Link;
