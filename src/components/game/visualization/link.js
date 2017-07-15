import React from 'react';
import { cMap, } from '../../../utils/viz';
import { connect, } from 'react-redux';

const x1 = ({ source, }) => source.x || source.column;
const y1 = ({ source, }) => source.y || source.row;
const x2 = ({ target, }) => target.x || target.column;
const y2 = ({ target, }) => target.y || target.row;

// const stateToProps= ({})
const Link = ({ link, }) => {
  // console.log('rest', link.source, link.target);
  const a = 0;

  return (
    <line className="link linkLine"

      x1={x1(link)}
      y1={y1(link)}
      x2={x2(link)}
      y2={y2(link)}

      strokeWidth={0.02}
    />
  );
};

export default Link;
