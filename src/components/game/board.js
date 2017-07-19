import React, { Component, } from 'react';
import * as d3 from 'd3';
import Column from './column';
import { connect, } from 'react-redux';
import { Filter, } from 'game_grid';

import Grid from 'material-ui/Grid';
import { colorMap, mountRefSimulation, mountSimulation, playerLinks, refSimulation, simInit, } from '../../utils/viz';
import Link from './link';

const { cIDs, } = Filter;
const stateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links(playerLinks(game)).links();

  return {
    links,
    simulation,
    game,
    nodes: game.nodes,
    cols: cIDs(game.nodes),
    colIDs: [ ...new Set(game.nodes.map(n => n.column)), ],
  };
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { mountRef: null, };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  
  showBoard() {
    this.state.mountRef && mountRefSimulation(this.state.mountRef)(this.props.game)(this.props.simulation);
  }

  setRef(ref1) {
    this.setState({ mountRef: ref1, });
  }
  
  render() {
    const { nodes, actions, game, cols, links, colIDs, active, simulation, winner, } = this.props;

    this.showBoard();

    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg ref={this.setRef} viewBox="0,0,120,120" className="boardVis" >
            {colIDs.map(id => <Column key={id} id={id} />) }
            {links.map(link => <Link link={link} simulation={simulation} key={link.index}/>)}

          </svg>
        </Grid>
      </Grid>
    );
  }
}

const PureBoard = ({ nodes, game, links, colIDs, simulation, }) => {
  const showLinks = (ref) => {
    ref && mountRefSimulation(ref)(game)(simulation);
  };

  return (
    <Grid container justify="center" className="board">
      <Grid item xs={10} className="boardGrid">
        <svg ref={showLinks} viewBox="0,0,100,100" className="boardVis" >
          {colIDs.map(id => <Column key={id} id={id} />) }
          {links.map(link => <Link link={link} simulation={simulation} key={link.index}/>)}
        </svg>
      </Grid>
    </Grid>
  );
};

export default connect(stateToProps)(PureBoard);
