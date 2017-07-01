import React, { Component, } from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { loadGameGraph, loadGraph, } from './funcs';

class Visualization extends Component {
  componentDidMount() {
    loadGameGraph(this.props.game);
    const dlinks = d3.selectAll('.link');

    console.log('FLDSNDUINDF', dlinks);
  }
  
  render() {
    const { links, colors, } = this.props;

    console.log('links', links);
    return (
      <svg className="linkVis">
        {links.map(({ source, target, }, i) => (
          <line key={i} className="link"

            // x1={source.column}
            // y1={source.row}
            // x2={target.column}
            // y2={target.row}
            stroke={
              source.player ? colors[source.player] : 'none'
            }
          />
        ))}
      </svg>
    );
  }
}

export default (Visualization);
