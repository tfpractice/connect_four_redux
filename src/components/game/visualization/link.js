import React from 'react';
import { cMap, } from '../../../utils/viz';
import { connect, } from 'react-redux';
import { gameX, gameY, } from '../../../utils/viz';

const x1 = ({ source, }) => gameX(source.x) || source.column;
const y1 = ({ source, }) => gameY(source.y) || source.row;
const x2 = ({ target, }) => gameX(target.x) || target.column;
const y2 = ({ target, }) => gameY(target.y) || target.row;

// const x1 = ({ source, }) => source.column;
// const y1 = ({ source, }) => source.row;
// const x2 = ({ target, }) => target.column;
// const y2 = ({ target, }) => target.row;

// const stateToProps= ({})
const Link = ({ link, stroke, }) => {
  // console.log('rest', link.source, link.target);
  const a = 0;

  return (
    <line className="link linkLine"

      // x1={x1(link)}
      // y1={y1(link)}
      // x2={x2(link)}
      // y2={y2(link)}
      stroke={stroke}
      strokeWidth={0.02}
    />
  );
};

export default Link;
