import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';
import { colorMap, mountSimulation, refSimulation, simInit, } from '../../utils/viz';

const stateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links();
  const omniLinks = simulation.force('board').links();

  // const ms = mountSimulation(game)(simulation);

  // console.log("ms",ms)

  return {
    links,
    simulation,
    game,
    nodes: game.nodes,
    cMap: colorMap()(game.players),
    colIDs: [ ...new Set(game.nodes.map(n => n.column)), ],
  };
};

// const stateToProps = ({ game, }) =>
//   ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });

// "-0.5, -0.5, 100, 100"
const Board = ({ nodes, actions, links, colIDs, active, simulation, winner, }) => {
  const element = null;

  return (
    <Grid container justify="center" className="board">
      <Grid item xs={10} className="boardGrid">
        <svg viewBox="0,0,100,100" className="boardVis"
          ref={(svgRef) => {
            console.log('svgRef', svgRef);
            svgRef && refSimulation(svgRef)(simulation);
          }}>
          <Visualization links={links} />
          {colIDs.map(id => <Column key={id} id={id} />) }

        </svg>
      </Grid>
    </Grid>
  );
};

export default connect(stateToProps)(Board);
