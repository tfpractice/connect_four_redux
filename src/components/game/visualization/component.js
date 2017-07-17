import React, { Component, } from 'react';
import Link from './link';
import { connect, } from 'react-redux';
import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import { boardLinks, colorMap, graphLinks, loadGameGraph, mountSimulation, nodeInit, pLinks, simInit, userLinks, } from '../../../utils/viz';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links();
  const omniLinks = simulation.force('board').links();

  // mountSimulation(simulation);

  return ({
    links, nodes: game.nodes, simulation, game, cMap: colorMap()(game.players),
  });
};

class Visualization extends Component {
  componentDidMount() {
    mountSimulation(this.props.simulation);
  }
  componentDidUpdate() {
    // mountSimulation(this.props.simulation);
  }
  
  render() {
    const { links, cMap, simulation, } = this.props;

    const lol = 0;

    // console.log('sim', sim);

    // console.log('links', links);
    return (
      <g className="linkVis">
        {links.map((link, i) => (
          <Link link={link} {...link} key={i} id={`link${i}`}
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

export default connect(mapStateToProps)(Visualization);
