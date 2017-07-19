import React, { Component, } from 'react';
import * as d3 from 'd3';
import Column from './column';
import { connect, } from 'react-redux';
import { Filter, } from 'game_grid';
import { withState, } from 'recompose';

import Grid from 'material-ui/Grid';
import { colorMap, mountRefSimulation, mountSimulation, playerLinks, refSimulation, simInit, } from '../../utils/viz';
import Link from './link';

const { cIDs, } = Filter;

const withRef = withState('mountRef', 'setRef', null);

const stateToProps = ({ game, }) => {
  const simulation = simInit(game);
  
  const links = simulation.force('players').links(playerLinks(game)).links();
  
  return {
    links,
    simulation,
    game,
    cols: cIDs(game.nodes),
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
    const { mountRef, } = this.state;
    const { simulation, } = this.props;
    
    mountRef && mountSimulation(mountRef)(simulation);
  }
  
  setRef(ref1) {
    console.log('ref1', ref1);
    this.setState({ mountRef: ref1, });
    this.showBoard();
  }
  
  render() {
    const { game, cols, links, simulation, } = this.props;
    
    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg ref={this.setRef} viewBox="0,0,100,100" className="boardVis" >
            {cols.map(id => <Column key={id} id={id} />) }
            {links.map(link => <Link link={link} simulation={simulation} key={link.index}/>)}
          </svg>
        </Grid>
      </Grid>
    );
  }
}

const PureBoard = ({ nodes, setRef, game, mountRef, links, colIDs, simulation, }) => {
  const showLinks = (ref) => {
  };
  
  const mount = (...arg) => {
    mountRef && mountRefSimulation(mountRef)(game)(simulation);
  };
  
  const load = ref => ref && setRef(ref, mount);
  
  return (
    <Grid container justify="center" className="board">
      <Grid item xs={10} className="boardGrid">
        <svg ref={load} viewBox="0,0,100,100" className="boardVis" >
          {colIDs.map(id => <Column key={id} id={id} />) }
          {links.map(link => <Link link={link} simulation={simulation} key={link.index}/>)}
        </svg>
      </Grid>
    </Grid>
  );
};

export default connect(stateToProps)((Board));
