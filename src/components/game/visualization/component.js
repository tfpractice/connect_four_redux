import React, { Component, } from 'react';
import { loadGameGraph, simInit, } from '../../../utils/viz';
import Link from './link';
import { connect, } from 'react-redux';

class Visualization extends Component {
  componentDidMount() {
    loadGameGraph(this.props.game);
  }
  componentDidUpdate() {
    // loadGameGraph(this.props.game);
  }
  
  render() {
    const { links, cMap, sim, } = this.props;

    console.log('this', this);
    console.log('sim', sim);

    // console.log('links', links);
    return (
      <g className="linkVis">
        {links.map((link, i) => (
          <Link link={link} key={i} id={`link${i}`}

            stroke={ cMap.get(link.source.player)

            }/>

        )
        )}
      </g>
    );
  }
}

const Vix = ({ links, cMap, }) => (
  <g className="linkVis">
    {links.map((link, i) => (
      <Link link={link} key={i} id={`link${i}`}

        stroke={ cMap.get(link.source.player)

        }/>

    )
    )}
  </g>
);

export default (Visualization);
