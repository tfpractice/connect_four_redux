import React, { Component, } from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { loadGameGraph, loadGraph, } from './funcs';

class Visualization extends Component {
  componentDidMount() {
    console.log('updating');
    loadGameGraph(this.props.game);
  }
  componentDidUpdate() {
    loadGameGraph(this.props.game);
  }
  
  render() {
    const { links, colors, } = this.props;

    console.log('links', links);

    // 
    return (
      <g className="linkVis">
        {links.map(({ source, target, }, i) => (
          <line key={i} id={`link${i}`} className="link linkLine"

            // x1={source.column}
            // y1={source.row}
            // x2={target.column}
            // y2={target.row}
            stroke={
              source.player ? colors[source.player] : 'none'
            }
          />
        )
        )}
      </g>
    );
  }
}

export default (Visualization);
