import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { cMap, colorMap } from '../../utils/viz';

const stateToProps = ({ game }, { link }) => ({ stroke: colorMap()(game.players).get(link.source.player) });

const Link = ({ link, stroke }) =>
  (<line
    className="linkLine"
    id={`link${link.index}`}
    x1={link.source.column * 10}
    y1={link.source.row * 10}
    x2={link.target.column * 10}
    y2={link.target.row * 10}
    stroke={stroke}
    strokeWidth={0.2}
  />);

export default connect(stateToProps)(Link);
