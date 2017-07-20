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
    nodes: game.nodes,
    cols: cIDs(game.nodes),
  };
};

class Board extends Component {
  constructor(props) {
    super(props);
    console.log('this.mountRef', this.mountRef);
    this.state = {
      mountRef: null,
      simulation: props.simulation,
      nodes: props.simulation.nodes(),
    };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  
  componentDidMount() {
    const { mountRef, simulation, } = this.state;
  
    //   const { nodes, } = this.props;
    // 
    //   // const col2Y = simulation.force('col2Y').y();
    //   const setFX = n => Object.assign(n, { fx: 10 * n.column, fy: 10 * n.row, });
    // 
    //   console.log('nodes', nodes);
    //   console.log('this.nodes.map(setFX)', nodes.map(setFX));
    //   console.log('simulation.force(\'x\')', simulation.force('col2Y'));
  
    this.showBoard();
  }
  
  showBoard() {
    const { mountRef, simulation: sim, nodes, } = this.state;
    
    if (this.mountRef) {
      // const setFX = n =>
      //   Object.assign(n, { x: sim.force('col2X').x()(n), y: sim.force('row2Y').y()(n), });
      // const newNodes = nodes.map(setFX);
      // 
      // this.setState({ nodes: newNodes, simulation: applyTicks(sim), });
      // applyTicks(sim);

      // (sim).nodes(newNodes).restart();
    }
  }
  
  setRef(ref1) {
    const { simulation: sim, nodes, } = this.state;
    
    this.mountRef = ref1;

    // ref1 && this.setState({
    //   mountRef: this.mountRef,
    //   simulation: mountSimulation(this.mountRef)(simulation),
    // });
    if (this.mountRef) {
      const newSim = mountSimulation(this.mountRef)(sim);
      const setFX = n =>
        Object.assign(n, { x: newSim.force('col2X').x()(n), y: newSim.force('row2Y').y()(n), });
      const newNodes = nodes.map(setFX);

      this.setState({
        mountRef: this.mountRef,
        simulation: newSim,
        nodes: newNodes,

        // simulation: applyTicks(sim),
      });

      // (sim).nodes(newNodes).restart();
    }

    this.showBoard();
  }
  
  render() {
    const { game, cols, links, } = this.props;
    const { simulation, } = this.state;

    this.showBoard();

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
