import React, { Component, } from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { Filter, } from 'game_grid';
import { withState, } from 'recompose';
import Grid from 'material-ui/Grid';

import { applyTicks, mountSimulation, playerLinks, simInit, } from '../../utils/viz';
import Link from './link';
import Column from './column';

const { cIDs, } = Filter;

const withRef = withState('mountRef', 'setRef', null);

const stateToProps = ({ game, }) => {
  const simulation = simInit(game);
  const links = simulation.force('players').links();
  
  return {
    links,
    simulation,
    game,
    nodes: simulation.nodes(),
    cols: cIDs(game.nodes),
  };
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { simulation: props.simulation, };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  
  // 
  // componentDidMount() {
  //   const { mountRef, simulation: sim, } = this.state;
  // // 
  // // 
  //   this.showBoard();
  // // 
  // //   // const setFX = n =>
  // //   //   Object.assign(n, { x: newSim.force('col2X').x()(n), y: newSim.force('row2Y').y()(n), });
  // //   // const newNodes = nodes.map(setFX);
  // }
  
  showBoard() {
    const { simulation: sim, nodes, } = this.state;
    
    if (this.mountRef) {
      applyTicks(sim.restart());
      
      
      // (sim).nodes(newNodes).restart();
    }
  }
  
  setRef(ref1) {
    if (ref1) {
      console.log('ref1', ref1);
      this.mountRef = ref1;
      this.setState((prevState, props) =>
        ({ simulation: mountSimulation(ref1)(props.simulation), }),
    
      ()=>this.showBoard());
    }
  }
  
  render() {
    const { game, cols, simulation,links  } = this.props;
    // const links= this.state.simulation.force('players').links(playerLinks(game)).links()
    console.log("links",links)
    // this.showBoard();
//
    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg ref={this.setRef} viewBox="-5,-5,70,60" preserveAspectRatio="xMidYMid" className="boardVis" >
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
    mountRef && mountSimulation(mountRef)(simulation);
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
