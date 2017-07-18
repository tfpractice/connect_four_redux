import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { colorMap, mountSimulation, simInit, } from '../../../utils/viz';

import Link from './link';

const mapStateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links();
  const omniLinks = simulation.force('board').links();

  // const ms = mountSimulation(game)(simulation);

  // console.log("ms",ms)

  return ({ nodes: game.nodes, game, cMap: colorMap()(game.players), });
};

class Visualization extends Component {
  componentDidMount() {
    // mountSimulation(this.props.game)(this.props.simulation);
  }
  componentDidUpdate() {
    // mountSimulation(this.props.simulation);
  }
  
  render() {
    const { links, cMap, simulation, element, ...rest } = this.props;

    const lol = 0;

    return (
      <g className="linkVis">
        {links.map((link, i) => (
          <Link link={link} simulation={simulation} key={i} id={`link${i}`}
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

export default connect(mapStateToProps)(Vix);
