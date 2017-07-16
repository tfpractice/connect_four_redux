import React, { Component, } from 'react';
import Link from './link';
import { connect, } from 'react-redux';

import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import { colorMap, graphLinks, loadGameGraph, nodeInit, pLinks, simInit, } from '../../../utils/viz';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ game, }) => {
  const nodes = game.nodes;
  const myGrid = joinGrid(board(game));
  const links = getPlayers(game).map(pLinks(game.nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);

  const simulation = simInit(game);

  const sLinks = simulation.force('link').links();

  console.log('links', sLinks);
  
  return ({
    links, omniLinks, nodes, simulation, links, sLinks, game, cMap: colorMap()(game.players),
  });
};

class Visualization extends Component {
  componentDidMount() {
    loadGameGraph(this.props.game);
  }
  componentDidUpdate() {
    // loadGameGraph(this.props.game);
  }
  
  render() {
    const { links, cMap, simulation, } = this.props;

    const lol = 0;

    // console.log('sim', sim);

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

export default connect(mapStateToProps)(Visualization);
