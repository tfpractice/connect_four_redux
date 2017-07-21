import React, { Component, } from 'react';
import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { Filter, } from 'game_grid';
import { withState, } from 'recompose';
import Grid from 'material-ui/Grid';

import { applyTicks, colBand,
  mountSimulation, playerLinks, rowBand, simInit, updateSimLinks, } from '../../utils/viz';
import Link from './link';
import Column from './column';

const { cIDs, } = Filter;

const withRef = withState('mountRef', 'setRef', null);

const stateToProps = ({ game, }) => {
  const simulation = simInit(game);
  const links = simulation.force('players').links();
  
  return ({
    links, simulation, game, nodes: simulation.nodes(), cols: cIDs(game.nodes),
  });
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      forceBox: null,
      simulation: props.simulation,
    };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.links.length !== this.props.links.length;
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { simulation, links, } = this.props;

    this.showBoard();
  }
  
  showBoard() {
    const { forceBox, mounted, simulation: sim1, } = this.state;
    const { simulation: sim, } = this.props;

    if (mounted) {
      applyTicks(mountSimulation(forceBox)(sim));

      // applyTicks(sim1);

      // (applyTicks(sim1).restart());
    }
  }
  
  setRef(ref) {
    this.mountRef = ref;
    this.setState((prevState, props) => ({
      mounted: !!ref,
      forceBox: ref,
      simulation: applyTicks(mountSimulation(ref)(props.simulation)),
    }), () => this.showBoard()
    );
  }
  
  render() {
    const { game, cols, simulation, links, } = this.props;

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
