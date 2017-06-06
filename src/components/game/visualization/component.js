import React, { Component, } from 'react';

import { connect, } from 'react-redux';

// import Visualization from './component';
import * as d3 from 'd3';
import * as C4Func from 'connect_four_functional';
import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import { color, dragEnded,
dragged,
dragStarted, graphLinks,
linkSelect,
nodeSelect,
playerLinks,
pLinks,
scaleX,
scaleY,
updateLinks, updateNodes, } from './funcs';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ players, game, }, { nodes: xnodes, }) => {
  const nodes = game.nodes;
  const myGrid = joinGrid(board(game));
  const links = getPlayers(game).map(pLinks(game.nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);
  
  const myForce = d3.forceSimulation(nodes)
   .force('charge', d3.forceManyBody())
   .force('link', d3.forceLink(omniLinks).distance(60).id(({ id, }) => id))
   .force('center', d3.forceCenter(960 / 2, 500 / 2))
   .on('tick.n', updateNodes(nodeSelect(nodes)))
   .on('tick.l', updateLinks(linkSelect(links)));
 
  nodeSelect(nodes).call(d3.drag()
    .on('start', dragStarted(myForce))
    .on('drag', dragged)
    .on('end', dragEnded(myForce)));
 
  return ({ links, game, myForce, });
};

// export default connect(mapStateToProps)(Visualization);

class Visualization extends Component {
  ComponentDidMount() {
    const { game: { nodes, }, myForce, } = this.props;

    nodeSelect(nodes).call(d3.drag()
      .on('start', dragStarted(myForce))
      .on('drag', dragged)
      .on('end', dragEnded(myForce)));
  }
  render() {
    const { links, } = this.props;

    return (
  <svg className="linkVis">
    {links.map(({ source, target, }, i) =>
      (<line
        key={i}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke={'none'}
        className="link"/>)
    )}
  </svg>
    );
  }
}

export default Visualization;
