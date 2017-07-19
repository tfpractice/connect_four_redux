import React from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { cMap, colorMap, } from '../../utils/viz';

const stateToProps = ({ game, }, { link, }) =>
  ({ stroke: colorMap()(game.players).get(link.source.player), });

const Link = ({ link, stroke, }) => (
  <line className="linkLine" id={`link${link.index}`}
    stroke={stroke}
    strokeWidth={0.2}
  />

);

export default connect(stateToProps)(Link);
