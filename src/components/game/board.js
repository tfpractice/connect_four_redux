import * as d3 from 'd3';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Filter } from 'game_grid';
import { withState } from 'recompose';
import Grid from 'material-ui/Grid';
import { Game } from 'connect_four_functional';

import Alert from './alert';
import Link from './link';
import Column from './column';
import {
  applyTicks,
  linkForces,
  mountSimulation,
  simInit,
} from '../../utils/viz';

const { cIDs, byCol } = Filter;

const { winner } = Game;

const stateToProps = ({ game }) => {
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

    this.state = {
      mounted: false,
      forceBox: null,
      simulation: props.simulation,
    };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const newLinks = nextProps.links.length !== this.props.links.length;

    return newLinks;
  }

  componentDidUpdate(prevProps, prevState) {
    this.showBoard();
  }

  showBoard() {
    const { forceBox, mounted, simulation: lSim } = this.state;
    const { simulation: sim } = this.props;

    if (mounted) {
      applyTicks(mountSimulation(forceBox)(sim));
    }
  }

  setRef(forceBox) {
    if (forceBox) {
      this.setState((prevState, props) => ({
        forceBox,
        mounted: !!forceBox,
        simulation: applyTicks(
          mountSimulation(forceBox)(linkForces(props.game)(props.simulation))
        ),
      }));
    }
  }

  render() {
    const { game, cols, links } = this.props;

    this.showBoard();

    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg
            ref={this.setRef}
            viewBox="-5,-5,70,60"
            preserveAspectRatio="xMidYMid"
            className="boardVis"
          >
            {cols.map(id => <Column key={id} id={id} />)}
            {links.map(link => <Link link={link} key={link.index} />)}
          </svg>
        </Grid>
      </Grid>
    );
  }
}

export default connect(stateToProps)(Board);
